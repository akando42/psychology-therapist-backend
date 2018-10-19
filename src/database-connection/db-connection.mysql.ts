import * as mysql from 'mysql';


export class MySqlConnection {
    public static pool: mysql.Pool;

    static connect(options: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                console.log(options)
                MySqlConnection.pool = mysql.createPool(options);
                this.pool.getConnection((err, connection) => {
                    if (err)
                        console.log("Error:", err);
                    else {
                        console.log("Connection successfully....");
                        resolve()
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    }

}