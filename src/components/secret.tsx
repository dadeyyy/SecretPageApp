import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SecretMessage({ secret_message }: { secret_message: string }) {
  return (
    <h1 className="text-xl">
      Secret: <b>{secret_message}</b>
    </h1>
  );
}
