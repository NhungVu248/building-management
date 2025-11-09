import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Create({ apartments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.post('/contracts', data);
  };

  return (
    <Container className="mt-4">
      <h2>➕ Tạo Hợp đồng mới</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Mã hợp đồng</Form.Label>
          <Form.Control name="contract_code" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Căn hộ</Form.Label>
          <Form.Select name="apartment_id" required>
            {apartments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loại</Form.Label>
          <Form.Select name="type">
            <option>Thuê</option>
            <option>Mua</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Người thuê</Form.Label>
          <Form.Control name="tenant_name" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Giá trị (VNĐ)</Form.Label>
          <Form.Control type="number" name="value" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày bắt đầu</Form.Label>
          <Form.Control type="date" name="start_date" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày kết thúc</Form.Label>
          <Form.Control type="date" name="end_date" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status">
            <option>Hiệu lực</option>
            <option>Hết hạn</option>
            <option>Hủy</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          💾 Lưu
        </Button>
      </Form>
    </Container>
  );
}
