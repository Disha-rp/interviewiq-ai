from django.conf import settings
import google.genai as genai
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "interviewiq.settings")

import django
django.setup()

client = genai.Client(api_key=settings.GEMINI_API_KEY)

for model in client.models.list():
    print(model.name)