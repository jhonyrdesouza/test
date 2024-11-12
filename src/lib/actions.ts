'use server'

// import { hash } from "bcryptjs";
import { redirect } from 'next/navigation'
import type { ResetPasswordFormData, SignUpFormData } from './types'

export async function createNewAccount(credentials: SignUpFormData) {
  const { email, password } = credentials
  console.log('email, password:', email, password)

  // const hashedPassword = await hash(password, 10);
  // console.log("hashedPassword:", hashedPassword);

  // const user = await db.query.users.findFirst({
  //   where: (u, { eq }) => eq(u.email, email),
  // });

  // if (user) {
  //   throw new Error('Email already exists, please try logging in');
  // }

  // await db.insert(users).values({ username: randomUUID(), email, password: hashedPassword });

  redirect('/')
}

export async function resetPassword(credentials: ResetPasswordFormData) {
  const { email, password, newPassword } = credentials
  console.log('email, password, newPassword:', email, password, newPassword)

  // const user = await db.query.users.findFirst({
  //   where: (u, { eq }) => eq(u.email, email),
  // });

  // if (!user) {
  //   throw new Error('User not found, please try signing up');
  // }

  // if (!user.password) {
  //   throw new Error('User does not have a password, you might have signed up with a social account');
  // }

  // const isPasswordValid = await compare(password, user.password);

  // if (!isPasswordValid) {
  //   throw new Error('Previous password is incorrect, please try again');
  // }

  // const hashedPassword = await hash(newPassword, 10);

  // await db.update(users).set({ password: hashedPassword }).where(eq(users.email, email));

  redirect('/login')
}
