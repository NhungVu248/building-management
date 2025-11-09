import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Container, Table, Button, Badge } from 'react-bootstrap';

export default function Index({ bookings }) {
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn hủy booking này không?')) {
      router.delete(`/bookings/${id}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">🗓️ Quản lý Booking Tiện ích</h2>

      <Link href="/bookings/create" className="btn btn-primary mb-3">
        ➕ Tạo Booking mới
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="table-dark text-center">
            <th>Tiện ích</th>
            <th>Cư dân</th>
            <th>Căn hộ</th>
            <th>Ngày</th>
            <th>Giờ bắt đầu</th>
            <th>Giờ kết thúc</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookings.data?.map((b) => (
            <tr key={b.id} className="text-center">
              <td>{b.amenity?.name}</td>
              <td>{b.resident?.name}</td>
              <td>{b.resident?.apartment?.code}</td>
              <td>{b.booking_date}</td>
              <td>{b.start_time}</td>
              <td>{b.end_time}</td>
              <td>
                <Badge bg={b.status === 'Đã xác nhận' ? 'success' : 'secondary'}>
                  {b.status}
                </Badge>
              </td>
              <td>
                <Link
                  href={`/bookings/${b.id}/edit`}
                  className="btn btn-warning btn-sm me-2"
                >
                  ✏️ Sửa
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(b.id)}
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
