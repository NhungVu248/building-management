import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Table, Button, Container } from 'react-bootstrap';

export default function Index({ apartments }) {
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa căn hộ này?')) {
      router.delete(`/apartments/${id}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">🏢 Quản lý Căn hộ</h2>
      <Link href="/apartments/create" className="btn btn-primary mb-3">
        ➕ Thêm Căn hộ
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="table-dark text-center">
            <th>Mã</th>
            <th>Chủ hộ</th>
            <th>Tầng</th>
            <th>Diện tích (m²)</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((a) => (
            <tr key={a.id} className="text-center">
              <td>{a.code}</td>
              <td>{a.owner_name}</td>
              <td>{a.floor}</td>
              <td>{a.area}</td>
              <td>{a.status}</td>
              <td>
                <Link
                  href={`/apartments/${a.id}/edit`}
                  className="btn btn-warning btn-sm me-2"
                >
                  ✏️ Sửa
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(a.id)}
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
