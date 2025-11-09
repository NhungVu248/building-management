import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, Button, Badge } from 'react-bootstrap';

export default function Index({ invoices }) {
  const { delete: destroy } = useForm();

  const statusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'overdue': return 'danger';
      default: return 'warning';
    }
  };

  return (
    <div className="container mt-4">
      <h3>📄 Quản lý Hóa đơn</h3>
      <Link href={route('invoices.create')}>
        <Button variant="primary" className="mb-3">+ Tạo hóa đơn mới</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã hóa đơn</th>
            <th>Căn hộ</th>
            <th>Loại phí</th>
            <th>Số tiền</th>
            <th>Hạn thanh toán</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoice_no}</td>
              <td>{invoice.apartment_no}</td>
              <td>{invoice.fee_type?.name}</td>
              <td>{invoice.amount.toLocaleString()} ₫</td>
              <td>{invoice.due_date}</td>
              <td><Badge bg={statusColor(invoice.status)}>{invoice.status}</Badge></td>
              <td>
                <Link href={route('invoices.edit', invoice.id)}>
                  <Button variant="warning" size="sm">Sửa</Button>
                </Link>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => destroy(route('invoices.destroy', invoice.id))}
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
