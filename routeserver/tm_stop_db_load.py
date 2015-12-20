import os
from django.contrib.gis.utils import LayerMapping
from .models import CommonTMInfo, TMRouteStops

tm_route_stops_mapping = {
    'rte' : 'rte',
    'dir' : 'dir',
    'rte_desc' : 'rte_desc',
    'dir_desc' : 'dir_desc',
    'type' : 'type',
    'stop_seq' : 'stop_seq',
    'stop_id' : 'stop_id',
    'stop_name' : 'stop_name',
    'jurisdic' : 'jurisdic',
    'zipcode' : 'zipcode',
    'frequent' : 'frequent',
    'geom' : 'MULTIPOINT',
}

tmroute_stops_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', 'tm_route_stops.shp'))

def run(verbose=True):
    lm = LayerMapping(TMRouteStops, tmroute_stops_shp, tm_route_stops_mapping,
                      transform=False, encoding='utf-8') #KS guess utf-8
                  
    lm.save(strict=True, verbose=verbose)

