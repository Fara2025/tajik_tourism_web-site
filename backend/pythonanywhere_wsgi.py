"""
WSGI configuration for PythonAnywhere deployment.
File: /var/www/Farrraa_pythonanywhere_com_wsgi.py
"""
import os
import sys

# Путь к папке backend вашего проекта на PythonAnywhere
# После загрузки файлов на PythonAnywhere, убедитесь что путь правильный
path = '/home/Farrraa/tajik_tourism/backend'
if path not in sys.path:
    sys.path.append(path)

# Активируем virtualenv
activate_this = '/home/Farrraa/.virtualenvs/venv/bin/activate_this.py'
with open(activate_this) as f:
    exec(f.read(), {'__file__': activate_this})

# Говорим Django использовать SQLite (бесплатный тариф)
os.environ['PYTHONANYWHERE'] = 'True'
os.environ['DJANGO_DEBUG'] = 'False'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
