import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Container, Form, Button, Card } from 'react-bootstrap';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    cccd: '',
    phone: '',
    email: '',
    apartment_id: '',
    status: 'dang_o',
    note: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('residents.store'));
  };

  return (
    <Container className="py-3">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3">Thêm cư dân mới</h4>

        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CCCD</Form.Label>
            <Form.Control
              value={data.cccd}
              onChange={(e) => setData('cccd', e.target.value)}
            />
            {errors.cccd && <div className="text-danger">{errors.cccd}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Điện thoại</Form.Label>
            <Form.Control
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
            >
              <option value="dang_o">Đang ở</option>
              <option value="tam_vang">Tạm vắng</option>
              <option value="chuyen_di">Chuyển đi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.note}
              onChange={(e) => setData('note', e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Link href={route('residents.index')} className="btn btn-secondary me-2">
              Hủy
            </Link>
            <Button type="submit" disabled={processing}>
              Lưu
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
