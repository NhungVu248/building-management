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
} from "react-bootstrap";

export default function Dashboard() {
  // ✅ Lấy dữ liệu từ Laravel qua Inertia
  const { auth, summary = {} } = usePage().props;

  // ✅ Dùng dữ liệu thật thay vì giả định
  const cards = [
    { id: 1, label: "👥 Nhân sự", value: summary.staff ?? 0, route: "/staff" },
    { id: 2, label: "🏘️ Căn hộ", value: summary.apartments ?? 0, route: "/apartments" },
    { id: 3, label: "👪 Cư dân", value: summary.residents ?? 0, route: "/residents" },
    { id: 4, label: "🛠️ Bảo trì (đang mở)", value: summary.maintenance ?? 0, route: "/maintenance" },
    { id: 5, label: "💰 Hóa đơn chưa thanh toán", value: summary.unpaidInvoices ?? 0, route: "/invoices" },
  ];

  return (
    <>
      {/* --- NAVBAR --- */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/dashboard" className="fw-bold text-uppercase">
            🏢 Quản lý Tòa nhà
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              {/* --- R1 --- */}
              <Nav.Link as={Link} href="/staff">
                👥 Hệ thống & Nhân sự
              </Nav.Link>

              {/* --- R2 --- */}
              <NavDropdown title="🏘️ Căn hộ & Pháp lý" id="nav-r2">
                <NavDropdown.Item as={Link} href="/apartments">
                  Danh sách Căn hộ
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/contracts">
                  Hợp đồng pháp lý
                </NavDropdown.Item>
              </NavDropdown>

              {/* --- R3 --- */}
              <NavDropdown title="👪 Cư dân & Tiện ích" id="nav-r3">
                <NavDropdown.Item as={Link} href="/residents">
                  Cư dân
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/amenities">
                  Tiện ích cộng đồng
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/bookings">
                  Đặt lịch sử dụng tiện ích
                </NavDropdown.Item>
              </NavDropdown>

              {/* --- R4 --- */}
              <NavDropdown title="🛠️ Vận hành" id="nav-r4">
                <NavDropdown.Item as={Link} href="/maintenance">
                  Bảo trì
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/security">
                  An ninh
                </NavDropdown.Item>
              </NavDropdown>

              {/* --- R5 --- */}
              <NavDropdown title="💰 Tài chính & Nghiệp vụ" id="nav-r5">
                <NavDropdown.Item as={Link} href="/fee-types">
                  Loại phí
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/invoices">
                  Hóa đơn
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/payments">
                  Thanh toán
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/reports">
                  Báo cáo thu chi
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* --- User Info & Logout --- */}
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

        <Row className="g-4">
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
