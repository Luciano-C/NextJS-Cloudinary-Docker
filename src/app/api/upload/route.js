import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(request) {
    
    const data = await request.formData();
    console.log(data.get('image'));
    const image = data.get('image')

    if (!image) {
        return NextResponse.json("No se ha subido ninguna imagen", { status: 400 })
    }

    // Convierte imagen en un buffer (espacio de memoria donde está el archivo). Sólamente son bytes, sin metadata
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Guardar en un archivo y subirlo
   /*  const filePath = path.join(process.cwd(), "public", image.name)
    console.log(filePath)
    await writeFile(filePath, buffer);

    const response = await cloudinary.uploader.upload(filePath, {
        folder: 'Tutorial_Subir_Archivos_Fazt'
    });
    console.log(response) */

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: 'Tutorial_Subir_Archivos_Fazt'
        }, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        }).end(buffer)
    })

    console.log(response)
    // Guardar en base de datos
    // Procesar image
    // etc


    return NextResponse.json({
        message: "imagen subida",
        url: response.secure_url
    })
}