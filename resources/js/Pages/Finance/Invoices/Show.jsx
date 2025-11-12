import React from "react";
import { useForm, Link } from "@inertiajs/react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Card,
  Badge, 
  Spinner, 
} from "react-bootstrap";
const formatCurrency = (num) => (num || 0).toLocaleString("vi-VN") + " ₫";
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};
const getStatusBadge = (status) => {
  const statusMap = {
    issued: { bg: "info", text: "Đã phát hành" },
    partial: { bg: "warning", text: "Thanh toán 1 phần" },
    paid: { bg: "success", text: "Đã thanh toán" },
    overdue: { bg: "danger", text: "Quá hạn" },
  };
  const S = statusMap[status] || { bg: "secondary", text: status };
  return <Badge bg={S.bg}>{S.text}</Badge>;
};

export default function ShowInvoice({ invoice }) {
  const { data: payData, setData: setPayData, post: postPay, processing: payProcessing } = useForm({
    invoice_id: invoice.id,
    paid_at: new Date().toISOString().slice(0, 10),
    amount: invoice.balance > 0 ? invoice.balance : "", 
    method: "cash",
    note: "",
  });

  const submitPay = (e) => {
    e.preventDefault();
    postPay(route("payments.store"), {
      preserveScroll: true, 
      onSuccess: () => {
        setPayData({
            invoice_id: invoice.id,
            paid_at: new Date().toISOString().slice(0, 10),
            amount: 0,
            method: "cash",
            note: "",
        });
      }
    });
  };
  
  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            <Row className="align-items-center mb-4">
              <Col>
                <h2 className="mb-0 fw-bold">Chi tiết hóa đơn</h2>
                <span className="text-muted fs-5">#{invoice.code}</span>
              </Col>
              <Col xs="auto">
                <Link
                  href={route("invoices.index")}
                  className="btn btn-secondary"
                >
                  ← Quay lại
                </Link>
              </Col>
            </Row>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="border-bottom pb-3 mb-4">
                  <Col md={4} className="mb-3 mb-md-0">
                    <Form.Label className="small text-muted">Căn hộ</Form.Label>
                    <h5 className="fw-bold mb-0">{invoice.apartment?.id} - {invoice.apartment?.name}</h5>
                  </Col>
                  <Col md={4} className="mb-3 mb-md-0">
                    <Form.Label className="small text-muted">Kỳ hóa đơn</Form.Label>
                    <h5 className="fw-bold mb-0">{formatDate(invoice.billing_period)}</h5>
                  </Col>
                  <Col md={4} className="text-md-end">
                    <Form.Label className="small text-muted">Trạng thái</Form.Label>
                    <div className="fs-5">{getStatusBadge(invoice.status)}</div>
                  </Col>
                </Row>
                <Row className="mb-4 text-center">
                    <Col>
                        <Form.Label className="text-muted">Tổng cộng</Form.Label>
                        <h4 className="fw-bold">{formatCurrency(invoice.total)}</h4>
                    </Col>
                    <Col>
                        <Form.Label className="text-muted">Đã trả</Form.Label>
                        <h4 className="fw-bold text-success">{formatCurrency(invoice.paid)}</h4>
                    </Col>
                    <Col>
                        <Form.Label className="text-muted">Còn lại</Form.Label>
                        <h4 className="fw-bold text-danger">{formatCurrency(invoice.balance)}</h4>
                    </Col>
                </Row>
                <h5 className="mt-5 mb-3 fw-bold">Mục phí</h5>
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>Tên phí</th>
                      <th className="text-end">SL</th>
                      <th className="text-end">Đơn giá</th>
                      <th className="text-end">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((it) => (
                      <tr key={it.id}>
                        <td>
                          {it.fee_type?.name ?? "Phí khác"}
                          {it.description && <div className="small text-muted">{it.description}</div>}
                        </td>
                        <td className="text-end">{it.qty}</td>
                        <td className="text-end">{formatCurrency(it.unit_price)}</td>
                        <td className="text-end fw-bold">{formatCurrency(it.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {invoice.balance > 0 && (
                  <>
                    <h5 className="mt-5 mb-3 fw-bold">Thanh toán nhanh</h5>
                    <Card className="bg-light border-0 p-3" style={{ borderRadius: '10px' }}>
                      <Card.Body>
                        <Form onSubmit={submitPay} className="row g-3 align-items-end">
                          <Col md={3}>
                            <Form.Label>Ngày thanh toán</Form.Label>
                            <Form.Control
                              type="date"
                              value={payData.paid_at}
                              onChange={(e) => setPayData("paid_at", e.target.value)}
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Label>Số tiền</Form.Label>
                            <Form.Control
                              type="number"
                              step="1000"
                              value={payData.amount}
                              onChange={(e) => setPayData("amount", e.target.value)}
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Label>Phương thức</Form.Label>
                            <Form.Select
                              value={payData.method}
                              onChange={(e) => setPayData("method", e.target.value)}
                            >
                              <option value="cash">Tiền mặt</option>
                              <option value="bank_transfer">Chuyển khoản</option>
                              <option value="card">Thẻ</option>
                            </Form.Select>
                          </Col>
                          <Col md={3}>
                            <Button type="submit" className="w-100" disabled={payProcessing}>
                              {payProcessing ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                "Ghi nhận"
                              )}
                            </Button>
                          </Col>
                        </Form>
                      </Card.Body>
                    </Card>
                  </>
                )}
                <h5 className="mt-5 mb-3 fw-bold">Lịch sử thanh toán</h5>
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>Ngày</th>
                      <th className="text-end">Số tiền</th>
                      <th>Phương thức</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.payments.map((p) => (
                      <tr key={p.id}>
                        <td>{formatDate(p.paid_at)}</td>
                        <td className="text-end fw-bold">{formatCurrency(p.amount)}</td>
                        <td>{p.method}</td>
                        <td>{p.note}</td>
                      </tr>
                    ))}
                    {invoice.payments.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-muted py-3">
                                Chưa có thanh toán nào.
                            </td>
                        </tr>
                    )}
                  </tbody>
                </Table>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}