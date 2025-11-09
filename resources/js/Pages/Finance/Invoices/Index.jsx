import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Container, Row, Col, Form, Button, Table, Pagination } from "react-bootstrap";

export default function InvoiceIndex({ data }) {
  const [search, setSearch] = useState("");
  const { data: form, setData, post, processing } = useForm({
    period: new Date().toISOString().slice(0, 7) + "-01",
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    post(route("invoices.generateMonthly"), { preserveScroll: true });
  };

  const filtered = data.data.filter(
    (inv) =>
      inv.code.toLowerCase().includes(search.toLowerCase()) ||
      (inv.apartment?.id ?? "").toString().includes(search)
  );

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col md="auto">
          <h4>📑 Quản lý hóa đơn</h4>
        </Col>
        <Col md="auto">
          <Form onSubmit={handleGenerate} className="d-flex gap-2">
            <Form.Control
              type="date"
              value={form.period}
              onChange={(e) => setData("period", e.target.value)}
              required
            />
            <Button type="submit" disabled={processing}>
              Tạo hóa đơn tháng
            </Button>
          </Form>
        </Col>
        <Col md={3}>
          <Form.Control
            placeholder="Tìm mã hoặc căn hộ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Link href={route("invoices.create")} className="btn btn-success">
            + Tạo hóa đơn
          </Link>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead className="table-secondary">
          <tr>
            <th>Mã</th>
            <th>Căn hộ</th>
            <th>Kỳ</th>
            <th>Tổng</th>
            <th>Đã trả</th>
            <th>Còn nợ</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.code}</td>
              <td>{inv.apartment?.id}</td>
              <td>{inv.billing_period}</td>
              <td>{inv.total.toLocaleString()}</td>
              <td>{inv.paid.toLocaleString()}</td>
              <td>{inv.balance.toLocaleString()}</td>
              <td>{inv.status}</td>
              <td>
                <Link
                  href={route("invoices.show", inv.id)}
                  className="btn btn-sm btn-primary me-2"
                >
                  Chi tiết
                </Link>
                <Link
                  href={route("invoices.destroy", inv.id)}
                  method="delete"
                  as="button"
                  className="btn btn-sm btn-danger"
                >
                  Xóa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {data.links && (
        <Pagination>
          {data.links.map((link, idx) => (
            <Pagination.Item
              key={idx}
              active={link.active}
              onClick={() => (window.location.href = link.url)}
            >
              <span dangerouslySetInnerHTML={{ __html: link.label }} />
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
}
