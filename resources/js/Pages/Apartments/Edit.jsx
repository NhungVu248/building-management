import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

export default function Edit({ apartment }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.put(`/apartments/${apartment.id}`, data);
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f9fb',
        minHeight: '100vh',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          style={{
            width: '100%',
            maxWidth: '720px',
            border: 'none',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            background: 'white',
          }}
        >
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold" style={{ color: '#1c1e21' }}>
                ✏️ Chỉnh sửa Căn hộ {apartment.code}
              </h2>
              <p className="text-muted">
                Cập nhật thông tin chi tiết căn hộ để đảm bảo dữ liệu luôn chính xác và mới nhất.
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mã căn hộ</Form.Label>
                    <Form.Control
                      name="code"
                      defaultValue={apartment.code}
                      required
                      placeholder="Nhập mã căn hộ..."
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chủ hộ</Form.Label>
                    <Form.Control
                      name="owner_name"
                      defaultValue={apartment.owner_name}
                      placeholder="Tên chủ hộ..."
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tầng</Form.Label>
                    <Form.Control
                      type="number"
                      name="floor"
                      defaultValue={apartment.floor}
                      required
                      placeholder="Số tầng..."
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Diện tích (m²)</Form.Label>
                    <Form.Control
                      type="number"
                      name="area"
                      defaultValue={apartment.area}
                      step="0.1"
                      required
                      placeholder="VD: 85.5"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select name="status" defaultValue={apartment.status}>
                  <option>Trống</option>
                  <option>Đang sử dụng</option>
                  <option>Bảo trì</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  name="note"
                  as="textarea"
                  rows={3}
                  defaultValue={apartment.note}
                  placeholder="Nhập ghi chú (nếu có)..."
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="px-5 py-2"
                  style={{
                    borderRadius: '30px',
                    background:
                      'linear-gradient(135deg, #007bff 0%, #0062cc 100%)',
                    border: 'none',
                    boxShadow: '0 4px 10px rgba(0, 98, 204, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background =
                      'linear-gradient(135deg, #0069d9 0%, #0056b3 100%)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background =
                      'linear-gradient(135deg, #007bff 0%, #0062cc 100%)';
                  }}
                >
                  ✅ Cập nhật
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
