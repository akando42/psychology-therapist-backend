export class ServiceException {
	constructor(public message: string, public code: any, public trace?: string) { }
}