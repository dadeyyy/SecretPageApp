import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from('friends')
    .insert({ requester_id: body.requester_id, recipient_id: body.recipient_id })
    .select();

  if (error) {
    redirect('/error');
  }

  console.log(data);

  return NextResponse.json({ message: 'Request sent!', success: true }, { status: 200 });
}
