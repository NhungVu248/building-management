import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";

export default function ShowInvoice({ invoice }) {
  const pay = useForm({
    invoice_id: invoice.id,
    paid_at: new Date().toISOString().slice(0, 10),
    amount: invoice.balance,
    method: "cash",
    note: "",
  });

  const submitPay = (e) => {
    e.preventDefault();
    pay.post(route("payments.store"));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h4>Chi tiết hóa đơn #{invoice.code}</h4>
        </Col>
        <Col className="text-end">
          <Link href={route("invoices.index")} className="btn btn-secondary">
            ← Quay lại
          </Link>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col>Căn hộ: {invoice.apartment?.id}</Col>
            <Col>Kỳ: {invoice.billing_period}</Col>
            <Col>Trạng thái: {invoice.status}</Col>
          </Row>
          <Row>
            <Col>Tổng: {invoice.total.toLocaleString()}</Col>
            <Col>Đã trả: {invoice.paid.toLocaleString()}</Col>
            <Col>Còn: {invoice.balance.toLocaleString()}</Col>
          </Row>
        </Card.Body>
      </Card>

      <h5>Mục phí</h5>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Tên phí</th>
            <th>SL</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((it) => (
            <tr key={it.id}>
              <td>{it.description}</td>
              <td>{it.qty}</td>
              <td>{it.unit_price.toLocaleString()}</td>
              <td>{it.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-4">Thanh toán nhanh</h5>
      <Form onSubmit={submitPay} className="row g-2 align-items-end">
        <div className="col-md-3">
          <Form.Label>Ngày thanh toán</Form.Label>
          <Form.Control
            type="date"
            value={pay.data.paid_at}
            onChange={(e) => pay.setData("paid_at", e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <Form.Label>Số tiền</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={pay.data.amount}
            onChange={(e) => pay.setData("amount", e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <Form.Label>Phương thức</Form.Label>
          <Form.Control
            value={pay.data.method}
            onChange={(e) => pay.setData("method", e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <Button type="submit" className="w-100">
            Ghi nhận
          </Button>
        </div>
      </Form>

      <h5 className="mt-5">Lịch sử thanh toán</h5>
      <Table bordered>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Số tiền</th>
            <th>Phương thức</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {invoice.payments.map((p) => (
            <tr key={p.id}>
              <td>{p.paid_at}</td>
              <td>{p.amount.toLocaleString()}</td>
              <td>{p.method}</td>
              <td>{p.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
