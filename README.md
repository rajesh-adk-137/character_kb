

# 🤖 CharacterKB
<p align="center">
  <a href="https://github.com/rajesh-adk-137/character_kb/watchers" target="_blank">
    <img src="https://img.shields.io/github/watchers/rajesh-adk-137/character_kb?style=for-the-badge&logo=appveyor" alt="Watchers"/>
  </a>
  <a href="https://github.com/rajesh-adk-137/character_kb/fork" target="_blank">
    <img src="https://img.shields.io/github/forks/rajesh-adk-137/character_kb?style=for-the-badge&logo=appveyor" alt="Forks"/>
  </a>
  <a href="https://github.com/rajesh-adk-137/character_kb/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/rajesh-adk-137/character_kb?style=for-the-badge&logo=appveyor" alt="Stars"/>
  </a>
</p>


-----

## About app

CharacterKB is an innovative AI-powered platform designed to revolutionize how you discover, analyze, and interact with fictional characters. Leveraging MindsDB's advanced Knowledge Bases, CharacterKB allows users to find characters by natural language descriptions, gain deep psychological insights into their personalities, and engage in meaningful conversations with them. Whether you're a writer seeking inspiration, a fan curious about your favorite character's psyche, or simply looking for life advice from a unique perspective, CharacterKB offers an immersive and insightful experience with over 10,000 characters from various media types.

-----

## Key Features

  - **AI-Powered Character Discovery**: Describe any character idea in natural language (e.g., "Billionaire who becomes a symbol of fear for criminals") and instantly get the best match along with the top 5 closest results using MindsDB's semantic search.
  - **Character Insights & Analysis**: Dive deeper with AI-powered psychological profiling that analyzes personality traits, emotional patterns, and core characteristics. Get concise personality tags and structured emotional profiles highlighting confidence, optimism, wit, and more.
  - **Interactive Character Chat**: Engage in authentic conversations with discovered characters in their unique voices and mannerisms. Just click 'Chat' to get personalized advice, creative insights, or fun interactions—no setup needed.
  - **Smart Image Suggestions**: See visual representations of your matched character with curated image results pulled from the web using intelligent search, automatically and seamlessly.
  - **Filter by Media Type**: Refine your character searches by over 20 different media types, including Movies, TV Shows, Novels, Games, Anime, and Mythology.
  - **Authentic Conversations**: Characters respond with their unique voice, mannerisms, and wisdom, offering life advice, creative insights, and new perspectives.

-----

## Technologies Used

  - **MindsDB** (Docker Compose)
      - Vector search Knowledge Base
      - AI Tables & Agent for character insights and chatbot
      - JOB for periodic data ingestion
  - **FastAPI** (Python)
      - `/character_search` (semantic search with metadata filtering)
      - `/character_chat` (AI Agent for conversations)
      - `/character_insights` (AI Table for personality analysis)
  - **React** + **Tailwind CSS**
  - **OpenAI** (for MindsDB models)
  - **Google Custom Search API** (for image generation)

-----

## Getting Started

### Ensure you system has:

  - **Docker Desktop** & **Docker Compose**
  - **Python 3.8+**
  - **Node.js** & **Yarn**

-----

### 🛠️ Installation Guide

#### 1\. Clone the Repository

```bash
git clone https://github.com/rajesh-adk-137/character_kb.git
cd character_kb
```

-----

#### 2\. Frontend Setup

1.  **Navigate to the frontend directory**

    ```bash
    cd frontend
    ```

2.  **Install dependencies**

    ```bash
    yarn install
    ```

3.  **Create `.env` file for Google API keys**

    In the `frontend` directory, create a file named `.env` and add your Google API key and Search Engine ID:

    ```env
    VITE_GOOGLE_API_KEY="your_google_api_key"
    VITE_SEARCH_ENGINE_ID="your_search_engine_id"
    ```

    *Note: The app functions without these keys, but they enhance the experience by providing relevant character images.*

4.  **Run the development server**

    ```bash
    yarn run dev
    ```

5.  **Access the frontend in your browser**
    [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)

-----

#### 3\. Backend Setup

1.  **Navigate to the backend directory**

    ```bash
    cd ../backend
    ```

2.  **Create and activate a virtual environment**

      * **Windows (PowerShell):**

        ```powershell
        python -m venv venv
        .\venv\Scripts\Activate.ps1
        ```

      * **macOS/Linux:**

        ```bash
        python -m venv venv
        source venv/bin/activate
        ```

3.  **Install Python dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Start MindsDB**

    ```bash
    docker compose up -d
    ```

    To stop MindsDB:

    ```bash
    docker compose down
    ```

5.  **Start the FastAPI backend server**

    ```bash
    uvicorn app:app --reload
    ```

6.  **Access URLs:**

      * MindsDB Studio: [http://localhost:47334](https://www.google.com/search?q=http://localhost:47334)
      * FastAPI backend: [http://localhost:8000](https://www.google.com/search?q=http://localhost:8000)

7.  **Setup for running MindsDB queries**
    Follow the instructions in [`mindsdb_readme.md`](mindsdb/mindsdb_readme.md) to initialize MindsDB with the required code for the Knowledge Base, AI Tables, and Agents.

-----

### 📺 Live Demo

[Click here to watch the demo video](https://github.com/user-attachments/assets/554bffd4-d7f4-4768-bdef-988753f55de0)


## Screenshots

### Landing Page
![Image1](https://github.com/user-attachments/assets/a2b2ad76-80fa-4241-8196-e2e78541f1a0)
![Image2](https://github.com/user-attachments/assets/48b2fb41-62c2-4d65-811d-b78905e0a5ea)
![Image3](https://github.com/user-attachments/assets/04001d34-8eed-47a6-8cdd-42e414af22c0)
![Image4](https://github.com/user-attachments/assets/c38b3523-aa02-41a7-ba38-d8575e9df4bf)

### Character Search Results
![Image5](https://github.com/user-attachments/assets/2d27c27c-b5ef-4a94-a2da-f8933e2023ba)


### Character Insights
![Image6](https://github.com/user-attachments/assets/ac8ace01-8cdf-430e-aff3-a4cb04da6f77)

### Interactive Character Chat
![Image7](https://github.com/user-attachments/assets/154bd61d-fb99-48da-b124-4c56576a27cc)


### Mobile Friendly

[Fully mobile compatible](https://github.com/user-attachments/assets/33af5092-1a93-4399-9e6a-042e707ef60d)

-----

## MindsDB Quest 019 Compliance

CharacterKB implements the following requirements for Quest 019:

  - 🛠️ **Build an app with KBs**:
      - App executes `CREATE KNOWLEDGE_BASE`. ✅
      - App ingests data using `INSERT INTO knowledge_base`. ✅
      - App retrieves relevant data based on semantic queries using `SELECT ... FROM ... WHERE content LIKE '<query>'`. ✅
      - App uses `CREATE INDEX ON KNOWLEDGE_BASE` (ChromaDB creates an index by default, so this is covered). ✅
  - 🛠️ **Use metadata columns**: Defines `metadata_columns` during ingestion and uses `WHERE` clauses combining semantic search with SQL attribute filtering on `metadata_columns` (e.g., media type). ✅
  - 🛠️ **Integrate JOBS**: Sets up a MindsDB JOB that periodically checks a data source and inserts new data into the KB. ✔️ (Note: A minor bug was observed but the functionality works.)
  - 🛠️ **Integrate with AI Tables or Agents**: Builds a multi-step workflow within MindsDB by taking results from a KB semantic query and feeding them as input into `character_insights` (an AI Table for summarization/analysis) and `character_agent` (an AI Agent for chat). ✅
  - ✍️ **Upload a video and write a nice README**: This README provides clear setup instructions, and a video demo is also uploaded. ✅
  - 🎁 **Integrate CREATE Agent**: The `character_agent` is explicitly implemented for interactive chat. ✅
  - 🎁 **Evaluate the relevancy and accuracy of the documents returned by KB**: `EVALUATE KNOWLEDGE_BASE` was implemented, but a significant bug was encountered where it did not perform semantic evaluation.

### All the bugs encountered have been reported.
-----

## Contributing

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m "Add YourFeature"`).
4.  Push your branch (`git push origin feature/YourFeature`).
5.  Open a pull request.


-----

## License

This project is licensed under the **MIT License**. See [LICENSE](https://www.google.com/search?q=LICENSE) for details.

-----

## Acknowledgments

  * **AI & Vector Search**: [MindsDB](https://mindsdb.com)
  * **LLMs**: [OpenAI](https://openai.com)
  * **Image Search**: [Google Custom Search API](https://developers.google.com/custom-search/v1/overview)
  * **Dataset**: [CharacterCodex Dataset](https://www.google.com/search?q=YOUR_DATASET_LINK_HERE)
  * **UI Framework**: [React](https://react.dev/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/)