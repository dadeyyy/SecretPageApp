import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { replaceSecret } from '@/app/actions/secret';
import SecretMessage from '@/components/secret';
import ChangeSecret from '@/components/ChangeSecret';

export default async function SecretPage2() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const { data: secret, error: secretError } = await supabase.from('secrets').select().eq('user_id', data.user?.id);
  if (!secret || secretError) {
    redirect('/error');
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <SecretMessage secret_message={secret[0].secret_message} />
      <ChangeSecret />
    </div>
  );
}
