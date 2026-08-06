from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")


def calculate_semantic_similarity(resume_text, job_description):

    resume_embedding = model.encode([resume_text])
    job_embedding = model.encode([job_description])

    similarity = cosine_similarity(
        resume_embedding,
        job_embedding
    )[0][0]

    similarity_percentage = similarity * 100
    print("========== SEMANTIC MATCH SCORE ==========")
    print(similarity_percentage)
    print("==========================================")

    return round(float(similarity_percentage), 2)