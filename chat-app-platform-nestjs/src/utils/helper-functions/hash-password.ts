import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const hashedText = await bcrypt.hash(password, 10);

  return hashedText;
}
