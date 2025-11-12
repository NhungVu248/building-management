import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Container, Card, Badge, Button, Row, Col } from "react-bootstrap";

export default function WorkOrderView() {
    const { item } = usePage().props;

    // Badge màu trạng thái
    const statusColors = {
        new: "secondary",
        assigned: "info",
        in_progress: "primary",
        waiting_material: "warning",
        completed: "success",
        closed: "dark",
    };

    const priorityColors = {
        low: "secondary",
        normal: "info",
        high: "warning",
        urgent: "danger",
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container style={{ maxWidth: "800px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4">
                        <h4 className="fw-bold mb-1 flex items-center gap-2">
                            🧾 Chi tiết Work Order #{item.id}
                        </h4>
                        <p className="mb-0 text-blue-100 small">
                            Thông tin chi tiết về công việc bảo trì, tình trạng
                            và nhân sự phụ trách.
                        </p>
                    </div>

                    {/* BODY */}
                    <Card.Body className="bg-white p-4">
                        <Row className="mb-4">
                            <Col md={8}>
                                <h5 className="fw-bold text-blue-700 mb-3">
                                    Thông tin chung
                                </h5>
                                <p className="mb-2">
                                    <strong>Tiêu đề:</strong> {item.title}
                                </p>
                                <p className="mb-2">
                                    <strong>Nguồn:</strong>{" "}
                                    <Badge
                                        bg="light"
                                        text="dark"
                                        className="border"
                                    >
                                        {item.source}
                                    </Badge>
                                </p>
                                <p className="mb-2">
                                    <strong>Ưu tiên:</strong>{" "}
                                    <Badge
                                        bg={
                                            priorityColors[item.priority] ||
                                            "secondary"
                                        }
                                        className="text-uppercase"
                                    >
                                        {item.priority}
                                    </Badge>
                                </p>
                                <p className="mb-2">
                                    <strong>Trạng thái:</strong>{" "}
                                    <Badge
                                        bg={
                                            statusColors[item.status] ||
                                            "secondary"
                                        }
                                        className="text-uppercase"
                                    >
                                        {item.status}
                                    </Badge>
                                </p>
                            </Col>

                            <Col md={4}>
                                <h5 className="fw-bold text-blue-700 mb-3">
                                    Phụ trách
                                </h5>
                                <p className="mb-2">
                                    <strong>Kỹ thuật viên:</strong>
                                    <br />
                                    {item.technician_name ?? (
                                        <span className="text-muted">
                                            Chưa phân công
                                        </span>
                                    )}
                                </p>
                                <p className="mb-2">
                                    <strong>Hạn hoàn thành:</strong>
                                    <br />
                                    {item.due_date ?? (
                                        <span className="text-muted">-</span>
                                    )}
                                </p>
                                <p className="mb-2">
                                    <strong>Hoàn thành:</strong>
                                    <br />
                                    {item.completed_at ?? (
                                        <span className="text-muted">-</span>
                                    )}
                                </p>
                            </Col>
                        </Row>

                        {/* MÔ TẢ */}
                        <div className="mb-4">
                            <h5 className="fw-bold text-blue-700 mb-3">
                                Mô tả công việc
                            </h5>
                            <div className="p-3 bg-gray-50 rounded-3 border text-gray-700">
                                {item.description ? (
                                    <p className="mb-0 whitespace-pre-line">
                                        {item.description}
                                    </p>
                                ) : (
                                    <p className="text-muted mb-0">
                                        Không có mô tả chi tiết.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* CHI PHÍ */}
                        <div className="mb-4">
                            <h5 className="fw-bold text-blue-700 mb-3">
                                Chi phí & Thanh toán
                            </h5>
                            <p className="fs-5 fw-semibold text-blue-600">
                                💰{" "}
                                {item.cost
                                    ? new Intl.NumberFormat("vi-VN").format(
                                          item.cost
                                      ) + " ₫"
                                    : "0 ₫"}
                            </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="d-flex gap-3">
                            <Button
                                as={Link}
                                href={route("work-orders.edit", item.id)}
                                variant="warning"
                                className="rounded-pill fw-semibold px-4 shadow-sm"
                            >
                                ✏️ Chỉnh sửa
                            </Button>
                            <Button
                                as={Link}
                                href={route("work-orders.index")}
                                variant="outline-secondary"
                                className="rounded-pill fw-semibold px-4"
                            >
                                ← Quay lại danh sách
                            </Button>
                        </div>
                    </Card.Body>

                    {/* FOOTER */}
                    <Card.Footer className="bg-light text-center text-muted small py-2">
                        Cập nhật lần cuối: {item.updated_at ?? "-"}
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
