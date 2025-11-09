import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Table, Button, Container, Badge } from 'react-bootstrap';

export default function Index({ amenities }) {
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa tiện ích này?')) {
      router.delete(`/amenities/${id}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">🏊‍♂️ Quản lý Tiện ích Cộng đồng</h2>

      <Link href="/amenities/create" className="btn btn-primary mb-3">
        ➕ Thêm Tiện ích
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="table-dark text-center">
            <th>Tên tiện ích</th>
            <th>Mô tả</th>
            <th>Công suất</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {amenities.data && amenities.data.length > 0 ? (
            amenities.data.map((a) => (
              <tr key={a.id} className="text-center align-middle">
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td>{a.capacity}</td>
                <td>
                  <Badge bg={a.is_active ? 'success' : 'secondary'}>
                    {a.is_active ? 'Đang hoạt động' : 'Tạm dừng'}
                  </Badge>
                </td>
                <td>
                  <Link
                    href={`/amenities/${a.id}/edit`}
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
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không có tiện ích nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
