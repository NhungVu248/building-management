import React from 'react';
import { router } from '@inertiajs/react';
import { Container, Form, Button } from 'react-bootstrap';

export default function Create({ apartments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.post('/residents', data);
  };

  return (
    <Container className="mt-4">
      <h2>➕ Thêm cư dân mới</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control name="name" placeholder="Nhập tên cư dân" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control name="phone" placeholder="Nhập số điện thoại" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Nhập email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Căn hộ</Form.Label>
          <Form.Select name="apartment_id" required>
            <option value="">-- Chọn căn hộ --</option>
            {apartments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status" defaultValue="Đang ở">
            <option value="Đang ở">Đang ở</option>
            <option value="Tạm vắng">Tạm vắng</option>
            <option value="Chuyển đi">Chuyển đi</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">
          💾 Lưu cư dân
        </Button>
      </Form>
    </Container>
  );
}
