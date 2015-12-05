from django.contrib.gis import admin
from routeserver.models import TMRoutes

admin.site.register(TMRoutes, admin.OSMGeoAdmin)

