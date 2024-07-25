import * as bcrypt from 'bcrypt';

export async function hashPassword(rawText: string): Promise<string> {
  const hashedText = await bcrypt.hash(rawText, 10);

  return hashedText;
}
