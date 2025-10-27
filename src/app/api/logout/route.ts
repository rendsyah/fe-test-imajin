import { deleteSession } from '@/libs/utils/session';

export const GET = async () => {
  await deleteSession();
  return new Response(null, { status: 200 });
};
