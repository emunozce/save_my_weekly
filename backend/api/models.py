from django.db import models


# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=40, null=False, blank=False)
    lastname = models.CharField(max_length=40, null=False)
    email = models.EmailField(max_length=150, unique=True, null=False, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)
    salt = models.CharField(max_length=100, null=False, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:  # Internal class that defines metadata for the model.
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(
        self,
    ):  # This method is called when the object is printed in the console or in the admin panel.
        return str(self.name)
