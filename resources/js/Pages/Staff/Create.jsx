import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Form, Button, Container, Card } from 'react-bootstrap';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/staff');
  };

  return (
    <>
      <Head title="Thêm nhân sự mới" />
      <Container className="mt-5">
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="mb-4 text-center">Thêm nhân sự mới</h2>

            <Form onSubmit={handleSubmit}>
              {/* Họ tên */}
              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Nhập họ tên nhân sự"
                />
                {errors.name && (
                  <div className="text-danger small mt-1">{errors.name}</div>
                )}
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Nhập email công việc"
                />
                {errors.email && (
                  <div className="text-danger small mt-1">{errors.email}</div>
                )}
              </Form.Group>

              {/* Số điện thoại */}
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Group>

              {/* Chức vụ */}
              <Form.Group className="mb-3">
                <Form.Label>Chức vụ</Form.Label>
                <Form.Control
                  value={data.position}
                  onChange={(e) => setData('position', e.target.value)}
                  placeholder="VD: Kế toán, Bảo vệ, Kỹ thuật..."
                />
              </Form.Group>

              {/* Phòng ban */}
              <Form.Group className="mb-4">
                <Form.Label>Phòng ban</Form.Label>
                <Form.Control
                  value={data.department}
                  onChange={(e) => setData('department', e.target.value)}
                  placeholder="VD: Hành chính, Tài chính, Bảo trì..."
                />
              </Form.Group>

              {/* Nút hành động */}
              <div className="d-flex justify-content-end gap-2">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang lưu...' : 'Lưu'}
                </Button>
                <Link href="/staff">
                  <Button variant="secondary" type="button">
                    Hủy
                  </Button>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
