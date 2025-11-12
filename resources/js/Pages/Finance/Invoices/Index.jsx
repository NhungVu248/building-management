import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Pagination,
  Card,
  Badge,
  Spinner,
} from "react-bootstrap";
import dayjs from "dayjs"; 

export default function InvoiceIndex({ data }) {
  const [search, setSearch] = useState("");
  const {
    data: form,
    setData,
    post,
    processing,
  } = useForm({
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
  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge bg="success">Đã thanh toán</Badge>;
      case "partial":
        return <Badge bg="primary">Một phần</Badge>;
      case "overdue":
        return <Badge bg="danger">Quá hạn</Badge>;
      case "issued":
        return <Badge bg="warning" text="dark">Đã phát hành</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center mb-4">
                  <Col md={4}>
                    <h2 className="mb-0 fw-bold">📑 Quản lý hóa đơn</h2>
                  </Col>
                  <Col md={8} className="d-flex justify-content-end gap-2">
                    <Form.Control
                      placeholder="Tìm mã hoặc căn hộ..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ maxWidth: "200px" }}
                    />
                    <Form
                      onSubmit={handleGenerate}
                      className="d-flex gap-2"
                    >
                      <Form.Control
                        type="date"
                        value={form.period}
                        onChange={(e) => setData("period", e.target.value)}
                        required
                        style={{ maxWidth: "160px" }}
                      />
                      <Button
                        type="submit"
                        variant="outline-primary" 
                        disabled={processing}
                      >
                        {processing ? <Spinner size="sm" /> : "Tạo hóa đơn tháng"}
                      </Button>
                    </Form>
                    <Link
                      href={route("invoices.create")}
                      className="btn btn-primary" 
                    >
                      + Tạo hóa đơn
                    </Link>
                  </Col>
                </Row>
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Căn hộ</th>
                      <th>Kỳ</th>
                      <th className="text-end">Tổng</th>
                      <th className="text-end">Đã trả</th>
                      <th className="text-end">Còn nợ</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-end"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center text-muted py-3">
                          Không tìm thấy hóa đơn nào.
                        </td>
                      </tr>
                    )}
                    
                    {filtered.map((inv) => (
                      <tr key={inv.id}>
                        <td className="fw-bold">{inv.code}</td>
                        <td>{inv.apartment?.code ?? '—'}</td>
                        <td>{dayjs(inv.billing_period).format("MM/YYYY")}</td>
                        <td className="text-end">
                          {inv.total.toLocaleString()} ₫
                        </td>
                        <td className="text-end">
                          {inv.paid.toLocaleString()} ₫
                        </td>
                        <td className="text-end fw-bold text-danger">
                          {inv.balance.toLocaleString()} ₫
                        </td>
                        <td className="text-center">
                          {getStatusBadge(inv.status)}
                        </td>
                        <td className="text-end">
                          <Link
                            href={route("invoices.show", inv.id)}
                            className="btn btn-sm btn-primary me-2"
                            title="Xem chi tiết"
                          >
                            👁️
                          </Link>
                          <Link
                            href={route("invoices.edit", inv.id)}
                            className="btn btn-sm btn-warning me-2"
                            title="Sửa"
                          >
                            ✏️
                          </Link>
                          <Link
                            href={route("invoices.destroy", inv.id)}
                            method="delete"
                            as="button"
                            className="btn btn-sm btn-danger"
                            title="Xóa"
                          >
                            🗑️
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {data.links && (
                  <div className="d-flex justify-content-center">
                    <Pagination>
                      {data.links.map((link, idx) => (
                        <Pagination.Item
                          key={idx}
                          active={link.active}
                          onClick={() => (window.location.href = link.url)}
                          disabled={!link.url}
                        >
                          <span
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                )}                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
