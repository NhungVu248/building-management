import React, { useState } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    Button,
    Table,
    Form,
    Row,
    Col,
    Badge,
    Pagination,
    InputGroup,
    Card,
    Container,
} from "react-bootstrap";

export default function SecurityIndex() {
    const { incidents, filters, meta, flash } = usePage().props;
    const [q, setQ] = useState(filters.q || "");
    const [status, setStatus] = useState(filters.status || "");
    const [severity, setSeverity] = useState(filters.severity || "");

    const onFilter = (e) => {
        e.preventDefault();
        router.get(
            route("security.index"),
            { q, status, severity },
            { preserveState: true, replace: true }
        );
    };

    const pageChange = (url) => {
        if (!url) return;
        router.visit(url, { preserveState: true, replace: true });
    };

    const renderPagination = () => {
        const { links } = incidents;
        return (
            <Pagination className="justify-content-center mt-4">
                {links.map((link, idx) => {
                    if (link.label.includes("Previous"))
                        return (
                            <Pagination.Prev
                                key={idx}
                                disabled={!link.url}
                                onClick={() => pageChange(link.url)}
                            />
                        );

                    if (link.label.includes("Next"))
                        return (
                            <Pagination.Next
                                key={idx}
                                disabled={!link.url}
                                onClick={() => pageChange(link.url)}
                            />
                        );

                    return (
                        <Pagination.Item
                            key={idx}
                            active={link.active}
                            onClick={() => pageChange(link.url)}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </Pagination>
        );
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Head title="Sự cố An ninh" />
            <Container style={{ maxWidth: "1200px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="fw-bold mb-1 flex items-center gap-2">
                                🛡️ Quản lý Sự cố An ninh
                            </h3>
                            <p className="text-orange-100 small mb-0">
                                Theo dõi, xử lý và báo cáo các sự cố an ninh
                                trong tòa nhà.
                            </p>
                        </div>
                        <Link href={route("security.create")}>
                            <Button
                                variant="light"
                                className="fw-semibold rounded-pill px-4"
                            >
                                ➕ Thêm sự cố
                            </Button>
                        </Link>
                    </div>

                    {/* Body */}
                    <Card.Body className="bg-white p-4">
                        {flash?.success && (
                            <div className="alert alert-success py-2 mb-3 rounded-3 shadow-sm">
                                ✅ {flash.success}
                            </div>
                        )}

                        {/* Filter */}
                        <Form onSubmit={onFilter} className="mb-4">
                            <Row className="g-3 align-items-end">
                                <Col md={5}>
                                    <Form.Label className="fw-semibold text-secondary">
                                        🔍 Tìm kiếm
                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Tiêu đề, mô tả, người báo cáo, vị trí..."
                                            value={q}
                                            onChange={(e) =>
                                                setQ(e.target.value)
                                            }
                                            className="shadow-sm rounded-start-3"
                                        />
                                        <Button
                                            variant="outline-danger"
                                            className="rounded-end-3"
                                            onClick={() => {
                                                setQ("");
                                                setStatus("");
                                                setSeverity("");
                                                router.get(
                                                    route("security.index")
                                                );
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </InputGroup>
                                </Col>

                                <Col md={3}>
                                    <Form.Label className="fw-semibold text-secondary">
                                        Trạng thái
                                    </Form.Label>
                                    <Form.Select
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        className="shadow-sm rounded-3"
                                    >
                                        <option value="">-- Tất cả --</option>
                                        {meta.STATUSES.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col md={3}>
                                    <Form.Label className="fw-semibold text-secondary">
                                        Mức độ
                                    </Form.Label>
                                    <Form.Select
                                        value={severity}
                                        onChange={(e) =>
                                            setSeverity(e.target.value)
                                        }
                                        className="shadow-sm rounded-3"
                                    >
                                        <option value="">-- Tất cả --</option>
                                        {meta.SEVERITIES.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col md="auto">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="fw-semibold rounded-pill px-4"
                                    >
                                        Lọc
                                    </Button>
                                </Col>
                            </Row>
                        </Form>

                        {/* Table */}
                        <div className="table-responsive shadow-sm rounded-3 border border-light">
                            <Table hover className="align-middle mb-0">
                                <thead className="bg-light text-secondary">
                                    <tr>
                                        <th>#</th>
                                        <th>Tiêu đề</th>
                                        <th>Mức độ</th>
                                        <th>Trạng thái</th>
                                        <th>Vị trí</th>
                                        <th>Thời điểm</th>
                                        <th>Người báo cáo</th>
                                        <th className="text-center">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incidents.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center py-4 text-muted"
                                            >
                                                Không có sự cố nào được ghi
                                                nhận.
                                            </td>
                                        </tr>
                                    )}

                                    {incidents.data.map((item) => (
                                        <tr key={item.id}>
                                            <td className="fw-semibold text-muted">
                                                {item.id}
                                            </td>
                                            <td>
                                                <Link
                                                    href={route(
                                                        "security.show",
                                                        item.id
                                                    )}
                                                    className="text-decoration-none fw-semibold text-dark"
                                                >
                                                    {item.title}
                                                </Link>
                                            </td>
                                            <td>
                                                <Badge
                                                    bg={
                                                        item.severity ===
                                                        "critical"
                                                            ? "danger"
                                                            : item.severity ===
                                                              "high"
                                                            ? "warning"
                                                            : item.severity ===
                                                              "medium"
                                                            ? "info"
                                                            : "secondary"
                                                    }
                                                    className="text-uppercase px-3 py-2 rounded-pill"
                                                >
                                                    {item.severity}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge
                                                    bg={
                                                        item.status ===
                                                        "resolved"
                                                            ? "success"
                                                            : item.status ===
                                                              "in_progress"
                                                            ? "primary"
                                                            : "secondary"
                                                    }
                                                    className="text-uppercase px-3 py-2 rounded-pill"
                                                >
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td>{item.location || "-"}</td>
                                            <td className="text-nowrap">
                                                {item.occurred_at
                                                    ? new Date(
                                                          item.occurred_at
                                                      ).toLocaleString("vi-VN")
                                                    : "-"}
                                            </td>
                                            <td>{item.reported_by || "-"}</td>
                                            <td className="text-nowrap text-center">
                                                <Link
                                                    href={route(
                                                        "security.edit",
                                                        item.id
                                                    )}
                                                >
                                                    <Button
                                                        size="sm"
                                                        variant="outline-warning"
                                                        className="me-2"
                                                    >
                                                        ✏️
                                                    </Button>
                                                </Link>
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route(
                                                        "security.destroy",
                                                        item.id
                                                    )}
                                                    className="btn btn-sm btn-outline-danger"
                                                    onBefore={() =>
                                                        confirm(
                                                            "Xóa sự cố này?"
                                                        )
                                                    }
                                                >
                                                    🗑
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {renderPagination()}
                    </Card.Body>

                    {/* Footer */}
                    <Card.Footer className="bg-light text-center text-muted small py-2">
                        SmartBuilding • Hệ thống quản lý sự cố & an ninh
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
