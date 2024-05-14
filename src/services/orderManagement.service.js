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
             WHERE B.status = 'Completed' AND B.FINYR = '23-24'
             GROUP BY B.FINYR) AS ShipDone,
             (SELECT COUNT(C.ORDERNO) 
             FROM MISORDSALESVAL C 
             WHERE C.status = 'In Hand' AND C.FINYR =  '23-24'
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