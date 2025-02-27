import Link from 'next/link';

type friendType = {
  id: string;
  email: string;
};

export default function Friends({ friends, id }: any) {
  const filteredFriends = friends
    .map((friend: any) => {
      if (friend.requester_id !== id) {
        return { id: friend.requester.id, email: friend.requester.email };
      }
      if (friend.recipient_id !== id) {
        return { id: friend.recipient.id, email: friend.recipient.email };
      }
      return null;
    })
    .filter((friend: any) => friend !== null);

  return (
    <div>
      <h1> Friends </h1>
      <div className="flex flex-col gap-5">
        {filteredFriends.map((data: friendType) => {
          return (
            <div key={data.id} className="border border-black rounded-xl px-3 py-2 flex gap-2">
              <Link href={`/secret/${data.id}`}>
                <h1>{data.email}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
