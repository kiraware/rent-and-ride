'use server'

import { generateRandomFilename } from '@/lib/helpers'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function createVehicleAction(
  currentState: any,
  formData: FormData,
): Promise<string> {
  // Get the data off the form
  const name = formData.get('name')
  const image = formData.get('image') as File
  const merk = formData.get('merk')
  const color = formData.get('color')
  const type = formData.get('type')
  const price = formData.get('price')

  const tempFileName = `${image.name}_${generateRandomFilename()}`
  const arrayBuffer = await image.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          public_id: tempFileName,
        },
        function (error, result) {
          if (error) {
            reject(error)
            return
          }
          resolve(result)
        },
      )
      .end(buffer)
  })

  // Send to our api route
  const res = await fetch(process.env.ROOT_URL + '/api/kendaraan', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      image: cloudinary.url(
        `${process.env.CLOUDINARY_FOLDER_NAME}/${tempFileName}`,
      ),
      merk,
      color,
      type,
      price,
    }),
  })

  const data = await res.json()

  // Redirect to home if success
  if (res.ok) {
    revalidatePath('/')
    redirect('/')
  } else {
    return data.error
  }
}

export async function editVehicleAction(
  currentState: any,
  formData: FormData,
): Promise<string> {
  // Get the data off the form
  const id = formData.get('id')
  const name = formData.get('name')
  const image = formData.get('image') as File
  const old_image = formData.get('old_image')
  const merk = formData.get('merk')
  const color = formData.get('color')
  const type = formData.get('type')
  const price = formData.get('price')

  let new_image = old_image
  if (image && image.size > 0) {
    const tempFileName = `${image.name}_${generateRandomFilename()}`
    const arrayBuffer = await image.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            public_id: tempFileName,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result)
          },
        )
        .end(buffer)
    })

    new_image = cloudinary.url(
      `${process.env.CLOUDINARY_FOLDER_NAME}/${tempFileName}`,
    )
  }

  // Send to our api route
  const res = await fetch(process.env.ROOT_URL + `/api/kendaraan`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      name,
      image: new_image,
      merk,
      color,
      type,
      price,
    }),
  })

  const data = await res.json()

  // Redirect to home if success
  if (res.ok) {
    revalidatePath('/')
    redirect('/')
  } else {
    return data.error
  }
}
