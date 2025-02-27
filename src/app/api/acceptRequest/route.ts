import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const supabase = await createClient();
  const data = await req.json();
  console.log(data);
  //update status data

  try {
    const { data: updateData, error } = await supabase
      .from('friends')
      .update({ status: 'friends' })
      .eq('requester_id', data.reqid)
      .eq('recipient_id', data.recid)
      .select('*');

    if (error) {
      console.log(error);
      redirect('/error');
    }

    console.log('DATA', updateData);
    revalidatePath('/secret/secret-page-3')
    return Response.json({ success: true, message: 'Friend request accepted' }, { status: 200 });
  } catch (e) {
    console.log(e);
  }
}
