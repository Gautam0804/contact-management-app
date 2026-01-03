import API from "../api";

export default function ContactList({ contacts, onDelete }) {
  const handleDelete = async (id) => {
    await API.delete(`/contacts/${id}`);
    onDelete(id);
  };

  return (
    <div className="list premium-list">
      <h3 className="list-title">📋 Saved Contacts</h3>

      {contacts.length === 0 && (
        <p className="empty-text">No contacts added yet</p>
      )}

      {contacts.map((c) => (
        <div key={c._id} className="card premium-card">
          <div className="card-left">
            <div className="avatar">
              {c.name.charAt(0).toUpperCase()}
            </div>

            <div className="info">
              <h4>{c.name}</h4>
              <p className="phone">📞 {c.phone}</p>
              {c.email && <p className="email">📧 {c.email}</p>}
            </div>
          </div>

          <button
            className="delete-btn premium-delete"
            onClick={() => handleDelete(c._id)}
            title="Delete contact"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
