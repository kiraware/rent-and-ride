import prisma from '@/lib/prisma'
import { LoginSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import * as jose from 'jose'

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json()

  // Validate data
  const validatedFields = LoginSchema.safeParse(body)

  if (!validatedFields.success) {
    return Response.json(
      {
        error: 'Invalid email or password',
      },
      { status: 400 },
    )
  }

  // Read data off validated fields
  const { email, password } = validatedFields.data

  // Lookup the user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return Response.json(
      {
        error: 'Invalid email or password',
      },
      { status: 400 },
    )
  }

  // Compare password
  const isCorrectPassword = await bcrypt.compare(password, user.password)

  if (!isCorrectPassword) {
    return Response.json(
      {
        error: 'Invalid email or password',
      },
      { status: 400 },
    )
  }

  // Create jwt token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const alg = 'HS256'

  const jwt = await new jose.SignJWT({ name: user.name, isAdmin: user.isAdmin })
    .setProtectedHeader({ alg })
    .setExpirationTime('72h')
    .setSubject(user.id.toString())
    .sign(secret)

  // Respond with it
  return Response.json({ token: jwt })
}
