def classify_ticket(ticket):

    text = (
        ticket["title"] + " " +
        ticket["description"]
    ).lower()

    if (
        "payment" in text or
        "charged" in text or
        "billing" in text
    ):
        return {
            "category": "Billing",
            "priority": "P1",
            "reason": "Payment related issue"
        }

    elif (
        "crash" in text or
        "error" in text or
        "bug" in text
    ):
        return {
            "category": "Bug",
            "priority": "P1",
            "reason": "Application issue detected"
        }

    elif (
        "feature" in text or
        "dark mode" in text or
        "request" in text
    ):
        return {
            "category": "Feature",
            "priority": "P4",
            "reason": "Feature enhancement request"
        }

    else:
        return {
            "category": "Other",
            "priority": "P3",
            "reason": "General support request"
        }