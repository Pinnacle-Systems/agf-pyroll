import { getConnection } from "../constants/db.connection.js";
import { IN_HAND } from "../constants/dbConstants.js";
import { getTopCustomers, getProfit, getTurnOver, getNewCustomers, getLoss } from "../queries/misDashboard.js";


export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const { type } = req.query
        const totalTurnOver = await getTurnOver(connection, type);
        const profit = await getProfit(connection, type);
        const newCustomers = await getNewCustomers(connection, type);
        const topCustomers = await getTopCustomers(connection, type);
        const loss = await getLoss(connection, type);
        return res.json({
            statusCode: 0, data: {
                totalTurnOver,
                profit,
                newCustomers,
                topCustomers,
                loss
            }
        })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getOrdersInHand(req, res) {
    const connection = await getConnection(res)
    try {
        let result = await connection.execute(`
        select customer, count(1)
        from MISORDSALESVAL 
        where status = '${IN_HAND}'
        group by customer
        `);
        result = result.rows.map(row => ({
            buyer: row[0], value: row[1]
        }))
        return res.json({
            statusCode: 0, data: result
        })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}





