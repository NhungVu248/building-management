import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "@inertiajs/react";

export default function AmenityForm({ data, setData, errors, processing, onSubmit, isEdit = false }) {
  return (
    <Form onSubmit={onSubmit} className="mt-3">
      <Form.Group className="mb-3">
        <Form.Label>Tên tiện ích</Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
        />
        {errors.description && (
          <div className="text-danger">{errors.description}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Công suất (số người/slot)</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={data.capacity}
          onChange={(e) => setData("capacity", e.target.value)}
        />
        {errors.capacity && <div className="text-danger">{errors.capacity}</div>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Giới hạn / tuần</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={data.max_per_week}
          onChange={(e) => setData("max_per_week", e.target.value)}
        />
        {errors.max_per_week && (
          <div className="text-danger">{errors.max_per_week}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Đang hoạt động"
          checked={!!data.is_active}
          onChange={(e) => setData("is_active", e.target.checked)}
        />
      </Form.Group>

      <div className="d-flex">
        <Button type="submit" disabled={processing}>
          {isEdit ? "Cập nhật" : "Lưu"}
        </Button>
        <Link
          href={route("amenities.index")}
          className="btn btn-secondary ms-2"
        >
          Hủy
        </Link>
      </div>
    </Form>
  );
}
