import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Edit({ staff }) {
  const { data, setData, put, processing, errors } = useForm({
    name: staff.name || '',
    email: staff.email || '',
    phone: staff.phone || '',
    role: staff.role || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/staff/${staff.id}`);
  };

  return (
    <Container className="mt-4">
      <h2>Chỉnh sửa nhân sự</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Chức vụ</Form.Label>
          <Form.Control
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
          />
        </Form.Group>

        <Button type="submit" disabled={processing}>Cập nhật</Button>{' '}
        <Link href="/staff"><Button variant="secondary">Trở lại</Button></Link>
      </Form>
    </Container>
  );
}
