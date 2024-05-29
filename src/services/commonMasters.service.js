import { getConnection } from "../constants/db.connection.js";


export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
        select * from (select finyr  from GTFINANCIALYEAR order by finyr desc) finyr     
        where rownum <= 3
     `)
        let resp = result.rows.map(po => ({
            finYear: po[0]
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

export async function getBuyer(req, res) {
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
        SELECT customer
        FROM MISORDSALESVAL
        GROUP BY customer
        ORDER BY customer
     `)
        let resp = result.rows.map(po => ({
            buyerName: po[0]
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


export async function getMonthData(req, res) {
    const connection = await getConnection(res)
    try {
        const { filterYear, filterBuyer } = req.query;
        const result = await connection.execute(`
        SELECT PLANDELMON
        FROM MISORDSALESVAL T
        WHERE T.finyr = '${filterYear}' AND T.customer = '${filterBuyer}'
               GROUP BY PLANDELMON
        ORDER BY TO_DATE(PLANDELMON, 'Month YYYY')
     `)
        let resp = result.rows.map(po => ({
            month: po[0]
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

export async function getCompCodeData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const sql =
            `
        SELECT A.COMPCODE FROM MONTHLYPAYFRQ A group by A.COMPCODE`
        console.log(sql, '84');
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            com: po[0]
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

