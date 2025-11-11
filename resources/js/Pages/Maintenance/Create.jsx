import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Container, Button, Card } from "react-bootstrap";
import MaintenanceForm from "./_Form";

export default function Create() {
  const { enums } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    apartment_id: "",
    priority: "medium",
    status: "pending",
    assigned_to: "",
    due_date: "",
    estimated_cost: "",
    attachments: [],
    completed_at: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("maintenance.store"));
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
              "url('https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "brightness(0.9)",
          }}
        ></div>

        {/* Overlay text */}
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
          <h1 className="fw-bold mb-2">🛠️ Tạo Yêu Cầu Bảo Trì</h1>
          <p className="lead mb-0">
            Quản lý, theo dõi và xử lý các yêu cầu bảo trì một cách dễ dàng
          </p>
          <Link href={route("maintenance.index")}>
            <Button
              className="px-4 py-2 mt-3 rounded-3 fw-semibold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #00b894, #00cec9)",
                border: "none",
              }}
            >
              ← Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>

      {/* 📋 Main Content */}
      <Container
        style={{
          maxWidth: "1000px",
          width: "90%",
        }}
      >
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <h3 className="fw-bold text-dark mb-4">
              ✨ Thông Tin Yêu Cầu Bảo Trì
            </h3>
            <MaintenanceForm
              data={data}
              setData={setData}
              processing={processing}
              onSubmit={onSubmit}
              enums={enums}
              errors={errors}
              submitText="Tạo yêu cầu"
            />
          </Card.Body>
        </Card>

        {/* Footer nhỏ */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Maintenance Manager — Hệ thống quản lý
            bảo trì thông minh và chuyên nghiệp.
          </p>
        </div>
      </Container>
    </div>
  );
}
