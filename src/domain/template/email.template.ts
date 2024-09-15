import { envs } from "../../config/env.connetion";

export function generateCaseEmailTemplate(fullName: string, genre: number, age: string, lat: number, lng: number, fullAddress: string): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Caso</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f3e5f5;
                color: #4a4a4a;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 900px;
                margin: 40px auto;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                display: flex;
                flex-direction: row;
            }
            .header {
                background-color: #7e57c2;
                color: #fff;
                padding: 30px;
                text-align: center;
                width: 100%;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                letter-spacing: 1px;
            }
            .alert-title {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #6a1b9a;
                margin: 20px 0;
            }
            .content {
                padding: 25px;
                width: 60%;
                line-height: 1.6;
                background-color: #ede7f6;
            }
            .content p {
                margin: 15px 0;
                font-size: 16px;
            }
            .content p strong {
                color: #4a148c;
            }
            .map-container {
                width: 40%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #b39ddb;
            }
            .map-container img {
                max-width: 100%;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .footer {
                background-color: #d1c4e9;
                color: #6a1b9a;
                padding: 20px;
                text-align: center;
                font-size: 14px;
                width: 100%;
            }
            .footer p {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="alert-title">
            NUEVO CASO DETECTADO DE VIRUS DEL MONO
        </div>
        <div class="container">
            <div class="content">
                <p><strong>Nombre Completo:</strong> ${fullName}</p>
                <p><strong>Género:</strong> ${genre === 1 ? 'Masculino' : 'Femenino'}</p>
                <p><strong>Edad:</strong> ${age}</p>
                <p><strong>Latitud:</strong> ${lat}</p>
                <p><strong>Longitud:</strong> ${lng}</p>
                <p><strong>Dirección Completa:</strong> ${fullAddress ?? "Direccion no identificada"}</p>
            </div>
            <div class="map-container">
                <img src="${mapboxUrl}" alt="Mapa del incidente"/>
            </div>
        </div>
        <div class="footer">
            <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL= (lat:number, lng:number) =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const zoom = 20; // Nivel de zoom
    const width = 500; // Ancho de la imagen
    const height = 300; // Altura de la imagen
 
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}