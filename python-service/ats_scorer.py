import re

def calculate_ats_score(text):
    score = 0
    breakdown = {}

    # Check sections
    breakdown["hasContactInfo"] = bool(
        re.search(r'[\w.]+@[\w.]+', text) or  # email
        re.search(r'\b\d{10}\b', text) or      # 10 digit phone
        re.search(r'\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b', text)  # formatted phone
    )
    breakdown["hasSummary"] = any(w in text.lower() for w in ["summary", "objective", "about"])
    breakdown["hasEducation"] = "education" in text.lower()
    breakdown["hasExperience"] = any(w in text.lower() for w in ["experience", "internship", "work"])
    breakdown["hasSkills"] = "skills" in text.lower()
    breakdown["hasProjects"] = "project" in text.lower()

    # Score each section
    section_scores = {
        "hasContactInfo": 15,
        "hasSummary": 10,
        "hasEducation": 15,
        "hasExperience": 15,
        "hasSkills": 15,
        "hasProjects": 15,
    }
    for key, points in section_scores.items():
        if breakdown[key]:
            score += points

    # Keyword density (max. 15 points)
    words = text.split()
    density = len(words) / 500  # ideal resume is approx 400-600 words
    density_score = min(15, int(density * 15))
    score += density_score
    breakdown["keywordDensity"] = round(len(words) / max(len(text), 1), 4)
    breakdown["formattingScore"] = density_score

    return min(score, 100), breakdown