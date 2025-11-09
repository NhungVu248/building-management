import React from "react";
import { useForm } from "@inertiajs/react";
import { Container } from "react-bootstrap";
import AmenityForm from "./Form";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    capacity: 1,
    max_per_week: 5,
    is_active: true,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("amenities.store"));
  };

  return (
    <Container className="py-4">
      <h3>➕ Thêm tiện ích mới</h3>
      <AmenityForm
        data={data}
        setData={setData}
        errors={errors}
        processing={processing}
        onSubmit={submit}
      />
    </Container>
  );
}
