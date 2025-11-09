import React from 'react';
import { useForm } from '@inertiajs/react';
import { Form, Button } from 'react-bootstrap';

export default function Create({ feeTypes }) {
  const { data, setData, post, processing, errors } = useForm({
    apartment_no: '',
    fee_type_id: '',
    amount: '',
    issue_date: '',
    due_date: ''
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('invoices.store'));
  };

  return (
    <div className="container mt-4">
      <h3>🧾 Tạo hóa đơn mới</h3>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Số căn hộ</Form.Label>
          <Form.Control
            type="text"
            value={data.apartment_no}
            onChange={(e) => setData('apartment_no', e.target.value)}
            isInvalid={errors.apartment_no}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loại phí</Form.Label>
          <Form.Select
            value={data.fee_type_id}
            onChange={(e) => setData('fee_type_id', e.target.value)}
            isInvalid={errors.fee_type_id}
          >
            <option value="">-- Chọn loại phí --</option>
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
            isInvalid={errors.amount}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày lập hóa đơn</Form.Label>
          <Form.Control
            type="date"
            value={data.issue_date}
            onChange={(e) => setData('issue_date', e.target.value)}
            isInvalid={errors.issue_date}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hạn thanh toán</Form.Label>
          <Form.Control
            type="date"
            value={data.due_date}
            onChange={(e) => setData('due_date', e.target.value)}
            isInvalid={errors.due_date}
          />
        </Form.Group>

        <Button type="submit" disabled={processing}>Lưu hóa đơn</Button>
      </Form>
    </div>
  );
}
