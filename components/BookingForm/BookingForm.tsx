"use client";

import { useState } from "react";
import { createBookingRequest } from "@/lib/campers";
import css from "./BookingForm.module.css";
import toast from "react-hot-toast";

type BookingFormValues = {
  name: string;
  email: string;
};

type BookingFormErrors = {
  name?: string;
  email?: string;
};

type BookingFormProps = {
  camperId: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: BookingFormValues): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange =
    (field: keyof BookingFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await createBookingRequest(camperId, values);
      toast.success(response.message || "Booking request sent successfully!");
      setValues({ name: "", email: "" });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={css.field}>
        <input
          type="text"
          placeholder="Name*"
          className={css.input}
          value={values.name}
          onChange={handleChange("name")}
        />
        {errors.name && <span className={css.error}>{errors.name}</span>}
      </div>

      <div className={css.field}>
        <input
          type="email"
          placeholder="Email*"
          className={css.input}
          value={values.email}
          onChange={handleChange("email")}
        />
        {errors.email && <span className={css.error}>{errors.email}</span>}
      </div>

      {submitError && <span className={css.error}>{submitError}</span>}

      <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
