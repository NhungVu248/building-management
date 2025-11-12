import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    Table,
    Button,
    Container,
    Badge,
    Form,
    Card,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

export default function Index({ tickets }) {
    const { flash } = usePage().props;
    const { data, setData, patch } = useForm({ status: "" });

    const handleStatusChange = (id, e) => {
        setData("status", e.target.value);
        patch(route("tickets.status", id));
    };

    const priorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "danger";
            case "medium":
                return "warning";
            default:
                return "success";
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case "open":
                return "secondary";
            case "in_progress":
                return "info";
            case "resolved":
                return "success";
            case "closed":
                return "dark";
            default:
                return "light";
        }
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-1 flex items-center gap-2">
                                📋 Danh sách Ticket / Phản ánh cư dân
                            </h4>
                            <p className="text-indigo-100 small mb-0">
                                Theo dõi, xử lý và cập nhật trạng thái phản ánh
                                của cư dân trong tòa nhà.
                            </p>
                        </div>
                        <Button
                            as={Link}
                            href={route("tickets.create")}
                            variant="light"
                            className="text-blue-700 fw-semibold px-4 py-2 rounded-pill shadow-sm"
                        >
                            ➕ Tạo Ticket mới
                        </Button>
                    </div>

                    {/* BODY */}
                    <Card.Body className="bg-white p-4">
                        {flash?.success && (
                            <div className="alert alert-success mb-4 shadow-sm">
                                ✅ {flash.success}
                            </div>
                        )}

                        <div className="table-responsive">
                            <Table hover className="align-middle text-sm">
                                <thead className="bg-blue-50">
                                    <tr className="text-blue-700 fw-semibold text-center">
                                        <th style={{ width: "60px" }}>#</th>
                                        <th>Chủ đề</th>
                                        <th>Cư dân</th>
                                        <th>Ưu tiên</th>
                                        <th>Trạng thái</th>
                                        <th>Ngày tạo</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center py-5"
                                            >
                                                <div className="text-muted">
                                                    <div className="text-4xl mb-2">
                                                        🧾
                                                    </div>
                                                    <p className="mb-1">
                                                        Hiện chưa có phản ánh
                                                        nào.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "tickets.create"
                                                        )}
                                                        className="fw-semibold text-blue-600 hover:underline"
                                                    >
                                                        ➕ Tạo Ticket mới
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        tickets.data.map((t) => (
                                            <tr
                                                key={t.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="text-center text-muted fw-semibold">
                                                    {t.id}
                                                </td>
                                                <td className="fw-semibold text-gray-800">
                                                    {t.subject}
                                                </td>
                                                <td>
                                                    {t.resident?.name || "-"}
                                                </td>
                                                <td className="text-center">
                                                    <Badge
                                                        bg={priorityColor(
                                                            t.priority
                                                        )}
                                                        className="px-3 py-2 rounded-pill"
                                                    >
                                                        {t.priority === "high"
                                                            ? "Cao"
                                                            : t.priority ===
                                                              "medium"
                                                            ? "Trung bình"
                                                            : "Thấp"}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">
                                                    <Form.Select
                                                        size="sm"
                                                        value={t.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                t.id,
                                                                e
                                                            )
                                                        }
                                                        className={`fw-semibold border-0 shadow-sm rounded-pill text-center text-${statusColor(
                                                            t.status
                                                        )}`}
                                                    >
                                                        <option value="open">
                                                            Mở
                                                        </option>
                                                        <option value="in_progress">
                                                            Đang xử lý
                                                        </option>
                                                        <option value="resolved">
                                                            Đã giải quyết
                                                        </option>
                                                        <option value="closed">
                                                            Đã đóng
                                                        </option>
                                                    </Form.Select>
                                                </td>
                                                <td className="text-center text-muted small">
                                                    {new Date(
                                                        t.created_at
                                                    ).toLocaleDateString(
                                                        "vi-VN"
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip>
                                                                    Chỉnh sửa
                                                                    Ticket
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                as={Link}
                                                                href={route(
                                                                    "tickets.edit",
                                                                    t.id
                                                                )}
                                                                size="sm"
                                                                variant="outline-warning"
                                                                className="rounded-circle shadow-sm"
                                                            >
                                                                ✏️
                                                            </Button>
                                                        </OverlayTrigger>

                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip>
                                                                    Xóa
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                as={Link}
                                                                href={route(
                                                                    "tickets.destroy",
                                                                    t.id
                                                                )}
                                                                method="delete"
                                                                size="sm"
                                                                variant="outline-danger"
                                                                className="rounded-circle shadow-sm"
                                                            >
                                                                🗑️
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {tickets.links && (
                            <div className="d-flex justify-content-center mt-4">
                                {tickets.links.map((link, i) => (
                                    <Button
                                        key={i}
                                        as={Link}
                                        href={link.url || "#"}
                                        disabled={!link.url}
                                        variant={
                                            link.active
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        size="sm"
                                        className="me-1 rounded-pill"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </Card.Body>

                    {/* FOOTER */}
                    <Card.Footer className="bg-light text-center text-muted small py-2">
                        SmartBuilding • Quản lý phản ánh & yêu cầu cư dân
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
