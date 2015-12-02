from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import TMRoutes

class SpatialDataSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = TMRoutes
        geo_field = 'geom'
        fields = ('rte', 'rte_desc', )
