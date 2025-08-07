# backend/app/utils/rag_utils.py
import json
import os
from langchain_community.document_loaders import JSONLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from dotenv import load_dotenv
load_dotenv()

KB_FILE = "data/knowledge_base/udl_neurodiverse_multilingual.json"

# Load and split knowledge base
def load_knowledge_base():
    with open(KB_FILE, "r") as f:
        kb_data = json.load(f)

    docs = []
    # Extract neurodiverse groups
    for group, content in kb_data.get("neurodiverse_groups", {}).items():
        doc_text = f"Group: {group}\nStrategies: {'; '.join(content['strategies'])}"
        docs.append(doc_text)

    # Extract multilingual groups
    for lang, content in kb_data.get("multilingual", {}).items():
        doc_text = f"Language: {lang}\nStrategies: {'; '.join(content['strategies'])}"
        docs.append(doc_text)

    return docs

# Build FAISS index
def build_faiss_index():
    raw_docs = load_knowledge_base()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    split_docs = splitter.create_documents(raw_docs)
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(split_docs, embeddings)
    return vectorstore

# Retrieve strategies given a query
def retrieve_strategies(query, vectorstore):
    results = vectorstore.similarity_search(query, k=5)
    return [r.page_content for r in results]