import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Form, Button } from 'react-bootstrap';

export default function EditPayment({ payment, invoices }) {
  const { data, setData, put, processing, errors } = useForm({
    invoice_id: payment.invoice_id || '',
    payer_name: payment.payer_name || '',
    amount: payment.amount || '',
    method: payment.method || 'cash',
    payment_date: payment.payment_date || '',
    note: payment.note || ''
  });

  const submit = (e) => {
    e.preventDefault();
    put(route('payments.update', payment.id));
  };

  return (
    <div className="container mt-4">
      <h3>Chỉnh sửa thanh toán #{payment.id}</h3>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Hóa đơn liên quan</Form.Label>
          <Form.Select
            value={data.invoice_id}
            onChange={(e) => setData('invoice_id', e.target.value)}
          >
            <option value="">Không chọn</option>
            {invoices.map((inv) => (
              <option key={inv.id} value={inv.id}>
                #{inv.id} - Căn hộ {inv.apartment_no}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Người nộp</Form.Label>
          <Form.Control
            type="text"
            value={data.payer_name}
            onChange={(e) => setData('payer_name', e.target.value)}
          />
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
          <Form.Label>Phương thức thanh toán</Form.Label>
          <Form.Select
            value={data.method}
            onChange={(e) => setData('method', e.target.value)}
          >
            <option value="cash">Tiền mặt</option>
            <option value="bank">Chuyển khoản</option>
            <option value="credit">Thẻ</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày thanh toán</Form.Label>
          <Form.Control
            type="date"
            value={data.payment_date}
            onChange={(e) => setData('payment_date', e.target.value)}
            isInvalid={errors.payment_date}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={data.note}
            onChange={(e) => setData('note', e.target.value)}
          />
        </Form.Group>

        <Button type="submit" disabled={processing}>Cập nhật</Button>{' '}
        <Link href={route('payments.index')}>
          <Button variant="secondary">Quay lại</Button>
        </Link>
      </Form>
    </div>
  );
}
