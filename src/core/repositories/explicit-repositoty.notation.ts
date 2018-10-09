import { GenericConverter } from "../converters/generic-converter";
import { Constructor, IRepositoryConfiguration, customGetFunctionFactory, functionCustomCreateFunctionFactory } from "./repositoy.notation";
import { GenericDao } from "../mysql/generic.dao";

export function ExpRepository(table: string, configuration?: IRepositoryConfiguration) {
    return <T extends Constructor>(C: T) => {

        class E extends C {

            public converter = new GenericConverter(configuration.converterProps);
            public table = table;

            constructor(...args) {
                super(args);
                this.build()
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

                configuration.getters.forEach((getter) => {
                    const methodName = `get${configuration.resourceName}by${getter}`;
                    //generate getters functions
                    this[methodName] = customGetFunctionFactory(this, table, getter);

                });

                //check if this repository will be able to create the resource,
                if (configuration.create) {
                    const createMethodName: string = `create${configuration.resourceName}`;
                    //generate a create function for the resource
                    this[createMethodName] = functionCustomCreateFunctionFactory(this['converter'], table,
                        configuration.create, this)

                }
            }

        }

        return E
    }
}
