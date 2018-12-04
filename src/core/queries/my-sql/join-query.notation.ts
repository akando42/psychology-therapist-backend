
/**
 * A query notation for multiple joins statements with the simple format of 
 * "SELECT FROM <MAIN_TABLE> <COLS> [JOINS] WHERE <[CONDITION]>"
 * @param searchParam 
 * @param joins 
 * @param relations 
 */
export function JoinQuery(searchParam, joins: Join[], table?) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            //get tabla from repository. (class owner of the method using the directive).
            let t: string = target.table || table;

            //create the condition a simple 'WHERE'
            let condition = ` `;
            let params = Object.keys(searchParam);
            if (params.length > 0) {

                params.forEach(
                    (key, i) => {
                        switch (typeof args[0][searchParam[key]]) {
                            case 'string':
                                condition += `${t}.${key} = "${args[0][searchParam[key]]}"`;
                                break;
                            default:
                                condition += `${t}.${key} = ${args[0][searchParam[key]]}`;
                                break;
                        }


                    });
            }

            //query creation   
            const query = createQuery(t, joins, condition)
            console.log(query)
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
        query += 'where ' + condition;
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