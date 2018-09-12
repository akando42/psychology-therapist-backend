import { IAccount } from "../../../../models/account";
import { IAccountsService } from "./accounts.service.interface";
import { AbstractAccountsRepository } from "../../dao/repositories/accounts.repository";
import { MySqlAccountsRepositoryInstance } from "../../dao/my-sql/repositories/my-sql-accounts.repository";
import { IResetPasswordRequest } from "../../../../models/reset-password-request";
import { AbstractResetPasswordRequestRepository } from "../../dao/repositories/reset-passwod-request.repositoty.interface";
import { generateResetToken } from "../../utils/generate-reset-token.func";
import { AccountStatusEnum } from "../../../../enums/account-stats.enum";
import { MySqlResetPasswordRequestRepositoryInstance } from "../../dao/my-sql/repositories/my-sql-reset-password-request.repository";
import { InvalidCredentialsError } from "../../../../errors/invalid-credentials.error";
import { UnverifiedAccountError } from "../../../../errors/unverfied-account.error";


export class AccountsServiceImpl implements IAccountsService {

    constructor(
        private _accountsRepository: AbstractAccountsRepository,
        private _resetRequestRepository: AbstractResetPasswordRequestRepository) { }

    generatePasswordReset(email): Promise<IResetPasswordRequest> {
        return new Promise<IResetPasswordRequest>(async (resolve, reject) => {
            try {
                const account: IAccount = await this._accountsRepository.getByEmail(email);
                //account not registered
                if (!account.accountId) {
                    return resolve(null);
                }
                const resetToken: string = generateResetToken(account);
                //save new password
                const request: IResetPasswordRequest = await this._resetRequestRepository
                    .create({
                        requestToken: resetToken,
                        expired: false,
                        requestDate: new Date().getTime(),
                        requestEmail: email
                    });

                //block account     
                account.accountStatus = AccountStatusEnum.blocked;
                this._accountsRepository.updateAccount(account.accountId, account);
                return resolve(request);
            } catch (error) {
                return reject(error);
            }
        });
    }


    authenticate(credentials: { password: string; email: string; }): Promise<IAccount> {
        return new Promise<IAccount>(async (resolve, reject) => {
            try {
                if (!credentials.email || !credentials.password) {
                    return reject({ message: 'no credentials provided' });
                }

                const account: IAccount = await this._accountsRepository.getByEmail(credentials.email);
                //not match account
                if (!account) { return reject(new InvalidCredentialsError()); }
                //unverified account
                if (!account.emailVerified) { return reject(new UnverifiedAccountError()); }

                // const itsMatch: boolean = await bc.compare(credentials.password, account.password);

                // if (!itsMatch) {
                //     return reject({ auth: false, message: 'invalid credentials', token: null, userAccount: null });
                // }

                account.password = undefined;
                account.verificationHash = undefined;


                return resolve(account);

            } catch (error) {
                return reject(error);
            }
        })
    }


    getResetRequestByToken(token: string): Promise<IResetPasswordRequest> {
        throw new Error("Method not implemented.");
    }

    updateAccount(accountId: number, account: IAccount): Promise<IAccount> {
        throw new Error("Method not implemented.");
    }
    createAccount(account: IAccount): Promise<IAccount> {
        return this._accountsRepository.create(account);
    }

    getByEmail(email: string): Promise<IAccount> {
        return this._accountsRepository.getByEmail(email);
    }

    verifyAccountEmail(verificationToken: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                if (!verificationToken) {
                    return reject({ message: 'no email or hascode provided!' })
                }
                // const itMatch = bc.
                const account: IAccount = await this._accountsRepository.getByValidationHash(verificationToken);
                //verify hashed code;
                if (account.verificationHash === verificationToken) {
                    account.emailVerified = true;
                }

                // console.log('account from service', account.accountId)
                const updated = await this.updateAccount(account.accountId, account);
                return resolve({ message: 'verification success' });

            } catch (error) {
                return reject(error);
            }
        });
    }

    getById(id: string): Promise<IAccount> {
        return this._accountsRepository.getById(id);
    }
}


