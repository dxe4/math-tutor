# Generated by Django 5.1.6 on 2025-02-15 10:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("math_content", "0002_remove_standrewstopic_category_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="standrewsbiography",
            name="html",
        ),
        migrations.RemoveField(
            model_name="standrewstopic",
            name="html",
        ),
    ]
