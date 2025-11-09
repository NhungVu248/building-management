import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

export default function Edit({ staff }) {
  const { data, setData, put, processing, errors } = useForm({
    name: staff.name || '',
    email: staff.email || '',
    phone: staff.phone || '',
    position: staff.position || '',
    department: staff.department || '',
    note: staff.note || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('staff.update', staff.id));
  };

  return (
    <>
      <Head title={`Sửa nhân sự: ${staff.name}`} />
      <Container className="mt-4">
        <h2 className="mb-4">Chỉnh sửa thông tin nhân sự</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Nhập họ tên"
                />
                {errors.name && <Alert variant="danger" className="mt-2 p-2">{errors.name}</Alert>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Nhập email"
                />
                {errors.email && <Alert variant="danger" className="mt-2 p-2">{errors.email}</Alert>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chức vụ</Form.Label>
                <Form.Control
                  value={data.position}
                  onChange={(e) => setData('position', e.target.value)}
                  placeholder="VD: Kế toán, Bảo vệ..."
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phòng ban</Form.Label>
                <Form.Control
                  value={data.department}
                  onChange={(e) => setData('department', e.target.value)}
                  placeholder="VD: Hành chính, Tài chính..."
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={data.note}
                  onChange={(e) => setData('note', e.target.value)}
                  placeholder="Ghi chú thêm"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button type="submit" variant="success" disabled={processing}>
              {processing ? 'Đang lưu...' : 'Cập nhật'}
            </Button>
            <Link href={route('staff.index')}>
              <Button variant="secondary">Trở lại</Button>
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
}
