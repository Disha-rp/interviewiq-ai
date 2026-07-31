import fitz


def extract_text_from_pdf(file_path):
    """Extract text from a PDF file and return it as a single string."""
    if not file_path:
        return ""

    try:
        document = fitz.open(file_path)
        pages_text = [page.get_text() for page in document]
        return "\n".join(text for text in pages_text if text)
    except Exception:
        return ""
