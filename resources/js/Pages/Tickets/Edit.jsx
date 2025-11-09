import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Container, Form, Button } from "react-bootstrap";

export default function Edit({ ticket, residents }) {
  const { errors } = usePage().props;
  const { data, setData, put, processing } = useForm({
    subject: ticket.subject || "",
    description: ticket.description || "",
    priority: ticket.priority || "medium",
    status: ticket.status || "open",
    resident_id: ticket.resident_id || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(route("tickets.update", ticket.id));
  };

  return (
    <Container className="py-4">
      <h3>✏️ Chỉnh sửa Ticket #{ticket.id}</h3>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Chủ đề</Form.Label>
          <Form.Control
            value={data.subject}
            onChange={(e) => setData("subject", e.target.value)}
          />
          {errors.subject && (
            <div className="text-danger">{errors.subject}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả chi tiết</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mức ưu tiên</Form.Label>
          <Form.Select
            value={data.priority}
            onChange={(e) => setData("priority", e.target.value)}
          >
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
          >
            <option value="open">Mở</option>
            <option value="in_progress">Đang xử lý</option>
            <option value="resolved">Đã giải quyết</option>
            <option value="closed">Đã đóng</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cư dân liên quan (tuỳ chọn)</Form.Label>
          <Form.Select
            value={data.resident_id}
            onChange={(e) => setData("resident_id", e.target.value)}
          >
            <option value="">-- Không chọn --</option>
            {residents.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="mt-3">
          <Button type="submit" disabled={processing}>
            💾 Cập nhật
          </Button>
          <Link
            href={route("tickets.index")}
            className="btn btn-secondary ms-2"
          >
            ↩ Quay lại
          </Link>
        </div>
      </Form>
    </Container>
  );
}
