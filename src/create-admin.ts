import { AuthenticationService } from "./modules/authentication/authentication.service";
import { UsersControllerInstance } from "./modules/users/users.controller";


export function CreateAdmin(): void {
        UsersControllerInstance.create({})
}