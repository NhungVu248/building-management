import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

export default function VehicleForm() {
    const { item, cards } = usePage().props;
    const { data, setData, post, put, processing, errors } = useForm({
        plate: item?.plate ?? "",
        owner_name: item?.owner_name ?? "",
        access_card_id: item?.access_card_id ?? "",
        slot: item?.slot ?? "",
        status: item?.status ?? "active",
    });

    const submit = (e) => {
        e.preventDefault();
        if (item) put(route("vehicles.update", item.id));
        else post(route("vehicles.store"));
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container style={{ maxWidth: "850px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4">
                        <h4 className="fw-bold mb-1 flex items-center gap-2">
                            🚗{" "}
                            {item
                                ? "Cập nhật thông tin phương tiện"
                                : "Thêm phương tiện mới"}
                        </h4>
                        <p className="mb-0 text-blue-100 small">
                            Quản lý thông tin phương tiện ra/vào và thẻ truy cập
                            bãi xe của cư dân.
                        </p>
                    </div>

                    {/* Body */}
                    <Card.Body className="bg-white p-4">
                        <Form onSubmit={submit}>
                            {/* Thông tin cơ bản */}
                            <div className="mb-4 border-start border-4 border-blue-600 ps-3">
                                <h5 className="fw-bold text-blue-700 mb-3">
                                    Thông tin phương tiện
                                </h5>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Biển số{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={data.plate}
                                                onChange={(e) =>
                                                    setData(
                                                        "plate",
                                                        e.target.value
                                                    )
                                                }
                                                isInvalid={!!errors.plate}
                                                required
                                                placeholder="VD: 30A-12345"
                                                className="rounded-3 shadow-sm"
                                            />
                                            {errors.plate && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.plate}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Chủ sở hữu{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={data.owner_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "owner_name",
                                                        e.target.value
                                                    )
                                                }
                                                isInvalid={!!errors.owner_name}
                                                required
                                                placeholder="Tên cư dân / nhân viên"
                                                className="rounded-3 shadow-sm"
                                            />
                                            {errors.owner_name && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.owner_name}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Thẻ truy cập
                                            </Form.Label>
                                            <Form.Select
                                                value={
                                                    data.access_card_id || ""
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "access_card_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-3 shadow-sm"
                                            >
                                                <option value="">
                                                    -- Chưa gắn thẻ --
                                                </option>
                                                {cards.map((c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.code} -{" "}
                                                        {c.holder_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            {/* Thông tin vị trí và trạng thái */}
                            <div className="mb-4 border-start border-4 border-emerald-500 ps-3">
                                <h5 className="fw-bold text-emerald-700 mb-3">
                                    Vị trí & Trạng thái
                                </h5>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold text-gray-700">
                                                Vị trí đỗ xe
                                            </Form.Label>
                                            <Form.Control
                                                value={data.slot}
                                                onChange={(e) =>
                                                    setData(
                                                        "slot",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="VD: Hầm B2 - Khu A12"
                                                className="rounded-3 shadow-sm"
                                            />
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
                                                <option value="active">
                                                    Đang hoạt động
                                                </option>
                                                <option value="inactive">
                                                    Không hoạt động
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            {/* Nút hành động */}
                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                    className="rounded-pill fw-semibold px-4 shadow-sm"
                                >
                                    💾 {item ? "Cập nhật" : "Thêm mới"}
                                </Button>
                                <Button
                                    as={Link}
                                    href={route("vehicles.index")}
                                    variant="outline-secondary"
                                    className="rounded-pill fw-semibold px-4"
                                >
                                    ← Quay lại danh sách
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>

                    {/* Footer */}
                    <Card.Footer className="bg-light text-center text-muted small py-2">
                        SmartBuilding • Quản lý phương tiện & thẻ ra/vào
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
