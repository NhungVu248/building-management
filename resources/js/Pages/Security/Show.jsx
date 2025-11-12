import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Card, Badge, Button, Container } from "react-bootstrap";

export default function ShowSecurity() {
    const { incident } = usePage().props;

    const severityColor = {
        critical: "danger",
        high: "warning",
        medium: "info",
        low: "secondary",
    };

    const statusColor = {
        resolved: "success",
        in_progress: "primary",
        open: "secondary",
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Head title={`Sự cố #${incident.id}`} />

            <Container style={{ maxWidth: "900px" }}>
                <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                    {/* Header */}
                    <div
                        className={`p-4 text-white ${
                            incident.severity === "critical"
                                ? "bg-danger"
                                : incident.severity === "high"
                                ? "bg-warning text-dark"
                                : incident.severity === "medium"
                                ? "bg-info text-dark"
                                : "bg-secondary"
                        }`}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="fw-bold mb-1">
                                    🛡️ Sự cố An ninh #{incident.id}
                                </h3>
                                <p className="mb-0 small opacity-75">
                                    Chi tiết thông tin sự cố được ghi nhận trong
                                    hệ thống.
                                </p>
                            </div>
                            <Badge
                                bg="light"
                                text={
                                    incident.severity === "high" ||
                                    incident.severity === "medium"
                                        ? "dark"
                                        : "danger"
                                }
                                className="px-3 py-2 rounded-pill text-uppercase shadow-sm"
                            >
                                {incident.severity}
                            </Badge>
                        </div>
                    </div>

                    {/* Body */}
                    <Card.Body className="p-4 bg-white">
                        <div className="mb-3 border-start border-4 border-primary ps-3">
                            <h5 className="fw-bold mb-1 text-dark">
                                {incident.title}
                            </h5>
                            <p className="text-muted mb-0">
                                <strong>Trạng thái: </strong>
                                <Badge
                                    bg={
                                        statusColor[incident.status] ||
                                        "secondary"
                                    }
                                    className="text-uppercase px-3 py-2 rounded-pill"
                                >
                                    {incident.status}
                                </Badge>
                            </p>
                        </div>

                        <div className="mb-3">
                            <strong>Mô tả:</strong>
                            <div className="bg-light p-3 rounded mt-1 text-dark">
                                {incident.description || (
                                    <em>Không có mô tả chi tiết.</em>
                                )}
                            </div>
                        </div>

                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <p className="mb-1">
                                    <strong>📍 Vị trí:</strong>{" "}
                                    {incident.location || (
                                        <span className="text-muted">-</span>
                                    )}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="mb-1">
                                    <strong>👤 Người báo cáo:</strong>{" "}
                                    {incident.reported_by || (
                                        <span className="text-muted">-</span>
                                    )}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="mb-1">
                                    <strong>🕒 Thời điểm xảy ra:</strong>{" "}
                                    {incident.occurred_at
                                        ? new Date(
                                              incident.occurred_at
                                          ).toLocaleString("vi-VN")
                                        : "-"}
                                </p>
                            </div>
                        </div>

                        <hr />

                        <div className="text-muted small">
                            <p className="mb-1">
                                <strong>🧭 Tạo lúc:</strong>{" "}
                                {new Date(incident.created_at).toLocaleString(
                                    "vi-VN"
                                )}
                            </p>
                            <p className="mb-0">
                                <strong>🧭 Cập nhật:</strong>{" "}
                                {new Date(incident.updated_at).toLocaleString(
                                    "vi-VN"
                                )}
                            </p>
                        </div>
                    </Card.Body>

                    {/* Footer */}
                    <Card.Footer className="bg-light d-flex justify-content-between align-items-center py-3 px-4">
                        <div className="d-flex gap-3">
                            <Button
                                as={Link}
                                href={route("security.index")}
                                variant="outline-secondary"
                                className="rounded-pill fw-semibold px-4"
                            >
                                ← Quay lại danh sách
                            </Button>
                            <Button
                                as={Link}
                                href={route("security.edit", incident.id)}
                                variant="outline-warning"
                                className="rounded-pill fw-semibold px-4"
                            >
                                ✏️ Chỉnh sửa
                            </Button>
                        </div>
                        <span className="text-muted small">
                            SmartBuilding • Hệ thống quản lý sự cố & an ninh
                        </span>
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
