import { Constructor, functionCustomCreateFunctionFactory, customGetFunctionFactory, IRepositoryConfiguration, createFunctionFactory, updateFunctionFactory } from "./repositoy.notation";
import { GenericConverter } from "../converters/generic-converter";
import { GenericDao } from "../mysql/generic.dao";





export function ByNameRepository(table: string, configuration?: IRepositoryConfiguration) {
    return <T extends Constructor>(C: T) => {
        //compatibility with method directive
        C.prototype.query = async (q) => {
            return await GenericDao.QUERY(q);
        }

        class E extends C {

            public converter = new GenericConverter(configuration.converterProps);
            public table = table;
            constructor(...args) {
                super(args);

                this['query'] = C.prototype.query
                this.build();

            }

            async query(q) {
                return await GenericDao.QUERY(q);
            }

            async insert(q, data) {
                let result = await GenericDao.INSERT(q, data);
                return result;
            }

            /**
             * Method called on obj creation for extends its funcionality autmatically as a 
             * repository according to the configuration pass it to it.
             */
            build() {

                const method: string[] = Object.keys(C.prototype);

                method.forEach((methodName: string) => {
                    if (methodName.startsWith('c_')) { return; }

                    let methodVerb: string = methodName.split(/(?<=[a-z])(?=[A-Z])/)[0];
                    switch (methodVerb) {
                        case 'create':
                            // here goes the create
                            this[methodName] = createFunctionFactory(this['converter'], table,
                                configuration, this)
                            break;
                        case 'get':
                            let paramsStart: number = (methodName.indexOf('By'));
                            let params = [];
                            if (paramsStart >= 3) {
                                params = methodName
                                    .slice(paramsStart + 2)
                                    .split('And')
                                    .map((param) => configuration.converterProps[param[0].toLowerCase() + param.slice(1)]);
                            }

                            this[methodName] = customGetFunctionFactory(this, table, params);

                            break;
                        case 'update':
                        
                            this[methodName] = updateFunctionFactory(this['converter'], table,
                                configuration, this)
                            break;


                        default:
                            break;
                    }
                })

            }

        }

        return E
    }
}