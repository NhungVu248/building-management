import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Card, Button, Container, Badge } from "react-bootstrap";
import SecurityForm from "./_Form";

export default function EditSecurity() {
    const { incident, meta } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        title: incident.title ?? "",
        description: incident.description ?? "",
        reported_by: incident.reported_by ?? "",
        location: incident.location ?? "",
        occurred_at: incident.occurred_at
            ? incident.occurred_at.substring(0, 16)
            : "",
        severity: incident.severity ?? meta?.SEVERITIES?.[0] ?? "low",
        status: incident.status ?? meta?.STATUSES?.[0] ?? "open",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("security.update", incident.id));
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Head title={`Sửa sự cố #${incident.id}`} />

            <Container style={{ maxWidth: "900px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-1 flex items-center gap-2">
                                🛠️ Chỉnh sửa sự cố an ninh #{incident.id}
                            </h4>
                            <p className="text-amber-100 small mb-0">
                                Cập nhật thông tin, mức độ và trạng thái của sự
                                cố.
                            </p>
                        </div>
                        <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-pill shadow-sm text-uppercase"
                        >
                            {data.status}
                        </Badge>
                    </div>

                    {/* BODY */}
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

                        <SecurityForm
                            data={data}
                            setData={setData}
                            processing={processing}
                            onSubmit={submit}
                            meta={meta}
                        />
                    </Card.Body>

                    {/* FOOTER */}
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
                                href={route("security.show", incident.id)}
                                variant="outline-primary"
                                className="rounded-pill fw-semibold px-4"
                            >
                                👁️ Xem chi tiết
                            </Button>
                        </div>
                        <span className="text-muted small">
                            SmartBuilding • Hệ thống quản lý an ninh & sự cố
                        </span>
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
