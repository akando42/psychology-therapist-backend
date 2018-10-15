

export interface ISuperAdminRepository {
    
    getSuperAdminProfileByUserId(userId: any): Promise<any>;
}