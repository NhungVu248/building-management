import React from "react";
import { useForm } from "@inertiajs/react";
import { Container } from "react-bootstrap";
import AmenityForm from "./Form";

export default function Edit({ amenity }) {
  const { data, setData, put, processing, errors } = useForm({
    name: amenity.name || "",
    description: amenity.description || "",
    capacity: amenity.capacity || 1,
    max_per_week: amenity.max_per_week || 5,
    is_active: amenity.is_active || false,
  });

  const submit = (e) => {
    e.preventDefault();
    put(route("amenities.update", amenity.id));
  };

  return (
    <Container className="py-4">
      <h3>📝 Chỉnh sửa tiện ích: {amenity.name}</h3>
      <AmenityForm
        data={data}
        setData={setData}
        errors={errors}
        processing={processing}
        onSubmit={submit}
        isEdit
      />
    </Container>
  );
}
