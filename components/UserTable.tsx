import { User } from "@/types";

type Props = {
  users: User[];
};

export const UserTable = ({ users }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border shadow-sm">
      <table className="min-w-full text-sm bg-white dark:bg-black border-collapse">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">About</th>
            <th className="text-left px-4 py-3">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={`${user.username}-${index}`}
                className="even:bg-gray-50 dark:even:bg-gray-900 border-t"
              >
                <td className="px-4 py-2 font-medium">{user.username}</td>
                <td className="px-4 py-2 max-w-xs truncate text-muted-foreground">
                  {user.about ?? "—"}
                </td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {new Date(user.updated_at).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-6 text-center text-muted-foreground"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
