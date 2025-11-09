import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Container, Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import RowItem from './Row';

export default function AccessLogsIndex() {
  const { items, cards } = usePage().props; // props từ controller
  const { data, setData, post, processing, reset } = useForm({
    access_card_id: '',
    gate: '',
    action: 'entry',
    result: 'allowed',
    reason: '',
    scanned_at: '',
  });

  const [showForm, setShowForm] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route('access-logs.store'), {
      onSuccess: () => {
        reset();
        setShowForm(false);
      },
    });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Lượt ra/vào</h4>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Ẩn form ghi log' : 'Ghi log mới'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Form onSubmit={submit}>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Thẻ ra/vào</Form.Label>
                    <Form.Select
                      required
                      value={data.access_card_id}
                      onChange={(e) => setData('access_card_id', e.target.value)}
                    >
                      <option value="">-- chọn thẻ --</option>
                      {cards.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.code} - {c.holder_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cổng</Form.Label>
                    <Form.Control
                      required
                      value={data.gate}
                      onChange={(e) => setData('gate', e.target.value)}
                      placeholder="Gate-1"
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hành động</Form.Label>
                    <Form.Select
                      value={data.action}
                      onChange={(e) => setData('action', e.target.value)}
                    >
                      <option value="entry">Entry</option>
                      <option value="exit">Exit</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kết quả</Form.Label>
                    <Form.Select
                      value={data.result}
                      onChange={(e) => setData('result', e.target.value)}
                    >
                      <option value="allowed">Allowed</option>
                      <option value="denied">Denied</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Thời gian quẹt</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={data.scanned_at}
                      onChange={(e) => setData('scanned_at', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Lý do (nếu bị từ chối)</Form.Label>
                <Form.Control
                  value={data.reason}
                  onChange={(e) => setData('reason', e.target.value)}
                  placeholder="Ví dụ: thẻ hết hạn"
                />
              </Form.Group>
              <Button type="submit" disabled={processing}>
                Ghi lại
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Thẻ</th>
                <th>Người dùng</th>
                <th>Hành động</th>
                <th>Kết quả</th>
                <th>Cổng</th>
                <th>Thời gian</th>
                <th>Lý do</th>
              </tr>
            </thead>
            <tbody>
              {items.data.map((log) => (
                <RowItem key={log.id} log={log} />
              ))}
            </tbody>
          </Table>
          {items.data.length === 0 && <p className="text-muted">Chưa có lượt ra/vào nào.</p>}
        </Card.Body>
      </Card>
    </Container>
  );
}
