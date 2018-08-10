

export class Create {
    constructor() {
    }
    
    toDQuery(){
        return 'INSERT INTO ACCOUNTS SET ?'
    }
}