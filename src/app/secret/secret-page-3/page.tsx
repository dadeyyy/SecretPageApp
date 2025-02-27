import SecretMessage from '@/components/secret';
import ChangeSecret from '@/components/ChangeSecret';
import FriendRequest from './FriendRequest';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SupabaseClient } from '@supabase/supabase-js';
import Friends from './Friends';
import NonFriends from './NotFriends';

async function friendRequestQuery(supabase: SupabaseClient<any, 'public', any>, id: string) {
  const { data, error } = await supabase
    .from('friends')
    .select(
      `
   id, 
   created_at, 
   status, 
   requester_id, 
   recipient_id, 
   requester:profiles!friends_requester_id_fkey1(id, email), 
   recipient:profiles!friends_recipient_id_fkey1(id, email)
 `
    )
    .eq('recipient_id', id);

  if (error) {
    console.log(error);
    redirect('/error');
  }
  return data;
}

async function findFriendsQuery(supabase: SupabaseClient<any, 'public', any>, id: string) {
  const { data: fetchFriends, error: fetchFriendsError } = await supabase
    .from('friends')
    .select(
      `
        id, 
        created_at, 
        status, 
        requester_id, 
        recipient_id, 
        requester:profiles!friends_requester_id_fkey1(id, email), 
        recipient:profiles!friends_recipient_id_fkey1(id, email)
      `
    )
    .or(`requester_id.eq.${id},recipient_id.eq.${id}`)
    .eq('status', 'friends');
  if (fetchFriendsError) {
    console.log(fetchFriendsError);
    redirect('/error');
  }
  return fetchFriends;
}

async function fetchNonFriends(supabase: SupabaseClient<any, 'public', any>, id: string) {
  // Fetch all users
  const { data: allUsers, error } = await supabase.from('profiles').select('id, email');
  if (error) {
    console.log('Error fetching users:', error);
    return;
  }

  // Fetch friends (users with status 'friends')
  const { data: fetchFriends, error: fetchFriendsError } = await supabase
    .from('friends')
    .select('requester_id, recipient_id')
    .eq('status', 'friends');

  if (fetchFriendsError) {
    console.log('Error fetching friends:', fetchFriendsError);
    return;
  }

  // Fetch pending requests where the current user is the requester
  const { data: pendingRequests, error: pendingRequestsError } = await supabase
    .from('friends')
    .select('recipient_id')
    .eq('requester_id', id)
    .eq('status', 'pending');

  if (pendingRequestsError) {
    console.log('Error fetching pending requests:', pendingRequestsError);
    return;
  }

  // Filter out users who are either friends or the current user
  const nonFriends = allUsers
    .filter((user) => {
      if (user.id === id) return false;
      return !fetchFriends.some(
        (friend) =>
          (friend.requester_id === user.id || friend.recipient_id === user.id) &&
          (friend.requester_id === id || friend.recipient_id === id)
      );
    })
    .map((user) => ({
      ...user,
      requestSent: pendingRequests.some((req) => req.recipient_id === user.id), // Check for request
    }));

  return nonFriends;
}

export default async function SecretPage3() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect('/error');
  }

  const userId = data.user.id;

  const [secretResult, friendRequest, fetchFriends, nonFriends] = await Promise.all([
    supabase.from('secrets').select().eq('user_id', userId),
    friendRequestQuery(supabase, userId),
    findFriendsQuery(supabase, userId),
    fetchNonFriends(supabase, userId),
  ]);

  if (!secretResult.data || secretResult.error) {
    redirect('/error');
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div>
        <SecretMessage secret_message={secretResult.data[0]?.secret_message} />
        <ChangeSecret />
      </div>

      <div className="max-w-full flex justify-between gap-10">
        <FriendRequest friendRequest={friendRequest} />
        <Friends friends={fetchFriends} id={userId} />
        <NonFriends notFriends={nonFriends!} id={userId} />
      </div>
    </div>
  );
}
