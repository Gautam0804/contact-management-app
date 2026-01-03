import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and Phone are required");
      return;
    }

    const res = await API.post("/contacts", {
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
    });

    onAdd(res.data);
    setForm({ name: "", email: "", phone: "", message: "" });
    navigate("/contacts");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h3 className="form-title">📇 Add New Contact</h3>
      <p className="form-subtitle">Save contact details securely</p>

      <div className="input-box">
        <span>👤</span>
        <input
          name="name"
          placeholder="Full Name *"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="input-box">
        <span>📧</span>
        <input
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-box">
        <span>📞</span>
        <input
          name="phone"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div className="input-box textarea-box">
        <span>📝</span>
        <textarea
          name="message"
          placeholder="Message (optional)"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button
        className="submit-btn"
        disabled={!form.name.trim() || !form.phone.trim()}
      >
        ➕ Save Contact
      </button>
    </form>
  );
}
