import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function FormPage() {
  const { item } = usePage().props;
  const { data, setData, post, put, processing } = useForm({
    asset_name: item?.asset_name ?? '',
    frequency: item?.frequency ?? 'monthly',
    next_run_on: item?.next_run_on
      ? dayjs(item.next_run_on).format('YYYY-MM-DD')
      : '',
    last_run_on: item?.last_run_on
      ? dayjs(item.last_run_on).format('YYYY-MM-DD')
      : '',
    notes: item?.notes ?? '',
  });

  const submit = (e) => {
    e.preventDefault();
    if (item) put(route('maintenance-schedules.update', item.id));
    else post(route('maintenance-schedules.store'));
  };

  return (
    <Container className="mt-4">
      <h4>{item ? 'Cập nhật lịch bảo dưỡng' : 'Thêm lịch bảo dưỡng mới'}</h4>

      <Form onSubmit={submit} className="mt-3">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Thiết bị / Hệ thống</Form.Label>
              <Form.Control
                type="text"
                required
                value={data.asset_name}
                onChange={(e) => setData('asset_name', e.target.value)}
                placeholder="Ví dụ: Máy phát điện tầng hầm"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Tần suất</Form.Label>
              <Form.Select
                value={data.frequency}
                onChange={(e) => setData('frequency', e.target.value)}
              >
                <option value="weekly">Hàng tuần</option>
                <option value="monthly">Hàng tháng</option>
                <option value="quarterly">Hàng quý</option>
                <option value="yearly">Hàng năm</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Ngày bảo dưỡng kế tiếp</Form.Label>
              <Form.Control
                type="date"
                required
                value={data.next_run_on}
                onChange={(e) => setData('next_run_on', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Lần gần nhất</Form.Label>
              <Form.Control
                type="date"
                value={data.last_run_on}
                onChange={(e) => setData('last_run_on', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={data.notes}
                onChange={(e) => setData('notes', e.target.value)}
                placeholder="Ghi chú thêm (nếu có)"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex">
          <Button type="submit" disabled={processing}>
            {item ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button
            as={Link}
            href={route('maintenance-schedules.index')}
            variant="secondary"
            className="ms-2"
          >
            Hủy
          </Button>
        </div>
      </Form>
    </Container>
  );
}
