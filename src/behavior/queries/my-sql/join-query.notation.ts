
/**
 * A query notation for multiple joins statements with the simple format of 
 * "SELECT FROM <MAIN_TABLE> <COLS> [JOINS] WHERE <[CONDITION]>"
 * @param searchParam 
 * @param joins 
 * @param relations 
 */
export function JoinQuery(searchParam, joins: Join[], relations?: { from: number, to: number }[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            //get tabla from repository. (class owner of the method using the directive).
            let table: string = target.table

            //create the condition a simple 'WHERE'
            let condition = `WHERE `;
            Object.keys(searchParam).forEach(
                (key, i) => {
                    condition += `${table}.${key} = ${args[0][searchParam[key]]} `
                })

            //query creation   
            const query = createQuery(table, joins, condition)
            //passing query object (string), to the repository with DAO    
            let r = target.query(query)

            return r;


        };
        return descriptor;
    };
}



function createQuery(main, joins: Join[], condition: string): string {

    let cols = '';
    let joinsq = ``;

    //make joins string
    //and also get wich columns use, it use the table prefix for avoid
    //ambiguos cells.
    joins.forEach((join, i) => {
        if (i == joins.length - 1) {
            cols += join.getColumns();
            joinsq += `JOIN ${join.table} ON ${join.altJoin || main}.${join.join} = ${join.table}.${join.join} `;
        } else {
            cols += join.getColumns() + ','
            joinsq += `JOIN ${join.table} ON ${join.altJoin || main}.${join.join} = ${join.table}.${join.join} `;
        }
    });


    //boostrap the query
    let query = `SELECT ${cols} from ${main} ${joinsq} `;
    //if there its a contition it will add it.
    if (condition) {
        query += condition;
    }
    return query;
}

export class Join {
    constructor(public table, public join, private props: string[], public altJoin?: string) { }

    /**
     * Return the cols prefixed with the table name.
     */
    getColumns(): string {
        let q = ''
        this.props.forEach((col, i) => {
            if (i == this.props.length - 1) {
                q += `${this.table}.${col} `
            } else {
                q += `${this.table}.${col}, `
            }
        });
        return q
    }
}