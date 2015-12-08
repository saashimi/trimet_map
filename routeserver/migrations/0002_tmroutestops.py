# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('routeserver', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TMRouteStops',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
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
