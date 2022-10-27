from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveBigIntegerField()

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_technicians", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("id", "employee_number", "name")


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    owner = models.CharField(max_length=100)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    reason = models.TextField()
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_service_appointments", kwargs={"pk": self.pk})
