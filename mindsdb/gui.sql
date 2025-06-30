-- Connect MindsDB to your Google Sheet containing character data
CREATE DATABASE character_sheet_10000
WITH ENGINE = "sheets",
PARAMETERS = {
  "spreadsheet_id": "YOUR_GOOGLE_SHEET_ID", -- Replace with your Google Sheet ID
  "sheet_name": "character_data_10000"
};

--------------------------------------------------------------

-- Verify connection by previewing the first 50 entries
SELECT * FROM character_sheet_10000.character_data_10000 LIMIT 50;

--------------------------------------------------------------

-- Create the core Knowledge Base for semantic character search
CREATE KNOWLEDGE_BASE character_kb_10000
USING
  embedding_model = {
    "provider": "openai",
    "model_name": "text-embedding-3-large",
    "api_key": "YOUR_OPENAI_API_KEY" -- Replace with your OpenAI API Key
  },
  -- reranking_model is commented out as per project implementation as it is optional. Uncomment if needed later.
  -- reranking_model = {
  --   "provider": "openai",
  --   "model_name": "gpt-4o",
  --   "api_key": "YOUR_OPENAI_API_KEY"
  -- },
  metadata_columns = ['media_type', 'genre','character_name'],
  content_columns = ['description'],
  id_column = 'unique_id';

--------------------------------------------------------------------

-- Insert your character data into the Knowledge Base
INSERT INTO character_kb_10000
SELECT unique_id, media_type, genre, character_name, description
FROM character_sheet_10000.character_data_10000;

--------------------------------------------------------------------

-- Run a test semantic search to verify the Knowledge Base is working
SELECT *
FROM character_kb_10000
WHERE content = 'a genius scientist who loves trains sheldon'
LIMIT 5;

--------------------------------------------------------------------

-- Create an AI Agent for interactive character chat
CREATE AGENT character_agent
USING
  model = 'gpt-4o',
  openai_api_key = 'YOUR_OPENAI_API_KEY', -- Replace with your OpenAI API Key
  prompt_template = '
You are roleplaying as a fictional character named {{character_name}}.

Character Description:
{{character_description}}

A user has asked the following life question:
"{{question}}"

Respond in-character, using the unique voice, personality, and emotional tone of {{character_name}}. Be concise but thoughtful. If the character is humorous, sarcastic, intense, or inspiring, reflect that naturally.

Use emojis if they match the personality and tone — like how the character would actually text or speak. Keep them **minimal and meaningful** (don’t overuse). Think of them as emotional spice 🌶️ — not the whole dish.

Avoid generic advice. Make the response feel personal, like a short and powerful one-liner or reflection from {{character_name}} themself.';

---------------------------------------------------------------

-- Test the Character Agent
SELECT answer
FROM character_agent
WHERE
  character_name = 'Tony Stark'
  AND character_description = 'Tony Stark is a genius billionaire inventor who masks his insecurities with sarcasm and bold charisma. As Iron Man, he faces threats with a mix of wit, technology, and restless optimism about humankind’s potential.'
  AND question = 'I’m nervous before my first job interview. Any advice?';

----------------------------------------------------------------

-- Create an AI Model for generating character personality insights
CREATE MODEL character_insights
PREDICT response
INPUT character_name, character_description
USING
  engine = 'openai',
  model_name = 'gpt-4o',
  openai_api_key = 'YOUR_OPENAI_API_KEY', -- Replace with your OpenAI API Key
  prompt_template = '
You are an expert character analyst with deep knowledge of both fictional and real‑world personalities.

Based on your own insights into the character named “{{character_name}}” (and with the short description below provided for additional context), generate the following:

1. **Exactly five (5) distinct personality or thematic tags**, separated by commas. 
2. **Exactly five (5) unique emotional traits**, each paired with an intensity score from 1 to 10.

Ensure that all tags and emotional traits are meaningfully distinct (avoid overlap). 
Strictly adhere to the format shown below and do **not** add any extra commentary or text.

tags: tag1, tag2, tag3, tag4, tag5 
emotional_profile: trait1: score/10, trait2: score/10, trait3: score/10, trait4: score/10, trait5: score/10

Name: {{character_name}} 
Description (for reference): {{character_description}}
';

----------------------------------------------------------------------

-- Test the Character Insights Model
SELECT response
FROM character_insights
WHERE
  character_name = 'Tony Stark'
  AND character_description = 'Tony Stark is a genius billionaire inventor who masks his insecurities with sarcasm and bold charisma. As Iron Man, he faces threats with a mix of wit, technology, and restless optimism about humankind’s potential.';

----------------------------------------------------------------------

-- Set up a data ingestion JOB to periodically check for new updates in the data source and add them to KB.
-- This job assumes 'unique_id' is incrementally increasing. Adjust WHERE clause based on your data.
CREATE JOB character_kb_job AS (
  INSERT INTO character_kb_10000
  SELECT unique_id, media_type, genre, character_name, description
  FROM character_sheet_10000.character_data_10000
  WHERE unique_id > 10000; -- Adjust this condition if your initial dataset has a different max ID
)
EVERY 1 minute;

------------------------------------------------------------------------

-- Evaluate the relevancy and accuracy of the documents returned by the knowledge base
EVALUATE KNOWLEDGE_BASE character_kb_10000
USING
    test_table = files.testing_data,
    version = 'doc_id', -- This should ideally be a semantic version, but 'doc_id' shows current behavior
    evaluate = true,
    llm = {
        'provider': 'openai',
        'api_key': 'YOUR_OPENAI_API_KEY', -- Replace with your OpenAI API Key
        'model_name': 'gpt-4o'
    };

-------------------------------------------------------------------------

-- You can inspect the testing data if needed
SELECT * FROM files.testing_data LIMIT 5;