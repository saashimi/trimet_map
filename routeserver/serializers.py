"""
Serializes geospatial fields from models into GeoJSON data.
"""

from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import TMRoutes, TMRouteStops

class TMDataSerializer(GeoFeatureModelSerializer):
    class Meta:
        geo_field = 'geom'
        abstract = True


class TMRoutesDataSerializer(TMDataSerializer):
    class Meta(TMDataSerializer.Meta):
        model = TMRoutes
        fields = ('rte', 'rte_desc', 'dir')


class TMRouteStopsDataSerializer(TMDataSerializer):
    class Meta(TMDataSerializer.Meta):
        model = TMRouteStops
        fields = ('rte', 'stop_id', 'dir', 'stop_name', )