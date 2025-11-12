import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Container, Button, Card } from "react-bootstrap";
import MaintenanceForm from "./_Form";

export default function Edit() {
  const { item, enums } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    title: item.title ?? "",
    description: item.description ?? "",
    apartment_id: item.apartment_id ?? "",
    priority: item.priority ?? "medium",
    status: item.status ?? "pending",
    assigned_to: item.assigned_to ?? "",
    due_date: item.due_date ?? "",
    estimated_cost: item.estimated_cost ?? "",
    attachments: item.attachments ?? [],
    completed_at: item.completed_at ?? "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    put(route("maintenance.update", item.id));
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
        {/* Background image */}
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "brightness(0.9)",
          }}
        ></div>

        {/* Overlay content */}
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
          <h1 className="fw-bold mb-2">🛠️ Cập Nhật Yêu Cầu Bảo Trì #{item.id}</h1>
          <p className="lead mb-0">
            Xem, chỉnh sửa và theo dõi tiến trình xử lý bảo trì của căn hộ
          </p>

          <div className="d-flex justify-content-center mt-3 gap-3">
            <Link href={route("maintenance.index")}>
              <Button
                className="px-4 py-2 rounded-3 fw-semibold shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #00cec9, #0984e3)",
                  border: "none",
                }}
              >
                ← Quay lại danh sách
              </Button>
            </Link>

            <Link
              href={route("maintenance.destroy", item.id)}
              method="delete"
              as="button"
              className="btn btn-danger px-4 py-2 rounded-3 fw-semibold shadow-sm"
            >
              🗑️ Xóa yêu cầu
            </Link>
          </div>
        </div>
      </div>

      {/* 📋 Nội dung chính */}
      <Container style={{ maxWidth: "1000px", width: "90%" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <h3 className="fw-bold text-dark mb-4">🧾 Thông Tin Bảo Trì</h3>
            <MaintenanceForm
              data={data}
              setData={setData}
              processing={processing}
              onSubmit={onSubmit}
              enums={enums}
              errors={errors}
              submitText="Cập nhật yêu cầu"
            />
          </Card.Body>
        </Card>

        {/* Footer */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Maintenance Manager — Giải pháp quản lý
            bảo trì hiện đại, dễ sử dụng và hiệu quả.
          </p>
        </div>
      </Container>
    </div>
  );
}
