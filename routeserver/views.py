from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import TMRoutes

from .serializers import SpatialDataSerializer

class SpatialDataViewSet(viewsets.ModelViewSet):
    queryset = TMRoutes.objects.all()
    serializer_class = SpatialDataSerializer
    filter_backends = (filters.DjangoFilterBackend,) 
    filter_fields = ('rte',) 

def home_page(request):
    return render(request, 'home.html')