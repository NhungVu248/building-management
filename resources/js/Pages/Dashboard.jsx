import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Row,
  Col,
  Card,
  Table,
  Badge,
} from "react-bootstrap";

export default function Dashboard() {
  const { auth, summary = {}, announcements = [], tickets = [] } = usePage().props;

  const cards = [
    // --- Phase 1–3: Các module gốc ---
    { id: 1, label: "👥 Nhân sự", value: summary.staff ?? 0, route: "/staff" },
    { id: 2, label: "🏘️ Căn hộ", value: summary.apartments ?? 0, route: "/apartments" },
    { id: 3, label: "👪 Cư dân", value: summary.residents ?? 0, route: "/residents" },
    { id: 4, label: "🛠️ Bảo trì (đang mở)", value: summary.maintenance ?? 0, route: "/maintenance" },
    { id: 5, label: "💰 Hóa đơn chưa thanh toán", value: summary.unpaidInvoices ?? 0, route: "/invoices" },

    // --- Phase 5: Các module vận hành mới ---
    { id: 6, label: "🎫 Thẻ ra/vào", value: summary.accessCards ?? 0, route: "/access-cards" },
    { id: 7, label: "🚗 Phương tiện", value: summary.vehicles ?? 0, route: "/vehicles" },
    { id: 8, label: "🚪 Lượt ra/vào", value: summary.accessLogs ?? 0, route: "/access-logs" },
    { id: 9, label: "🧾 Work Orders", value: summary.workOrders ?? 0, route: "/work-orders" },
    { id: 10, label: "🗓️ Lịch bảo dưỡng", value: summary.maintenanceSchedules ?? 0, route: "/maintenance-schedules" },
  ];

  return (
    <>
      {/* NAVBAR GIỮ NGUYÊN */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/dashboard" className="fw-bold text-uppercase">
            🏢 Quản lý Tòa nhà
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/staff">👥 Hệ thống & Nhân sự</Nav.Link>

              <NavDropdown title="🏘️ Căn hộ & Pháp lý" id="nav-r2">
                <NavDropdown.Item as={Link} href="/apartments">Danh sách Căn hộ</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/contracts">Hợp đồng pháp lý</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="👪 Cư dân & Tiện ích" id="nav-r3">
                <NavDropdown.Item as={Link} href="/residents">Cư dân</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/amenities">Tiện ích cộng đồng</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/bookings">Đặt lịch sử dụng tiện ích</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="🛠️ Vận hành" id="nav-r4">
                <NavDropdown.Item as={Link} href="/access-cards">Thẻ ra/vào</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/vehicles">Phương tiện</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/access-logs">Lượt ra/vào</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/work-orders">Work Orders</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/maintenance-schedules">Lịch bảo dưỡng</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/maintenance">Bảo trì</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/security">An ninh</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="💰 Tài chính & Nghiệp vụ" id="nav-r5">
                <NavDropdown.Item as={Link} href="/fee-types">Loại phí</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/invoices">Hóa đơn</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/payments">Thanh toán</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/reports">Báo cáo thu chi</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav className="ms-auto align-items-center">
              <span className="text-light me-3">
                Xin chào, <strong>{auth?.user?.name || "Admin"}</strong>
              </span>
              <Button
                variant="outline-light"
                size="sm"
                as={Link}
                href={route("logout")}
                method="post"
              >
                🚪 Đăng xuất
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* --- DASHBOARD CONTENT --- */}
      <Container className="mt-5">
        <h2 className="fw-bold mb-3 text-center">Trang quản lý Tòa nhà</h2>
        <p className="text-muted text-center mb-5">
          Chọn nhóm chức năng ở thanh menu hoặc xem tổng quan hệ thống bên dưới.
        </p>

        {/* --- Tổng quan cards --- */}
        <Row className="g-4 mb-5">
          {cards.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100 text-center">
                <Card.Body>
                  <Card.Title className="fw-bold fs-5 mb-2">{item.label}</Card.Title>
                  <Card.Text className="display-6 fw-semibold text-primary mb-3">
                    {item.value}
                  </Card.Text>
                  <Button as={Link} href={item.route} variant="outline-primary" size="sm">
                    Xem chi tiết
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* --- THÔNG BÁO & TICKET --- */}
        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header className="fw-bold bg-primary text-white d-flex justify-content-between align-items-center">
                🔔 Thông báo gần đây
                <Button as={Link} href="/announcements" size="sm" variant="light">
                  Xem tất cả
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                {announcements.length === 0 ? (
                  <p className="p-3 text-muted text-center mb-0">Không có thông báo nào.</p>
                ) : (
                  <Table hover responsive className="mb-0">
                    <tbody>
                      {announcements.slice(0, 5).map((a) => (
                        <tr key={a.id}>
                          <td className="fw-semibold">{a.title}</td>
                          <td className="text-end text-muted small">
                            {new Date(a.created_at).toLocaleDateString("vi-VN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header className="fw-bold bg-warning d-flex justify-content-between align-items-center">
                🧾 Ticket phản ánh mới
                <Button as={Link} href="/tickets" size="sm" variant="light">
                  Quản lý
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                {tickets.length === 0 ? (
                  <p className="p-3 text-muted text-center mb-0">Chưa có phản ánh nào.</p>
                ) : (
                  <Table hover responsive className="mb-0">
                    <tbody>
                      {tickets.slice(0, 5).map((t) => (
                        <tr key={t.id}>
                          <td>
                            <div className="fw-semibold">{t.subject}</div>
                            <small className="text-muted">
                              {t.resident?.name || "Ẩn danh"}
                            </small>
                          </td>
                          <td className="text-end">
                            <Badge
                              bg={
                                t.status === "resolved"
                                  ? "success"
                                  : t.status === "in_progress"
                                  ? "info"
                                  : t.status === "closed"
                                  ? "secondary"
                                  : "warning"
                              }
                            >
                              {t.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* --- FOOTER --- */}
      <footer className="bg-light text-center text-muted py-3 border-top mt-5">
        <small>
          © {new Date().getFullYear()} Hệ thống Quản lý Tòa Nhà | Laravel + React (Breeze)
        </small>
      </footer>
    </>
  );
}
