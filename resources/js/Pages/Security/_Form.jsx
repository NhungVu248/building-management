import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function SecurityForm({ data, setData, processing, onSubmit, meta }) {
  return (
    <Form onSubmit={onSubmit}>
      <Row className="g-3">
        <Col md={8}>
          <Form.Group>
            <Form.Label>Tiêu đề *</Form.Label>
            <Form.Control
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Mức độ *</Form.Label>
            <Form.Select
              value={data.severity}
              onChange={(e) => setData('severity', e.target.value)}
              required
            >
              {meta.SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Trạng thái *</Form.Label>
            <Form.Select
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              required
            >
              {meta.STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Vị trí</Form.Label>
            <Form.Control
              value={data.location ?? ''}
              onChange={(e) => setData('location', e.target.value)}
              placeholder="Tầng 1 - Sảnh A..."
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Thời điểm xảy ra</Form.Label>
            <Form.Control
              type="datetime-local"
              value={data.occurred_at ?? ''}
              onChange={(e) => setData('occurred_at', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Người báo cáo</Form.Label>
            <Form.Control
              value={data.reported_by ?? ''}
              onChange={(e) => setData('reported_by', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={data.description ?? ''}
              onChange={(e) => setData('description', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-3">
        <Button type="submit" variant="success" disabled={processing}>Lưu</Button>
      </div>
    </Form>
  );
}
