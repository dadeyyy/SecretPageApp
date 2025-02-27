import { createClient } from '@/utils/supabase/server';
import { supabase } from '@/utils/supabase/auth_admin';
import { redirect } from 'next/navigation';
import FriendRequestIndividual from './FriendRequestIndividual';

export type FriendsType = {
  id: string;
  created_at: string;
  status: string;
  requester_id: string;
  recipient_id: string;
  requester: { id: string; email: string };
  recipient: { id: string; email: string };
};

export default async function FriendRequest({ friendRequest }: any) {
  return (
    <div>
      <h1> Friend Request: </h1>
      <div className='flex flex-col gap-5'>
        {friendRequest.map((data: FriendsType) => {
          if (data.status === 'pending') {
            return <FriendRequestIndividual key={data.id} requester={data.requester} recipient={data.recipient} />;
          }
        })}
      </div>
    </div>
  );
}
