import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Container, Table, Button, Badge, Card } from "react-bootstrap";
import { Calendar, Trash2, PlusCircle } from "lucide-react";

export default function AnnouncementsIndex({ announcements }) {
    const { flash } = usePage().props;

    return (
        <div className="min-vh-100 bg-light py-5">
            <Container>
                {/* --- Header --- */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1 text-primary">
                            📢 Quản lý Thông báo
                        </h2>
                        <p className="text-muted mb-0">
                            Danh sách thông báo gửi đến cư dân qua các kênh ứng
                            dụng, email, hoặc SMS.
                        </p>
                    </div>
                    <Link href={route("announcements.create")}>
                        <Button
                            variant="success"
                            className="shadow-sm rounded-pill px-3 py-2 fw-semibold"
                        >
                            <PlusCircle size={18} className="me-1" />
                            Tạo Thông báo
                        </Button>
                    </Link>
                </div>

                {/* --- Flash Messages --- */}
                {flash?.success && (
                    <div className="alert alert-success shadow-sm border-0 py-2 mb-3 rounded-3">
                        ✅ {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="alert alert-danger shadow-sm border-0 py-2 mb-3 rounded-3">
                        ⚠️ {flash.error}
                    </div>
                )}

                {/* --- Table Section --- */}
                <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                    <Card.Header className="bg-primary text-white fw-semibold py-3 d-flex align-items-center justify-content-between">
                        <span>Danh sách Thông báo</span>
                        <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-pill"
                        >
                            Tổng số: {announcements.total}
                        </Badge>
                    </Card.Header>

                    <div className="table-responsive">
                        <Table hover borderless className="align-middle mb-0">
                            <thead className="bg-light border-bottom">
                                <tr className="text-secondary text-uppercase small">
                                    <th className="ps-4">#</th>
                                    <th>Tiêu đề</th>
                                    <th>Kênh gửi</th>
                                    <th>Thời gian gửi</th>
                                    <th>Ngày tạo</th>
                                    <th className="text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.data.length > 0 ? (
                                    announcements.data.map((a) => (
                                        <tr
                                            key={a.id}
                                            className="border-bottom"
                                        >
                                            <td className="ps-4 fw-semibold text-muted">
                                                {a.id}
                                            </td>
                                            <td className="fw-semibold">
                                                {a.title}
                                            </td>
                                            <td>
                                                <Badge
                                                    bg={
                                                        a.channel === "email"
                                                            ? "info"
                                                            : a.channel ===
                                                              "sms"
                                                            ? "warning"
                                                            : a.channel ===
                                                              "all"
                                                            ? "success"
                                                            : "secondary"
                                                    }
                                                    className="px-3 py-2 text-uppercase"
                                                >
                                                    {a.channel}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Calendar
                                                    size={14}
                                                    className="text-muted me-1"
                                                />
                                                {a.scheduled_at
                                                    ? new Date(
                                                          a.scheduled_at
                                                      ).toLocaleString("vi-VN")
                                                    : "Gửi ngay"}
                                            </td>
                                            <td>
                                                {new Date(
                                                    a.created_at
                                                ).toLocaleDateString("vi-VN")}
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route(
                                                        "announcements.destroy",
                                                        a.id
                                                    )}
                                                    className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 d-inline-flex align-items-center"
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                "Bạn có chắc muốn xóa thông báo này?"
                                                            )
                                                        )
                                                            e.preventDefault();
                                                    }}
                                                >
                                                    <Trash2
                                                        size={14}
                                                        className="me-1"
                                                    />{" "}
                                                    Xóa
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-5 text-muted"
                                        >
                                            <div className="fw-semibold">
                                                Chưa có thông báo nào
                                            </div>
                                            <div className="small text-muted">
                                                Nhấn “Tạo Thông báo” để thêm
                                                mới.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card>

                {/* --- Pagination --- */}
                {announcements.links?.length > 0 && (
                    <div className="d-flex justify-content-center mt-4">
                        {announcements.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`btn btn-sm mx-1 rounded-pill shadow-sm ${
                                    link.active
                                        ? "btn-primary"
                                        : "btn-outline-secondary"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
