'use client';

import { useState } from 'react';
import Link from 'next/link';

export type NonFriendsType = {
  notFriends: {
    id: string;
    email: string;
    requestSent: boolean;
  }[];
  id: string;
};

export default function NonFriends({ notFriends, id }: NonFriendsType) {
  const [sendRequest, setSendRequest] = useState(false);

  async function handleFriendRequest(recipient_id: string, requester_id: string) {
    try {
      const req = await fetch('/api/sendFriendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient_id, requester_id }),
      });
      if (req.ok) {
        setSendRequest(true);
      } else {
        console.error('Failed to accept request');
      }
      location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  function handleClickNotFriends() {
    console.log('Not friends!');
  }

  return (
    <div>
      <h1>Not friends</h1>
      <div className="flex flex-col gap-5">
        {notFriends.map((data) => {
          return (
            <div
              onClick={handleClickNotFriends}
              key={data.id}
              className="border border-black rounded-xl px-3 py-2 flex gap-2"
            >
              <Link href={`/secret/${data.id}/NotFriends`}>
                <p className="">{data.email}</p>
              </Link>
              <button
                disabled={data.requestSent ? true : false}
                className={`bg-blue-500 px-2 py-1 text-white rounded-lg ${
                  data.requestSent
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                onClick={() => handleFriendRequest(data.id, id)}
              >
                {data.requestSent ? 'Sent' : 'Add'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
