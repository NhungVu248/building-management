import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

export default function Create() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.post('/apartments', data);
  };

  return (
    <div
      style={{
        backgroundColor: '#f7f9fc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card
              className="shadow-lg border-0 rounded-4"
              style={{
                backgroundColor: '#ffffff',
              }}
            >
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-dark mb-2">🏙️ Thêm Căn hộ mới</h2>
                  <p className="text-muted">
                    Nhập thông tin chi tiết về căn hộ để lưu vào hệ thống
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Mã căn hộ</Form.Label>
                    <Form.Control
                      name="code"
                      required
                      placeholder="VD: A101"
                      className="rounded-3 py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Chủ hộ</Form.Label>
                    <Form.Control
                      name="owner_name"
                      placeholder="Tên chủ hộ (nếu có)"
                      className="rounded-3 py-2"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Tầng</Form.Label>
                        <Form.Control
                          type="number"
                          name="floor"
                          required
                          placeholder="VD: 5"
                          className="rounded-3 py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          Diện tích (m²)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          step="0.1"
                          name="area"
                          required
                          placeholder="VD: 85.5"
                          className="rounded-3 py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Trạng thái</Form.Label>
                    <Form.Select
                      name="status"
                      className="rounded-3 py-2"
                      defaultValue="Trống"
                    >
                      <option value="Trống">Trống</option>
                      <option value="Đang sử dụng">Đang sử dụng</option>
                      <option value="Bảo trì">Bảo trì</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Ghi chú</Form.Label>
                    <Form.Control
                      name="note"
                      as="textarea"
                      rows={3}
                      placeholder="Ghi chú thêm (nếu có)"
                      className="rounded-3"
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      variant="success"
                      type="submit"
                      className="px-5 py-2 rounded-3 fw-semibold shadow-sm"
                      style={{
                        background:
                          'linear-gradient(135deg, #00b894, #00cec9)',
                        border: 'none',
                      }}
                    >
                      💾 Lưu thông tin
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4 text-muted small">
              <p>
                © {new Date().getFullYear()} Apartment Manager — Bất động sản
                sang trọng cho cuộc sống hiện đại.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
