import SecretMessage from '@/components/secret';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SecretPage1() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const { data: secret, error: secretError } = await supabase.from('secrets').select().eq('user_id', data.user?.id);
  console.log(data);
  if (!secret || secretError) {
    redirect('/error');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <SecretMessage secret_message={secret[0].secret_message} />
    </div>
  );
}
