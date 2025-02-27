import { replaceSecret } from '@/app/actions/secret';

export default function ChangeSecret() {
  return (
    <form className="flex flex-col gap-5" action={replaceSecret}>
      <div>
        <input
          className="mt-1 rounded-lg border border-black p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
          id="secret"
          name="secret"
          type="secret"
          required
        />
      </div>
      <button
        className="bg-gray-500 text-white py-2 px-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-blue-300"
        type="submit"
      >
        Replace secret
      </button>
    </form>
  );
}
