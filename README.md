# Personalized Lesson Generation Prototype 🎓📄

This project demonstrates how teachers can personalize lesson materials (e.g., worksheets) for students with diverse learning profiles. It enables lesson adaptation based on student-specific data like disability, language proficiency, and learning needs.

---

## 🚀 Features

- ✅ Create & manage student profiles (with support for disabilities, reading levels, and interests)
- ✅ Upload DOCX lesson files
- ✅ Automatically personalize content using rules from a knowledge base (via RAG + LLM)
- ✅ Download customized DOCX lessons
- ✅ Auto-complete missing "needs" from the knowledge base if not provided

---

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ManiKran/Personalized_Lesson_Generation.git
cd Personalized_Lesson_Generation
```

```bash
2. Start the Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

# Make sure to create the .env file and put your OPEN AI API Key.

```bash
cd ../frontend
npm install
npm run dev
```


