import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Container, Form, Button, Card, Badge } from "react-bootstrap";

export default function CreateAnnouncement() {
    const { errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        title: "",
        content: "",
        channel: "app",
        scheduled_at: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("announcements.store"));
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container style={{ maxWidth: "850px" }}>
                <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                    {/* --- HEADER --- */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="fw-bold mb-1">
                                📝 Tạo Thông Báo Mới
                            </h3>
                            <p className="text-light small mb-0 opacity-75">
                                Gửi thông tin đến cư dân qua các kênh thông báo
                                được chọn.
                            </p>
                        </div>
                        <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-pill shadow-sm"
                        >
                            Quản lý thông báo
                        </Badge>
                    </div>

                    {/* --- FORM BODY --- */}
                    <Card.Body className="bg-white p-4">
                        {Object.keys(errors).length > 0 && (
                            <div className="alert alert-danger rounded-3 shadow-sm">
                                <h6 className="fw-bold mb-2">
                                    ⚠️ Có lỗi xảy ra:
                                </h6>
                                <ul className="mb-0 ps-3">
                                    {Object.values(errors).map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Form onSubmit={submit}>
                            {/* Tiêu đề */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">
                                    📌 Tiêu đề thông báo
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tiêu đề thông báo..."
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="rounded-3"
                                    isInvalid={!!errors.title}
                                />
                                {errors.title && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            {/* Nội dung */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">
                                    📝 Nội dung chi tiết
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Nhập nội dung thông báo gửi đến cư dân..."
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                    className="rounded-3"
                                    isInvalid={!!errors.content}
                                />
                                {errors.content && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.content}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            {/* Kênh gửi */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">
                                    📢 Kênh gửi thông báo
                                </Form.Label>
                                <Form.Select
                                    value={data.channel}
                                    onChange={(e) =>
                                        setData("channel", e.target.value)
                                    }
                                    className="rounded-3"
                                    isInvalid={!!errors.channel}
                                >
                                    <option value="app">Ứng dụng (App)</option>
                                    <option value="email">Email</option>
                                    <option value="sms">SMS</option>
                                    <option value="all">Tất cả kênh</option>
                                </Form.Select>
                                {errors.channel && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.channel}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            {/* Thời gian gửi */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold text-dark">
                                    ⏰ Thời gian gửi (tùy chọn)
                                </Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={data.scheduled_at}
                                    onChange={(e) =>
                                        setData("scheduled_at", e.target.value)
                                    }
                                    className="rounded-3"
                                    isInvalid={!!errors.scheduled_at}
                                />
                                {errors.scheduled_at && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.scheduled_at}
                                    </Form.Control.Feedback>
                                )}
                                <Form.Text className="text-muted">
                                    Nếu để trống, thông báo sẽ được gửi ngay lập
                                    tức.
                                </Form.Text>
                            </Form.Group>

                            {/* Nút hành động */}
                            <div className="d-flex justify-content-end mt-4">
                                <Button
                                    as={Link}
                                    href={route("announcements.index")}
                                    variant="outline-secondary"
                                    className="rounded-pill px-4 me-2"
                                >
                                    ← Quay lại
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="rounded-pill px-4 fw-semibold shadow-sm"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "⏳ Đang gửi..."
                                        : "🚀 Tạo thông báo"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>

                    {/* --- FOOTER --- */}
                    <Card.Footer className="bg-light text-center text-muted small py-3">
                        SmartBuilding • Trung tâm quản lý thông báo cư dân
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
