"""
Скрипт для экспорта данных из PostgreSQL в JSON-формат.
Запустите его локально: py export_data.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.management import call_command

print("Экспортируем данные из базы данных...")
call_command('dumpdata',
    '--natural-foreign',
    '--natural-primary',
    '--exclude=contenttypes',
    '--exclude=auth.permission',
    '--exclude=admin.logentry',
    '--indent=2',
    output='data_export.json'
)
print("Готово! Файл data_export.json создан.")
print("Загрузите этот файл на PythonAnywhere вместе с проектом.")
