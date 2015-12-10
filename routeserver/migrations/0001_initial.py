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
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
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
        migrations.CreateModel(
            name='TMRouteStops',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('rte', models.IntegerField()),
                ('dir', models.IntegerField()),
                ('rte_desc', models.CharField(max_length=50)),
                ('dir_desc', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=20)),
                ('stop_seq', models.IntegerField()),
                ('stop_id', models.IntegerField()),
                ('stop_name', models.CharField(max_length=50)),
                ('jurisdic', models.CharField(max_length=30)),
                ('zipcode', models.CharField(max_length=5)),
                ('frequent', models.CharField(max_length=5)),
                ('geom', django.contrib.gis.db.models.fields.MultiPointField(srid=4326)),
            ],
        ),
    ]
