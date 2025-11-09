import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import { Card } from 'react-bootstrap';
import MaintenanceForm from './_Form';

export default function Edit() {
  const { item, enums } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    title: item.title ?? '',
    description: item.description ?? '',
    apartment_id: item.apartment_id ?? '',
    priority: item.priority ?? 'medium',
    status: item.status ?? 'pending',
    assigned_to: item.assigned_to ?? '',
    due_date: item.due_date ?? '',
    estimated_cost: item.estimated_cost ?? '',
    attachments: item.attachments ?? [],
    completed_at: item.completed_at ?? '',
  });

  const onSubmit = (e) => { e.preventDefault(); put(route('maintenance.update', item.id)); };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛠️ Sửa yêu cầu #{item.id}</h2>
        <div className="d-flex gap-2">
          <Link href={route('maintenance.index')} className="btn btn-outline-secondary">Danh sách</Link>
          <Link href={route('maintenance.destroy', item.id)} method="delete" as="button" className="btn btn-outline-danger">Xóa</Link>
        </div>
      </div>
      <Card body>
        <MaintenanceForm
          data={data} setData={setData}
          processing={processing} onSubmit={onSubmit}
          enums={enums} errors={errors}
          submitText="Cập nhật"
        />
      </Card>
    </div>
  );
}
