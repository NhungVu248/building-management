/** Dashboard.jsx – UI mới, giữ nguyên NAVBAR CONTENT */
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
    Image,
    Dropdown,
} from "react-bootstrap";

export default function Dashboard() {
    const {
        auth,
        summary = {},
        announcements = [],
        tickets = [],
    } = usePage().props;

    const cards = [
        {
            id: 1,
            label: "👥 Nhân sự",
            value: summary.staff ?? 0,
            route: "/staff",
        },
        {
            id: 2,
            label: "🏘️ Căn hộ",
            value: summary.apartments ?? 0,
            route: "/apartments",
        },
        {
            id: 3,
            label: "👪 Cư dân",
            value: summary.residents ?? 0,
            route: "/residents",
        },
        {
            id: 4,
            label: "🛠️ Bảo trì",
            value: summary.maintenance ?? 0,
            route: "/maintenance",
        },
        {
            id: 5,
            label: "💰 Hóa đơn chưa thanh toán",
            value: summary.unpaidInvoices ?? 0,
            route: "/invoices",
        },
        {
            id: 6,
            label: "🎫 Thẻ ra/vào",
            value: summary.accessCards ?? 0,
            route: "/access-cards",
        },
        {
            id: 7,
            label: "🚗 Phương tiện",
            value: summary.vehicles ?? 0,
            route: "/vehicles",
        },
        {
            id: 8,
            label: "🚪 Lượt ra/vào",
            value: summary.accessLogs ?? 0,
            route: "/access-logs",
        },
        {
            id: 9,
            label: "🧾 Work Orders",
            value: summary.workOrders ?? 0,
            route: "/work-orders",
        },
        {
            id: 10,
            label: "🗓️ Lịch bảo dưỡng",
            value: summary.maintenanceSchedules ?? 0,
            route: "/maintenance-schedules",
        },
    ];

    const avatarUrl = auth?.user?.avatar
        ? `/storage/${auth.user.avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              auth?.user?.name || "A"
          )}&background=random`;

    return (
        <>
            {/* ================= NAVBAR (giữ đúng nội dung) ================= */}
            <Navbar
                bg="white"
                expand="lg"
                sticky="top"
                className="shadow-sm border-bottom py-3"
                style={{ fontSize: "15px" }}
            >
                <Container>
                    <Navbar.Brand
                        href="/dashboard"
                        className="fw-bold text-primary fs-4"
                    >
                        🏢 Quản lý Tòa nhà
                    </Navbar.Brand>

                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        {/* ===== Giữ nguyên menu ===== */}
                        <Nav className="me-auto">
                            <Nav.Link as={Link} href="/staff">
                                👥 Hệ thống & Nhân sự
                            </Nav.Link>

                            <NavDropdown title="🏘️ Căn hộ & Pháp lý">
                                <NavDropdown.Item as={Link} href="/apartments">
                                    Danh sách Căn hộ
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/contracts">
                                    Hợp đồng pháp lý
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="👪 Cư dân & Tiện ích">
                                <NavDropdown.Item as={Link} href="/residents">
                                    Cư dân
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/amenities">
                                    Tiện ích cộng đồng
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/bookings">
                                    Đặt lịch tiện ích
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="🛠️ Vận hành">
                                <NavDropdown.Item
                                    as={Link}
                                    href="/access-cards"
                                >
                                    Thẻ ra/vào
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/vehicles">
                                    Phương tiện
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/access-logs">
                                    Lượt ra/vào
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} href="/work-orders">
                                    Work Orders
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    href="/maintenance-schedules"
                                >
                                    Lịch bảo dưỡng
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} href="/maintenance">
                                    Bảo trì
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/security">
                                    An ninh
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="💰 Tài chính & Nghiệp vụ">
                                <NavDropdown.Item as={Link} href="/fee-types">
                                    Loại phí
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/invoices">
                                    Hóa đơn
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/payments">
                                    Thanh toán
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/debts">
                                    Nhắc nợ
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/reports">
                                    Báo cáo thu chi
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        {/* ========== User Avatar ========== */}
                        <Nav>
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="div"
                                    className="p-0"
                                    style={{ cursor: "pointer" }}
                                >
                                    <Image
                                        src={avatarUrl}
                                        roundedCircle
                                        style={{
                                            width: 42,
                                            height: 42,
                                            objectFit: "cover",
                                            border: "2px solid #1E40AF",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Header className="text-center">
                                        <strong>{auth?.user?.name}</strong>
                                        <div className="small text-muted">
                                            {auth?.user?.email}
                                        </div>
                                    </Dropdown.Header>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        as={Link}
                                        href={route("profile.edit")}
                                    >
                                        👤 Hồ sơ cá nhân
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as={Link}
                                        href={route("logout")}
                                        method="post"
                                        className="text-danger"
                                    >
                                        🚪 Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* ================= HERO (theo mẫu ảnh) ================= */}
            <div
                className="w-100 text-white d-flex align-items-center"
                style={{
                    height: 180,
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                }}
            >
                <div
                    className="position-absolute w-100 h-100"
                    style={{ background: "rgba(0,0,0,0.45)" }}
                ></div>
                <Container className="position-relative">
                    <h2 className="fw-bold mb-1">Bảng điều khiển hệ thống</h2>
                    <p className="mb-0 text-light">
                        Tổng quan các hoạt động quản lý tòa nhà
                    </p>
                </Container>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <Container className="mt-5">
                {/* CARDS */}
                <Row className="g-4 mb-5">
                    {cards.map((c) => (
                        <Col key={c.id} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                className="shadow-sm border-0 h-100"
                                style={{ borderRadius: "18px" }}
                            >
                                <Card.Body className="text-center py-4">
                                    <div className="fs-1">
                                        {c.label.split(" ")[0]}
                                    </div>
                                    <h5 className="fw-bold mt-2">{c.label}</h5>
                                    <div className="display-6 fw-bold text-primary">
                                        {c.value}
                                    </div>
                                    <Button
                                        as={Link}
                                        href={c.route}
                                        variant="outline-primary"
                                        size="sm"
                                        className="mt-3 px-4"
                                        style={{ borderRadius: "50px" }}
                                    >
                                        Chi tiết
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="g-4">
                    {/* THÔNG BÁO */}
                    <Col md={6}>
                        <Card
                            className="shadow-sm border-0 h-100"
                            style={{ borderRadius: 18 }}
                        >
                            <Card.Header className="fw-bold bg-white text-primary border-bottom">
                                🔔 Thông báo gần đây
                            </Card.Header>

                            <Card.Body className="p-0 bg-light">
                                {announcements.length === 0 ? (
                                    <p className="p-3 text-center text-muted">
                                        Không có thông báo.
                                    </p>
                                ) : (
                                    <Table hover className="mb-0">
                                        <tbody>
                                            {announcements
                                                .slice(0, 5)
                                                .map((a) => (
                                                    <tr key={a.id}>
                                                        <td className="fw-semibold">
                                                            {a.title}
                                                        </td>
                                                        <td className="text-end text-muted small">
                                                            {new Date(
                                                                a.created_at
                                                            ).toLocaleDateString(
                                                                "vi-VN"
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>

                            <div className="text-end p-3">
                                <Button
                                    as={Link}
                                    href="/announcements"
                                    size="sm"
                                    variant="primary"
                                >
                                    Xem tất cả
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    {/* TICKETS */}
                    <Col md={6}>
                        <Card
                            className="shadow-sm border-0 h-100"
                            style={{ borderRadius: 18 }}
                        >
                            <Card.Header className="fw-bold bg-white text-warning border-bottom">
                                🧾 Ticket phản ánh mới
                            </Card.Header>

                            <Card.Body className="p-0 bg-light">
                                {tickets.length === 0 ? (
                                    <p className="p-3 text-center text-muted">
                                        Chưa có phản ánh nào.
                                    </p>
                                ) : (
                                    <Table hover className="mb-0">
                                        <tbody>
                                            {tickets.slice(0, 5).map((t) => (
                                                <tr key={t.id}>
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {t.subject}
                                                        </div>
                                                        <small className="text-muted">
                                                            {t.resident?.name ||
                                                                "Ẩn danh"}
                                                        </small>
                                                    </td>
                                                    <td className="text-end">
                                                        <Badge
                                                            bg={
                                                                t.status ===
                                                                "resolved"
                                                                    ? "success"
                                                                    : t.status ===
                                                                      "in_progress"
                                                                    ? "info"
                                                                    : t.status ===
                                                                      "closed"
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

                            <div className="text-end p-3">
                                <Button
                                    as={Link}
                                    href="/tickets"
                                    size="sm"
                                    variant="warning"
                                >
                                    Quản lý Ticket
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <footer className="text-center text-muted py-4 mt-5 bg-white border-top">
                © {new Date().getFullYear()} Hệ thống Quản lý Tòa nhà • Laravel
                + React
            </footer>
        </>
    );
}
