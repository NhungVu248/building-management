import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

export default function AccessCardForm() {
  const { item } = usePage().props;
  const { data, setData, post, put, processing, errors } = useForm({
    code: item?.code || "",
    holder_name: item?.holder_name || "",
    type: item?.type || "resident",
    status: item?.status || "active",
    valid_from: item?.valid_from || "",
    valid_to: item?.valid_to || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) put(route("access-cards.update", item.id));
    else post(route("access-cards.store"));
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h4>{item ? "Cập nhật thẻ" : "Thêm thẻ mới"}</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mã thẻ</Form.Label>
                  <Form.Control
                    value={data.code}
                    onChange={(e) => setData("code", e.target.value)}
                    required
                  />
                  {errors.code && (
                    <div className="text-danger small">{errors.code}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Người giữ thẻ</Form.Label>
                  <Form.Control
                    value={data.holder_name}
                    onChange={(e) => setData("holder_name", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Loại thẻ</Form.Label>
                  <Form.Select
                    value={data.type}
                    onChange={(e) => setData("type", e.target.value)}
                  >
                    <option value="resident">Cư dân</option>
                    <option value="guest">Khách</option>
                    <option value="staff">Nhân viên</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="active">Kích hoạt</option>
                    <option value="suspended">Tạm ngưng</option>
                    <option value="expired">Hết hạn</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Hiệu lực từ</Form.Label>
                  <Form.Control
                    type="date"
                    value={data.valid_from}
                    onChange={(e) => setData("valid_from", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Hiệu lực đến</Form.Label>
                  <Form.Control
                    type="date"
                    value={data.valid_to}
                    onChange={(e) => setData("valid_to", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-3">
              <Button type="submit" disabled={processing}>
                {item ? "Cập nhật" : "Thêm mới"}
              </Button>
              <Button
                as={Link}
                href={route("access-cards.index")}
                variant="secondary"
                className="ms-2"
              >
                Hủy
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
