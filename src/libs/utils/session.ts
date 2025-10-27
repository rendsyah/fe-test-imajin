import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';
import { App } from '../constants/app.const';
import type { Session } from '@/types/commons.types';

export const sessionOptions: SessionOptions = {
  cookieName: App.SESSION_NAME,
  password: App.SESSION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
  },
};

export const getSession = async () => {
  const session = await getIronSession<Session>(await cookies(), sessionOptions);
  const isLogin = session.isLogin;

  if (!isLogin) {
    session.isLogin = false;
  }

  return session;
};

export const setSession = async (token: string) => {
  const session = await getSession();
  session.token = token;
  session.isLogin = true;

  await session.save();

  return session;
};

export const deleteSession = async () => {
  const session = await getIronSession(await cookies(), sessionOptions);
  session.destroy();
};
