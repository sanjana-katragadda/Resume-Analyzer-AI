def generate_suggestions(score_data):
    suggestions =[]
    breakdown = score_data["breakdown"]
    if breakdown["contact"] == 0:
        suggestions.append("Add your email address.")
    if breakdown["contact"] == 0:
        suggestions.append("Add your phone number.")
    if breakdown["skills"]<20:
        suggestions.append("Include more relevant technical skills in your resume.")
    if breakdown["education"] == 0:
        suggestions.append("Add your educational background.")
    if breakdown["projects"] == 0:
        suggestions.append("Include at least one projects with a brief description.")
    if breakdown["experience"] == 0:
        suggestions.append("Add internships, freelance work, or relevant experience")
    if len(suggestions) == 0:
        suggestions.append("Excellent resume! keep it updated regularly.")
    return suggestions