import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Table, Button, Container } from 'react-bootstrap';

export default function Index({ staff }) {
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa nhân sự này không?')) {
      router.delete(`/staff/${id}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Quản lý nhân sự</h2>
      <Link href="/staff/create">
        <Button variant="primary" className="mb-3">+ Thêm nhân sự</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Chức vụ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.role}</td>
              <td>
                <Link href={`/staff/${s.id}/edit`}>
                  <Button variant="warning" size="sm">Sửa</Button>
                </Link>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(s.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
