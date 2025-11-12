import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Card, Button, Container, Badge } from "react-bootstrap";
import SecurityForm from "./_Form";

export default function CreateSecurity() {
    const { meta } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        reported_by: "",
        location: "",
        occurred_at: "",
        severity: meta?.SEVERITIES?.[0] ?? "low",
        status: meta?.STATUSES?.[0] ?? "open",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("security.store"));
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Head title="Thêm sự cố an ninh" />
            <Container style={{ maxWidth: "900px" }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-1 flex items-center gap-2">
                                🛡️ Thêm mới sự cố an ninh
                            </h4>
                            <p className="text-orange-100 small mb-0">
                                Ghi nhận chi tiết sự cố, thời gian và người báo
                                cáo.
                            </p>
                        </div>
                        <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-pill shadow-sm"
                        >
                            {data.status?.toUpperCase()}
                        </Badge>
                    </div>

                    {/* BODY */}
                    <Card.Body className="bg-white p-4">
                        {Object.keys(errors).length > 0 && (
                            <div className="alert alert-danger rounded-3 shadow-sm">
                                <h6 className="fw-bold mb-2">
                                    ⚠️ Vui lòng kiểm tra lại:
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
                        <Button
                            as={Link}
                            href={route("security.index")}
                            variant="outline-secondary"
                            className="rounded-pill fw-semibold px-4"
                        >
                            ← Quay lại danh sách
                        </Button>
                        <span className="text-muted small">
                            SmartBuilding • Hệ thống quản lý an ninh & sự cố
                        </span>
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
