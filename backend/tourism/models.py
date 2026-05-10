from django.db import models
from django.contrib.auth.models import User


# Категории (музеи, маршруты, жильё, мастер-классы и т.д.)
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название категории")
    name_ru = models.CharField(max_length=100, blank=True, default="", verbose_name="Название (RU)")
    name_tj = models.CharField(max_length=100, blank=True, default="", verbose_name="Название (TJ)")
    description = models.TextField(blank=True, null=True, verbose_name="Описание")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name


# Регионы Таджикистана
class Region(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название региона")
    name_ru = models.CharField(max_length=100, blank=True, default="", verbose_name="Название (RU)")
    name_tj = models.CharField(max_length=100, blank=True, default="", verbose_name="Название (TJ)")

    class Meta:
        verbose_name = "Регион"
        verbose_name_plural = "Регионы"

    def __str__(self):
        return self.name


# Культурные и туристические объекты
class CulturalObject(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    title_ru = models.CharField(max_length=200, blank=True, default="", verbose_name="Название (RU)")
    title_tj = models.CharField(max_length=200, blank=True, default="", verbose_name="Название (TJ)")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="Категория")
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Регион")
    description = models.TextField(verbose_name="Описание")
    description_ru = models.TextField(blank=True, default="", verbose_name="Описание (RU)")
    description_tj = models.TextField(blank=True, default="", verbose_name="Описание (TJ)")
    location = models.CharField(max_length=200, verbose_name="Местоположение")
    latitude = models.FloatField(null=True, blank=True, verbose_name="Широта")
    longitude = models.FloatField(null=True, blank=True, verbose_name="Долгота")
    image = models.URLField(max_length=500, blank=True, null=True, verbose_name="URL Фото")

    class Meta:
        verbose_name = "Культурный объект"
        verbose_name_plural = "Культурные объекты"

    def __str__(self):
        return self.title


# Туристические маршруты
class TouristRoute(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название маршрута")
    title_ru = models.CharField(max_length=200, blank=True, default="", verbose_name="Название (RU)")
    title_tj = models.CharField(max_length=200, blank=True, default="", verbose_name="Название (TJ)")
    description = models.TextField(verbose_name="Описание")
    description_ru = models.TextField(blank=True, default="", verbose_name="Описание (RU)")
    description_tj = models.TextField(blank=True, default="", verbose_name="Описание (TJ)")
    duration = models.CharField(max_length=100, verbose_name="Продолжительность")
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Цена (в сомони)")
    image = models.URLField(max_length=500, blank=True, null=True, verbose_name="URL Фото маршрута")
    objects_included = models.ManyToManyField(CulturalObject, blank=True, verbose_name="Объекты маршрута")

    class Meta:
        verbose_name = "Маршрут"
        verbose_name_plural = "Маршруты"

    def __str__(self):
        return self.title


# Точки маршрута (порядок остановок)
class RoutePoint(models.Model):
    route = models.ForeignKey(TouristRoute, on_delete=models.CASCADE, related_name='points', verbose_name="Маршрут")
    cultural_object = models.ForeignKey(CulturalObject, on_delete=models.CASCADE, verbose_name="Культурный объект")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок")
    note = models.CharField(max_length=300, blank=True, default="", verbose_name="Примечание")

    class Meta:
        verbose_name = "Точка маршрута"
        verbose_name_plural = "Точки маршрута"
        ordering = ['order']

    def __str__(self):
        return f"{self.route.title} — #{self.order} {self.cultural_object.title}"


# Инфраструктура (гостиницы, рестораны, транспорт)
class Infrastructure(models.Model):
    TYPE_CHOICES = [
        ('hotel', 'Гостиница'),
        ('restaurant', 'Ресторан'),
        ('transport', 'Транспорт'),
        ('shop', 'Магазин'),
        ('hospital', 'Больница'),
        ('other', 'Другое'),
    ]

    name = models.CharField(max_length=200, verbose_name="Название")
    name_ru = models.CharField(max_length=200, blank=True, default="", verbose_name="Название (RU)")
    name_tj = models.CharField(max_length=200, blank=True, default="", verbose_name="Название (TJ)")
    inf_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='other', verbose_name="Тип")
    description = models.TextField(blank=True, default="", verbose_name="Описание")
    description_ru = models.TextField(blank=True, default="", verbose_name="Описание (RU)")
    description_tj = models.TextField(blank=True, default="", verbose_name="Описание (TJ)")
    address = models.CharField(max_length=300, blank=True, default="", verbose_name="Адрес")
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Регион")
    latitude = models.FloatField(null=True, blank=True, verbose_name="Широта")
    longitude = models.FloatField(null=True, blank=True, verbose_name="Долгота")
    phone = models.CharField(max_length=50, blank=True, default="", verbose_name="Телефон")
    website = models.URLField(blank=True, default="", verbose_name="Сайт")
    image = models.URLField(max_length=500, blank=True, null=True, verbose_name="URL Фото")

    class Meta:
        verbose_name = "Инфраструктура"
        verbose_name_plural = "Инфраструктура"

    def __str__(self):
        return f"{self.get_inf_type_display()} — {self.name}"


# Мастера и гиды
class Master(models.Model):
    name = models.CharField(max_length=150, verbose_name="Имя мастера/гида")
    specialty = models.CharField(max_length=150, verbose_name="Специализация")
    bio = models.TextField(verbose_name="Описание")
    contact = models.CharField(max_length=150, verbose_name="Контакты")
    photo = models.ImageField(upload_to='masters/', blank=True, null=True, verbose_name="Фото")

    class Meta:
        verbose_name = "Мастер/Гид"
        verbose_name_plural = "Мастера и гиды"

    def __str__(self):
        return self.name


# Отзывы
class Review(models.Model):
    cultural_object = models.ForeignKey(
        CulturalObject, on_delete=models.CASCADE,
        related_name='reviews', verbose_name="Объект"
    )
    author_name = models.CharField(max_length=100, verbose_name="Автор")
    rating = models.PositiveSmallIntegerField(default=5, verbose_name="Оценка (1-5)")
    text = models.TextField(verbose_name="Текст отзыва")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата публикации")

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} — {self.cultural_object.title}"


# Бронирования
class Booking(models.Model):
    SERVICE_TYPES = [
        ('tour', 'Тур / Маршрут'),
        ('masterclass', 'Мастер-класс'),
        ('other', 'Другое'),
    ]

    service_name = models.CharField(max_length=200, verbose_name="Название услуги")
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES, default='tour', verbose_name="Тип услуги")
    customer_name = models.CharField(max_length=150, verbose_name="Имя клиента")
    customer_email = models.EmailField(verbose_name="Email клиента")
    customer_phone = models.CharField(max_length=20, verbose_name="Телефон клиента")
    booking_date = models.DateField(verbose_name="Дата бронирования", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата заявки")
    status = models.CharField(max_length=20, default='new', verbose_name="Статус", choices=[
        ('new', 'Новая'),
        ('confirmed', 'Подтверждена'),
        ('cancelled', 'Отменена'),
    ])

    class Meta:
        verbose_name = "Бронирование"
        verbose_name_plural = "Бронирования"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.customer_name} — {self.service_name} ({self.created_at.strftime('%d.%m.%Y')})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150, verbose_name="Имя")
    email = models.EmailField(verbose_name="Email")
    subject = models.CharField(max_length=200, blank=True, default="", verbose_name="Тема")
    message = models.TextField(verbose_name="Сообщение")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата отправки")
    is_read = models.BooleanField(default=False, verbose_name="Прочитано")

    class Meta:
        verbose_name = "Сообщение из контактов"
        verbose_name_plural = "Сообщения из контактов"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.email} ({self.created_at.strftime('%d.%m.%Y')})"
