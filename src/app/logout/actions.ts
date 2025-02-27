'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase as supabaseAdmin } from '@/utils/supabase/auth_admin';

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function deleteAccount() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    redirect('/error');
  }
  const deleteUser = await supabaseAdmin.auth.admin.deleteUser(data.user.id);
  if (deleteUser.error) {
    console.log(deleteUser.error);
  } else {
    revalidatePath('/', 'layout');
    redirect('/login');
  }
}
