import React from "react";
import { useForm, Link } from "@inertiajs/react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";

export default function CreatePayment({ invoices }) {
  const { data, setData, post, processing, errors } = useForm({
    invoice_id: "",
    payer_name: "",
    amount: "",
    method: "cash",
    payment_date: new Date().toISOString().slice(0, 10), 
    note: "",
  });
  
  const submit = (e) => {
    e.preventDefault();
    post(route("payments.store"));
  };
  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center mb-4">
                  <Col>
                    <h2 className="mb-0 fw-bold">Ghi nhận Thanh toán</h2>
                  </Col>
                  <Col xs="auto">
                    <Link
                      href={route("payments.index")}
                      className="btn btn-secondary"
                    >
                      ← Quay lại
                    </Link>
                  </Col>
                </Row>
                <Form onSubmit={submit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hóa đơn liên quan</Form.Label>
                    <Form.Select
                      value={data.invoice_id}
                      onChange={(e) => setData("invoice_id", e.target.value)}
                      required
                      isInvalid={errors.invoice_id}
                    >
                      <option value="">-- Chọn hóa đơn --</option>
                      {invoices.map((inv) => (
                        <option key={inv.id} value={inv.id}>
                          {inv.code
                            ? `${inv.code} — Căn hộ ${inv.apartment?.id || ""}`
                            : `#${inv.id} — Căn hộ ${inv.apartment?.id || ""}`}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.invoice_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Người nộp</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tên người nộp (nếu có)"
                          value={data.payer_name}
                          onChange={(e) => setData("payer_name", e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                       <Form.Group>
                        <Form.Label>Ngày thanh toán</Form.Label>
                        <Form.Control
                          type="date"
                          value={data.payment_date}
                          onChange={(e) =>
                            setData("payment_date", e.target.value)
                          }
                          isInvalid={errors.payment_date}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                     <Col md={6}>
                        <Form.Group>
                          <Form.Label>Số tiền</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Nhập số tiền"
                            step="1000"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            isInvalid={errors.amount}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.amount}
                          </Form.Control.Feedback>
                        </Form.Group>
                     </Col>
                     <Col md={6}>
                        <Form.Group>
                          <Form.Label>Phương thức</Form.Label>
                          <Form.Select
                            value={data.method}
                            onChange={(e) => setData("method", e.target.value)}
                          >
                            <option value="cash">Tiền mặt</option>
                            <option value="bank_transfer">Chuyển khoản</option>
                            <option value="card">Thẻ</option>
                            <option value="other">Khác</option>
                          </Form.Select>
                        </Form.Group>
                     </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Thông tin thêm (số tài khoản, v.v...)"
                      value={data.note}
                      onChange={(e) => setData("note", e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-grid mt-5">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Đang lưu...
                        </>
                      ) : (
                        "Lưu thanh toán"
                      )}
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
