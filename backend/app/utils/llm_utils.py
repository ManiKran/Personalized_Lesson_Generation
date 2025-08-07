# backend/app/utils/llm_utils.py
import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# Load .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Debug: confirm key loaded
print("Loaded API Key:", os.getenv("OPENAI_API_KEY")[:10])  # first 10 chars for safety

# Stage 1: Generate Rule Mapping JSON
def generate_rule_mapping(profile_data, retrieved_strategies):
    prompt = f"""
You are a helpful assistant for teachers. Based on the student profile below and the retrieved adaptation strategies, generate a JSON mapping of rules that can be used to personalize lesson content.

Student Profile:
{json.dumps(profile_data, indent=2)}

Retrieved Strategies:
{retrieved_strategies}

Output JSON should include keys like:
- simplify_language (true/false)
- translate_headers (language or null)
- add_visuals (true/false)
- chunk_instructions (true/false)
- interests (list of topics)

Return only the JSON.
"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You generate adaptation rules for students."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    output = response.choices[0].message.content.strip()
    return output

# Stage 2: Personalize Lesson Content
def personalize_lesson(lesson_text, rule_mapping_json):
    prompt = f"""
You are an assistant that modifies lesson content to fit individual student needs.

Adapt this lesson using the following rule mapping:
{rule_mapping_json}

Original Lesson:
{lesson_text}

Modified Lesson:
"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You personalize lessons for students based on rules."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5
    )

    modified_content = response.choices[0].message.content.strip()
    return modified_content