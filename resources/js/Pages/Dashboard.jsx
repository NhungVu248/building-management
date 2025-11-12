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
            color: "from-blue-500 to-blue-700",
        },
        {
            id: 2,
            label: "🏘️ Căn hộ",
            value: summary.apartments ?? 0,
            route: "/apartments",
            color: "from-cyan-500 to-cyan-700",
        },
        {
            id: 3,
            label: "👪 Cư dân",
            value: summary.residents ?? 0,
            route: "/residents",
            color: "from-emerald-500 to-emerald-700",
        },
        {
            id: 4,
            label: "🛠️ Bảo trì",
            value: summary.maintenance ?? 0,
            route: "/maintenance",
            color: "from-orange-500 to-orange-700",
        },
        {
            id: 5,
            label: "💰 Hóa đơn chưa thanh toán",
            value: summary.unpaidInvoices ?? 0,
            route: "/invoices",
            color: "from-pink-500 to-pink-700",
        },
        {
            id: 6,
            label: "🎫 Thẻ ra/vào",
            value: summary.accessCards ?? 0,
            route: "/access-cards",
            color: "from-purple-500 to-purple-700",
        },
        {
            id: 7,
            label: "🚗 Phương tiện",
            value: summary.vehicles ?? 0,
            route: "/vehicles",
            color: "from-indigo-500 to-indigo-700",
        },
        {
            id: 8,
            label: "🚪 Lượt ra/vào",
            value: summary.accessLogs ?? 0,
            route: "/access-logs",
            color: "from-sky-500 to-sky-700",
        },
    ];

    const avatarUrl = auth?.user?.avatar
        ? `/storage/${auth.user.avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              auth?.user?.name || "A"
          )}&background=random`;

    return (
        <>
            {/* NAVBAR */}
            <Navbar
                expand="lg"
                sticky="top"
                className="shadow-md bg-white/90 backdrop-blur-md border-b border-gray-200 py-3"
            >
                <Container>
                    <Navbar.Brand
                        href="/dashboard"
                        className="fw-bold text-blue-700 fs-5 d-flex align-items-center gap-2"
                    >
                        🏢 <span>SmartBuilding</span>
                    </Navbar.Brand>

                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto fw-semibold">
                            <Nav.Link
                                as={Link}
                                href="/staff"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                👥 Nhân sự
                            </Nav.Link>
                            <NavDropdown title="🏘️ Căn hộ" id="nav-apartment">
                                <NavDropdown.Item as={Link} href="/apartments">
                                    Danh sách Căn hộ
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/contracts">
                                    Hợp đồng pháp lý
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="🛠️ Vận hành" id="nav-ops">
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
                                <NavDropdown.Item as={Link} href="/maintenance">
                                    Bảo trì
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="💰 Tài chính" id="nav-finance">
                                <NavDropdown.Item as={Link} href="/invoices">
                                    Hóa đơn
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/payments">
                                    Thanh toán
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/reports">
                                    Báo cáo
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav className="ms-auto align-items-center">
                            <span className="me-3 text-sm text-gray-600">
                                Xin chào,{" "}
                                <strong className="text-blue-700">
                                    {auth?.user?.name || "Admin"}
                                </strong>
                            </span>

                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="div"
                                    className="cursor-pointer"
                                >
                                    <Image
                                        src={avatarUrl}
                                        alt="avatar"
                                        roundedCircle
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            objectFit: "cover",
                                            border: "2px solid #2563eb",
                                        }}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    align="end"
                                    className="shadow-lg"
                                >
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

            {/* CONTENT */}
            <div className="bg-gray-50 min-vh-100 py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-blue-700 mb-2">
                            Bảng điều khiển quản lý tòa nhà
                        </h2>
                        <p className="text-gray-500">
                            Theo dõi tình hình vận hành, cư dân, tài chính và
                            bảo trì của hệ thống.
                        </p>
                    </div>

                    {/* STAT CARDS */}
                    <Row className="g-4 mb-5">
                        {cards.map((item) => (
                            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                                <Card
                                    className={`h-100 text-white border-0 shadow-lg rounded-3 bg-gradient-to-br ${item.color} hover:scale-[1.02] transition-transform duration-300`}
                                >
                                    <Card.Body className="text-center py-4">
                                        <div className="text-4xl mb-2">
                                            {item.label.split(" ")[0]}
                                        </div>
                                        <Card.Title className="fw-bold fs-6 mb-2">
                                            {item.label.replace(/^[^ ]+ /, "")}
                                        </Card.Title>
                                        <Card.Text className="display-6 fw-bold mb-3">
                                            {item.value}
                                        </Card.Text>
                                        <Button
                                            as={Link}
                                            href={item.route}
                                            size="sm"
                                            variant="light"
                                            className="fw-semibold text-blue-700 rounded-pill px-3"
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* THÔNG BÁO & PHẢN ÁNH */}
                    <Row className="g-4">
                        {/* Thông báo */}
                        <Col md={6}>
                            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                                <Card.Header className="bg-blue-700 text-white fw-semibold d-flex justify-content-between align-items-center py-3">
                                    🔔 Thông báo gần đây
                                    <Button
                                        as={Link}
                                        href="/announcements"
                                        size="sm"
                                        variant="light"
                                        className="text-blue-700"
                                    >
                                        Xem tất cả
                                    </Button>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    {announcements.length === 0 ? (
                                        <p className="p-3 text-muted text-center mb-0">
                                            Không có thông báo nào.
                                        </p>
                                    ) : (
                                        <Table
                                            hover
                                            responsive
                                            className="mb-0"
                                        >
                                            <tbody>
                                                {announcements
                                                    .slice(0, 5)
                                                    .map((a) => (
                                                        <tr key={a.id}>
                                                            <td className="fw-semibold text-gray-800">
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
                            </Card>
                        </Col>

                        {/* Ticket */}
                        <Col md={6}>
                            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                                <Card.Header className="bg-amber-500 text-white fw-semibold d-flex justify-content-between align-items-center py-3">
                                    🧾 Phản ánh mới
                                    <Button
                                        as={Link}
                                        href="/tickets"
                                        size="sm"
                                        variant="light"
                                        className="text-amber-700"
                                    >
                                        Quản lý
                                    </Button>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    {tickets.length === 0 ? (
                                        <p className="p-3 text-muted text-center mb-0">
                                            Chưa có phản ánh nào.
                                        </p>
                                    ) : (
                                        <Table
                                            hover
                                            responsive
                                            className="mb-0"
                                        >
                                            <tbody>
                                                {tickets
                                                    .slice(0, 5)
                                                    .map((t) => (
                                                        <tr key={t.id}>
                                                            <td>
                                                                <div className="fw-semibold text-gray-800">
                                                                    {t.subject}
                                                                </div>
                                                                <small className="text-muted">
                                                                    {t.resident
                                                                        ?.name ||
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
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* FOOTER */}
            <footer className="bg-white border-t text-center py-3 text-gray-500 text-sm shadow-inner">
                © {new Date().getFullYear()} SmartBuilding • Hệ thống Quản lý
                Tòa Nhà Thông Minh
            </footer>
        </>
    );
}
