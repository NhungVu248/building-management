import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
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
        <Modal.Title>Gửi nhắc nợ</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <strong>Hóa đơn:</strong> {invoice.code}
          <br />
          <strong>Căn hộ:</strong> {invoice.apartment?.id ?? '—'}
          <br />
          <strong>Người thuê:</strong> {invoice.resident?.name ?? '—'}
          <br />
          <strong>Kỳ:</strong> {dayjs(invoice.billing_period).format('MM/YYYY')}
        </p>

        <Form.Group as={Row} className="align-items-center">
          <Form.Label column sm={4}>
            Mức nhắc nợ
          </Form.Label>
          <Col sm={8}>
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
          </Col>
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
