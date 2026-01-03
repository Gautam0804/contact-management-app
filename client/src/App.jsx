import { useEffect, useState } from "react";
import API from "./api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    API.get("/contacts")
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addContact = (contact) => {
    setContacts((prev) => [contact, ...prev]);
    setSuccess("Contact added successfully!");
    setShowList(true);
    setTimeout(() => setSuccess(""), 1500);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="page">
      <header className="top-header">
        <h1>Contact Manager</h1>
        <p>Save and manage your contacts easily</p>
      </header>

      <div className="main-card">
        {/* Tabs INSIDE card */}
        <div className="card-tabs">
          <button
            className={!showList ? "tab active" : "tab"}
            onClick={() => setShowList(false)}
          >
            Add Contact
          </button>
          <button
            className={showList ? "tab active" : "tab"}
            onClick={() => setShowList(true)}
          >
            View Contacts
          </button>
        </div>

        {success && <p className="success">{success}</p>}

        {!showList ? (
          <ContactForm onAdd={addContact} />
        ) : loading ? (
          <p className="loading">Loading contacts...</p>
        ) : (
          <ContactList contacts={contacts} onDelete={deleteContact} />
        )}
      </div>
    </div>
  );
}
