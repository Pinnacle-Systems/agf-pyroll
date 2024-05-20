import { getConnection } from "../constants/db.connection.js";
export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;


        const sql =
            `
            SELECT 
            COUNT(A.ORDERNO) AS NOOFORD,
            A.FINYR,
            (SELECT COUNT(B.ORDERNO) 
             FROM MISORDSALESVAL B 
             WHERE B.STATUS NOT IN ('Cancel')
             AND NVL(B.SHIPQTY,0) > 0
             AND B.FINYR = '23-24'
             GROUP BY B.FINYR) AS ShipDone,
             (SELECT COUNT(C.ORDERNO) 
             FROM MISORDSALESVAL C 
             WHERE C.STATUS NOT IN ('Cancel','Completed')
             AND NVL(C.SHIPQTY,0) = 0 
             AND C.FINYR =  '23-24'
             GROUP BY C.FINYR) AS NotDone,
                (SELECT COUNT(D.ORDERNO) 
             FROM MISORDSALESVAL D 
             WHERE D.status = 'Cancel' AND D.FINYR =  '23-24'
             GROUP BY D.FINYR) AS Canceled
          FROM MISORDSALESVAL A 
          where A.finYr =  '23-24' 
          GROUP BY A.FINYR
          ORDER BY NOOFORD
          
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            orders: po[0],
            finYR: po[1],
            shipDone: po[2],
            inHand: po[3],
            canceled: po[4]
        }))

        return res.json({ statusCode: 0, data: resp })

    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getShippedData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;


        const sql =
            `
            SELECT COUNT(A.ORDERNO) NOOFORD,A.FINYR,
            (
            SELECT COUNT(B.ORDERNO) NOOFORD FROM MISORDSALESVAL B 
            WHERE B.STATUS NOT IN ('Cancel','Completed')
            AND B.FINYR = '23-24' 
             AND NVL(B.SHIPQTY,0) > 0 
            ) as PLNotTaken,
            (SELECT COUNT(C.ORDERNO) NOOFORD FROM MISORDSALESVAL C 
            WHERE C.STATUS = 'Completed'
            And C.finyr = '23-24'
            ) as PlTAken,
            (SELECT COUNT(D.ORDERNO) NOOFORD FROM MISORDSALESVAL D 
             WHERE ( D.COCR = 'NO' OR D.POCR = 'NO' OR D.YFOCR = 'NO') AND D.SHIPQTY > 0  AND D.STATUS NOT IN ('Completed','Cancel') 
             And D.finyr = '23-24'
          ) as ocrPend
             FROM MISORDSALESVAL A 
            WHERE A.STATUS NOT IN ('Cancel')
             AND NVL(A.SHIPQTY,0) > 0 
            AND A.FINYR = '23-24' 
            GROUP BY A.FINYR
            ORDER BY 1
            
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            shipped: po[0],
            finYR: po[1],
            plNotTaken: po[2],
            plTaken: po[3],
            ocrPend: po[4]

        }))

        return res.json({ statusCode: 0, data: resp })

    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function getOcrPending(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;


        const sql =
            `
            SELECT COUNT(A.ORDERNO) NOOFORD,A.FINYR,
            (SELECT COUNT(B.ORDERNO) NOOFORD FROM MISORDSALESVAL B 
           WHERE B.COCR = 'NO' AND B.SHIPQTY > 0  AND B.STATUS NOT IN ('Completed','Cancel') 
           ) as cutOcrPend,
           (SELECT COUNT(C.ORDERNO) NOOFORD FROM MISORDSALESVAL C 
           WHERE C.POCR = 'NO' AND C.SHIPQTY > 0  AND C.STATUS NOT IN ('Completed','Cancel') 
           ) as proOcrPend,
           (SELECT COUNT(D.ORDERNO) NOOFORD FROM MISORDSALESVAL D 
           WHERE D.YFOCR = 'NO' AND D.SHIPQTY > 0  AND D.STATUS NOT IN ('Completed','Cancel') 
           )as fabOcrPend FROM MISORDSALESVAL A 
           WHERE ( A.COCR = 'NO' OR A.POCR = 'NO' OR A.YFOCR = 'NO') AND A.SHIPQTY > 0 
            AND A.STATUS NOT IN ('Completed','Cancel') 
            AND A.finYr = '23-24'
           GROUP BY A.FINYR
           ORDER BY 1
           
            
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            ocrPend: po[0],
            finYr: po[1],
            cutOcrPend: po[2],
            proOcrPend: po[3],
            fabOcrPend: po[4]


        }))

        return res.json({ statusCode: 0, data: resp })

    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function getWIPData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;


        const sql =
            `
            select  COUNT(A.ORDERNO) NOOFORD,
            (SELECT COUNT(B.ORDERNO) NOOFORD FROM MISORDSALESVAL B 
           WHERE B.FABST = 'NO' AND B.CUTST <> 'YES' AND B.STATUS NOT IN ('Completed','Cancel') And  B.finyr = '23-24'
           )WIPFAB,
           (SELECT COUNT(C.ORDERNO) NOOFORD FROM MISORDSALESVAL C 
           WHERE C.CUTST = 'NO' AND C.PRODST <> 'YES' AND C.STATUS NOT IN ('Completed','Cancel') And C.finyr = '23-24'
           ) as WIPCUT,
           (SELECT COUNT(D.ORDERNO) NOOFORD FROM MISORDSALESVAL D 
           WHERE D.PRODST = 'YES' AND NVL(D.SHIPQTY,0) = 0 AND D.STATUS NOT IN ('Completed','Cancel')  And D.finyr = '23-24') as PRODCUT
            FROM MISORDSALESVAL A WHERE(A.FABST = 'NO' or A.CUTST <> 'YES' or A.CUTST = 'NO' or A.PRODST <> 'YES'
           or A.PRODST = 'YES' or NVL(A.SHIPQTY,0) = 0
             ) AND A.STATUS NOT IN ('Completed','Cancel') 
           AND A.finyr = '23-24' group by A.finyr 
           
            
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            noOfOrd: po[0],
            wipFab: po[1],
            wipCut: po[2],
            wipPro: po[3],



        }))

        return res.json({ statusCode: 0, data: resp })

    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getProfitLossData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const sql =
            `
         SELECT  SUM(CASE WHEN A.Actprofit < 0 THEN nvl(A.Actprofit,0) ELSE 0 END) AS loss,
SUM(CASE WHEN A.Actprofit > 0 THEN nvl(A.Actprofit,0) ELSE 0 END) AS profit,customer
FROM MISORDSALESVAL A
WHERE a.finyr = '23-24'
group by customer
     `
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            loss: po[0],
            profit: po[1],
            customer: po[2],
        }))
        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function getCapPlanData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const sql =
            `
            SELECT B.*,A.PLANDELMON MONTH,A.ORDERQTY BOOKED,A.BUYERDELDATE FROM (
                SELECT SUM(A.ORDERQTY) ORDERQTY ,A.PLANDELMON,MAX(A.BUYERDELDATE) BUYERDELDATE FROM MISORDSALESVAL A 
                WHERE A.STATUS NOT IN ('Completed','Cancel')
                AND A.PLANDELMON IN (
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE TO_DATE(SYSDATE) BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(TO_DATE(SYSDATE))+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(LAST_DAY(TO_DATE(SYSDATE))+1)+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(LAST_DAY(LAST_DAY(TO_DATE(SYSDATE))+1)+1)+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(LAST_DAY(LAST_DAY(LAST_DAY(TO_DATE(SYSDATE))+1)+1)+1)+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(LAST_DAY(LAST_DAY(LAST_DAY(LAST_DAY(TO_DATE(SYSDATE))+1)+1)+1)+1)+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                )  
                GROUP BY A.PLANDELMON
                ) A
                CROSS JOIN (
                SELECT LISTAGG(B.DPARAM,',') WITHIN GROUP (ORDER BY 1) COMPANY,SUM(B.DVALUE) CAPACITY FROM MISREQTAB A
                JOIN MISREQTABDET B ON A.MISREQTABID = B.MISREQTABID
                WHERE A.TYPENAME = 'COMPANY CAPACITY'
                ) B
                ORDER BY BUYERDELDATE
     `
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            company: po[0],
            capacity: po[1],
            month: po[2],
            booked: po[3]
        }))
        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function getFabStsData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const sql =
            `
            SELECT A.PLANDELMON,A.NOOFORD,B.NOOFORD REC,A.NOOFORD-NVL(B.NOOFORD,0) BAL FROM (
                SELECT COUNT(A.ORDERNO) NOOFORD,A.PLANDELMON,MAX(A.BUYERDELDATE) DELDATE FROM MISORDSALESVAL A 
                WHERE A.STATUS NOT IN ('Completed','Cancel')
                AND A.PLANDELMON IN (
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE TO_DATE(SYSDATE) BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(TO_DATE(SYSDATE))+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(LAST_DAY(TO_DATE(SYSDATE))+1)+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                )  
                GROUP BY A.PLANDELMON
                ) A 
                LEFT JOIN (SELECT COUNT(A.ORDERNO) NOOFORD,A.PLANDELMON FROM MISORDSALESVAL A 
                WHERE A.FABST = 'NO' AND A.BALQTY > 0 AND A.STATUS NOT IN ('Completed','Cancel')
                AND A.PLANDELMON IN (
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE TO_DATE(SYSDATE) BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(TO_DATE(SYSDATE))+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                UNION
                SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
                WHERE LAST_DAY(LAST_DAY(TO_DATE(SYSDATE))+1)+1 BETWEEN A.STDT AND A.ENDT AND A.COMPCODE = 'BVK'
                )  
                GROUP BY A.PLANDELMON
                ) B ON A.PLANDELMON = B.PLANDELMON
                ORDER BY DELDATE
     `
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            month: po[0],
            ord: po[1],
            rec: po[2],
            pend: po[3]
        }))
        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getYFActVsPln(req, res) {
    const connection = await getConnection(res)
    try {
        const { chart } = req.query;
        const sql =
            `   
            SELECT act, planExp, orderno, PLANDELMON
            FROM (
                SELECT SUM(yfActualExp) AS act, SUM(yfplanExp) AS planExp, orderno, PLANDELMON
                FROM MISORDSALESVAL
                WHERE finyr = '23-24' AND PLANDELMON = 'October 2023'
                GROUP BY orderno, PLANDELMON
                HAVING SUM(yfplanExp) IS NOT NULL
            ORDER BY act DESC) T
          ${chart ? '  where rownum <=5' : ''}
     `
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            actual: po[0],
            planed: po[1],
            ordeNo: po[2],
            PlanMnth: po[3]
        }))
        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
