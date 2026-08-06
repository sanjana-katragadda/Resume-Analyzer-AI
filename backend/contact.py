import re


def extract_contact_info(text):
    """
    Extracts:
    - Name
    - Email
    - Phone
    - LinkedIn
    - GitHub
    """

    # Convert markdown mailto links into normal emails
    text = re.sub(
        r"\[([^\]]+)\]\(mailto:[^)]+\)",
        r"\1",
        text
    )

    # ---------------- EMAIL ----------------

    email_match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text,
        re.IGNORECASE
    )

    email = email_match.group(0) if email_match else "Not Found"

    # ---------------- PHONE ----------------

    phone_match = re.search(
        r"(?:\+91[\-\s]?)?[6-9]\d{9}",
        text
    )

    phone = phone_match.group(0) if phone_match else "Not Found"

    # ---------------- LINKEDIN ----------------
    # Handle markdown links first
    text = re.sub(
        r"\[([^\]]+)\]\((https?://[^)]+)\)",
        r"\2",
        text
    )
    linkedin_match = re.search(
        r"(https?://)?(www\.)?linkedin\.com/in/[A-Za-z0-9_-]+",
        text,
        re.IGNORECASE
    )

    linkedin = (
        linkedin_match.group(0)
        if linkedin_match
        else "Not Found"
    )

    # ---------------- GITHUB ----------------

    github_match = re.search(
        r"(https?://)?(www\.)?github\.com/[A-Za-z0-9_-]+",
        text,
        re.IGNORECASE
    )

    github = (
        github_match.group(0)
        if github_match
        else "Not Found"
    )

    # ---------------- NAME ----------------

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    name = "Not Found"

    for line in lines[:10]:

        # Skip obvious non-name lines

        if "@" in line:
            continue

        if any(char.isdigit() for char in line):
            continue

        if len(line.split()) > 4:
            continue

        if line.lower().startswith(("resume", "career", "objective")):
            continue

        if "linkedin" in line.lower():
            continue

        if "github" in line.lower():
            continue

        name = line
        break

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "linkedin": linkedin,
        "github": github
    }