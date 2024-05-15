import prisma from '@/lib/prisma'
import { SignupSchema } from '@/schemas'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  // Read body
  const body = await request.json()

  // Validate data
  const validatedFields = SignupSchema.safeParse(body)

  if (!validatedFields.success) {
    return Response.json(
      {
        error: 'Invalid email or password or name',
      },
      { status: 400 },
    )
  }

  // Read data off validated fields
  const { email, password, name } = validatedFields.data

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create a user in db
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  // return something
  return Response.json({})
}
