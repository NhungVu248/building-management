import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import {
    Container,
    Form,
    Button,
    Card,
    Row,
    Col,
    Badge,
} from "react-bootstrap";

export default function Edit({ ticket, residents }) {
    const { errors } = usePage().props;
    const { data, setData, put, processing } = useForm({
        subject: ticket.subject || "",
        description: ticket.description || "",
        priority: ticket.priority || "medium",
        status: ticket.status || "open",
        resident_id: ticket.resident_id || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("tickets.update", ticket.id));
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container style={{ maxWidth: "850px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-1 flex items-center gap-2">
                                ✏️ Cập nhật Ticket #{ticket.id}
                            </h4>
                            <p className="text-indigo-100 small mb-0">
                                Chỉnh sửa nội dung phản ánh, thay đổi trạng thái
                                hoặc mức ưu tiên.
                            </p>
                        </div>
                        <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-pill shadow-sm"
                        >
                            {ticket.status === "resolved"
                                ? "Đã giải quyết"
                                : ticket.status === "in_progress"
                                ? "Đang xử lý"
                                : ticket.status === "closed"
                                ? "Đã đóng"
                                : "Mở"}
                        </Badge>
                    </div>

                    {/* Body */}
                    <Card.Body className="bg-white p-4">
                        <Form onSubmit={submit}>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold text-gray-700">
                                            Chủ đề{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập tiêu đề phản ánh..."
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    "subject",
                                                    e.target.value
                                                )
                                            }
                                            isInvalid={!!errors.subject}
                                            className="rounded-3 shadow-sm"
                                        />
                                        {errors.subject && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.subject}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold text-gray-700">
                                            Mô tả chi tiết
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Nhập mô tả cụ thể của phản ánh hoặc vấn đề..."
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-3 shadow-sm"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold text-gray-700">
                                            Mức ưu tiên
                                        </Form.Label>
                                        <Form.Select
                                            value={data.priority}
                                            onChange={(e) =>
                                                setData(
                                                    "priority",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-3 shadow-sm"
                                        >
                                            <option value="low">Thấp</option>
                                            <option value="medium">
                                                Trung bình
                                            </option>
                                            <option value="high">Cao</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold text-gray-700">
                                            Trạng thái Ticket
                                        </Form.Label>
                                        <Form.Select
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-3 shadow-sm"
                                        >
                                            <option value="open">Mở</option>
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
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold text-gray-700">
                                            Cư dân liên quan (tuỳ chọn)
                                        </Form.Label>
                                        <Form.Select
                                            value={data.resident_id}
                                            onChange={(e) =>
                                                setData(
                                                    "resident_id",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-3 shadow-sm"
                                        >
                                            <option value="">
                                                -- Không chọn --
                                            </option>
                                            {residents.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    {r.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Action buttons */}
                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="primary"
                                    className="rounded-pill fw-semibold px-4 shadow-sm"
                                >
                                    💾 Cập nhật Ticket
                                </Button>
                                <Link
                                    href={route("tickets.index")}
                                    className="btn btn-outline-secondary rounded-pill fw-semibold px-4"
                                >
                                    ↩ Quay lại danh sách
                                </Link>
                            </div>
                        </Form>
                    </Card.Body>

                    {/* Footer */}
                    <Card.Footer className="bg-light text-center text-muted small py-2">
                        SmartBuilding • Quản lý phản ánh & yêu cầu cư dân
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
