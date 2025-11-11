import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Table, Button, Container, Alert, Card } from "react-bootstrap";

export default function Index({ bookings }) {
  const { flash } = usePage().props;

  return (
    <div
      style={{
        backgroundColor: "#f8f9fb",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 🏙️ Hero Banner */}
      <div
        className="text-center mb-5"
        style={{
          width: "90%",
          maxWidth: "1300px",
          height: "380px",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        {/* Ảnh nền */}
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "brightness(0.85)",
          }}
        ></div>

        {/* Overlay nội dung */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <h1 className="fw-bold mb-2">Quản Lý Đặt Tiện Ích</h1>
          <p className="lead mb-0">
            Theo dõi, quản lý và tạo lịch đặt tiện ích cho cư dân một cách chuyên
            nghiệp
          </p>
          <Link href={route("bookings.create")}>
            <Button
              className="px-4 py-2 mt-3 rounded-3 fw-semibold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #00b894, #00cec9)",
                border: "none",
              }}
            >
              + Tạo Booking Mới
            </Button>
          </Link>
        </div>
      </div>

      {/* 📋 Nội dung chính */}
      <Container className="py-4">
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold text-dark mb-1">📅 Danh sách Booking</h3>
                <p className="text-muted small mb-0">
                  Tổng hợp tất cả các lịch đặt tiện ích của cư dân
                </p>
              </div>
            </div>

            {/* ⚡ Thông báo flash */}
            {flash?.success && (
              <div className="alert alert-success rounded-3 shadow-sm">
                {flash.success}
              </div>
            )}

            {/* Bảng dữ liệu */}
            <div className="table-responsive">
              <Table hover borderless className="align-middle">
                <thead className="table-light rounded-3">
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Tiện ích</th>
                    <th>Cư dân</th>
                    <th>Ngày</th>
                    <th>Bắt đầu</th>
                    <th>Kết thúc</th>
                    <th>Trạng thái</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.data.length > 0 ? (
                    bookings.data.map((b) => (
                      <tr key={b.id} className="border-bottom">
                        <td className="fw-semibold text-muted">{b.id}</td>
                        <td className="fw-semibold">{b.amenity?.name}</td>
                        <td>{b.resident?.name || "-"}</td>
                        <td>
                          <small className="text-muted">{b.date}</small>
                        </td>
                        <td>{b.start_time}</td>
                        <td>{b.end_time}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 rounded-3 ${
                              b.status === "confirmed"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {b.status === "confirmed"
                              ? "Đã xác nhận"
                              : "Đã hủy"}
                          </span>
                        </td>
                        <td className="text-center">
                          <Link
                            href={route("bookings.edit", b.id)}
                            className="btn btn-sm btn-outline-warning me-2 rounded-3"
                          >
                            ✏️ Sửa
                          </Link>
                          <Link
                            as="button"
                            method="delete"
                            href={route("bookings.destroy", b.id)}
                            className="btn btn-sm btn-outline-danger rounded-3"
                            onClick={(e) => {
                              if (
                                !confirm("Xác nhận xóa booking này?")
                              )
                                e.preventDefault();
                            }}
                          >
                            🗑️ Xóa
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        Chưa có booking nào được tạo.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* 📄 Phân trang */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="text-muted small">
                Hiển thị {bookings.from}-{bookings.to} / {bookings.total}
              </div>
              <div>
                {bookings.links?.map((link, i) => (
                  <Button
                    key={i}
                    as={Link}
                    href={link.url || "#"}
                    disabled={!link.url}
                    variant={link.active ? "primary" : "outline-primary"}
                    className="me-1 rounded-3 shadow-sm"
                    size="sm"
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* ⚙️ Footer */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Booking Manager — Quản lý đặt tiện ích
            hiệu quả và tiện lợi.
          </p>
        </div>
      </Container>
    </div>
  );
}
