import os
from django.contrib.gis.utils import LayerMapping
from .models import TMRoutes

# Auto-generated `LayerMapping` dictionary for tm_routes model
tm_routes_mapping = {
    'rte' : 'rte',
    'dir' : 'dir',
    'rte_desc' : 'rte_desc',
    'public_rte' : 'public_rte',
    'dir_desc' : 'dir_desc',
    'frequent' : 'frequent',
    'type' : 'type',
    'geom' : 'MULTILINESTRING',
}

tmroutes_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', 'tm_routes.shp'))

def run(verbose=True):
    lm = LayerMapping(TMRoutes, tmroutes_shp, tm_routes_mapping,
                      transform=False, encoding='utf-8') #KS guess utf-8
                  
    lm.save(strict=True, verbose=verbose)

