from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import TMRoutes, TMRouteStops
from .serializers import TMRoutesDataSerializer, TMRouteStopsDataSerializer

"""
View Controller objects that render serialized GeoJSON data through the Django
REST GIS framework.
"""

class TMDataViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,) 
    
    class Meta:
        abstract = True

class TMRoutesDataViewSet(TMDataViewSet):
    queryset = TMRoutes.objects.all()
    serializer_class = TMRoutesDataSerializer
    filter_fields = ('rte',)


class TMRouteStopsDataViewSet(TMDataViewSet):
    queryset = TMRouteStops.objects.all()
    serializer_class = TMRouteStopsDataSerializer
    filter_fields = ('rte', 'stop_id',) 


def home_page(request):
    return render(request, 'home.html')

#def get_trimet_data(request):
