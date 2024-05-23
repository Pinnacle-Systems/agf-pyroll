import { getConnection } from "../constants/db.connection.js";
import { getSupplierWiseMonthlyReceivables, monthWiseDataSupplierReceivables } from "../queries/poData.js";


export async function get(req, res) {
    const connection = await getConnection(res);
    try {
        const { finYearData, filterMonth, filterSupplier, filterArticleId, filterDate } = req.query;

        // date filter
        const formattedDates = filterDate ? JSON.parse(filterDate) : [];
        const startDate = formattedDates.length > 0 ? formattedDates[0] : null;
        const endDate = formattedDates.length > 1 ? formattedDates[1] : null;

        const filterDateWiseQ1 = startDate && endDate ? `AND Q1.DOCDate BETWEEN TO_DATE('${startDate}', 'YYYY-MM-DD') AND TO_DATE('${endDate}', 'YYYY-MM-DD')` : '';
        const filterDateWiseQ2 = startDate && endDate ? `AND Q2.DOCDate BETWEEN TO_DATE('${startDate}', 'YYYY-MM-DD') AND TO_DATE('${endDate}', 'YYYY-MM-DD')` : '';
        const filterDateWiseQ3 = startDate && endDate ? `AND Q3.DOCDate BETWEEN TO_DATE('${startDate}', 'YYYY-MM-DD') AND TO_DATE('${endDate}', 'YYYY-MM-DD')` : '';
        const filterDateWiseQ4 = startDate && endDate ? `AND Q4.DOCDate BETWEEN TO_DATE('${startDate}', 'YYYY-MM-DD') AND TO_DATE('${endDate}', 'YYYY-MM-DD')` : '';
        const filterDateWiseM = startDate && endDate ? `AND M.DOCDate BETWEEN TO_DATE('${startDate}', 'YYYY-MM-DD') AND TO_DATE('${endDate}', 'YYYY-MM-DD')` : '';

        //year filter
        const fltrYearData = finYearData ? JSON.parse(finYearData).map(item => `'${item}'`) : [];
        const fltrYearClauseQ1 = fltrYearData.length > 0 ? `AND Q1.FINYR IN (${fltrYearData})` : '';
        const fltrYearClauseQ2 = fltrYearData.length > 0 ? `AND Q2.FINYR IN(${fltrYearData})` : '';
        const fltrYearClauseQ3 = fltrYearData.length > 0 ? `AND Q3.FINYR IN(${fltrYearData})` : '';
        const fltrYearClauseQ4 = fltrYearData.length > 0 ? `AND Q4.FINYR IN(${fltrYearData})` : '';
        const fltrYearClauseM = fltrYearData.length > 0 ? `AND M.FINYR IN(${fltrYearData})` : '';
        //month filter
        const monthFilter = filterMonth ? JSON.parse(filterMonth).map(item => `'${item}'`) : [];
        console.log();
        const fltrMonthQ1 = monthFilter.length > 0 ? `AND EXTRACT(MONTH FROM Q1.DOCDATE)IN (${monthFilter})` : '';
        const fltrMonthQ2 = monthFilter.length > 0 ? `AND EXTRACT(MONTH FROM Q2.DOCDATE)IN (${monthFilter})` : '';
        const fltrMonthQ3 = monthFilter.length > 0 ? `AND EXTRACT(MONTH FROM Q3.DOCDATE)IN (${monthFilter})` : '';
        const fltrMonthQ4 = monthFilter.length > 0 ? `AND EXTRACT(MONTH FROM Q4.DOCDATE)IN (${monthFilter})` : '';
        const fltrMonthM = monthFilter.length > 0 ? `AND EXTRACT(MONTH FROM M.DOCDATE)IN (${monthFilter})` : '';
        // supplier filter
        const suppFilter = filterSupplier ? JSON.parse(filterSupplier).map(item => `'${item}'`) : [];
        const filterSupp = suppFilter.length > 0 ? `AND SUPPLIER IN (${suppFilter})` : '';
        // Article id filter
        const articleIdFilter = filterArticleId ? JSON.parse(filterArticleId).map(item => `'${item}'`) : [];
        const filterArtId = articleIdFilter.length > 0 ? ` AND ARTICLEID IN (${articleIdFilter})` : '';

        const sql = `SELECT SUPPLIER,
        (SELECT SUM(Q1.POQTY * Q1.PRICE)
        FROM MISYFPURREG Q1
        WHERE 1=1 ${fltrYearClauseQ1}   ${fltrMonthQ1} ${filterDateWiseQ1}
        AND EXTRACT(MONTH FROM Q1.DOCDATE) IN (4,5,6)
        AND Q1.SUPPLIER = M.SUPPLIER) AS Q1, 
        (SELECT SUM(Q2.POQTY * Q2.PRICE)
        FROM MISYFPURREG Q2
        WHERE 1=1 ${fltrYearClauseQ2}   ${fltrMonthQ2}  ${filterDateWiseQ2}
        AND EXTRACT(MONTH FROM Q2.DOCDATE) IN (7,8,9)
        AND Q2.SUPPLIER = M.SUPPLIER) AS Q2,
        (SELECT SUM(Q3.POQTY * Q3.PRICE)
        FROM MISYFPURREG Q3
        WHERE 1=1  ${fltrYearClauseQ3}   ${fltrMonthQ3}  ${filterDateWiseQ3}
        AND EXTRACT(MONTH FROM Q3.DOCDATE) IN (10,11,12)
        AND Q3.SUPPLIER = M.SUPPLIER) AS Q3,
        (SELECT SUM(Q4.POQTY * Q4.PRICE)
        FROM MISYFPURREG Q4
        WHERE 1=1  ${fltrYearClauseQ4}   ${fltrMonthQ4}  ${filterDateWiseQ4}
        AND EXTRACT(MONTH FROM Q4.DOCDATE) IN (1,2,3)
        AND Q4.SUPPLIER = M.SUPPLIER) AS Q4,
        SUM(POQTY * PRICE) AS TOTAL
        FROM MISYFPURREG M
        WHERE 1=1 
    ${fltrYearClauseM}
    ${fltrMonthM}
    ${filterSupp}
    ${filterArtId}
    ${filterDateWiseM}
        GROUP BY M.SUPPLIER`
        const result = await connection.execute(sql);
        let resp = result.rows.map(po => ({
            supplier: po[0], q1: po[1], q2: po[2], q3: po[3], q4: po[4], price: po[5]
        }));
        return res.json({ statusCode: 0, data: resp });
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close();
    }
}

export async function getFinYr(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const result = await connection.execute(`
        select * from (select finyr  from GTFINANCIALYEAR order by finyr desc) finyr     
        where rownum <= 3
        order by finyr
     `)
        let resp = result.rows.map(po => ({
            finYr: po[0]
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

export async function getSupplier(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const sql = `
        SELECT DISTINCT SUPPLIER FROM MISYFPURREG`

        const result = await connection.execute(sql)

        let resp = result.rows.map(po => ({
            supplier: po[0]
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

export async function getArticleId(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const result = await connection.execute(`
        SELECT DISTINCT ARTICLEID FROM MISYFPURREG
     `)
        let resp = result.rows.map(po => ({
            articleId: po[0]
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
export async function getSuppEfficency(req, res) {
    const connection = await getConnection(res)
    try {
        const { suppEffFin } = req.query;
        console.log(suppEffFin, 'finye');
        const sql =
            `
            select * from (select supplier, sum(poqty) as poqty
            from misyfpurreg 
            where  misyfpurreg.FINYR = ${suppEffFin.replace(/"/g, '\'')}
            group by supplier
            order by poqty desc)
            where rownum <= 5
     `
        console.log(sql, 'sql');

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            supplier: po[0],
            poQty: po[1]
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

export async function getTopItems(req, res) {
    const connection = await getConnection(res)
    try {
        const { finYearData } = req.query;

        const sql =
            `
            select * from (select ARTICLEID, sum(poqty) as poqty
            from misyfpurreg
             where  misyfpurreg.FINYR = ${finYearData.replace(/"/g, '\'')}
            group by ARTICLEID
            order by poqty desc)
            where rownum <= 10 
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            articleId: po[0],
            poQty: po[1]
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

export async function getMonthlyReceivables(req, res) {
    const connection = await getConnection(res)
    try {
        const { isMonthWise } = req.query;
        let data;
        data = await monthWiseDataSupplierReceivables(connection)
        // if (isMonthWise) {
        // }
        // data = await getSupplierWiseMonthlyReceivables(connection)
        return res.json({ statusCode: 0, data })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function getTopFiveSuppTurnOvr(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;


        const sql =
            `
                select *
                from (
                    select docDate, supplier, Round(sum(poQty*price)) as amount
                    from misyfpurreg
                    where docDate >= ADD_MONTHS(TRUNC(SYSDATE), -3) 
                    group by supplier, docDate
                    order by amount desc
                ) where rowNum <= 5                
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            docDte: po[0],
            supplier: po[1],
            amount: po[2],
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
export async function getOverAllSupplierContribution(req, res) {
    const connection = await getConnection(res)
    try {
        const { suppContribution } = req.query;


        const sql =
            `
            select supplier,Round(sum(poQty * price)) as poQty,finyr from misyfpurreg where finyr = ${suppContribution.replace(/"/g, '\'')}
            and poQty > '5000'  group by supplier, finyr              
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            supplier: po[0],
            poQty: po[1],
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
export async function getMostPaidTaxVal(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const sql =
            `
            SELECT ROUND(SUM((BILLQTY*PRICE)*TAX/100)) AS Value,
            TRIM(TO_CHAR(DUEDATE,'Mon')) || TRIM(TO_CHAR(DUEDATE,'yy')) AS MonYr,
            taxTemp
     FROM misyfpurreg
     WHERE misyfpurreg.docDate >= ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -5) 
           AND TRUNC(DUEDATE, 'MM') < TRUNC(SYSDATE, 'MM')
     GROUP BY TRIM(TO_CHAR(DUEDATE,'Mon')), TRIM(TO_CHAR(DUEDATE,'yy')), taxTemp
     ORDER BY 
         CASE TRIM(TO_CHAR(DUEDATE,'Mon'))
             WHEN 'Jan' THEN 1
             WHEN 'Feb' THEN 2
             WHEN 'Mar' THEN 3
             WHEN 'Apr' THEN 4
             WHEN 'May' THEN 5
             WHEN 'Jun' THEN 6
             WHEN 'Jul' THEN 7
             WHEN 'Aug' THEN 8
             WHEN 'Sep' THEN 9
             WHEN 'Oct' THEN 10
             WHEN 'Nov' THEN 11
             WHEN 'Dec' THEN 12
             ELSE 99
         END,
         taxTemp ASC
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({


            taxVal: po[0],
            month: po[1],
            taxTemp: po[2],


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