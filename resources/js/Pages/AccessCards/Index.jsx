import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Container, Table, Button, Badge } from "react-bootstrap";

export default function AccessCardsIndex() {
  const { items } = usePage().props;

  const handleDelete = (id) => {
    if (confirm("Xóa thẻ này?")) {
      router.delete(route("access-cards.destroy", id));
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Danh sách thẻ ra/vào</h4>
        <Button as={Link} href={route("access-cards.create")} variant="primary">
          + Thêm mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Mã thẻ</th>
            <th>Người giữ thẻ</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Hiệu lực</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.data.map((card) => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.code}</td>
              <td>{card.holder_name}</td>
              <td>{card.type}</td>
              <td>
                <Badge
                  bg={
                    card.status === "active"
                      ? "success"
                      : card.status === "suspended"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {card.status}
                </Badge>
              </td>
              <td>
                {card.valid_from} → {card.valid_to ?? "Không giới hạn"}
              </td>
              <td>
                <Button
                  as={Link}
                  href={route("access-cards.edit", card.id)}
                  size="sm"
                  variant="warning"
                >
                  Sửa
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(card.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Phân trang */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Hiển thị {items.from}-{items.to} / {items.total}
        </div>
        <div>
          {items.links.map((link, i) => (
            <Button
              key={i}
              as={Link}
              href={link.url || "#"}
              disabled={!link.url}
              variant={link.active ? "primary" : "outline-primary"}
              className="me-1"
              size="sm"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
