import { getConnection } from "../constants/db.connection.js";
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





