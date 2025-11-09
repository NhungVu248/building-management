import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, Button, Container } from 'react-bootstrap';

export default function Index({ feeTypes }) {
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa loại phí này?')) {
      destroy(route('fee-types.destroy', id));
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">💰 Quản lý loại phí</h3>

      <Link href={route('fee-types.create')}>
        <Button variant="primary" className="mb-3">+ Thêm loại phí</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên loại phí</th>
            <th>Số tiền mặc định</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {feeTypes.map((ft) => (
            <tr key={ft.id}>
              <td>{ft.id}</td>
              <td>{ft.name}</td>
              <td>{ft.default_amount.toLocaleString()} VNĐ</td>
              <td>{ft.description ?? '-'}</td>
              <td>
                <Link href={route('fee-types.edit', ft.id)}>
                  <Button variant="warning" size="sm" className="me-2">Sửa</Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(ft.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
