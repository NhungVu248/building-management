import React from 'react';
import { useForm } from '@inertiajs/react';
import { Form, Button } from 'react-bootstrap';

export default function Edit({ invoice, feeTypes }) {
  const { data, setData, put, processing, errors } = useForm({
    apartment_no: invoice.apartment_no || '',
    fee_type_id: invoice.fee_type_id || '',
    amount: invoice.amount || '',
    issue_date: invoice.issue_date || '',
    due_date: invoice.due_date || '',
    status: invoice.status || 'unpaid'
  });

  const submit = (e) => {
    e.preventDefault();
    put(route('invoices.update', invoice.id));
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Cập nhật hóa đơn</h3>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Số căn hộ</Form.Label>
          <Form.Control
            type="text"
            value={data.apartment_no}
            onChange={(e) => setData('apartment_no', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loại phí</Form.Label>
          <Form.Select
            value={data.fee_type_id}
            onChange={(e) => setData('fee_type_id', e.target.value)}
          >
            {feeTypes.map((ft) => (
              <option key={ft.id} value={ft.id}>{ft.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số tiền</Form.Label>
          <Form.Control
            type="number"
            value={data.amount}
            onChange={(e) => setData('amount', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
          >
            <option value="unpaid">Chưa thanh toán</option>
            <option value="paid">Đã thanh toán</option>
            <option value="overdue">Quá hạn</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" disabled={processing}>Cập nhật</Button>
      </Form>
    </div>
  );
}
