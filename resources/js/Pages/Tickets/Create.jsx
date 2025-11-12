import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

export default function Create({ residents }) {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        subject: "",
        description: "",
        priority: "medium",
        resident_id: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("tickets.store"));
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container style={{ maxWidth: "800px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-4">
                        <h4 className="fw-bold mb-1 flex items-center gap-2">
                            🧾 Tạo Ticket mới
                        </h4>
                        <p className="text-indigo-100 small mb-0">
                            Gửi phản ánh hoặc yêu cầu xử lý cho ban quản lý tòa
                            nhà.
                        </p>
                    </div>

                    {/* BODY */}
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
                                            placeholder="Mô tả cụ thể nội dung phản ánh, ví dụ: sự cố thang máy tầng 3..."
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
                                            Cư dân gửi phản ánh (tùy chọn)
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

                            {/* ACTION BUTTONS */}
                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="primary"
                                    className="rounded-pill fw-semibold px-4 shadow-sm"
                                >
                                    💾 Lưu Ticket
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

                    {/* FOOTER */}
                    <Card.Footer className="bg-light text-center text-muted small py-2">
                        SmartBuilding • Gửi và quản lý phản ánh cư dân
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
