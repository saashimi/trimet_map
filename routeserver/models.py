from django.contrib.gis.db import models

class TMRoutes(models.Model):
    rte = models.IntegerField()
    dir = models.IntegerField()
    rte_desc = models.CharField(max_length=50)
    public_rte = models.CharField(max_length=3)
    dir_desc = models.CharField(max_length=50)
    frequent = models.CharField(max_length=5)
    type = models.CharField(max_length=20)
    geom = models.MultiLineStringField(srid=4326) # Originally 2913 as determined by
                                                  # from prj2epsg.org
                                                  # We've converted to Google Maps
                                                  # web mercator (EPSG:4326)
    objects = models.GeoManager()

    def __str__(self):
        return 'Route Number: %s' % self.rte + " " + self.rte_desc

