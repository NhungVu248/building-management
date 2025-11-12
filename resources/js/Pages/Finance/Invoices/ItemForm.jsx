import React from "react";
import { Form, Button } from "react-bootstrap";

export default function ItemForm({ index, item, feeTypes, onChange, onRemove }) {
  const handle = (field, val) => onChange(index, { ...item, [field]: val });
  const lineTotal =
    parseFloat(item.qty || 0) * parseFloat(item.unit_price || 0);
     
  return (
    <tr>
      <td>
        <Form.Select
          value={item.fee_type_id || ""}
          onChange={(e) => handle("fee_type_id", e.target.value)}
        >
          <option value="">-- Chọn --</option>
          {feeTypes.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Control
          value={item.description}
          onChange={(e) => handle("description", e.target.value)}
        />
      </td>
      <td className="text-end" style={{ minWidth: "100px" }}>
        <Form.Control
          type="number"
          step="0.01"
          value={item.qty}
          onChange={(e) => handle("qty", e.target.value)}
          className="text-end" 
        />
      </td>
      <td className="text-end" style={{ minWidth: "130px" }}>
        <Form.Control
          type="number"
          step="0.01"
          value={item.unit_price}
          onChange={(e) => handle("unit_price", e.target.value)}
          className="text-end" 
        />
      </td>
      <td className="text-end align-middle" style={{ minWidth: "120px" }}>
        <span className="fw-bold">{lineTotal.toLocaleString()} ₫</span>
      </td>
      <td className="text-end">
        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemove(index)} 
          title="Xóa dòng"
        >
          🗑️
        </Button>
      </td>
    </tr>
  );
}
