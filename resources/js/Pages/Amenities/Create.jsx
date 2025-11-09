import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Create() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.is_active = data.is_active === 'true';
    router.post('/amenities', data);
  };

  return (
    <Container className="mt-4">
      <h2>➕ Thêm Tiện ích mới</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Tên tiện ích</Form.Label>
          <Form.Control name="name" placeholder="VD: Hồ bơi tầng 1" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            placeholder="Mô tả ngắn gọn về tiện ích..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Công suất (số người tối đa / khung giờ)</Form.Label>
          <Form.Control
            type="number"
            name="capacity"
            min="1"
            defaultValue="1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="is_active">
            <option value="true">Đang hoạt động</option>
            <option value="false">Tạm dừng</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          💾 Lưu tiện ích
        </Button>
      </Form>
    </Container>
  );
}
