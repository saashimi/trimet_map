from django.contrib.gis.db import models

class CommonTMInfo(models.Model):
    """
    The abstract base class for common TriMet geospatial database info. Subsequent
    models inherit from this class, hence the abstract=True Meta class.
    ----
    Original TriMet shapefile data used SRID:2913 Oregon State Plane projection.
    This data has been converted to Google Web Mercator SRID:4326 using ogr2ogr
    command line tools. 
    """
    rte = models.IntegerField(null=True)
    dir = models.IntegerField()
    rte_desc = models.CharField(max_length=50)
    dir_desc = models.CharField(max_length=50)
    type = models.CharField(max_length=20)
    frequent = models.CharField(max_length=5)
    objects = models.GeoManager()

    class Meta:
        abstract=True # See note above.


class TMRoutes(CommonTMInfo):
    """The model class for TriMet route geometry."""
    public_rte = models.CharField(max_length=3)
    geom = models.MultiLineStringField(srid=4326) # Already reprojected to google
                                                  # Web mercator.

    def __str__(self):
        return 'Route Number: %s' % self.rte + " " + self.rte_desc


class TMRouteStops(CommonTMInfo):
    """The model class for TriMet stop locations."""
    stop_seq = models.IntegerField()
    stop_id = models.IntegerField()
    stop_name = models.CharField(max_length=50)
    jurisdic = models.CharField(max_length=30)
    zipcode = models.CharField(max_length=5)
    geom = models.MultiPointField(srid=4326) # See projection note above.

    def __str__(self):
        return 'Route Number: %s' % (
            str(self.rte) + "Stop Name: " + 
            self.stop_name +  "Stop ID: " + 
            str(self.stop_id) + " Dir: " + 
            str(self.stop_id)
            )