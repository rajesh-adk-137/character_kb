

# ⚙️ MindsDB Setup Guide for CharacterKB

This guide provides step-by-step instructions to configure MindsDB for the CharacterKB application. Please ensure you have already followed the main `README.md` to start your Docker containers, which includes the MindsDB instance.

## 1\. Access MindsDB Studio

Once MindsDB is running via `docker compose up -d` (as described in the main `README.md`), open your web browser and navigate to the MindsDB GUI:

[`http://127.0.0.1:47334/`](https://www.google.com/search?q=%5Bhttp://127.0.0.1:47334/%5D\(http://127.0.0.1:47334/\))

## 2\. Prepare Your Character Dataset

The CharacterKB application relies on a dataset of characters for its core knowledge base: `character_data_10000.csv`. This CSV file contains approximately 10,000 character entries with fields like `unique_id`, `media_type`, `genre`, `character_name`, and `description`.

***Disclaimer regarding the dataset:***
*The dataset used in this project, `character_data_10000.csv`, is repurposed from the [Character Codex dataset by NousResearch](https://huggingface.co/datasets/NousResearch/CharacterCodex). This project does not claim ownership of the original dataset.*




1.  **Download `character_data_10000.csv`**: Locate and download the `character_data_10000.csv` file from this repository (it's available in the `mindsdb/` folder).
2.  **Upload to Google Sheets**: Upload this `character_data_10000.csv` file to your Google Drive and convert it into a Google Sheet.
3.  **Make Public**: Set the sharing permissions for this Google Sheet to "Anyone with the link can **view**".
4.  **Get Sheet ID**: Copy the `spreadsheet_id` from the Google Sheet's URL. The `spreadsheet_id` is the long string of characters between `/d/` and `/edit` in the URL (e.g., `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit`). You will use this ID in the SQL script below.
5.  **Name the Sheet**: Ensure the name of the sheet (tab within the Google Sheet) is exactly `character_data_10000`.

## 3\. Configure MindsDB Resources

Now, you will execute the necessary SQL commands in the MindsDB SQL Editor (accessible through the MindsDB GUI) each code block at a time. **Before running, make sure to replace all instances of `YOUR_GOOGLE_SHEET_ID` with your actual Google Sheet ID and `YOUR_OPENAI_API_KEY` with your actual OpenAI API key.**

```sql
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
```

## 4\. Evaluate Knowledge Base (Optional & Currently Bugged)

This section demonstrates how to use the `EVALUATE KNOWLEDGE_BASE` feature. This step is optional and not essential for the core application to run. As noted in the main `README.md`, this functionality was observed to be bugged during testing, specifically regarding semantic evaluation.

**Steps to prepare `testing_data.csv` for MindsDB Files:**

1.  **Download `testing_data.csv`**: Locate and download the `testing_data.csv` file from the `mindsdb/` folder in your repository.
2.  **Upload to MindsDB Files**: In the MindsDB Studio GUI, navigate to the `Files` section and upload `testing_data.csv`. Ensure you name the uploaded file `testing_data`.

Once uploaded, execute the following SQL in MindsDB Studio:

```sql
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
```


## Next Steps

Congratulations\! With MindsDB configured, your CharacterKB application is now ready to run. Proceed to the main `README.md` to start the frontend and explore the app's features.

