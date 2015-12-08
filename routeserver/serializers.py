from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import TMRoutes, TMRouteStops

class TMRoutesDataSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = TMRoutes
        geo_field = 'geom'
        fields = ('rte', 'rte_desc', )

class TMRouteStopsDataSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = TMRouteStops
        geo_field = 'geom'
        fields = ('rte', 'stop_id' )
