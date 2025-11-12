import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function DebtTable({ data, onSelect }) {
  const getStatusBadge = (status, balance) => {
    if (balance > 0) {
      if (status === 'Quá hạn') {
        return <Badge bg="danger">Quá hạn</Badge>;
      }
      return <Badge bg="warning" text="dark">Chưa thanh toán</Badge>;
    }

    if (status === 'Đã thanh toán') {
      return <Badge bg="success">Đã thanh toán</Badge>;
    }
    switch (status) {
      case 'Đã hủy':
        return <Badge bg="secondary">Đã hủy</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  return (
    <Table hover responsive className="align-middle">
      <thead>
        <tr>
          <th>Mã hóa đơn</th>
          <th>Căn hộ</th>
          <th>Người thuê</th>
          <th>Kỳ</th>
          <th className="text-end">Tổng</th>
          <th className="text-end">Đã trả</th>
          <th className="text-end">Còn nợ</th>
          <th className="text-center">Trạng thái</th>
          <th className="text-end">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={9} className="text-center text-muted py-3">
              Không có hóa đơn nào còn nợ 💸
            </td>
          </tr>
        )}

        {data.map((inv) => (
          <tr key={inv.id}>
            <td className="fw-bold">{inv.code}</td>
            <td>{inv.apartment?.code ?? '—'}</td>
            <td>{inv.resident?.name ?? '—'}D</td>
            <td>{dayjs(inv.billing_period).format('MM/YYYY')}</td>
            <td className="text-end">{inv.total.toLocaleString()} đ</td>
            <td className="text-end">{inv.paid.toLocaleString()} đ</td>
            <td className="fw-bold text-danger text-end">
              {inv.balance.toLocaleString()} đ
            </td>
            <td className="text-center">
              {getStatusBadge(inv.status, inv.balance)}
            </td>
            <td className="text-end">
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
