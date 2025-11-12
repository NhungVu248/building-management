import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "@inertiajs/react";

export default function AmenityForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
  isEdit = false,
}) {
  return (
    <Form onSubmit={onSubmit} className="mt-3">
      {/* Tên tiện ích */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary">
          Tên tiện ích
        </Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          placeholder="Nhập tên tiện ích (ví dụ: Hồ bơi, Phòng gym...)"
          className="rounded-3 py-2 border-0 shadow-sm bg-light"
        />
        {errors.name && (
          <div className="text-danger mt-1 small">{errors.name}</div>
        )}
      </Form.Group>

      {/* Mô tả */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary">Mô tả</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
          placeholder="Mô tả ngắn gọn về tiện ích..."
          className="rounded-3 border-0 shadow-sm bg-light"
        />
        {errors.description && (
          <div className="text-danger mt-1 small">{errors.description}</div>
        )}
      </Form.Group>

      {/* Công suất */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary">
          Công suất (số người/slot)
        </Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={data.capacity}
          onChange={(e) => setData("capacity", e.target.value)}
          placeholder="VD: 10"
          className="rounded-3 py-2 border-0 shadow-sm bg-light"
        />
        {errors.capacity && (
          <div className="text-danger mt-1 small">{errors.capacity}</div>
        )}
      </Form.Group>

      {/* Giới hạn mỗi tuần */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary">
          Giới hạn / tuần
        </Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={data.max_per_week}
          onChange={(e) => setData("max_per_week", e.target.value)}
          placeholder="VD: 5"
          className="rounded-3 py-2 border-0 shadow-sm bg-light"
        />
        {errors.max_per_week && (
          <div className="text-danger mt-1 small">{errors.max_per_week}</div>
        )}
      </Form.Group>

      {/* Trạng thái hoạt động */}
      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="is_active_switch"
          label="Đang hoạt động"
          checked={!!data.is_active}
          onChange={(e) => setData("is_active", e.target.checked)}
          className="fw-semibold text-secondary"
        />
      </Form.Group>

      {/* Nút hành động */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button
          type="submit"
          disabled={processing}
          className="px-5 py-2 rounded-3 fw-semibold shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, #00b894, #00cec9)",
            border: "none",
          }}
        >
          {processing
            ? isEdit
              ? "Đang cập nhật..."
              : "Đang lưu..."
            : isEdit
            ? "💾 Cập nhật"
            : "💾 Lưu"}
        </Button>

        <Link
          href={route("amenities.index")}
          className="btn btn-outline-secondary px-5 py-2 rounded-3 fw-semibold shadow-sm"
        >
          Hủy
        </Link>
      </div>
    </Form>
  );
}
