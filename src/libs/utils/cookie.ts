import { cookies } from 'next/headers';
import { decode, encode } from './crypto';

export const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  const encoded = encode(value);

  cookieStore.set(key, encoded, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
  });
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(key)?.value ?? '';
  return decode(cookieValue);
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
