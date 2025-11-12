import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

export default function WorkOrderForm() {
    const { item } = usePage().props;

    const { data, setData, post, put, processing } = useForm({
        title: item?.title || "",
        source: item?.source || "manual",
        description: item?.description || "",
        priority: item?.priority || "normal",
        status: item?.status || "new",
        technician_name: item?.technician_name || "",
        due_date: item?.due_date || "",
        completed_at: item?.completed_at || "",
        cost: item?.cost || "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (item) put(route("work-orders.update", item.id));
        else post(route("work-orders.store"));
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container style={{ maxWidth: "900px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4">
                        <h4 className="fw-bold mb-1 flex items-center gap-2">
                            🧾{" "}
                            {item ? "Cập nhật Work Order" : "Thêm Work Order"}
                        </h4>
                        <p className="mb-0 text-blue-100 small">
                            Quản lý công việc bảo trì, sự cố hoặc yêu cầu kỹ
                            thuật trong tòa nhà.
                        </p>
                    </div>

                    {/* BODY */}
                    <Card.Body className="bg-white px-4 py-5">
                        <Form onSubmit={submit}>
                            {/* THÔNG TIN CHUNG */}
                            <div className="mb-4 border-start border-4 border-blue-600 ps-3 mb-4">
                                <h5 className="fw-bold text-blue-700 mb-3">
                                    Thông tin chung
                                </h5>
                                <Row>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Tiêu đề công việc{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                placeholder="Nhập tiêu đề công việc..."
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-3 shadow-sm"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Nguồn phát sinh
                                            </Form.Label>
                                            <Form.Select
                                                value={data.source}
                                                onChange={(e) =>
                                                    setData(
                                                        "source",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-3 shadow-sm"
                                            >
                                                <option value="manual">
                                                    Thủ công
                                                </option>
                                                <option value="resident">
                                                    Cư dân
                                                </option>
                                                <option value="incident">
                                                    Sự cố
                                                </option>
                                                <option value="schedule">
                                                    Định kỳ
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            {/* PHÂN CÔNG & ƯU TIÊN */}
                            <div className="mb-4 border-start border-4 border-emerald-500 ps-3 mb-4">
                                <h5 className="fw-bold text-emerald-700 mb-3">
                                    Phân công & Ưu tiên
                                </h5>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Mức độ ưu tiên
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
                                                <option value="low">
                                                    Thấp
                                                </option>
                                                <option value="normal">
                                                    Trung bình
                                                </option>
                                                <option value="high">
                                                    Cao
                                                </option>
                                                <option value="urgent">
                                                    Khẩn cấp
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Trạng thái
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
                                                <option value="new">Mới</option>
                                                <option value="assigned">
                                                    Đã giao
                                                </option>
                                                <option value="in_progress">
                                                    Đang thực hiện
                                                </option>
                                                <option value="waiting_material">
                                                    Chờ vật tư
                                                </option>
                                                <option value="completed">
                                                    Hoàn thành
                                                </option>
                                                <option value="closed">
                                                    Đã đóng
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Kỹ thuật viên phụ trách
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="Nhập tên kỹ thuật viên..."
                                                value={data.technician_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "technician_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-3 shadow-sm"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            {/* THỜI GIAN & CHI PHÍ */}
                            <div className="mb-4 border-start border-4 border-amber-500 ps-3 mb-4">
                                <h5 className="fw-bold text-amber-600 mb-3">
                                    Thời gian & Chi phí
                                </h5>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Hạn hoàn thành
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={data.due_date ?? ""}
                                                onChange={(e) =>
                                                    setData(
                                                        "due_date",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-3 shadow-sm"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Ngày hoàn thành thực tế
                                            </Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                value={data.completed_at ?? ""}
                                                onChange={(e) =>
                                                    setData(
                                                        "completed_at",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-3 shadow-sm"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group
                                    className="mb-3"
                                    style={{ maxWidth: 300 }}
                                >
                                    <Form.Label className="fw-semibold text-gray-700">
                                        Chi phí (VNĐ)
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        placeholder="Nhập chi phí..."
                                        value={data.cost}
                                        onChange={(e) =>
                                            setData("cost", e.target.value)
                                        }
                                        className="rounded-3 shadow-sm"
                                    />
                                </Form.Group>
                            </div>

                            {/* MÔ TẢ */}
                            <div className="mb-4 border-start border-4 border-purple-500 ps-3 mb-4">
                                <h5 className="fw-bold text-purple-700 mb-3">
                                    Mô tả chi tiết
                                </h5>
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Nhập mô tả chi tiết công việc, thiết bị, khu vực..."
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
                            </div>

                            {/* NÚT HÀNH ĐỘNG */}
                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 border-0 px-4 py-2 rounded-pill fw-semibold shadow-sm hover:bg-blue-700 transition"
                                >
                                    {item
                                        ? "💾 Cập nhật Work Order"
                                        : "➕ Tạo Work Order mới"}
                                </Button>

                                <Button
                                    as={Link}
                                    href={route("work-orders.index")}
                                    variant="outline-secondary"
                                    className="rounded-pill px-4 fw-semibold"
                                >
                                    ← Quay lại danh sách
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
