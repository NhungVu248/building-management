import React from "react";
import { Form, Button, Row, Col, Card, Badge } from "react-bootstrap";

export default function SecurityForm({
    data,
    setData,
    processing,
    onSubmit,
    meta,
}) {
    return (
        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="fw-bold mb-1 flex items-center gap-2">
                        🛡️ Báo cáo sự cố an ninh
                    </h4>
                    <p className="text-orange-100 small mb-0">
                        Ghi nhận, đánh giá và quản lý các tình huống an ninh
                        trong tòa nhà.
                    </p>
                </div>
                <Badge
                    bg="light"
                    text="dark"
                    className="px-3 py-2 rounded-pill shadow-sm"
                >
                    {data.status || "Chưa xác định"}
                </Badge>
            </div>

            {/* Body */}
            <Card.Body className="bg-white p-4">
                <Form onSubmit={onSubmit}>
                    <Row className="g-3">
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label className="fw-semibold text-gray-700">
                                    Tiêu đề sự cố{" "}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ví dụ: Sự cố camera tại tầng 1"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                    className="rounded-3 shadow-sm"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold text-gray-700">
                                    Mức độ nghiêm trọng{" "}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Select
                                    value={data.severity}
                                    onChange={(e) =>
                                        setData("severity", e.target.value)
                                    }
                                    required
                                    className="rounded-3 shadow-sm"
                                >
                                    {meta.SEVERITIES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold text-gray-700">
                                    Trạng thái{" "}
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    required
                                    className="rounded-3 shadow-sm"
                                >
                                    {meta.STATUSES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold text-gray-700">
                                    Vị trí xảy ra
                                </Form.Label>
                                <Form.Control
                                    placeholder="VD: Hành lang tầng 1, Sảnh A..."
                                    value={data.location ?? ""}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    className="rounded-3 shadow-sm"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold text-gray-700">
                                    Thời điểm xảy ra
                                </Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={data.occurred_at ?? ""}
                                    onChange={(e) =>
                                        setData("occurred_at", e.target.value)
                                    }
                                    className="rounded-3 shadow-sm"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold text-gray-700">
                                    Người báo cáo
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tên nhân viên bảo vệ hoặc cư dân"
                                    value={data.reported_by ?? ""}
                                    onChange={(e) =>
                                        setData("reported_by", e.target.value)
                                    }
                                    className="rounded-3 shadow-sm"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group>
                                <Form.Label className="fw-semibold text-gray-700">
                                    Mô tả chi tiết
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Ghi rõ diễn biến, người liên quan, hành động đã thực hiện..."
                                    value={data.description ?? ""}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="rounded-3 shadow-sm"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex gap-3 mt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={processing}
                            className="rounded-pill fw-semibold px-4 shadow-sm"
                        >
                            💾 Lưu báo cáo
                        </Button>
                        <Button
                            type="button"
                            variant="outline-secondary"
                            className="rounded-pill fw-semibold px-4"
                            onClick={() => history.back()}
                        >
                            ↩ Quay lại
                        </Button>
                    </div>
                </Form>
            </Card.Body>

            {/* Footer */}
            <Card.Footer className="bg-light text-center text-muted small py-2">
                SmartBuilding • Quản lý sự cố & an ninh tòa nhà
            </Card.Footer>
        </Card>
    );
}
