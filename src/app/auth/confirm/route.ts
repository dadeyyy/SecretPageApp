import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error && data.user) {
      //Check if secret for a user exists
      const { data: secretData, error: secretError } = await supabase
        .from('secrets')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      //First time login, create secret
      if (!secretData) {
        const { data: insertData, error: insertError } = await supabase
          .from('secrets')
          .insert({ user_id: data.user.id })
          .select();

        if (insertError) {
          console.error('Error adding first secret:', insertError);
        } else {
          console.log(insertData);
        }
      }

      redirect(next);
    }
  }
  redirect('/error');
}
