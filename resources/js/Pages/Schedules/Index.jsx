import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    Container,
    Button,
    Table,
    Badge,
    Card,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import dayjs from "dayjs";

export default function Index() {
    const { items } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Bạn có chắc muốn xóa lịch này không?")) {
            router.delete(route("maintenance-schedules.destroy", id));
        }
    };

    const handleGenerate = (id) => {
        if (confirm("Sinh Work Order từ lịch này?")) {
            router.post(route("maintenance-schedules.generate", id));
        }
    };

    const colorMap = {
        weekly: "info",
        monthly: "primary",
        quarterly: "warning",
        yearly: "success",
    };

    const labelMap = {
        weekly: "Hàng tuần",
        monthly: "Hàng tháng",
        quarterly: "Hàng quý",
        yearly: "Hàng năm",
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-0 flex items-center gap-2">
                                🧭 Lịch bảo dưỡng định kỳ
                            </h4>
                            <p className="text-blue-100 small mb-0">
                                Theo dõi và quản lý kế hoạch bảo trì cho thiết
                                bị, hệ thống tòa nhà.
                            </p>
                        </div>
                        <Button
                            as={Link}
                            href={route("maintenance-schedules.create")}
                            variant="light"
                            className="fw-semibold text-blue-700 px-4 rounded-pill shadow-sm"
                        >
                            + Thêm lịch mới
                        </Button>
                    </div>

                    {/* Body */}
                    <Card.Body className="bg-white p-4">
                        <div className="table-responsive">
                            <Table hover className="align-middle mb-0 text-sm">
                                <thead className="bg-blue-50">
                                    <tr className="text-blue-700 fw-semibold text-center">
                                        <th style={{ width: "50px" }}>#</th>
                                        <th className="text-start">
                                            Thiết bị / Hệ thống
                                        </th>
                                        <th>Tần suất</th>
                                        <th>Lần gần nhất</th>
                                        <th>Kế tiếp</th>
                                        <th>Ghi chú</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center text-muted py-4"
                                            >
                                                <div className="py-3">
                                                    <span className="text-4xl">
                                                        🗓️
                                                    </span>
                                                    <p className="mt-2 mb-0">
                                                        Chưa có lịch bảo dưỡng
                                                        nào.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "maintenance-schedules.create"
                                                        )}
                                                        className="text-blue-600 fw-semibold hover:underline"
                                                    >
                                                        Tạo lịch bảo dưỡng mới
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        items.data.map((s) => (
                                            <tr
                                                key={s.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="text-center fw-bold text-muted">
                                                    {s.id}
                                                </td>
                                                <td className="text-start fw-semibold text-gray-800">
                                                    {s.asset_name}
                                                </td>
                                                <td className="text-center">
                                                    <Badge
                                                        bg={
                                                            colorMap[
                                                                s.frequency
                                                            ]
                                                        }
                                                        className="px-3 py-2"
                                                    >
                                                        {labelMap[
                                                            s.frequency
                                                        ] || s.frequency}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">
                                                    {s.last_run_on
                                                        ? dayjs(
                                                              s.last_run_on
                                                          ).format("DD/MM/YYYY")
                                                        : "-"}
                                                </td>
                                                <td className="text-center fw-semibold text-blue-700">
                                                    {s.next_run_on
                                                        ? dayjs(
                                                              s.next_run_on
                                                          ).format("DD/MM/YYYY")
                                                        : "-"}
                                                </td>
                                                <td className="text-muted small">
                                                    {s.notes ?? "-"}
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
                                                                    "maintenance-schedules.edit",
                                                                    s.id
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
                                                                    Sinh Work
                                                                    Order
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                size="sm"
                                                                variant="outline-success"
                                                                className="rounded-circle"
                                                                onClick={() =>
                                                                    handleGenerate(
                                                                        s.id
                                                                    )
                                                                }
                                                            >
                                                                ⚙️
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
                                                                size="sm"
                                                                variant="outline-danger"
                                                                className="rounded-circle"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        s.id
                                                                    )
                                                                }
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
                        {items.links && (
                            <div className="d-flex justify-content-center mt-4">
                                {items.links.map((link, i) => (
                                    <Button
                                        key={i}
                                        as={Link}
                                        href={link.url ?? "#"}
                                        disabled={!link.url}
                                        variant={
                                            link.active
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        size="sm"
                                        className="me-1"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
