import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Container, Table, Button, Badge, Card } from "react-bootstrap";

export default function AccessCardsIndex() {
  const { items } = usePage().props;

  const handleDelete = (id) => {
    if (confirm("Xóa thẻ này?")) {
      router.delete(route("access-cards.destroy", id));
    }
  };

  return (
  <div
    style={{
      backgroundColor: "#f8f9fb",
      minHeight: "100vh",
      paddingTop: "60px",
      paddingBottom: "60px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // canh giữa banner
    }}
  >
    {/* 🏙️ Hero Banner */}
    <div
      className="text-center mb-5"
      style={{
        width: "90%",
        maxWidth: "1300px",
        height: "380px",
        borderRadius: "25px", // ✅ bo tròn 4 góc rõ hơn
        overflow: "hidden", // ✅ rất quan trọng: giúp ảnh và overlay không tràn góc
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
          filter: "brightness(0.9)",
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
        <h1 className="fw-bold mb-2">Quản Lý Thẻ Ra/Vào</h1>
        <p className="lead mb-0">
          Theo dõi, tạo mới và quản lý thẻ ra vào cho cư dân và nhân viên
        </p>
        <Link href={route("access-cards.create")}>
          <Button
            className="px-4 py-2 mt-3 rounded-3 fw-semibold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #00b894, #00cec9)",
              border: "none",
            }}
          >
            + Thêm mới
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
                <h3 className="fw-bold text-dark mb-1">📋 Danh sách thẻ ra/vào</h3>
                <p className="text-muted small mb-0">
                  Quản lý toàn bộ thẻ truy cập trong hệ thống
                </p>
              </div>
            </div>

            {/* Bảng dữ liệu */}
            <div className="table-responsive">
              <Table hover borderless className="align-middle">
                <thead className="table-light rounded-3">
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Mã thẻ</th>
                    <th>Người giữ thẻ</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                    <th>Hiệu lực</th>
                    <th className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {items.data.length > 0 ? (
                    items.data.map((card) => (
                      <tr key={card.id} className="border-bottom">
                        <td className="fw-semibold text-muted">{card.id}</td>
                        <td className="fw-semibold">{card.code}</td>
                        <td>{card.holder_name}</td>
                        <td>
                          {card.type === "resident" && (
                            <Badge bg="info" className="px-3 py-2 rounded-3">
                              Cư dân
                            </Badge>
                          )}
                          {card.type === "guest" && (
                            <Badge bg="secondary" className="px-3 py-2 rounded-3">
                              Khách
                            </Badge>
                          )}
                          {card.type === "staff" && (
                            <Badge bg="dark" className="px-3 py-2 rounded-3">
                              Nhân viên
                            </Badge>
                          )}
                        </td>
                        <td>
                          <Badge
                            bg={
                              card.status === "active"
                                ? "success"
                                : card.status === "suspended"
                                ? "warning"
                                : "secondary"
                            }
                            className="px-3 py-2 rounded-3"
                          >
                            {card.status === "active"
                              ? "Kích hoạt"
                              : card.status === "suspended"
                              ? "Tạm ngưng"
                              : "Hết hạn"}
                          </Badge>
                        </td>
                        <td>
                          <small className="text-muted">
                            {card.valid_from} → {card.valid_to || "Không giới hạn"}
                          </small>
                        </td>
                        <td className="text-center">
                          <Button
                            as={Link}
                            href={route("access-cards.edit", card.id)}
                            size="sm"
                            className="me-2 rounded-3"
                            variant="outline-warning"
                          >
                            ✏️ Sửa
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-3"
                            variant="outline-danger"
                            onClick={() => handleDelete(card.id)}
                          >
                            🗑️ Xóa
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        Chưa có thẻ nào được tạo.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* Phân trang */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="text-muted small">
                Hiển thị {items.from}-{items.to} / {items.total}
              </div>
              <div>
                {items.links.map((link, i) => (
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

        {/* Footer nhỏ */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Access Card Manager — Quản lý thẻ ra vào hiện đại và chuyên nghiệp.
          </p>
        </div>
      </Container>
    </div>
  );
}
