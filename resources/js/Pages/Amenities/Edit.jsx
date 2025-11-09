import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Edit({ amenity }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.is_active = data.is_active === 'true';
    router.put(`/amenities/${amenity.id}`, data);
  };

  return (
    <Container className="mt-4">
      <h2>✏️ Chỉnh sửa Tiện ích</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Tên tiện ích</Form.Label>
          <Form.Control
            name="name"
            defaultValue={amenity.name}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            defaultValue={amenity.description}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Công suất</Form.Label>
          <Form.Control
            type="number"
            name="capacity"
            min="1"
            defaultValue={amenity.capacity}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select
            name="is_active"
            defaultValue={amenity.is_active ? 'true' : 'false'}
          >
            <option value="true">Đang hoạt động</option>
            <option value="false">Tạm dừng</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          ✅ Cập nhật
        </Button>
      </Form>
    </Container>
  );
}
