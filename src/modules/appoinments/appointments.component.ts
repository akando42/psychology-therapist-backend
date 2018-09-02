import { IAppointmentsService } from "./appointments.service";
import { TODResponse } from "../../dto/tod-response";
import { IAppointment } from "../../models/appointment";
import { IAppointmentNotificationService } from "./appointment-notifications.service";


export abstract class AbstractAppointmentComponent {
    constructor(
        private _appointmentService: IAppointmentsService,
        private _notificationService?: IAppointmentNotificationService) {
    }

    programateAppointment(appointment: IAppointment): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const appointmentCreated: IAppointment = await this._appointmentService.createAppoinment(appointment);

                /**
                 * notify if we have a service for it.
                 */
                if (this._notificationService) {
                    this._notificationService.notifyPatient(appointmentCreated);

                    this._notificationService.notifyProvider(appointmentCreated);
                }

                const result: TODResponse = {
                    message: "appointment created",
                    payload: appointmentCreated,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: "Sorry! something went wrong creating the appointment",
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult)
            }
        })
    }

}