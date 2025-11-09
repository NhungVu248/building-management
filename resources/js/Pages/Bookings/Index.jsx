import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Table, Button, Container, Alert } from "react-bootstrap";

export default function Index({ bookings }) {
  const { flash } = usePage().props;

  return (
    <Container className="py-4">
      <h3 className="mb-4">Quản lý đặt tiện ích</h3>

      {flash?.success && <Alert variant="success">{flash.success}</Alert>}

      <Link href={route("bookings.create")}>
        <Button className="mb-3">+ Tạo booking</Button>
      </Link>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tiện ích</th>
            <th>Cư dân</th>
            <th>Ngày</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.data.length > 0 ? (
            bookings.data.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.amenity?.name}</td>
                <td>{b.resident?.name || "-"}</td>
                <td>{b.date}</td>
                <td>{b.start_time}</td>
                <td>{b.end_time}</td>
                <td>
                  <span
                    className={`badge bg-${
                      b.status === "confirmed" ? "success" : "secondary"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <Link
                    href={route("bookings.edit", b.id)}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Sửa
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={route("bookings.destroy", b.id)}
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      if (!confirm("Xác nhận xóa booking này?")) e.preventDefault();
                    }}
                  >
                    Xóa
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-3">
                Chưa có booking nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination (nếu cần) */}
      <div className="d-flex justify-content-end mt-3">
        {bookings.links?.map((link) => (
          <Link
            key={link.label}
            href={link.url || "#"}
            className={`btn btn-sm mx-1 ${
              link.active ? "btn-primary" : "btn-outline-primary"
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </Container>
  );
}
