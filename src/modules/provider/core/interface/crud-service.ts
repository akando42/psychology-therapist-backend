export interface CrudService<T> {

	save(entity: T): Promise<T>;

	delete(id: number): Promise<T>;

	findOne(query: any): Promise<T>;

	findAll(): Promise<T[]>;

}