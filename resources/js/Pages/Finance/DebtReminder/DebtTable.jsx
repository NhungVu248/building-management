import React from 'react';
import { Table, Button } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function DebtTable({ data, onSelect }) {
  return (
    <Table striped bordered hover responsive>
      <thead className="table-light">
        <tr>
          <th>Mã hóa đơn</th>
          <th>Căn hộ</th>
          <th>Người thuê</th>
          <th>Kỳ</th>
          <th>Tổng</th>
          <th>Đã trả</th>
          <th>Còn nợ</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={9} className="text-center text-muted">
              Không có hóa đơn nào còn nợ 💸
            </td>
          </tr>
        )}

        {data.map((inv) => (
          <tr key={inv.id}>
            <td>{inv.code}</td>
            <td>{inv.apartment?.id ?? '—'}</td>
            <td>{inv.resident?.name ?? '—'}</td>
            <td>{dayjs(inv.billing_period).format('MM/YYYY')}</td>
            <td>{inv.total.toLocaleString()} đ</td>
            <td>{inv.paid.toLocaleString()} đ</td>
            <td className="fw-bold text-danger">{inv.balance.toLocaleString()} đ</td>
            <td>{inv.status}</td>
            <td>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => onSelect(inv)}
              >
                Nhắc nợ
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
