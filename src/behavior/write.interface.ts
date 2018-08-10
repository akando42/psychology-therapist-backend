export interface IWrite<J> {
    /**
     * it will create a new obj
     * @param J its the model from database 
     */
    create(newObj: J): Promise<string>

    /**
     * delete a  (logical delete)
     */
    delete(id: string): Promise<{ id: string, success: boolean }>

    /**
     * 
     * @param update 
     */
    update(id: string, model: J): Promise<boolean>


}
