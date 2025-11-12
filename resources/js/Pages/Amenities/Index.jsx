import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Table, Button, Container, Card } from "react-bootstrap";

export default function Index({ amenities }) {
  const { flash } = usePage().props;

  return (
  <div
    style={{
      backgroundColor: "#f8f9fb",
      minHeight: "100vh",
      paddingTop: "60px",
      paddingBottom: "60px",
    }}
  >
    {/* 🏙️ Hero Banner */}
    <div
      className="text-center mb-5 mx-auto"
      style={{
        maxWidth: "1300px",
        borderRadius: "20px",
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
          height: "380px", 
          filter: "brightness(0.9)",
        }}
      ></div>

      {/* Nội dung overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1 className="fw-bold display-5">Quản Lý Tiện Ích Cộng Đồng</h1>
        <p className="mt-3 lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
          Theo dõi, chỉnh sửa và quản lý các tiện ích một cách chuyên nghiệp
        </p>
        <Link href={route("amenities.create")}>
          <Button
            className="px-4 py-2 mt-3 rounded-pill fw-semibold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #00b894, #00cec9)",
              border: "none",
            }}
          >
            + Thêm tiện ích
          </Button>
        </Link>
      </div>
    </div>

      {/* 📋 Nội dung chính */}
      <Container className="py-5">
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold text-dark mb-1">🏢 Danh sách Tiện ích</h3>
                <p className="text-muted small mb-0">
                  Quản lý toàn bộ tiện ích trong khu dân cư
                </p>
              </div>
            </div>

            {flash?.success && (
              <div className="alert alert-success rounded-3 shadow-sm">
                {flash.success}
              </div>
            )}

            {/* Bảng tiện ích */}
            <div className="table-responsive">
              <Table hover borderless className="align-middle">
                <thead className="table-light rounded-3">
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Tên tiện ích</th>
                    <th>Mô tả</th>
                    <th>Công suất</th>
                    <th>Giới hạn/tuần</th>
                    <th>Trạng thái</th>
                    <th className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {amenities.data.length > 0 ? (
                    amenities.data.map((a) => (
                      <tr key={a.id} className="border-bottom">
                        <td className="fw-semibold text-muted">{a.id}</td>
                        <td className="fw-semibold">{a.name}</td>
                        <td className="text-muted small">
                          {a.description || "-"}
                        </td>
                        <td>{a.capacity}</td>
                        <td>{a.max_per_week}</td>
                        <td>
                          {a.is_active ? (
                            <span className="badge bg-success px-3 py-2 rounded-3">
                              Đang hoạt động
                            </span>
                          ) : (
                            <span className="badge bg-secondary px-3 py-2 rounded-3">
                              Tạm ngưng
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          <Link
                            href={route("amenities.edit", a.id)}
                            className="btn btn-sm btn-outline-warning me-2 rounded-3"
                          >
                            ✏️ Sửa
                          </Link>
                          <Link
                            as="button"
                            method="delete"
                            href={route("amenities.destroy", a.id)}
                            className="btn btn-sm btn-outline-danger rounded-3"
                          >
                            🗑️ Xóa
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        Chưa có tiện ích nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Footer nhỏ */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Amenity Manager — Giải pháp quản lý tiện ích hiện đại.
          </p>
        </div>
      </Container>
    </div>
  );
}
