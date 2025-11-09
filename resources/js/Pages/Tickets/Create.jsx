import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Container, Form, Button } from "react-bootstrap";

export default function Create({ residents }) {
  const { errors } = usePage().props;
  const { data, setData, post, processing } = useForm({
    subject: "",
    description: "",
    priority: "medium",
    resident_id: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("tickets.store"));
  };

  return (
    <Container className="py-4">
      <h3>➕ Tạo Ticket mới</h3>
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
          <Form.Label>Cư dân gửi phản ánh (tuỳ chọn)</Form.Label>
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
            💾 Lưu
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
