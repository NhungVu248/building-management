import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Table, Button, Container } from "react-bootstrap";

export default function Index({ amenities }) {
  const { flash } = usePage().props;

  return (
    <Container className="py-4">
      <h3 className="mb-3">🏢 Quản lý Tiện ích cộng đồng</h3>

      {flash?.success && (
        <div className="alert alert-success">{flash.success}</div>
      )}

      <div className="d-flex justify-content-between mb-3">
        <Link href={route("amenities.create")}>
          <Button variant="primary">+ Thêm tiện ích</Button>
        </Link>
      </div>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tên tiện ích</th>
            <th>Mô tả</th>
            <th>Công suất</th>
            <th>Giới hạn/tuần</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {amenities.data.length > 0 ? (
            amenities.data.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.description || "-"}</td>
                <td>{a.capacity}</td>
                <td>{a.max_per_week}</td>
                <td>
                  {a.is_active ? (
                    <span className="badge bg-success">Đang hoạt động</span>
                  ) : (
                    <span className="badge bg-secondary">Tạm ngưng</span>
                  )}
                </td>
                <td>
                  <Link
                    href={route("amenities.edit", a.id)}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Sửa
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={route("amenities.destroy", a.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Xóa
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Chưa có tiện ích nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
