import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function MaintenanceForm({ data, setData, processing, onSubmit, enums, errors, submitText = 'Lưu' }) {
  return (
    <Form onSubmit={onSubmit}>
      <Row className="mb-3">
        <Col md={8}>
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            value={data.title || ''}
            onChange={e => setData('title', e.target.value)}
            isInvalid={!!errors.title}
            required
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Col>
        <Col md={4}>
          <Form.Label>Căn hộ (ID)</Form.Label>
          <Form.Control
            type="number"
            value={data.apartment_id || ''}
            onChange={e => setData('apartment_id', e.target.value ? Number(e.target.value) : '')}
            isInvalid={!!errors.apartment_id}
            placeholder="VD: 101"
          />
          <Form.Control.Feedback type="invalid">{errors.apartment_id}</Form.Control.Feedback>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8}>
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea" rows={4}
            value={data.description || ''}
            onChange={e => setData('description', e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Người phụ trách</Form.Label>
          <Form.Control
            value={data.assigned_to || ''}
            onChange={e => setData('assigned_to', e.target.value)}
          />

          <Form.Label className="mt-3">Hạn xử lý</Form.Label>
          <Form.Control
            type="date"
            value={data.due_date || ''}
            onChange={e => setData('due_date', e.target.value)}
          />

          <Form.Label className="mt-3">Ước tính chi phí</Form.Label>
          <Form.Control
            type="number" step="0.01" min="0"
            value={data.estimated_cost ?? ''}
            onChange={e => setData('estimated_cost', e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Mức độ</Form.Label>
          <Form.Select
            value={data.priority}
            onChange={e => setData('priority', e.target.value)}
          >
            {enums.priority.map(p => <option key={p} value={p}>{p}</option>)}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select
            value={data.status}
            onChange={e => setData('status', e.target.value)}
          >
            {enums.status.map(s => <option key={s} value={s}>{s}</option>)}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Ngày hoàn tất (auto khi chọn “completed”)</Form.Label>
          <Form.Control
            type="datetime-local"
            value={data.completed_at || ''}
            onChange={e => setData('completed_at', e.target.value)}
            disabled={data.status !== 'completed'}
          />
        </Col>
      </Row>

      {/* attachments: nhập danh sách URL, phân tách bằng xuống dòng */}
      <Form.Label>Tệp đính kèm (mỗi dòng là 1 URL)</Form.Label>
      <Form.Control
        as="textarea" rows={3}
        value={(data.attachments || []).join('\n')}
        onChange={(e) => setData('attachments', e.target.value.split('\n').filter(x => x.trim()))}
      />

      <div className="mt-4 d-flex gap-2">
        <Button type="submit" variant="success" disabled={processing}>{submitText}</Button>
      </div>
    </Form>
  );
}
