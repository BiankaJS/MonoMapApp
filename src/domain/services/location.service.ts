import axios from 'axios';
import { envs } from '../../config/env.connetion';

interface LocationOptions {
    lat: string,
    lng: string
}

export class LocationService {
    async getLocation(options: LocationOptions) {
        try {
            const response = axios
            .get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${options.lng}&latitude=${options.lat}&access_token=${envs.MAPBOX_ACCESS_TOKEN}`)
            .then((response) => {
                console.log(response.data)
                return response
            })
            .catch((error) => {
                console.error(error);
            })
        } catch (error) {
            console.error(error);
        }
    }
}