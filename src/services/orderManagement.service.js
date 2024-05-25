import { getConnection } from "../constants/db.connection.js";
export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const { filterYear } = req.query;
        console.log(filterYear, 'filterYear');

        const sql =
            `
            SELECT 
            COUNT(A.ORDERNO) AS NOOFORD,
            A.FINYR,
            (SELECT COUNT(B.ORDERNO) 
             FROM MISORDSALESVAL B 
             WHERE B.STATUS NOT IN ('Cancel')
             AND NVL(B.SHIPQTY,0) > 0
             AND B.FINYR = '${filterYear}'
             GROUP BY B.FINYR) AS ShipDone,
             (SELECT COUNT(C.ORDERNO) 
             FROM MISORDSALESVAL C 
             WHERE C.STATUS NOT IN ('Cancel','Completed')
             AND NVL(C.SHIPQTY,0) = 0 
             AND C.FINYR =  '${filterYear}'
             GROUP BY C.FINYR) AS NotDone,
                (SELECT COUNT(D.ORDERNO) 
             FROM MISORDSALESVAL D 
             WHERE D.status = 'Cancel' AND D.FINYR =  '${filterYear}'
             GROUP BY D.FINYR) AS Canceled
          FROM MISORDSALESVAL A 
          where A.finYr =  '${filterYear}' 
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
        const { filterYear } = req.query;


        const sql =
            `
            SELECT COUNT(A.ORDERNO) NOOFORD,A.FINYR,
            (
            SELECT COUNT(B.ORDERNO) NOOFORD FROM MISORDSALESVAL B 
            WHERE B.STATUS NOT IN ('Cancel','Completed')
            AND B.FINYR = '${filterYear}' 
             AND NVL(B.SHIPQTY,0) > 0 
            ) as PLNotTaken,
            (SELECT COUNT(C.ORDERNO) NOOFORD FROM MISORDSALESVAL C 
            WHERE C.STATUS = 'Completed'
            And C.finyr = '${filterYear}'
            ) as PlTAken,
            (SELECT COUNT(D.ORDERNO) NOOFORD FROM MISORDSALESVAL D 
             WHERE ( D.COCR = 'NO' OR D.POCR = 'NO' OR D.YFOCR = 'NO') AND D.SHIPQTY > 0  AND D.STATUS NOT IN ('Completed','Cancel') 
             And D.finyr = '${filterYear}'
          ) as ocrPend
             FROM MISORDSALESVAL A 
            WHERE A.STATUS NOT IN ('Cancel')
             AND NVL(A.SHIPQTY,0) > 0 
            AND A.FINYR = '${filterYear}' 
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
        const { filterYear } = req.query;


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
            AND A.finYr = '${filterYear}'
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
        const { filterYear } = req.query;


        const sql =
            `
            SELECT  COUNT(A.ORDERNO) NOOFORD,
            (SELECT COUNT(B.ORDERNO) NOOFORD FROM MISORDSALESVAL B 
           WHERE B.FABST = 'NO'  AND B.STATUS NOT IN ('Completed','Cancel') AND  B.FINYR = '${filterYear}'
           AND NVL(B.SHIPQTY,0) = 0
           )WIPFAB,
           (SELECT COUNT(C.ORDERNO) NOOFORD FROM MISORDSALESVAL C 
           WHERE C.CUTST = 'NO' AND C.STATUS NOT IN ('Completed','Cancel') AND C.FINYR = '${filterYear}'
           AND NVL(C.SHIPQTY,0) = 0
           ) AS WIPCUT,
           (SELECT COUNT(D.ORDERNO) NOOFORD FROM MISORDSALESVAL D 
           WHERE D.PRODST = 'NO' AND NVL(D.SHIPQTY,0) = 0 AND D.STATUS NOT IN ('Completed','Cancel')  AND D.FINYR = '${filterYear}') AS PRODCUT
            FROM MISORDSALESVAL A WHERE NVL(A.SHIPQTY,0) = 0 AND A.STATUS NOT IN ('Completed','Cancel') 
           AND A.FINYR = '${filterYear}' GROUP BY A.FINYR
           
            
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
export async function getPreBudget(req, res) {
    const connection = await getConnection(res)
    try {
        const { filterYear } = req.query;


        const sql =
            `
            SELECT 
            A.FINYR,
             COUNT(A.ORDERNO) NOOFORD,
            COUNT(CASE WHEN A.APPROVALSTATUS = 'APPROVED' THEN A.ORDERNO END) AS NOOFORD_APPROVED,
            COUNT(CASE WHEN A.APPROVALSTATUS <> 'APPROVED' OR A.APPROVALSTATUS IS NULL THEN A.ORDERNO END) AS NOOFORD_APPROVAL_PENDING,
            COUNT(CASE WHEN A.APPROVALSTATUS = 'APPROVED' AND A.STATUS = 'Cancel' THEN A.ORDERNO END) AS NOOFORD_AFTER_APPROVAL_CANCEL
        FROM 
            MISORDSALESVAL A
        WHERE 
            A.PREBUD = 'YES' and A.finyr = '${filterYear}'
        GROUP BY 
            A.FINYR
        ORDER BY 
            A.FINYR
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({


            finYr: po[0],
            noOfOrd: po[1],
            approved: po[2],
            appPending: po[3],
            cancelAfterApp: po[4],


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
// chart data
export async function getProfitLossData(req, res) {
    const connection = await getConnection(res)
    try {
        const { filterYear } = req.query;
        console.log(filterYear, 'filterYear');
        const sql =
            `
            SELECT customer, PROFIT
            FROM (
                SELECT customer, SUM(ACTPROFIT) AS PROFIT
                FROM MISORDSALESVAL
                WHERE finyr = '${filterYear}'
                GROUP BY customer
                ORDER BY PROFIT DESC
            ) p
            WHERE  PROFIT IS NOT NULL
     `
        console.log(sql, 'sql276');
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            customer: po[0],
            profit: po[1],
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
    const connection = await getConnection(res);
    try {
        const { filterMonth, filterSupplier, filterYear } = req.query;
        console.log(filterMonth, filterSupplier, filterYear, '352');

        let sql;

        if (filterMonth || filterSupplier || filterYear) {
            sql = `
            SELECT B.orderNo,
             B.customer,
              B.plandelmon,
              B.orderQty,
               SUM(A.PAMOUNT)as plAmt,
                SUM(A.AAMOUNT)as actAmt
               FROM MISYARNFABRICVALUE A
JOIN MISORDSALESVAL B ON A.ORDERNO = B.ORDERNO
WHERE A.PROCESSNAME = 'FABRIC' AND B.customer = '${filterSupplier}' AND B.FInyr = '${filterYear}'
and plandelmon ='${filterMonth}'
GROUP BY B.orderNo, B.customer, B.plandelmon,B.orderQty

            `;
            console.log(sql, '416');
        } else {

            res.status(200).json({ message: 'filterMonth and filterSupplier are required' });
            return;
        }
        console.log(sql, 'sql');
        const result = await connection.execute(sql);
        let resp = result.rows.map(po => ({
            ordeNo: po[0],
            customer: po[1],
            PlanMnth: po[2],
            qty: po[3],
            planed: po[4],
            actual: po[5]
        }));

        return res.json({ statusCode: 0, data: resp });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}
