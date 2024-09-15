import cron from 'node-cron';
import { EmailService } from '../services/email.service';
import { CaseModel } from '../../data/models/case.model';
import axios from 'axios';
import { envs } from '../../config/env.connetion';
import { generateCaseEmailTemplate } from '../template/email.template';

export const emailJobs = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async () => {
        try {
            const cases = await CaseModel.find({isSent: false});
            if(!cases.length) {
                console.log("NO HAY CASOS PENDIENTES POR NOTIFICAR");
                return;
            }

            console.log(`Procesando ${cases.length} cases.`)

            await Promise.all(
                cases.map(async (_case) => {
                    try {
                        const lng = _case.lng;
                        const lat = _case.lat;
            
                        const location = await axios
                            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address&access_token=${envs.MAPBOX_ACCESS_TOKEN}`)
                            .then(response => {
                                console.log(response.data);
                                return response.data;
                            })
                            .catch(error => {
                                console.error("Error fetching location:", error);
                                throw error;
                            });
            
                        let address = "Dirección no identificada";
            
                        if (location && location.features && location.features.length > 0) {
                            address = location.features[0].place_name || address;
                            console.log("Dirección completa:", address);
                        }
            
                        const htmlBody = generateCaseEmailTemplate(
                            _case.fullName!,
                            _case.genre!,
                            _case.age!.toString(),
                            _case.lat!,
                            _case.lng!,
                            address
                        );
            
                        await emailService.sendEmail({
                            to: "aknaib.13js@gmail.com",
                            subject: `Caso: ${_case.fullName}`,
                            htmlBody: htmlBody
                        });
            
                        const updateIncident = {
                            isSent: true
                        };
            
                        await CaseModel.findByIdAndUpdate(_case._id, updateIncident);
                        console.log("Se actualizó correctamente");
                    } catch (error) {
                        console.error("Error al procesar el caso:", error);
                    }
                })
            );
                        

        } catch (error) {
            console.error("Error durante el envio de correos");
        }
    });
}