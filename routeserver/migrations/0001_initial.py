# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TMRoutes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('rte', models.IntegerField()),
                ('dir', models.IntegerField()),
                ('rte_desc', models.CharField(max_length=50)),
                ('public_rte', models.CharField(max_length=3)),
                ('dir_desc', models.CharField(max_length=50)),
                ('frequent', models.CharField(max_length=5)),
                ('type', models.CharField(max_length=20)),
                ('geom', django.contrib.gis.db.models.fields.MultiLineStringField(srid=4326)),
            ],
        ),
    ]
