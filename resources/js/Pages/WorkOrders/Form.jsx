import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

export default function WorkOrderForm() {
  const { item } = usePage().props; // khi edit sẽ có item, khi create thì undefined

  const { data, setData, post, put, processing } = useForm({
    title: item?.title || "",
    source: item?.source || "manual",
    description: item?.description || "",
    priority: item?.priority || "normal",
    status: item?.status || "new",
    technician_name: item?.technician_name || "",
    due_date: item?.due_date || "",
    completed_at: item?.completed_at || "",
    cost: item?.cost || "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (item) put(route("work-orders.update", item.id));
    else post(route("work-orders.store"));
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h4>{item ? "Cập nhật Work Order" : "Thêm Work Order"}</h4>
          <Form onSubmit={submit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    required
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nguồn</Form.Label>
                  <Form.Select
                    value={data.source}
                    onChange={(e) => setData("source", e.target.value)}
                  >
                    <option value="manual">Thủ công</option>
                    <option value="resident">Cư dân</option>
                    <option value="incident">Sự cố</option>
                    <option value="schedule">Định kỳ</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Ưu tiên</Form.Label>
                  <Form.Select
                    value={data.priority}
                    onChange={(e) => setData("priority", e.target.value)}
                  >
                    <option value="low">Thấp</option>
                    <option value="normal">Trung bình</option>
                    <option value="high">Cao</option>
                    <option value="urgent">Khẩn cấp</option>
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
                    <option value="new">Mới</option>
                    <option value="assigned">Đã giao</option>
                    <option value="in_progress">Đang thực hiện</option>
                    <option value="waiting_material">Chờ vật tư</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="closed">Đã đóng</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Kỹ thuật viên</Form.Label>
                  <Form.Control
                    value={data.technician_name}
                    onChange={(e) =>
                      setData("technician_name", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hạn hoàn thành</Form.Label>
                  <Form.Control
                    type="date"
                    value={data.due_date ?? ""}
                    onChange={(e) => setData("due_date", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày hoàn thành</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={data.completed_at ?? ""}
                    onChange={(e) => setData("completed_at", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả công việc</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ maxWidth: 300 }}>
              <Form.Label>Chi phí (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={data.cost}
                onChange={(e) => setData("cost", e.target.value)}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={processing}>
                {item ? "Cập nhật" : "Tạo mới"}
              </Button>
              <Button
                as={Link}
                href={route("work-orders.index")}
                variant="secondary"
              >
                Quay lại
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
