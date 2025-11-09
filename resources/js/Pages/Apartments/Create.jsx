import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Create() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.post('/apartments', data);
  };

  return (
    <Container className="mt-4">
      <h2>➕ Thêm Căn hộ mới</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Mã căn hộ</Form.Label>
          <Form.Control name="code" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Chủ hộ</Form.Label>
          <Form.Control name="owner_name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tầng</Form.Label>
          <Form.Control type="number" name="floor" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Diện tích (m²)</Form.Label>
          <Form.Control type="number" step="0.1" name="area" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status">
            <option value="Trống">Trống</option>
            <option value="Đang sử dụng">Đang sử dụng</option>
            <option value="Bảo trì">Bảo trì</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control name="note" as="textarea" rows={3} />
        </Form.Group>

        <Button variant="success" type="submit">
          💾 Lưu
        </Button>
      </Form>
    </Container>
  );
}
