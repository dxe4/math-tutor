# Generated by Django 5.1.6 on 2025-02-21 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("math_content", "0007_alter_standrewsbiography_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="collatzconjecture",
            name="two_adic_total_distance",
            field=models.TextField(),
        ),
    ]
