import React from "react";
import { Badge } from "react-bootstrap";

export default function RowItem({ log }) {
  const colorAction = log.action === "entry" ? "success" : "secondary";
  const colorResult = log.result === "allowed" ? "success" : "danger";

  // Format ngày giờ theo tiếng Việt
  const formattedDate = log.scanned_at
    ? new Date(log.scanned_at).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  return (
    <tr
      className="border-bottom align-middle"
      style={{
        transition: "background-color 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fbff")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {/* ID */}
      <td className="fw-semibold text-muted small">{log.id}</td>

      {/* Mã thẻ */}
      <td className="fw-semibold text-dark">{log.card?.code || "-"}</td>

      {/* Tên người dùng */}
      <td className="text-muted">{log.card?.holder_name || "-"}</td>

      {/* Hành động */}
      <td>
        <Badge
          bg={colorAction}
          className="px-3 py-2 rounded-3 shadow-sm"
          style={{ fontSize: "0.8rem" }}
        >
          {log.action === "entry" ? "Vào" : "Ra"}
        </Badge>
      </td>

      {/* Kết quả */}
      <td>
        <Badge
          bg={colorResult}
          className="px-3 py-2 rounded-3 shadow-sm"
          style={{
            fontSize: "0.8rem",
            background:
              log.result === "allowed"
                ? "linear-gradient(135deg, #00b894, #00cec9)"
                : "#e74c3c",
          }}
        >
          {log.result === "allowed" ? "Được phép" : "Từ chối"}
        </Badge>
      </td>

      {/* Cổng */}
      <td className="text-secondary">{log.gate}</td>

      {/* Thời gian */}
      <td className="text-muted small">{formattedDate}</td>

      {/* Lý do */}
      <td className="text-secondary">{log.reason || "-"}</td>
    </tr>
  );
}
