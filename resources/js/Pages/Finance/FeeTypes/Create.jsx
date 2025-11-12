import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';

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
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <h2 className="text-center fw-bold mb-4">➕ Thêm loại phí mới</h2>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tên loại phí</Form.Label>
                        <Form.Control
                          type="text"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          isInvalid={!!errors.name}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
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
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button variant="primary" type="submit" size="lg" disabled={processing}>
                      {processing ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Đang lưu...
                        </>
                      ) : (
                        '💾 Lưu'
                      )}
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <Link href={route('fee-types.index')} className="text-secondary">
                      Hủy
                    </Link>
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
