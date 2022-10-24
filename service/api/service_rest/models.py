from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveBigIntegerField()


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    owner = models.CharField(max_length=100)
    date_time = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    reason = models.TextField()
    is_finished = models.BooleanField(default=False)
