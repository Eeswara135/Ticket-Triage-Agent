import { useState } from "react";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const p1Count = tickets.filter((t) => t.priority === "P1").length;
  const billingCount = tickets.filter((t) => t.category === "Billing").length;

  const runAnalysis = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Add a title and description before running an analysis.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/tickets/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const parsed = JSON.parse(data.output);
      setTickets(parsed);
    } catch (err) {
      setError("Couldn't analyze this ticket. Check that the API is running and try again.");
    } finally {
      setLoading(false);
    }
  };
const downloadCSV = () => {
window.open(
"http://localhost:5000/tickets/download",
"_blank"
);
};

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <span className="eyebrow">Support Operations</span>
          <h1>AI Ticket Triage Agent</h1>
          <p>
            Drop in a ticket and the model sorts category, priority, and
            reasoning so your queue triages itself.
          </p>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <h2>{tickets.length}</h2>
          </div>

          <div className="stat-card">
            <h3>P1 — Critical</h3>
            <h2>{p1Count}</h2>
          </div>

          <div className="stat-card">
            <h3>Billing</h3>
            <h2>{billingCount}</h2>
          </div>
        </div>

        {/* Form */}
        <div className="form-card">
          <label className="field-label" htmlFor="ticket-title">
            Ticket title
          </label>
          <input
            id="ticket-title"
            type="text"
            className="input"
            placeholder="e.g. Customer can't reset their password"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="field-label" htmlFor="ticket-description">
            Description
          </label>
          <textarea
            id="ticket-description"
            className="input"
            placeholder="Paste the full ticket details here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="upload-row">
            <span className="file-label">Bulk import (CSV)</span>
            <input
              type="file"
              accept=".csv"
              className="file-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className="analyze-btn" onClick={runAnalysis} disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? "Analyzing..." : "Analyze ticket"}
          </button>
        </div>

        {/* Results */}
        <div className="results">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◎</div>
              <h3>No tickets triaged yet</h3>
              <p>Run an analysis above to see category, priority, and reasoning here.</p>
            </div>
          ) : (
            tickets.map((ticket, index) => {
              const priorityKey = (ticket.priority || "").toLowerCase();
              return (
                <div
                  key={ticket.id ?? index}
                  className={`ticket-card priority-border-${priorityKey}`}
                >
                  <h3 className="ticket-title">{ticket.title}</h3>

                  <div className="ticket-meta">
                    <span className="meta-label">Category</span>
                    <span className="badge category">{ticket.category}</span>

                    <span className="meta-label">Priority</span>
                    <span className={`badge priority-${priorityKey}`}>
                      {ticket.priority}
                    </span>
                  </div>

                  <p className="ticket-reason">
                    <strong>Reason</strong>
                    {ticket.reason}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
