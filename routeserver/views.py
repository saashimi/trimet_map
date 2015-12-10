from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import TMRoutes, TMRouteStops

from .serializers import TMRoutesDataSerializer, TMRouteStopsDataSerializer

class TMRoutesDataViewSet(viewsets.ModelViewSet):
    queryset = TMRoutes.objects.all()
    serializer_class = TMRoutesDataSerializer
    filter_backends = (filters.DjangoFilterBackend,) 
    filter_fields = ('rte',)

class TMRouteStopsDataViewSet(viewsets.ModelViewSet):
    queryset = TMRouteStops.objects.all()
    serializer_class = TMRouteStopsDataSerializer
    filter_backends = (filters.DjangoFilterBackend,) 
    filter_fields = ('rte', 'stop_id',) 

def home_page(request):
    return render(request, 'home.html')