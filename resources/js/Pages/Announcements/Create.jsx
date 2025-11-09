import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import { Container, Form, Button } from 'react-bootstrap';

export default function Create() {
  const { errors } = usePage().props;
  const { data, setData, post, processing } = useForm({
    title: '',
    content: '',
    channel: 'app',
    scheduled_at: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('announcements.store'));
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📝 Tạo Thông Báo Mới</h3>
        <Link href={route('announcements.index')}>
          <Button variant="secondary">← Quay lại</Button>
        </Link>
      </div>

      <Form onSubmit={submit} className="bg-light p-4 rounded shadow-sm">
        {/* Tiêu đề */}
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề thông báo"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
          {errors.title && <div className="text-danger small">{errors.title}</div>}
        </Form.Group>

        {/* Nội dung */}
        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Nhập nội dung thông báo..."
            value={data.content}
            onChange={(e) => setData('content', e.target.value)}
          />
          {errors.content && <div className="text-danger small">{errors.content}</div>}
        </Form.Group>

        {/* Kênh gửi */}
        <Form.Group className="mb-3">
          <Form.Label>Kênh gửi</Form.Label>
          <Form.Select
            value={data.channel}
            onChange={(e) => setData('channel', e.target.value)}
          >
            <option value="app">Ứng dụng (App)</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="all">Tất cả kênh</option>
          </Form.Select>
          {errors.channel && <div className="text-danger small">{errors.channel}</div>}
        </Form.Group>

        {/* Thời gian gửi */}
        <Form.Group className="mb-3">
          <Form.Label>Thời gian gửi (tùy chọn)</Form.Label>
          <Form.Control
            type="datetime-local"
            value={data.scheduled_at}
            onChange={(e) => setData('scheduled_at', e.target.value)}
          />
          {errors.scheduled_at && (
            <div className="text-danger small">{errors.scheduled_at}</div>
          )}
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button type="submit" disabled={processing}>
            {processing ? 'Đang lưu...' : 'Tạo thông báo'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
