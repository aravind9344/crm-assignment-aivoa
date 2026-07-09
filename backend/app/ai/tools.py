from langchain_core.tools import tool


@tool
def summarize_interaction(notes: str) -> str:
    """
    Summarize the doctor's interaction.
    """
    return f"Summary: {notes}"


@tool
def extract_medicines(notes: str) -> str:
    """
    Extract medicine names from interaction.
    """
    return "Medicine extraction placeholder"


@tool
def schedule_followup(notes: str) -> str:
    """
    Suggest follow-up.
    """
    return "Follow-up after 2 weeks"


@tool
def extract_hcp_details(notes: str) -> str:
    """
    Extract doctor details.
    """
    return "Doctor details extracted"


@tool
def save_interaction(notes: str) -> str:
    """
    Save interaction.
    """
    return "Interaction saved successfully"