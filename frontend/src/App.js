import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/contacts"; // change to deployed URL later

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await axios.get(API);
    setContacts(res.data);
  };

  const addContact = async () => {
    await axios.post(API, form);
    fetchContacts();
    setForm({ name: "", email: "", phone: "" });
  };
  const deleteContact = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchContacts();
  };
  const updateContact = async (id) => {
    await axios.put(`${API}/${id}`, form);
    fetchContacts();
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div>
      <input
        placeholder="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <button onClick={addContact}>Add</button>
      <ul>
        {contacts.map((c) => (
          <li>
            {c.name} - {c.email} - {c.phone}
            <button onClick={() => deleteContact(c.id)}>Delete</button>
            <button onClick={() => updateContact(c.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
