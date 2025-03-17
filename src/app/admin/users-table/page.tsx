import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

const AdminUsersTable = async () => {
  let users: User[] = [];

  try {
    users = await prisma.user.findMany();
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return (
      <div>
        Error: Unable to fetch users. Please check your database connection.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Admin</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {user.isAdmin ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(user.createdAt).toDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                <Button variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
