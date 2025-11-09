import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

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
    <Container className="mt-4">
      <h4>{item ? "Cập nhật phương tiện" : "Thêm phương tiện"}</h4>

      <Form onSubmit={submit}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Biển số</Form.Label>
              <Form.Control
                value={data.plate}
                onChange={(e) => setData("plate", e.target.value)}
                isInvalid={!!errors.plate}
                required
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
              <Form.Label>Chủ sở hữu</Form.Label>
              <Form.Control
                value={data.owner_name}
                onChange={(e) => setData("owner_name", e.target.value)}
                isInvalid={!!errors.owner_name}
                required
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
              <Form.Label>Thẻ truy cập</Form.Label>
              <Form.Select
                value={data.access_card_id || ""}
                onChange={(e) => setData("access_card_id", e.target.value)}
              >
                <option value="">-- Chưa gắn thẻ --</option>
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.holder_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Vị trí đỗ xe</Form.Label>
              <Form.Control
                value={data.slot}
                onChange={(e) => setData("slot", e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                value={data.status}
                onChange={(e) => setData("status", e.target.value)}
              >
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-3">
          <Button type="submit" variant="success" disabled={processing}>
            Lưu
          </Button>{" "}
          <Button
            as={Link}
            href={route("vehicles.index")}
            variant="secondary"
          >
            Hủy
          </Button>
        </div>
      </Form>
    </Container>
  );
}
