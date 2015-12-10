from django.contrib.gis.db import models

class TMRoutes(models.Model):
    """The model class for TriMet route geometry."""
    rte = models.IntegerField()
    dir = models.IntegerField()
    rte_desc = models.CharField(max_length=50)
    public_rte = models.CharField(max_length=3)
    dir_desc = models.CharField(max_length=50)
    frequent = models.CharField(max_length=5)
    type = models.CharField(max_length=20)
    geom = models.MultiLineStringField(srid=4326) # Originally SRID=2913 as determined by
                                                  # from prj2epsg.org
                                                  # We've converted to Google Maps
                                                  # web mercator (EPSG:4326)
    objects = models.GeoManager()

    def __str__(self):
        return 'Route Number: %s' % self.rte + " " + self.rte_desc

class TMRouteStops(models.Model):
    """The model class for TriMet stop locations."""
    rte = models.IntegerField()
    dir = models.IntegerField()
    rte_desc = models.CharField(max_length=50)
    dir_desc = models.CharField(max_length=50)
    type = models.CharField(max_length=20)
    stop_seq = models.IntegerField()
    stop_id = models.IntegerField()
    stop_name = models.CharField(max_length=50)
    jurisdic = models.CharField(max_length=30)
    zipcode = models.CharField(max_length=5)
    frequent = models.CharField(max_length=5)
    geom = models.MultiPointField(srid=4326)
    objects = models.GeoManager()

    def __str__(self):
        return 'Route Number: %s' % str(self.rte) + "Stop Name: " + self.stop_name +  "Stop ID: " + str(self.stop_id) + " Dir: " + str(self.stop_id)