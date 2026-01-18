import { useState } from 'react';
import users from './users.json';

const columns = [
  { label : 'ID', key: 'id' },
  { label : 'Name' , key: 'name' },
  { label : 'Email', key: 'email' },
  { label : 'Occupation', key: 'occupation' },
];

const PaginateUsers = (usersList, page, pageSize) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageUsers = usersList.slice(start, end);
  const totalPages = Math.ceil(usersList.length / pageSize);
  return { pageUsers, totalPages };
}

const DataTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { pageUsers, totalPages } = PaginateUsers(users, page, pageSize);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 15].map((size) => (
            <option
              key={size}
              value={size}
            >
              {size}
            </option>
          ))}
        </select>
        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default DataTable;
