import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Container, Table, Badge, Button, Card, Row, Col } from "react-bootstrap";

export default function AccessCardShow() {
  const { card, logs } = usePage().props;

  return (
    <div style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      {/* 🏙️ Hero Banner */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          padding: "80px 20px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1 className="fw-bold mb-2">Chi Tiết Thẻ Ra/Vào</h1>
        <p className="lead mb-0">Theo dõi và quản lý hoạt động thẻ một cách chuyên nghiệp</p>
      </div>

      {/* 📋 Nội dung chi tiết */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Thông tin thẻ */}
            <Card className="shadow-lg border-0 rounded-4 mb-4">
              <Card.Body className="p-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="fw-bold text-dark mb-0">
                    💳 Thẻ #{card.code}
                  </h3>
                  <Button
                    as={Link}
                    href={route("access-cards.edit", card.id)}
                    variant="outline-warning"
                    className="rounded-3 fw-semibold shadow-sm"
                  >
                    ✏️ Sửa
                  </Button>
                </div>

                <Row className="mb-3">
                  <Col md={6}>
                    <p className="mb-1 text-muted fw-semibold">Chủ thẻ</p>
                    <h6>{card.holder_name}</h6>
                  </Col>
                  <Col md={6}>
                    <p className="mb-1 text-muted fw-semibold">Loại thẻ</p>
                    <Badge
                      bg={
                        card.type === "resident"
                          ? "info"
                          : card.type === "guest"
                          ? "secondary"
                          : "dark"
                      }
                      className="px-3 py-2 rounded-3"
                    >
                      {card.type === "resident"
                        ? "Cư dân"
                        : card.type === "guest"
                        ? "Khách"
                        : "Nhân viên"}
                    </Badge>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <p className="mb-1 text-muted fw-semibold">Trạng thái</p>
                    <Badge
                      bg={
                        card.status === "active"
                          ? "success"
                          : card.status === "suspended"
                          ? "warning"
                          : "secondary"
                      }
                      className="px-3 py-2 rounded-3"
                    >
                      {card.status === "active"
                        ? "Kích hoạt"
                        : card.status === "suspended"
                        ? "Tạm ngưng"
                        : "Hết hạn"}
                    </Badge>
                  </Col>
                  <Col md={6}>
                    <p className="mb-1 text-muted fw-semibold">Hiệu lực</p>
                    <h6>
                      {card.valid_from} →{" "}
                      {card.valid_to ?? <span className="text-muted">Không giới hạn</span>}
                    </h6>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Lịch sử quét */}
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <h4 className="fw-bold text-dark mb-4">📜 Lịch Sử Ra/Vào</h4>

                <div className="table-responsive">
                  <Table hover borderless className="align-middle">
                    <thead className="table-light rounded-3">
                      <tr className="text-secondary">
                        <th>#</th>
                        <th>Cổng</th>
                        <th>Hành động</th>
                        <th>Kết quả</th>
                        <th>Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.length > 0 ? (
                        logs.map((l) => (
                          <tr key={l.id} className="border-bottom">
                            <td className="fw-semibold text-muted">{l.id}</td>
                            <td>{l.gate}</td>
                            <td className="text-capitalize">{l.action}</td>
                            <td>
                              <Badge
                                bg={
                                  l.result === "allowed"
                                    ? "success"
                                    : l.result === "denied"
                                    ? "danger"
                                    : "secondary"
                                }
                                className="px-3 py-2 rounded-3"
                              >
                                {l.result === "allowed"
                                  ? "Cho phép"
                                  : l.result === "denied"
                                  ? "Từ chối"
                                  : l.result}
                              </Badge>
                            </td>
                            <td>
                              <small className="text-muted">{l.scanned_at}</small>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-muted">
                            Chưa có lịch sử ra/vào cho thẻ này.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Footer nhỏ */}
            <div className="text-center mt-4 text-muted small">
              <p>
                © {new Date().getFullYear()} Access Card Manager — Quản lý thẻ ra vào hiệu quả và an toàn.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
