
export interface IRead<J> {


    /**
    * return the  that match the id
    */
    getBy(query: any): Promise<J>

    /**
     * get all  by the query pass it to it.
     */
    getAllBy(query: any): Promise<J[]>;

    

}
