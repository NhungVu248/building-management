import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Container,
    Button,
    Table,
    Badge,
    OverlayTrigger,
    Tooltip,
    Card,
} from "react-bootstrap";

export default function WorkOrdersIndex() {
    const { items } = usePage().props;

    const statusBadge = (status) => {
        const colors = {
            new: "secondary",
            assigned: "info",
            in_progress: "primary",
            waiting_material: "warning",
            completed: "success",
            closed: "dark",
        };
        const labels = {
            new: "Mới",
            assigned: "Đã giao",
            in_progress: "Đang xử lý",
            waiting_material: "Chờ vật tư",
            completed: "Hoàn thành",
            closed: "Đã đóng",
        };
        return (
            <Badge bg={colors[status] || "secondary"}>
                {labels[status] || status}
            </Badge>
        );
    };

    const priorityBadge = (priority) => {
        const colors = {
            low: "secondary",
            normal: "info",
            high: "warning",
            urgent: "danger",
        };
        const labels = {
            low: "Thấp",
            normal: "Trung bình",
            high: "Cao",
            urgent: "Khẩn cấp",
        };
        return (
            <Badge bg={colors[priority] || "secondary"}>
                {labels[priority] || priority}
            </Badge>
        );
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-0 flex items-center gap-2">
                                🧾 Danh sách Work Orders
                            </h4>
                            <p className="text-blue-100 small mb-0">
                                Theo dõi, phân công và quản lý công việc bảo
                                trì, kỹ thuật của tòa nhà.
                            </p>
                        </div>
                        <Button
                            as={Link}
                            href={route("work-orders.create")}
                            variant="light"
                            className="fw-semibold text-blue-700 px-4 rounded-pill shadow-sm"
                        >
                            + Thêm Work Order
                        </Button>
                    </div>

                    {/* BODY */}
                    <Card.Body className="p-4 bg-white">
                        <div className="table-responsive">
                            <Table hover className="align-middle text-sm mb-0">
                                <thead className="bg-blue-50">
                                    <tr className="text-blue-700 fw-semibold text-center">
                                        <th style={{ width: "50px" }}>#</th>
                                        <th className="text-start">Tiêu đề</th>
                                        <th>Nguồn</th>
                                        <th>Ưu tiên</th>
                                        <th>Trạng thái</th>
                                        <th>Kỹ thuật viên</th>
                                        <th>Ngày hoàn thành</th>
                                        <th>Chi phí (VNĐ)</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="text-center text-muted py-4"
                                            >
                                                <div className="py-4">
                                                    <span className="text-4xl">
                                                        📋
                                                    </span>
                                                    <p className="mt-2 mb-0">
                                                        Chưa có Work Order nào.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "work-orders.create"
                                                        )}
                                                        className="text-blue-600 fw-semibold hover:underline"
                                                    >
                                                        Tạo công việc mới
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        items.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="text-center fw-bold text-muted">
                                                    {item.id}
                                                </td>
                                                <td className="text-start">
                                                    <div className="fw-semibold text-gray-800">
                                                        {item.title}
                                                    </div>
                                                    <small className="text-muted">
                                                        {item.source}
                                                    </small>
                                                </td>
                                                <td className="text-center text-muted">
                                                    {item.source}
                                                </td>
                                                <td className="text-center">
                                                    {priorityBadge(
                                                        item.priority
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {statusBadge(item.status)}
                                                </td>
                                                <td className="text-center">
                                                    {item.technician_name ??
                                                        "-"}
                                                </td>
                                                <td className="text-center">
                                                    {item.completed_at ?? "-"}
                                                </td>
                                                <td className="text-center fw-semibold text-blue-700">
                                                    {item.cost
                                                        ? new Intl.NumberFormat(
                                                              "vi-VN"
                                                          ).format(item.cost)
                                                        : "-"}
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip>
                                                                    Chỉnh sửa
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                as={Link}
                                                                href={route(
                                                                    "work-orders.edit",
                                                                    item.id
                                                                )}
                                                                size="sm"
                                                                variant="outline-warning"
                                                                className="rounded-circle"
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
                                                                    "work-orders.destroy",
                                                                    item.id
                                                                )}
                                                                method="delete"
                                                                size="sm"
                                                                variant="outline-danger"
                                                                className="rounded-circle"
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
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
