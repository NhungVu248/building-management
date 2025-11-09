import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Container, Card, Badge, Button } from "react-bootstrap";

export default function WorkOrderView() {
  const { item } = usePage().props;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h4>Chi tiết Work Order #{item.id}</h4>
        </Card.Header>
        <Card.Body>
          <p><strong>Tiêu đề:</strong> {item.title}</p>
          <p><strong>Nguồn:</strong> {item.source}</p>
          <p><strong>Ưu tiên:</strong> <Badge bg="danger">{item.priority}</Badge></p>
          <p><strong>Trạng thái:</strong> <Badge bg="info">{item.status}</Badge></p>
          <p><strong>Kỹ thuật viên:</strong> {item.technician_name ?? "-"}</p>
          <p><strong>Hạn:</strong> {item.due_date ?? "-"}</p>
          <p><strong>Hoàn thành:</strong> {item.completed_at ?? "-"}</p>
          <p><strong>Chi phí:</strong> {item.cost ?? 0} ₫</p>
          <p><strong>Mô tả:</strong><br />{item.description ?? "-"}</p>
          <Button as={Link} href={route("work-orders.edit", item.id)} variant="warning">
            Sửa
          </Button>{" "}
          <Button as={Link} href={route("work-orders.index")} variant="secondary">
            Quay lại
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
