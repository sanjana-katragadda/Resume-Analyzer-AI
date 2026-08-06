CERTIFICATIONS = [
    "AWS Certified Cloud Practitioner",
    "AWS Certified Developer",
    "Microsoft Azure Fundamentals",
    "Google Cloud Digital Leader",
    "Oracle Certified Professional",
    "Cisco CCNA",
    "Red Hat Certified System Administrator",
    "Salesforce Administrator",
    "CompTIA A+",
    "CompTIA Security+",
    "TensorFlow Developer Certificate",
    "IBM Data Science Professional Certificate",
    "Google Data Analytics Professional Certificate",
    "Microsoft Certified: Azure AI Fundamentals",
    "NPTEL",
    "Coursera",
    "Udemy",
    "edX",
    "Infosys Springboard"
]


def extract_certifications(text):

    text = text.lower()

    found_certifications = []

    for certification in CERTIFICATIONS:

        if certification.lower() in text:
            found_certifications.append(certification)

    return found_certifications