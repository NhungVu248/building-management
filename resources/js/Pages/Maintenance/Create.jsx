import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import { Card } from 'react-bootstrap';
import MaintenanceForm from './_Form';

export default function Create() {
  const { enums } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '', description: '', apartment_id: '', priority: 'medium',
    status: 'pending', assigned_to: '', due_date: '', estimated_cost: '',
    attachments: [], completed_at: '',
  });

  const onSubmit = (e) => { e.preventDefault(); post(route('maintenance.store')); };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛠️ Thêm yêu cầu bảo trì</h2>
        <Link href={route('maintenance.index')} className="btn btn-outline-secondary">Quay lại</Link>
      </div>
      <Card body>
        <MaintenanceForm
          data={data} setData={setData}
          processing={processing} onSubmit={onSubmit}
          enums={enums} errors={errors}
          submitText="Tạo yêu cầu"
        />
      </Card>
    </div>
  );
}
