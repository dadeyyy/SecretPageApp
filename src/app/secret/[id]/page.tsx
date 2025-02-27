import { supabase } from '@/utils/supabase/auth_admin';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const { data, error } = await supabase.auth.admin.getUserById(id);
  if (error) {
    redirect('/error');
  }
  const email = data.user?.email;
  const findSecret = await supabase.from('secrets').select('secret_message').eq('user_id', id);
  const secret = findSecret.data![0].secret_message;
  return (
    <div className="flex justify-center items-start flex-col h-full gap-5">
      <h1 className="font-bold text-2xl"> {email}</h1>
      <h1>
        <span className="font-bold text-xl">Secret: </span> <span className='text-md text-red-500 font-bold'>{secret}</span>
      </h1>
    </div>
  );
}
