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
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('rte', models.IntegerField(null=True)),
                ('dir', models.IntegerField()),
                ('rte_desc', models.CharField(max_length=50)),
                ('dir_desc', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=20)),
                ('frequent', models.CharField(max_length=5)),
                ('geom', django.contrib.gis.db.models.fields.MultiLineStringField(srid=4326)),
                ('public_rte', models.CharField(max_length=3)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TMRouteStops',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('rte', models.IntegerField(null=True)),
                ('dir', models.IntegerField()),
                ('rte_desc', models.CharField(max_length=50)),
                ('dir_desc', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=20)),
                ('frequent', models.CharField(max_length=5)),
                ('geom', django.contrib.gis.db.models.fields.MultiLineStringField(srid=4326)),
                ('stop_seq', models.IntegerField()),
                ('stop_id', models.IntegerField()),
                ('stop_name', models.CharField(max_length=50)),
                ('jurisdic', models.CharField(max_length=30)),
                ('zipcode', models.CharField(max_length=5)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
