import { useState } from "react";
import "./App.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://ticket-triage-agent-xxzk.onrender.com";

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
      const response = await fetch(`${API_BASE}/tickets/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setTickets(data);
      } else if (data.output) {
        const parsed = JSON.parse(data.output);
        setTickets(Array.isArray(parsed) ? parsed : [parsed]);
      } else {
        setTickets([data]);
      }
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(
        "Couldn't analyze this ticket. Check that the API is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    window.open(`${API_BASE}/tickets/download`, "_blank");
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <span className="eyebrow">Support Operations</span>
          <h1>AI Ticket Triage Agent</h1>
          <p>
            Drop in a ticket and the model sorts category, priority,
            and reasoning automatically.
          </p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>Analyzed Tickets</h3>
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

        <div className="form-card">
          <label className="field-label">
            Ticket title
          </label>

          <input
            type="text"
            className="input"
            placeholder="Enter ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="field-label">
            Description
          </label>

          <textarea
            className="input"
            placeholder="Enter ticket description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="upload-row">
            <span className="file-label">
              Bulk import (CSV)
            </span>

            <input
              type="file"
              accept=".csv"
              className="file-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button
              className="analyze-btn"
              onClick={runAnalysis}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze ticket"}
            </button>

            <button
              className="analyze-btn"
              onClick={downloadCSV}
            >
              Download CSV
            </button>
          </div>
        </div>

        <div className="results">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◎</div>
              <h3>No tickets triaged yet</h3>
              <p>
                Run an analysis above to see category,
                priority, and reasoning here.
              </p>
            </div>
          ) : (
            tickets.map((ticket, index) => {
              const priorityKey = (
                ticket.priority || ""
              ).toLowerCase();

              return (
                <div
                  key={ticket.id ?? index}
                  className={`ticket-card priority-border-${priorityKey}`}
                >
                  <h3 className="ticket-title">
                    {ticket.title || title}
                  </h3>

                  <div className="ticket-meta">
                    <span className="meta-label">
                      Category
                    </span>

                    <span className="badge category">
                      {ticket.category}
                    </span>

                    <span className="meta-label">
                      Priority
                    </span>

                    <span
                      className={`badge priority-${priorityKey}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>

                  <p className="ticket-reason">
                    <strong>Reason:</strong>{" "}
                    {ticket.reason ||
                      ticket.reasoning ||
                      "No reason provided"}
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
