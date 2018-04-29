"use strict"

import * as mysql from 'mysql';

export class MySqlDatabase
{
   private pool:mysql.IPool;
   
   public constructor(host:string,user:string,password:string,database:string,port:number)
   {
          this.pool=mysql.createPool({
            connectionLimit : 100, //important
            host     : host,
            user     : user,
            password : password,
            database : database,
            debug    :  false,
            port:port
          });
   }
   private processObject(element:any,connection:mysql.IConnection,uppercase:boolean = true):{columns:string[],values:string[]}
   {
       let result:{columns:string[],values:string[]}={columns:[],values:[]};
       for(let property in element)
       {
            result.columns.push((uppercase?property.toUpperCase():property));
            result.values.push((typeof element[property]!="undefined"&&element[property]!=null)?connection.escape(element[property].toString()):"''");
       }
       return result;
   }
   private getQueriesFromObject(element:any,connection:mysql.IConnection,uppercase:boolean = true,mysqlFunctions:any=[]):string[]
   {
       let result:string[]=[];
       for(let property in element)
       {
            let column=uppercase?property.toUpperCase():property;
            if(typeof mysqlFunctions[property]!="undefined"&&mysqlFunctions[property].length)
                column=(uppercase?mysqlFunctions[property].toUpperCase():mysqlFunctions[property])+'('+column+')';
            result.push(column+'='+connection.escape(element[property].toString()));
       }
       return result;
   }
   public async paginate(query:string,values:string[],page:number,pageSize:number,countQuery:string="",countQueryValues:string[]=[]):Promise<any>
   {
        return new Promise<any>((resolve,reject)=>
        {
            this.pool.getConnection((err,connection)=>{
                if (err) 
                    reject(err.code);
                else
                {
                    connection.on('error', (err:any)=> {
                        try
                        {
                            connection.destroy();     
                        }
                        catch(err)
                        {}
                        reject(err.code);    
                    });
                     let resultsQuery=countQuery?countQuery:`SELECT COUNT(*) AS results FROM (${query}) AS entries`;
                     
                     let resultsQueryValues=countQueryValues.length>0&&countQuery?countQueryValues:values;
                     connection.query(resultsQuery,resultsQueryValues,(err:any,count:any,fields:any)=>{
                        if(!err)
                        {
                            page=Math.floor(Math.min((parseInt(count[0]["results"])/pageSize+(parseInt(count[0]["results"])%pageSize>0?1:0))-1,page));
                            if(page<0)
                                page=0;
                           
                            connection.query(`${query} LIMIT ${page*pageSize},${pageSize}`,values,(err:any,results:any,fields:any)=>
                            {
                                connection.destroy();
                                if(!err)
                                    resolve({count:count[0]["results"],results:results,page:page});
                                else
                                    reject(err.code);

                            });
                        }                                                       
                        else
                        {
                            connection.destroy();
                            reject(err.code);
                        }
                            
                    });   

                }
            });
        });
   }
   public async getQueryResults(query:string,values:string[]):Promise<any>
   {
        return new Promise<boolean>((resolve,reject)=>
        {
            this.pool.getConnection((err,connection)=>{
                if (err) 
                    reject(err.code);
                else
                {
                    connection.on('error', (err:any)=>{ 
                        try
                        {
                            connection.destroy();     
                        }
                        catch(err)
                        {}
                        reject(err.code);    
                    });
                    
                    connection.query(query,values,(err:any,results:any,fields:any)=>{
                        connection.destroy();
                        if(!err)
                            resolve(results);                            
                        else
                            reject(err.code);
                            
                    });   

                }
            });
        });
   }
   public async query(table:string,selectors:any,columns:string[],query:string ="",uppercase:boolean = true,mysqlFunctions:any=[]):Promise<any>
   {
        return new Promise<boolean>((resolve,reject)=>
        {
            this.pool.getConnection((err,connection)=>{
                if (err) 
                    reject(err.code);
                else
                {
                    connection.on('error', (err:any)=> {  
                        try
                        {
                            connection.destroy();     
                        }
                        catch(err)
                        {}    
                        reject(err.code);    
                     });
                    let selectQuery="";
                    if(query.length>0)
                        selectQuery=query;
                    else
                    {
                        let selectorsQueries:string[]=this.getQueriesFromObject(selectors,connection,uppercase,mysqlFunctions);
                        selectQuery="SELECT "+columns.join(',')+" FROM "+(uppercase?table.toUpperCase():table)+((selectorsQueries.length)?" WHERE "+selectorsQueries.join(' AND '):"");
                    }
                    
                    connection.query(selectQuery,(err:any,results:any,fields:any)=>{
                        connection.destroy();
                        if(!err)
                            resolve(results);                            
                        else
                            reject(err.code);
                    });   

                }
            });
        });
   }
   public async update(table:string,element:any,selectors:any,uppercase:boolean = true):Promise<boolean>
   {
        return new Promise<boolean>((resolve,reject)=>
        {
            this.pool.getConnection((err,connection)=>{
                if (err) 
                    reject(err.code);
                else
                {
                    connection.on('error', (err:any)=> {  
                        try
                        {
                            connection.destroy();     
                        }
                        catch(err)
                        {}    
                        reject(err.code);   
                     });
                    let updateQueries:string[]=this.getQueriesFromObject(element,connection,uppercase);   
                    let selectorsQueries:string[]=this.getQueriesFromObject(selectors,connection,uppercase);
                   
                    connection.query("UPDATE "+(uppercase?table.toUpperCase():table)+" SET "+updateQueries.join(',')+" WHERE "+selectorsQueries.join(' AND '),(err:any,results:any,fields:any)=>{
                        connection.destroy();
                        if(!err)
                            resolve(results.affectedRows>0);                            
                        else
                            reject(err.code);
                    });   

                }
            });
        });
   }
   public async transaction(queries:{query:string,values:string[],result_id:string}[]):Promise<number>
   {
        return new Promise<number>((resolve,reject)=>
        {
            this.pool.getConnection((err,connection)=>{
                if (err) 
                    reject(err.code);
                else
                {
                    connection.on('error', (err:any)=> {  
                        try
                        {
                            connection.destroy();     
                        }
                        catch(err)
                        {}    
                        reject(err.code);    
                     });
                     connection.beginTransaction((err)=>
                     {
                         if(err)
                         {
                             connection.destroy();
                            reject(err);
                         }
                         else
                         {
                            let result:any;
                            let executedQueries:number=0;
                            for(let i=0;i<queries.length;i++)
                            {
                      
                                connection.query(queries[i].query,queries[i].values,(error:any, results:any, fields:any)=>
                                {
                                   if (error)
                                   {
                                        return connection.rollback(()=>
                                        {
                                           connection.destroy();
                                           reject(error);
                                        });
                                        
                                   } 
                                   else
                                   {
                                        executedQueries++;
                                        if(executedQueries==queries.length)
                                            connection.commit((err)=>{
                                                if (err) {
                                                return connection.rollback(()=> {
                                                    connection.destroy();
                                                    reject(err);
                                                });
                                                }
                                                else
                                                {
                                                    connection.destroy();
                                                    resolve(result);
                                                }
                                                
                                            });
                                   }
                                  
                                   
                                });
                                
                            }
                            
                         }
                         
                     });
                }
            });
        });
   }
   public async insert(table:string,element:any,uppercase:boolean = true, uniqueFields:string[]=[],idColumn:string = "",conditionalReturnsForExistingValues:{fieldName:string,fieldValue:string,returnValue:number}[]=[]):Promise<number>
   {
       return new Promise<number>((resolve,reject)=>
       {
            this.pool.getConnection((err:any,connection:any)=>{
            if (err) 
                reject(err.code);
            else
            {
                connection.on('error', (err:any)=> {  
                    try
                    {
                        connection.destroy();     
                    }
                    catch(err)
                    {}    
                    reject(err.code);    
                 });
                let processedElement:{columns:string[],values:string[]}=this.processObject(element,connection,uppercase);    
                
                let query:string = "INSERT INTO "+(uppercase?table.toUpperCase():table)+"("+processedElement.columns.join(',')+") VALUES("+processedElement.values.join(',')+")";

                if(uniqueFields.length>0 && idColumn.length>0)
                {
                    let fieldsToMatch:string[]=[];
                    for(var i=0;i<uniqueFields.length;i++)
                    {
                        fieldsToMatch.push((uppercase?uniqueFields[i].toUpperCase():uniqueFields[i])+'='+connection.escape(element[uniqueFields[i]].toLowerCase()));
                    }
                    let uniqueValidationColumns:string[]=[(uppercase?idColumn.toUpperCase():idColumn)];
                    for(var i=0;i< conditionalReturnsForExistingValues.length;i++)
                    {
                        uniqueValidationColumns.push(uppercase?conditionalReturnsForExistingValues[i].fieldName.toUpperCase():conditionalReturnsForExistingValues[i].fieldName);
                    }
                    let uniqueMatchQuery ="SELECT "+uniqueValidationColumns.join(',')+" FROM "+(uppercase?table.toUpperCase():table)+" WHERE "+fieldsToMatch.join(' AND ');
                    
                    connection.query(uniqueMatchQuery,(selectError:any,results:any,fields:any)=>{
                        if(!selectError&&results.length>0)
                        {
                            connection.destroy();
                            for(var i=0;i< conditionalReturnsForExistingValues.length;i++)
                            {
                                if(results[i][uppercase?conditionalReturnsForExistingValues[i].fieldName.toUpperCase():conditionalReturnsForExistingValues[i].fieldName]==conditionalReturnsForExistingValues[i].fieldValue)
                                {
                                    resolve(conditionalReturnsForExistingValues[i].returnValue);
                                    return;
                                }
                            }
                            resolve(results[0][uppercase?idColumn.toUpperCase():idColumn]);
                        }
                        else
                        {
                            
                            connection.query(query,(insertError:any,results:any,fields:any)=>{
                                connection.destroy();
                                if(!insertError)
                                    resolve(results.insertId); 
                                else
                                    reject(insertError.code);
                            });   
                        }
                    });   
                }
                else
                    connection.query(query,(err:any,results:any,fields:any)=>{
                        connection.destroy();
                        if(!err)
                            resolve(results.insertId); 
                        else
                            reject(err.code);
                    });   
            }
            
            
        });
       });
        
   }
}