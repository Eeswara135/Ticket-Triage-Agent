import json
import os
import sqlite3
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv
import pandas as pd

from agent import classify_ticket


# Get current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Path to input JSON file
json_path = os.path.join(current_dir, "tickets.json")

# Load tickets
with open(json_path, "r", encoding="utf-8") as file:
    tickets = json.load(file)

# Classify tickets
results = []

for ticket in tickets:
    result = classify_ticket(ticket)

    results.append({
        "title": ticket["title"],
        "category": result["category"],
        "priority": result["priority"],
        "reason": result["reason"]
    })

# Convert to DataFrame
df = pd.DataFrame(results)

# Output directory
output_dir = os.path.join(current_dir, "..", "output")
os.makedirs(output_dir, exist_ok=True)

csv_path = os.path.join(output_dir, "results.csv")
json_output_path = os.path.join(output_dir, "results.json")

# Save CSV
if os.path.exists(csv_path):
    df.to_csv(
        csv_path,
        mode="a",
        header=False,
        index=False
    )
else:
    df.to_csv(
        csv_path,
        index=False
    )

# Save JSON
with open(json_output_path, "w", encoding="utf-8") as file:
    json.dump(
        results,
        file,
        indent=2
    )

# Database path
db_path = os.path.join(
    current_dir,
    "..",
    "database",
    "tickets.db"
)

# Connect to SQLite
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Create table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    priority TEXT,
    reason TEXT
)
""")

conn.commit()

# Insert records
for row in results:
    cursor.execute(
        """
        INSERT INTO tickets (
            title,
            category,
            priority,
            reason
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            row["title"],
            row["category"],
            row["priority"],
            row["reason"]
        )
    )

conn.commit()
conn.close()

# Print results
print(
    json.dumps(
        results,
        indent=2
    )
)
