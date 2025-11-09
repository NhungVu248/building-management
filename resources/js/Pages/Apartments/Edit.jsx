import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Edit({ apartment }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.put(`/apartments/${apartment.id}`, data);
  };

  return (
    <Container className="mt-4">
      <h2>✏️ Chỉnh sửa Căn hộ {apartment.code}</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Mã căn hộ</Form.Label>
          <Form.Control name="code" defaultValue={apartment.code} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Chủ hộ</Form.Label>
          <Form.Control name="owner_name" defaultValue={apartment.owner_name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tầng</Form.Label>
          <Form.Control
            type="number"
            name="floor"
            defaultValue={apartment.floor}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Diện tích (m²)</Form.Label>
          <Form.Control
            type="number"
            name="area"
            defaultValue={apartment.area}
            step="0.1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status" defaultValue={apartment.status}>
            <option>Trống</option>
            <option>Đang sử dụng</option>
            <option>Bảo trì</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            name="note"
            as="textarea"
            rows={3}
            defaultValue={apartment.note}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          ✅ Cập nhật
        </Button>
      </Form>
    </Container>
  );
}
