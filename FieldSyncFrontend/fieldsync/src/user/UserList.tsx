import { User } from './User';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th key="userId">Id</th>
          <th key="userName">Name</th>
          <th key="userEmail">Email</th>
          <th key="userPhone">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}