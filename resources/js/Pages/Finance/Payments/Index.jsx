import React from "react";
import { Link, useForm } from "@inertiajs/react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Badge, 
} from "react-bootstrap";
const formatCurrency = (num) => {
  if (typeof num !== 'number') {
    num = parseFloat(num) || 0;
  }
  return num.toLocaleString("vi-VN") + " ₫";
};
const formatDate = (dateString) => {
  if (!dateString) return "—";
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
const formatMethod = (method) => {
  const map = {
    cash: <Badge bg="success">Tiền mặt</Badge>,
    bank: <Badge bg="primary">Chuyển khoản</Badge>,
    credit: <Badge bg="info">Thẻ</Badge>,
  };
  return map[method] || <Badge bg="secondary">{method}</Badge>;
};


export default function PaymentsIndex({ payments }) {
  const { delete: destroy } = useForm();
  const handleDelete = (payment) => {
    if (window.confirm(`Bạn có chắc muốn xóa thanh toán #${payment.id} không?`)) {
      destroy(route("payments.destroy", payment.id), {
        preserveScroll: true, 
      });
    }
  };
 


  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="mb-0 fw-bold">💳 Quản lý thanh toán</h2>
          </Col>
          <Col xs="auto">
            <Link href={route("payments.create")}>
              <Button variant="primary">+ Thêm thanh toán</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <Table striped hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Người nộp</th>
                      <th className="text-end">Số tiền</th>
                      <th>Phương thức</th>
                      <th>Ngày thanh toán</th>
                      <th>Hóa đơn</th>
                      <th className="text-end">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td className="fw-bold">#{p.id}</td>
                        <td>{p.payer_name || "—"}</td>
                        <td className="text-end fw-bold">
                          {formatCurrency(p.amount)}
                        </td>
                        <td>{formatMethod(p.method)}</td>
                        <td>{formatDate(p.payment_date)}</td>
                        <td>
                          {p.invoice ? (
                            <Link href={route('invoices.show', p.invoice.id)}>
                              {p.invoice.code || `#${p.invoice.id}`}
                            </Link>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="text-end">
                          <Link
                            href={route("payments.edit", p.id)}
                            className="btn btn-outline-warning btn-sm me-2"
                          >
                            Sửa
                          </Link>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(p)} 
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {payments.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-4">
                          Không tìm thấy thanh toán nào.
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
