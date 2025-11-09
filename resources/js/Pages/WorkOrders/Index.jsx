import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Container, Button, Table, Badge } from "react-bootstrap";

export default function WorkOrdersIndex() {
  const { items } = usePage().props; // props từ Controller (paginate)

  const statusBadge = (status) => {
    const colors = {
      new: "secondary",
      assigned: "info",
      in_progress: "primary",
      waiting_material: "warning",
      completed: "success",
      closed: "dark",
    };
    return <Badge bg={colors[status] || "secondary"}>{status}</Badge>;
  };

  const priorityBadge = (priority) => {
    const colors = {
      low: "secondary",
      normal: "info",
      high: "warning",
      urgent: "danger",
    };
    return <Badge bg={colors[priority] || "secondary"}>{priority}</Badge>;
  };

  return (
    <Container className="mt-4">
      <h4>Danh sách Work Orders</h4>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button as={Link} href={route("work-orders.create")} variant="primary">
          + Thêm Work Order
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Nguồn</th>
            <th>Ưu tiên</th>
            <th>Trạng thái</th>
            <th>Kỹ thuật viên</th>
            <th>Ngày hoàn thành</th>
            <th>Chi phí</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.data.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center">
                Chưa có Work Order nào
              </td>
            </tr>
          )}
          {items.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.source}</td>
              <td>{priorityBadge(item.priority)}</td>
              <td>{statusBadge(item.status)}</td>
              <td>{item.technician_name ?? "-"}</td>
              <td>{item.completed_at ?? "-"}</td>
              <td>
                {item.cost
                  ? new Intl.NumberFormat("vi-VN").format(item.cost)
                  : "-"}
              </td>
              <td>
                <Button
                  as={Link}
                  href={route("work-orders.edit", item.id)}
                  size="sm"
                  variant="warning"
                  className="me-1"
                >
                  Sửa
                </Button>
                <Button
                  as={Link}
                  href={route("work-orders.destroy", item.id)}
                  method="delete"
                  size="sm"
                  variant="danger"
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
