import { getConnection } from "../constants/db.connection.js";


export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const result = await connection.execute(`
        SELECT SUPPLIER,
        (SELECT SUM(Q1.POQTY * Q1.PRICE)
        FROM YFPURREG Q1
        WHERE EXTRACT(MONTH FROM Q1.DOCDATE) IN (1,2,3)
        AND Q1.SUPPLIER = M.SUPPLIER) AS Q1,
        (SELECT SUM(Q2.POQTY * Q2.PRICE)
        FROM YFPURREG Q2
        WHERE EXTRACT(MONTH FROM Q2.DOCDATE) IN (4,5,6)
        AND Q2.SUPPLIER = M.SUPPLIER) AS Q2,
        (SELECT SUM(Q3.POQTY * Q3.PRICE)
        FROM YFPURREG Q3
        WHERE EXTRACT(MONTH FROM Q3.DOCDATE) IN (7,8,9)
        AND Q3.SUPPLIER = M.SUPPLIER) AS Q3,
        (SELECT SUM(Q4.POQTY * Q4.PRICE)
        FROM YFPURREG Q4
        WHERE EXTRACT(MONTH FROM Q4.DOCDATE) IN (10,11,12)
        AND Q4.SUPPLIER = M.SUPPLIER) AS Q4,
        SUM(POQTY * PRICE) AS TOTAL
        FROM YFPURREG M
        GROUP BY M.SUPPLIER
     `)
        let resp = result.rows.map(po => ({
            supplier: po[0], q1: po[1], q2: po[2], q3: po[3], q4: po[4], price: po[5]
        }))
        console.log(resp, 'ypo nresp');
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
        console.log(resp, 'ypo nresp');
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
        console.log(sql, 'ypo nresp');

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
        console.log(resp, 'ypo nresp');
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




