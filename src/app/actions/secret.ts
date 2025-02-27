'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function replaceSecret(formData: FormData) {
  try {
    const supabase = await createClient();

    // Get the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user?.id) {
      console.error('User not authenticated or error getting user:', userError);
      redirect('/error');
    }

    const secret = formData.get('secret') as string;
    console.log(secret);
    console.log(userData.user.id);
    if (!secret) {
      console.error('No secret provided');
      redirect('/error');
    }

    const { data: updateData, error: updateError } = await supabase
      .from('secrets')
      .update({ secret_message: secret })
      .eq('user_id', userData.user.id)
      .select();

    if (updateError) {
      console.log('Error updating secret:', updateError);
    //   redirect('/error');
    }

    console.log('Updated secret data:', updateData);

    // Revalidate the path after successful update (for SSR or static revalidation)
    revalidatePath('/secret/secret-page-1');
  } catch (e) {
    console.log('E', e);
  }
}
