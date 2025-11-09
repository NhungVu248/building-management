import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Container, Table, Button, Row, Col, Badge } from "react-bootstrap";

export default function VehiclesIndex() {
  const { items } = usePage().props; // data từ controller: Vehicle::with('card')->paginate()
  const handleDelete = (id) => {
    if (confirm("Xóa xe này?")) {
      router.delete(route("vehicles.destroy", id));
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h4>Danh sách phương tiện</h4>
        </Col>
        <Col className="text-end">
          <Button as={Link} href={route("vehicles.create")} variant="primary">
            + Thêm xe mới
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Biển số</th>
            <th>Chủ sở hữu</th>
            <th>Thẻ truy cập</th>
            <th>Vị trí đỗ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.data.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
          {items.data.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.plate}</td>
              <td>{v.owner_name}</td>
              <td>{v.card ? `${v.card.code} (${v.card.holder_name})` : "-"}</td>
              <td>{v.slot || "-"}</td>
              <td>
                <Badge bg={v.status === "active" ? "success" : "secondary"}>
                  {v.status}
                </Badge>
              </td>
              <td>
                <Button
                  as={Link}
                  href={route("vehicles.edit", v.id)}
                  size="sm"
                  variant="warning"
                  className="me-2"
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(v.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
