import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Table, Button, Container, Badge, Form } from "react-bootstrap";

export default function Index({ tickets }) {
  const { flash } = usePage().props;
  const { data, setData, patch } = useForm({ status: "" });

  const handleStatusChange = (id, e) => {
    setData("status", e.target.value);
    patch(route("tickets.status", id));
  };

  const statusColor = (status) => {
    switch (status) {
      case "open":
        return "secondary";
      case "in_progress":
        return "warning";
      case "resolved":
        return "success";
      case "closed":
        return "dark";
      default:
        return "light";
    }
  };

  return (
    <Container className="py-4">
      <h3>📋 Danh sách Ticket / Phản ánh cư dân</h3>

      {flash?.success && (
        <div className="alert alert-success mt-2">{flash.success}</div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <Link href={route("tickets.create")}>
          <Button variant="primary">➕ Tạo Ticket mới</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Chủ đề</th>
            <th>Cư dân</th>
            <th>Ưu tiên</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tickets.data.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.subject}</td>
              <td>{t.resident?.name || "-"}</td>
              <td>
                <Badge
                  bg={
                    t.priority === "high"
                      ? "danger"
                      : t.priority === "medium"
                      ? "warning"
                      : "success"
                  }
                >
                  {t.priority}
                </Badge>
              </td>
              <td>
                <Form.Select
                  size="sm"
                  value={t.status}
                  onChange={(e) => handleStatusChange(t.id, e)}
                >
                  <option value="open">Mở</option>
                  <option value="in_progress">Đang xử lý</option>
                  <option value="resolved">Đã giải quyết</option>
                  <option value="closed">Đã đóng</option>
                </Form.Select>
              </td>
              <td>{new Date(t.created_at).toLocaleDateString("vi-VN")}</td>
              <td>
                <Link
                  href={route("tickets.edit", t.id)}
                  className="btn btn-sm btn-warning me-2"
                >
                  ✏️ Sửa
                </Link>
                <Link
                  as="button"
                  method="delete"
                  href={route("tickets.destroy", t.id)}
                  className="btn btn-sm btn-danger"
                >
                  🗑 Xóa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        {tickets.links &&
          tickets.links.map((link, i) => (
            <Link
              key={i}
              href={link.url || "#"}
              className={`btn btn-sm me-1 ${
                link.active ? "btn-primary" : "btn-outline-primary"
              }`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
      </div>
    </Container>
  );
}
