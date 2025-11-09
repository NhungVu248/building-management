import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Table, Button, Container, Badge } from 'react-bootstrap';

export default function Index({ residents }) {
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa cư dân này?')) {
      router.delete(`/residents/${id}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">👥 Quản lý Cư dân</h2>
      <Link href="/residents/create" className="btn btn-primary mb-3">
        ➕ Thêm cư dân
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="table-dark text-center">
            <th>Tên cư dân</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Căn hộ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {residents.data.map((r) => (
            <tr key={r.id} className="text-center">
              <td>{r.name}</td>
              <td>{r.phone}</td>
              <td>{r.email}</td>
              <td>{r.apartment?.code}</td>
              <td>
                <Badge
                  bg={
                    r.status === 'Đang ở'
                      ? 'success'
                      : r.status === 'Tạm vắng'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {r.status}
                </Badge>
              </td>
              <td>
                <Link
                  href={`/residents/${r.id}/edit`}
                  className="btn btn-warning btn-sm me-2"
                >
                  ✏️ Sửa
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(r.id)}
                >
                  🗑️ Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
