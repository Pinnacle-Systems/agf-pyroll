import { getConnection } from "../constants/db.connection.js";
import { getSupplierWiseMonthlyReceivables, monthWiseDataSupplierReceivables } from "../queries/poData.js";


export async function get(req, res) {
    const connection = await getConnection(res);
    try {
        const { finYearData, filterMonth, filterSupplier, filterArticleId } = req.query;
        console.log(filterMonth, 8);
        console.log(finYearData, 8);
        const fltrYearData = finYearData ? JSON.parse(finYearData).map(item => `'${item}'`) : [];
        //year filter
        const fltrYearClauseQ1 = fltrYearData.length > 0 ? `AND Q1.FINYR IN (${fltrYearData})` : '';
        const fltrYearClauseQ2 = fltrYearData.length > 0 ? `AND Q2.FINYR IN(${fltrYearData})` : '';
        const fltrYearClauseQ3 = fltrYearData.length > 0 ? `AND Q3.FINYR IN(${fltrYearData})` : '';
        const fltrYearClauseQ4 = fltrYearData.length > 0 ? `AND Q4.FINYR IN(${fltrYearData})` : '';
        const fltrYearClauseM = fltrYearData.length > 0 ? `AND M.FINYR IN(${fltrYearData})` : '';
        //month filter
        const monthFilter = filterMonth ? JSON.parse(filterMonth).map(item => `'${item}'`) : [];
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
        FROM YFPURREG Q1
        WHERE 1=1 ${fltrYearClauseQ1}   ${fltrMonthQ1}
        AND EXTRACT(MONTH FROM Q1.DOCDATE) IN (4,5,6)
        AND Q1.SUPPLIER = M.SUPPLIER) AS Q1, 
        (SELECT SUM(Q2.POQTY * Q2.PRICE)
        FROM YFPURREG Q2
        WHERE 1=1 ${fltrYearClauseQ2}   ${fltrMonthQ2}
        AND EXTRACT(MONTH FROM Q2.DOCDATE) IN (7,8,9)
        AND Q2.SUPPLIER = M.SUPPLIER) AS Q2,
        (SELECT SUM(Q3.POQTY * Q3.PRICE)
        FROM YFPURREG Q3
        WHERE 1=1  ${fltrYearClauseQ3}   ${fltrMonthQ3}
        AND EXTRACT(MONTH FROM Q3.DOCDATE) IN (10,11,12)
        AND Q3.SUPPLIER = M.SUPPLIER) AS Q3,
        (SELECT SUM(Q4.POQTY * Q4.PRICE)
        FROM YFPURREG Q4
        WHERE 1=1  ${fltrYearClauseQ4}   ${fltrMonthQ4}
        AND EXTRACT(MONTH FROM Q4.DOCDATE) IN (1,2,3)
        AND Q4.SUPPLIER = M.SUPPLIER) AS Q4,
        SUM(POQTY * PRICE) AS TOTAL
        FROM YFPURREG M
        WHERE 1=1 
    ${fltrYearClauseM}
    ${fltrMonthM}
    ${filterSupp}
    ${filterArtId}
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
        SELECT DISTINCT FINYR FROM YFPURREG
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
        SELECT DISTINCT SUPPLIER FROM YFPURREG`

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
        SELECT DISTINCT ARTICLEID FROM YFPURREG
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
        const { } = req.query;
        const sql =
            `
        select * from (select supplier, sum(poqty) as poqty
        from misyfpurreg
        group by supplier
        order by poqty desc)
        where rownum <= 5
     `

        console.log(sql, '35');
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            supplier: po[0],
            poQty: po[1]
        }))
        console.log(resp, 'resp');
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
        const { } = req.query;
        const sql =
            `
            select * from (select ARTICLEID, sum(poqty) as poqty
            from misyfpurreg
            group by ARTICLEID
            order by poqty desc)
            where rownum <= 10
     `

        console.log(sql, '35');
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            articleId: po[0],
            poQty: po[1]
        }))
        console.log(resp, 'resp');
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
        let finalOutput = [];
        const month = [-2, -1, 0];
        let currentMonth, currentYear;

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
        console.log(sql, '35');
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            docDte: po[0],
            supplier: po[1],
            amount: po[2],
        }))
        console.log(resp, 'resp');
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