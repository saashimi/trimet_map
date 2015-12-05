from rest_framework import viewsets, filters
from .models import TMRoutes

from .serializers import SpatialDataSerializer

class SpatialDataViewSet(viewsets.ModelViewSet):
    queryset = TMRoutes.objects.all()
    serializer_class = SpatialDataSerializer
    filter_backends = (filters.DjangoFilterBackend,) 
    filter_fields = ('rte',) 
