import React from 'react';
import { router } from '@inertiajs/react';
import { Container, Form, Button } from 'react-bootstrap';

export default function Edit({ resident, apartments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.put(`/residents/${resident.id}`, data);
  };

  return (
    <Container className="mt-4">
      <h2>✏️ Chỉnh sửa thông tin cư dân</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control name="name" defaultValue={resident.name} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control name="phone" defaultValue={resident.phone} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" defaultValue={resident.email} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Căn hộ</Form.Label>
          <Form.Select
            name="apartment_id"
            defaultValue={resident.apartment_id}
            required
          >
            {apartments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status" defaultValue={resident.status}>
            <option value="Đang ở">Đang ở</option>
            <option value="Tạm vắng">Tạm vắng</option>
            <option value="Chuyển đi">Chuyển đi</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">
          ✅ Cập nhật cư dân
        </Button>
      </Form>
    </Container>
  );
}
