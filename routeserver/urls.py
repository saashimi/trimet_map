"""
from django.conf.urls import url, include, patterns
from rest_framework import routers
from .views import SpatialDataViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'TMRoutes', SpatialDataViewSet)

urlpatterns = patterns('',    
    url(r'^routeserver/', include(router.urls)),
)
"""