import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

export default function Create({ apartments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.post('/contracts', data);
  };
  const premiumColor = '#4A569D';

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <h2 
                  className="text-center fw-bold mb-4" 
                  style={{ color: '#2c3e50' }}
                >
                  ➕ Tạo Hợp đồng mới
                </h2>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mã hợp đồng</Form.Label>
                        <Form.Control name="contract_code" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Căn hộ</Form.Label>
                        <Form.Select name="apartment_id" required>
                          {apartments.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.code}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Người thuê</Form.Label>
                    <Form.Control name="tenant_name" required />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Loại</Form.Label>
                        <Form.Select name="type">
                          <option>Thuê</option>
                          <option>Mua</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Giá trị (VNĐ)</Form.Label>
                        <Form.Control type="number" name="value" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ngày bắt đầu</Form.Label>
                        <Form.Control type="date" name="start_date" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control type="date" name="end_date" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Select name="status">
                      <option>Hiệu lực</option>
                      <option>Hết hạn</option>
                      <option>Hủy</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button
                      type="submit"
                      size="lg"
                      style={{
                        backgroundColor: premiumColor,
                        borderColor: premiumColor, 
                        fontWeight: '600'
                      }}
                    >
                      💾 Lưu Hợp Đồng
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
