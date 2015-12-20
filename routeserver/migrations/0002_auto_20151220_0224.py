# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('routeserver', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tmroutestops',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPointField(srid=4326),
        ),
    ]
