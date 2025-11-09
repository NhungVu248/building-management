import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    role: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/staff');
  };

  return (
    <Container className="mt-4">
      <h2>Thêm nhân sự mới</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
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

        <Button type="submit" disabled={processing}>Lưu</Button>{' '}
        <Link href="/staff"><Button variant="secondary">Hủy</Button></Link>
      </Form>
    </Container>
  );
}
