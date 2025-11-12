import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    Container,
    Table,
    Button,
    Row,
    Col,
    Badge,
    Card,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

export default function VehiclesIndex() {
    const { items } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Bạn có chắc muốn xóa phương tiện này không?")) {
            router.delete(route("vehicles.destroy", id));
        }
    };

    return (
        <div className="min-vh-100 bg-gray-50 py-5">
            <Container>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-1 flex items-center gap-2">
                                🚗 Danh sách phương tiện
                            </h4>
                            <p className="mb-0 text-blue-100 small">
                                Quản lý thông tin xe ra vào, thẻ truy cập và
                                trạng thái hoạt động.
                            </p>
                        </div>
                        <Button
                            as={Link}
                            href={route("vehicles.create")}
                            variant="light"
                            className="text-blue-700 fw-semibold px-4 py-2 rounded-pill shadow-sm"
                        >
                            + Thêm xe mới
                        </Button>
                    </div>

                    {/* BODY */}
                    <Card.Body className="bg-white p-4">
                        <div className="table-responsive">
                            <Table hover className="align-middle mb-0 text-sm">
                                <thead className="bg-blue-50">
                                    <tr className="text-blue-700 fw-semibold text-center">
                                        <th style={{ width: "60px" }}>#</th>
                                        <th>Biển số</th>
                                        <th>Chủ sở hữu</th>
                                        <th>Thẻ truy cập</th>
                                        <th>Vị trí đỗ</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center py-5"
                                            >
                                                <div className="text-muted">
                                                    <div className="text-4xl mb-2">
                                                        🚘
                                                    </div>
                                                    <p className="mb-1">
                                                        Hiện chưa có phương tiện
                                                        nào được thêm.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "vehicles.create"
                                                        )}
                                                        className="fw-semibold text-blue-600 hover:underline"
                                                    >
                                                        ➕ Thêm phương tiện mới
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        items.data.map((v) => (
                                            <tr
                                                key={v.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="text-center text-muted fw-semibold">
                                                    {v.id}
                                                </td>
                                                <td className="fw-semibold text-gray-800">
                                                    {v.plate}
                                                </td>
                                                <td>{v.owner_name}</td>
                                                <td>
                                                    {v.card ? (
                                                        <Badge
                                                            bg="info"
                                                            className="text-white shadow-sm"
                                                        >
                                                            {v.card.code} (
                                                            {v.card.holder_name}
                                                            )
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-muted">
                                                            –
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {v.slot || "-"}
                                                </td>
                                                <td className="text-center">
                                                    <Badge
                                                        bg={
                                                            v.status ===
                                                            "active"
                                                                ? "success"
                                                                : "secondary"
                                                        }
                                                        className="px-3 py-2 rounded-pill text-uppercase"
                                                    >
                                                        {v.status === "active"
                                                            ? "Hoạt động"
                                                            : "Ngưng"}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip>
                                                                    Chỉnh sửa
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                as={Link}
                                                                href={route(
                                                                    "vehicles.edit",
                                                                    v.id
                                                                )}
                                                                size="sm"
                                                                variant="outline-warning"
                                                                className="rounded-circle"
                                                            >
                                                                ✏️
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip>
                                                                    Xóa
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                className="rounded-circle"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        v.id
                                                                    )
                                                                }
                                                            >
                                                                🗑️
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        {/* PAGINATION */}
                        {items.links && (
                            <div className="d-flex justify-content-center mt-4">
                                {items.links.map((link, i) => (
                                    <Button
                                        key={i}
                                        as={Link}
                                        href={link.url ?? "#"}
                                        disabled={!link.url}
                                        variant={
                                            link.active
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        size="sm"
                                        className="me-1"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </Card.Body>

                    {/* FOOTER */}
                    <Card.Footer className="bg-light text-center text-muted small py-2">
                        SmartBuilding • Quản lý phương tiện & thẻ ra/vào
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    );
}
