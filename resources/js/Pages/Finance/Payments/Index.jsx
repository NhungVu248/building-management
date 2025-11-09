import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, Button } from 'react-bootstrap';

export default function PaymentsIndex({ payments }) {
  const { delete: destroy } = useForm();

  return (
    <div className="container mt-4">
      <h3>💳 Quản lý thanh toán</h3>
      <Link href={route('payments.create')}>
        <Button variant="primary" className="mb-3">+ Thêm thanh toán</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Người nộp</th>
            <th>Số tiền</th>
            <th>Phương thức</th>
            <th>Ngày thanh toán</th>
            <th>Hóa đơn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.payer_name || '—'}</td>
              <td>{p.amount}</td>
              <td>{p.method}</td>
              <td>{p.payment_date}</td>
              <td>{p.invoice?.apartment_no || '—'}</td>
              <td>
                <Link href={route('payments.edit', p.id)}>
                  <Button variant="warning" size="sm">Sửa</Button>
                </Link>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => destroy(route('payments.destroy', p.id))}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
