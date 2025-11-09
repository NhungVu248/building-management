import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    default_amount: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('fee-types.store'));
  };

  return (
    <Container className="mt-4">
      <h3>➕ Thêm loại phí mới</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên loại phí</Form.Label>
          <Form.Control
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số tiền mặc định (VNĐ)</Form.Label>
          <Form.Control
            type="number"
            value={data.default_amount}
            onChange={(e) => setData('default_amount', e.target.value)}
            isInvalid={!!errors.default_amount}
          />
          <Form.Control.Feedback type="invalid">
            {errors.default_amount}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
        </Form.Group>

        <Button type="submit" disabled={processing}>Lưu</Button>{' '}
        <Link href={route('fee-types.index')}><Button variant="secondary">Hủy</Button></Link>
      </Form>
    </Container>
  );
}
