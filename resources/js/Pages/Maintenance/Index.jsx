import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Container, Table, Button, Form, Row, Col, Badge, Card } from "react-bootstrap";

export default function Index() {
  const { requests, filters, enums, flash } = usePage().props;

  const [q, setQ] = React.useState(filters?.q || "");
  const [status, setStatus] = React.useState(filters?.status || "");
  const [priority, setPriority] = React.useState(filters?.priority || "");

  const doFilter = (e) => {
    e?.preventDefault();
    router.get(route("maintenance.index"), { q, status, priority }, { preserveState: true });
  };

  const resetFilter = () => {
    setQ("");
    setStatus("");
    setPriority("");
    router.get(route("maintenance.index"), {}, { preserveState: true });
  };

  const colorStatus = (s) =>
    ({
      pending: "secondary",
      in_progress: "warning",
      completed: "success",
      cancelled: "dark",
    }[s] || "secondary");

  const colorPriority = (p) =>
    ({
      low: "success",
      medium: "warning",
      high: "danger",
    }[p] || "secondary");

  return (
    <div
      style={{
        backgroundColor: "#f8f9fb",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 🏙️ Hero Banner */}
      <div
        className="text-center mb-5"
        style={{
          width: "90%",
          maxWidth: "1180px",
          height: "380px",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "brightness(0.9)",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <h1 className="fw-bold mb-2">🛠️ Quản Lý Yêu Cầu Bảo Trì</h1>
          <p className="lead mb-0">
            Theo dõi, lọc và xử lý yêu cầu bảo trì của cư dân một cách chuyên nghiệp
          </p>
          <Link href={route("maintenance.create")}>
            <Button
              className="px-4 py-2 mt-3 rounded-3 fw-semibold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #00b894, #00cec9)",
                border: "none",
              }}
            >
              + Tạo yêu cầu mới
            </Button>
          </Link>
        </div>
      </div>

      {/* 📋 Nội dung chính */}
      <Container style={{ maxWidth: "1200px" }}>
        {flash?.success && (
          <div className="alert alert-success rounded-3 shadow-sm">{flash.success}</div>
        )}

        {/* 🔍 Bộ lọc */}
        <Card className="shadow-lg border-0 rounded-4 mb-4">
          <Card.Body className="p-4">
            <h4 className="fw-bold text-dark mb-3">🎯 Bộ Lọc Yêu Cầu</h4>
            <Form onSubmit={doFilter}>
              <Row className="g-3 align-items-end">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-secondary">Tìm kiếm</Form.Label>
                    <Form.Control
                      placeholder="Tìm tiêu đề hoặc mô tả..."
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="rounded-3 border-0 shadow-sm bg-light"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-secondary">Trạng thái</Form.Label>
                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="rounded-3 border-0 shadow-sm bg-light"
                    >
                      <option value="">-- Tất cả --</option>
                      {enums.status.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-secondary">Mức độ</Form.Label>
                    <Form.Select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="rounded-3 border-0 shadow-sm bg-light"
                    >
                      <option value="">-- Tất cả --</option>
                      {enums.priority.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-3 fw-semibold shadow-sm"
                  >
                    🔍 Lọc
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={resetFilter}
                    className="rounded-3 fw-semibold shadow-sm"
                  >
                    ↺ Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* 🧾 Bảng danh sách */}
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <h4 className="fw-bold text-dark mb-3">📋 Danh Sách Yêu Cầu Bảo Trì</h4>

            <div className="table-responsive">
              <Table hover borderless className="align-middle">
                <thead className="table-light rounded-3">
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Tiêu đề</th>
                    <th>Căn hộ</th>
                    <th>Mức độ</th>
                    <th>Trạng thái</th>
                    <th>Phụ trách</th>
                    <th>Hạn</th>
                    <th>Chi phí</th>
                    <th className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.data.length > 0 ? (
                    requests.data.map((item) => (
                      <tr key={item.id} className="border-bottom">
                        <td>{item.id}</td>
                        <td className="fw-semibold text-dark">{item.title}</td>
                        <td>{item.apartment_id ?? "-"}</td>
                        <td>
                          <Badge bg={colorPriority(item.priority)} className="px-3 py-2 rounded-3">
                            {item.priority}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={colorStatus(item.status)} className="px-3 py-2 rounded-3">
                            {item.status}
                          </Badge>
                        </td>
                        <td>{item.assigned_to ?? "-"}</td>
                        <td>{item.due_date ?? "-"}</td>
                        <td>{item.estimated_cost ?? "-"}</td>
                        <td className="text-center">
                          <Link
                            href={route("maintenance.edit", item.id)}
                            className="btn btn-sm btn-outline-warning rounded-3 me-2"
                          >
                            ✏️ Sửa
                          </Link>
                          <Link
                            href={route("maintenance.destroy", item.id)}
                            method="delete"
                            as="button"
                            className="btn btn-sm btn-outline-danger rounded-3"
                          >
                            🗑️ Xóa
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        Chưa có yêu cầu nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* Phân trang */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="text-muted small">
                Hiển thị {requests.from}-{requests.to} / {requests.total}
              </div>
              <div>
                {requests.links.map((l, i) => (
                  <Link
                    key={i}
                    href={l.url || "#"}
                    className={`btn btn-sm ${
                      l.active ? "btn-primary" : "btn-outline-primary"
                    } ${!l.url ? "disabled" : ""} rounded-3 shadow-sm me-1`}
                    dangerouslySetInnerHTML={{ __html: l.label }}
                  />
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Footer nhỏ */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Maintenance Manager — Nền tảng quản lý bảo trì
            chuyên nghiệp & thân thiện người dùng.
          </p>
        </div>
      </Container>
    </div>
  );
}
