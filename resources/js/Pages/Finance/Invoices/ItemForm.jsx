import React from "react";
import { Form, Button } from "react-bootstrap";

export default function ItemForm({ index, item, feeTypes, onChange, onRemove }) {
  const handle = (field, val) => onChange(index, { ...item, [field]: val });

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
      <td>
        <Form.Control
          type="number"
          step="0.01"
          value={item.qty}
          onChange={(e) => handle("qty", e.target.value)}
          style={{ width: "80px" }}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          step="0.01"
          value={item.unit_price}
          onChange={(e) => handle("unit_price", e.target.value)}
        />
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => onRemove(index)}>
          Xóa
        </Button>
      </td>
    </tr>
  );
}
