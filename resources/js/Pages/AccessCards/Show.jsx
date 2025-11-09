import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Container, Table, Badge, Button } from "react-bootstrap";

export default function AccessCardShow() {
  const { card, logs } = usePage().props;
  return (
    <Container className="mt-4">
      <h4>Chi tiết thẻ #{card.code}</h4>
      <p><b>Chủ thẻ:</b> {card.holder_name}</p>
      <p>
        <b>Loại:</b> {card.type} | <b>Trạng thái:</b>{" "}
        <Badge bg={card.status === "active" ? "success" : "secondary"}>
          {card.status}
        </Badge>
      </p>
      <p>
        <b>Hiệu lực:</b> {card.valid_from} → {card.valid_to ?? "Không giới hạn"}
      </p>
      <Button as={Link} href={route("access-cards.edit", card.id)} variant="warning">
        Sửa
      </Button>

      <hr />
      <h5>Lịch sử ra/vào</h5>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Cổng</th>
            <th>Hành động</th>
            <th>Kết quả</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.gate}</td>
              <td>{l.action}</td>
              <td>
                <Badge bg={l.result === "allowed" ? "success" : "danger"}>
                  {l.result}
                </Badge>
              </td>
              <td>{l.scanned_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
