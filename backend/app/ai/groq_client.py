import json

from app.ai.llm import llm
from app.ai.llm import llm
from app.ai.prompts import SYSTEM_PROMPT


def extract_interaction(text: str):

    response = llm.invoke(
        SYSTEM_PROMPT + "\n\nUser Conversation:\n" + text
    )

    return json.loads(response.content)