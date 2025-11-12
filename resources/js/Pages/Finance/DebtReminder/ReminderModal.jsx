import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, ListGroup } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function ReminderModal({ invoice, onClose, onSend, loading }) {
  const [level, setLevel] = useState('d7');
  const levels = [
    { value: 'd7', label: 'Sau 7 ngày' },
    { value: 'd15', label: 'Sau 15 ngày' },
    { value: 'd30', label: 'Sau 30 ngày' },
  ];

  return (
    <Modal show onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>🔔 Gửi nhắc nợ</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Bạn sắp gửi nhắc nợ cho hóa đơn với thông tin:</p>

        <ListGroup variant="flush" className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between px-0">
            <strong>Hóa đơn:</strong>
            <span className="fw-bold">{invoice.code}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between px-0">
            <strong>Căn hộ:</strong>

            <span>{invoice.apartment?.code ?? '—'}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between px-0">
            <strong>Người thuê:</strong>
            <span>{invoice.resident?.name ?? '—'}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between px-0">
            <strong>Kỳ:</strong>
            <span>{dayjs(invoice.billing_period).format('MM/YYYY')}</span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between px-0 text-danger">
            <strong>Còn nợ:</strong>
            <span className="fw-bold">{invoice.balance?.toLocaleString()} đ</span>
          </ListGroup.Item>
        </ListGroup>

        <Form.Group className="mb-3">
          <Form.Label>Mức nhắc nợ</Form.Label>
          <Form.Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            disabled={loading}
          >
            {levels.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={() => onSend(level)}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                animation="border"
                size="sm"
                className="me-2"
                role="status"
              />
              Đang gửi...
            </>
          ) : (
            'Gửi nhắc nợ'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
