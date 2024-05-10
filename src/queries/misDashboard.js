export async function getTurnOver(connection, type = "YEAR") {
    let result;
    if (type === "YEAR") {
        result = await connection.execute(`
        select 
COALESCE(ROUND(prevValue),0) as prevValue,
COALESCE(ROUND(currentValue),0) as currentValue
from (
select 
(select sum(actsalval) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)) as currentValue,
(select sum(actsalval) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -12) )) as prevValue
from dual) a
     `)
    } else if (type === "MONTH") {
        result = await connection.execute(`
        select 
COALESCE(ROUND(prevValue),0) as prevValue,
COALESCE(ROUND(currentValue),0) as currentValue
from (
select 
(select sum(actsalval) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)
    and extract(MONTH from bpodate) = extract(MONTH from CURRENT_DATE)
) as currentValue,
(select sum(actsalval) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -1))
    and extract(MONTH from bpodate) = extract(MONTH from ADD_MONTHS(CURRENT_DATE, -1))
) as prevValue
from dual)
     `)
    }
    result = result.rows.map(row => ({
        prevValue: row[1], currentValue: row[0]

    }))
    return result[0]
}

export async function getProfit(connection, type = "YEAR") {
    let result;
    if (type === "YEAR") {
        result = await connection.execute(`
        select 
        COALESCE(ROUND(prevValue),0) as prevValue,
        COALESCE(ROUND(currentValue),0) as currentValue
from (
select 
(select sum(actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)
) as currentValue,
(select sum(actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -12) )) as prevValue
from dual) a
     `)
    } else if (type === "MONTH") {
        result = await connection.execute(`
        select 
        COALESCE(ROUND(prevValue),0) as prevValue,
        COALESCE(ROUND(currentValue),0) as currentValue
from (
select 
(select sum(actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)
and extract(MONTH from bpodate) = extract(MONTH from CURRENT_DATE)
) as currentValue,
(select sum(actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -1) )
and extract(MONTH from bpodate) = extract(MONTH from ADD_MONTHS(CURRENT_DATE, -1))
) as prevValue
from dual) a
     `)
    }
    result = result.rows.map(row => ({
        prevValue: row[0], currentValue: row[1]

    }))
    return result[0]
}

export async function getNewCustomers(connection, type = "YEAR") {
    let result;
    if (type === "YEAR") {
        result = await connection.execute(`
        select 
        COALESCE(ROUND(prevValue),0) as prevValue,
        COALESCE(ROUND(currentValue),0) as currentValue
        from (
        select 
        (select sum(actsalval) 
        from MISORDSALESVAL
        where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)
        and extract(YEAR from CUSCRDT) = extract(YEAR from CURRENT_DATE)
        ) as currentValue,
        (select sum(actsalval) 
        from MISORDSALESVAL
        where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -12) )
        and extract(YEAR from CUSCRDT) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -12))
        ) as prevValue
        from dual) a
     `)
    } else if (type === "MONTH") {
        result = await connection.execute(`
        select 
        COALESCE(ROUND(prevValue),0) as prevValue,
        COALESCE(ROUND(currentValue),0) as currentValue
        from (
        select 
        (select sum(actsalval) 
        from MISORDSALESVAL
        where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)
        and extract(MONTH from bpodate) = extract(MONTH from CURRENT_DATE)
        and extract(YEAR from CUSCRDT) = extract(YEAR from CURRENT_DATE)
         and extract(MONTH from CUSCRDT) = extract(MONTH from CURRENT_DATE)
        ) as currentValue,
        (select sum(actsalval) 
        from MISORDSALESVAL
        where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -1) )
        and extract(MONTH from bpodate) = extract(MONTH from ADD_MONTHS(CURRENT_DATE, -1))
        and extract(YEAR from CUSCRDT) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -1))
         and extract(MONTH from CUSCRDT) = extract(MONTH from ADD_MONTHS(CURRENT_DATE, -1))
        ) as prevValue
        from dual) a
     `)
    }
    result = result.rows.map(row => ({
        prevValue: row[1], currentValue: row[0]

    }))
    return result[0]
}
export async function getTopCustomers(connection, type = "YEAR") {
    let result;
    if (type === "YEAR") {
        result = await connection.execute(`
        select 
(
select round(sum(turnover)) 
from (
select customer, coalesce(sum(actsalval),0) as turnover
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)
group by customer order by turnover desc
)
where rownum <= 5
) as currentValue,
(select round(sum(turnover)) 
from (
select customer, coalesce(sum(actsalval),0) as turnover
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -12))
group by customer order by turnover desc
)
where rownum <= 5
) as prevValue
from dual
     `)
    } else if (type === "MONTH") {
        result = await connection.execute(`
        select 
        (
        select round(sum(turnover)) 
        from (
        select customer, coalesce(sum(actsalval),0) as turnover
        from MISORDSALESVAL
        where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE)
        and extract(MONTH from bpodate) = extract(MONTH from CURRENT_DATE)
        group by customer order by turnover desc
        )
        where rownum <= 5
        ) as currentValue,
        (select round(sum(turnover)) 
        from (
        select customer, coalesce(sum(actsalval),0) as turnover
        from MISORDSALESVAL
        where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -1))
          and extract(MONTH from bpodate) = extract(MONTH from ADD_MONTHS(CURRENT_DATE, -1))
        group by customer order by turnover desc
        )
        where rownum <= 5
        ) as prevValue
        from dual
     `)

    }
    result = result.rows.map(row => ({
        prevValue: row[1], currentValue: row[0]
    }))
    return result[0]
}

export async function getLoss(connection, type = "YEAR") {
    let result;
    if (type === "YEAR") {
        result = await connection.execute(`
        select 
        COALESCE(ROUND(prevValue),0) as prevValue,
        COALESCE(ROUND(currentValue),0) as currentValue
from (
select 
(select sum(0 - actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE) and actprofit < 0) as currentValue  ,
(select sum(0 - actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -12) ) and actprofit < 0) as prevValue
from dual) a
     `)
    } else if (type === "MONTH") {
        result = await connection.execute(`
        select 
        COALESCE(ROUND(prevValue),0) as prevValue,
        COALESCE(ROUND(currentValue),0) as currentValue
from (
select 
(select sum(0 - actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from CURRENT_DATE) 
and extract(MONTH from bpodate) = extract(MONTH from CURRENT_DATE)
and actprofit < 0) as currentValue  ,
(select sum(0 - actprofit) 
from MISORDSALESVAL
where extract(YEAR from bpodate) = extract(YEAR from ADD_MONTHS(CURRENT_DATE, -1) ) 
  and extract(MONTH from bpodate) = extract(MONTH from ADD_MONTHS(CURRENT_DATE, -1))
and actprofit < 0) as prevValue
from dual) a
     `)

    }
    result = result.rows.map(row => ({
        prevValue: row[1], currentValue: row[2]

    }))
    return result[0]
}