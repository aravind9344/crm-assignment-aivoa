from typing import TypedDict
import json

from langgraph.graph import StateGraph, END
from app.ai.groq_client import llm


class GraphState(TypedDict):
    input: str
    output: str


PROMPT = """
You are an intelligent AI CRM Assistant for a Healthcare CRM system.

Your job is to understand medical representative conversations and CRM update requests.

There are TWO types of tasks.

================================================

TASK 1: EXTRACT NEW INTERACTION

If the user describes a doctor meeting, extract CRM details.

Return:

{
    "mode": "extract",
    "hcp_name": "",
    "hospital": "",
    "specialty": "",
    "interaction_type": "",
    "notes": "",
    "follow_up": ""
}

================================================

TASK 2: UPDATE EXISTING CRM DATA

If the user wants to change any CRM field, return only:

{
    "mode": "update",
    "field": "",
    "value": ""
}

Examples:

User:
Change doctor name to Dr Ravi

Return:
{
    "mode":"update",
    "field":"hcp_name",
    "value":"Dr Ravi"
}


User:
Hospital is Apollo Chennai

Return:
{
    "mode":"update",
    "field":"hospital",
    "value":"Apollo Chennai"
}


User:
Specialty is Cardiologist

Return:
{
    "mode":"update",
    "field":"specialty",
    "value":"Cardiologist"
}


User:
Follow up next Tuesday

Return:
{
    "mode":"update",
    "field":"follow_up",
    "value":"Next Tuesday"
}


Allowed fields:

hcp_name
hospital
specialty
interaction_type
notes
follow_up


================================================

RULES:

- Return ONLY valid JSON.
- Do not use markdown.
- Do not use ```json.
- Do not explain anything.
- Keep values as plain text.

Conversation:

"""


def ai_node(state: GraphState):

    response = llm.invoke(
        PROMPT + state["input"]
    )

    return {
        "output": response.content
    }



builder = StateGraph(GraphState)


builder.add_node(
    "ai",
    ai_node
)


builder.set_entry_point("ai")


builder.add_edge(
    "ai",
    END
)


graph = builder.compile()



def extract_interaction(text: str):

    result = graph.invoke(
        {
            "input": text
        }
    )


    output = result["output"]


    # Remove markdown if AI returns it

    output = output.replace(
        "```json",
        ""
    )

    output = output.replace(
        "```",
        ""
    )

    output = output.strip()



    try:

        return json.loads(output)


    except Exception:

        return {
            "mode": "error",
            "message": output
        }