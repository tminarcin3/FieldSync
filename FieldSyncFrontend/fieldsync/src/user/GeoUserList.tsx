import { GeoUser } from './GeoUser';

interface UserListProps {
  users: GeoUser[];
}

export default function GeoUserList({ users }: UserListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th key="userId">Id</th>
          <th key="userName">Name</th>
          <th key="userCompany">Company</th>
          <th key="userEmail">Email</th>
          <th key="userPhone">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.company.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}