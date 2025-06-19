import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mindsdb_sdk
import logging

load_dotenv()

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Connect to MindsDB
try:
    con = mindsdb_sdk.connect('http://127.0.0.1:47334')
    project = con.get_project('mindsdb')
except Exception as e:
    logger.error(f"Failed to connect to MindsDB: {e}")
    raise RuntimeError(f"Failed to connect to MindsDB: {e}")

# Request schema for KB query
class CharacterQueryRequest(BaseModel):
    query: str
    media_type: str | None = None  # optional

# Response schema for top 5 characters
class CharacterQueryResponse(BaseModel):
    character_name: str
    genre: str
    media_type: str
    description: str
    relevance: float

# Request schema for chat
class CharacterChatRequest(BaseModel):
    character_name: str
    character_description: str
    question: str

# Endpoint to search characters from KB
@app.post("/character_search", response_model=list[CharacterQueryResponse])
async def character_search(request: CharacterQueryRequest):
    try: # character_kb_2
        base_query = f"""
            SELECT *
            FROM character_kb_10000
            WHERE content = '{request.query}'
        """
        if request.media_type:
            base_query += f" AND media_type = '{request.media_type}'"

        base_query += " LIMIT 5;"

        logger.info(f"Querying MindsDB KB: {base_query}")
        result = project.query(base_query)
        rows = result.fetch()

        if rows.empty:
            raise HTTPException(status_code=404, detail="No matching characters found")

        results = []
        for _, row in rows.iterrows():
            metadata_str = row.get("metadata", "{}")
            metadata = json.loads(metadata_str)

            results.append(CharacterQueryResponse(
                character_name=metadata.get("character_name", "Unknown"),
                genre=metadata.get("genre", "Unknown"),
                media_type=metadata.get("media_type", "Unknown"),
                description=row.get("chunk_content", ""),
                relevance=row.get("relevance", None)
            ))

        return results

    except Exception as e:
        logger.error(f"Search failed: {e}")
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")

# ✅ Corrected Endpoint to chat with character using MindsDB model
@app.post("/character_chat")
async def character_chat(request: CharacterChatRequest):
    try:
        query = f"""
            SELECT response
            FROM character_advisor
            WHERE
                character_name = '{request.character_name}'
                AND character_description = '{request.character_description}'
                AND question = '{request.question}'
        """

        logger.info(f"Querying MindsDB Model: {query}")
        result = project.query(query)
        rows = result.fetch()

        if rows.empty:
            raise HTTPException(status_code=500, detail="No response generated")

        return {"response": rows.iloc[0]["response"]}

    except Exception as e:
        logger.error(f"Chat failed: {e}")
        raise HTTPException(status_code=500, detail=f"Chat failed: {e}")
