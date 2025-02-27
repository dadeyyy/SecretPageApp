'use client';

import { useState } from 'react';

type Profile = {
  id: string;
  email: string;
};

type FriendRequestInvidualType = {
  requester: Profile;
  recipient: Profile;
};

export default function FriendRequestIndividual({ requester, recipient }: FriendRequestInvidualType) {
  const [accepted, setAccepted] = useState(false);

  async function handleAcceptClick(reqid: string, recid: string) {
    try {
      const req = await fetch('/api/acceptRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reqid, recid }),
      });

      if (req.ok) {
        setAccepted(true);
      } else {
        console.error('Failed to accept request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (accepted) {
    return <div className="text-green-500">Request Accepted!</div>;
  }

  return (
    <div className="border border-black rounded-xl px-3 py-2 flex gap-2">
      <h1>{requester.email}</h1>
      <button
        onClick={() => handleAcceptClick(requester.id, recipient.id)}
        className="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-white rounded-lg"
      >
        Accept
      </button>
    </div>
  );
}
