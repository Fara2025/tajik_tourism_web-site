import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)

def send_booking_emails(booking):
    """
    Отправляет email-уведомление администратору и подтверждение клиенту о новом бронировании.
    """
    admin_email = getattr(settings, 'ADMIN_EMAIL', 'lilamin210@gmail.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', '')
    
    # 1. Письмо администратору
    subject_admin = f"Новая заявка на бронирование: {booking.service_name}"
    
    html_content_admin = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 6px solid #059669;">
            <h2 style="color: #059669; margin-top: 0;">Новая заявка на бронирование</h2>
            <p>В системе зарегистрирована новая заявка от клиента:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f3f4f6;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Клиент:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">{booking.customer_name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Email:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:{booking.customer_email}" style="color: #059669;">{booking.customer_email}</a></td>
                </tr>
                <tr style="background-color: #f3f4f6;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Телефон:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="tel:{booking.customer_phone}" style="color: #333; text-decoration: none;">{booking.customer_phone}</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Услуга:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>{booking.service_name}</strong> ({booking.get_service_type_display()})</td>
                </tr>
                <tr style="background-color: #f3f4f6;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Дата бронирования:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">{booking.booking_date.strftime('%d.%m.%Y') if booking.booking_date else 'Не указана'}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Дата отправки:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">{booking.created_at.strftime('%d.%m.%Y %H:%M') if booking.id and booking.created_at else 'Только что'}</td>
                </tr>
            </table>
            <p>Вы можете связаться с клиентом для подтверждения заказа.</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">Сообщение отправлено автоматически с сайта Туризм Таджикистана</p>
        </div>
    </body>
    </html>
    """
    
    text_content_admin = (
        f"Новая заявка на бронирование\n\n"
        f"Клиент: {booking.customer_name}\n"
        f"Email: {booking.customer_email}\n"
        f"Телефон: {booking.customer_phone}\n"
        f"Услуга: {booking.service_name} ({booking.get_service_type_display()})\n"
        f"Дата бронирования: {booking.booking_date.strftime('%d.%m.%Y') if booking.booking_date else 'Не указана'}\n"
    )
    
    # Отправка администратору
    if admin_email:
        try:
            send_mail(
                subject=subject_admin,
                message=text_content_admin,
                from_email=from_email or 'no-reply@tajik-tourism.tj',
                recipient_list=[admin_email],
                html_message=html_content_admin,
                fail_silently=False
            )
            logger.info(f"Booking notification email successfully sent to admin: {admin_email}")
        except Exception as e:
            logger.error(f"Failed to send booking notification email to admin: {e}")
            
    # 2. Письмо клиенту (подтверждение)
    subject_customer = f"Подтверждение бронирования: {booking.service_name}"
    
    html_content_customer = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 6px solid #059669;">
            <h2 style="color: #059669; margin-top: 0;">Здравствуйте, {booking.customer_name}!</h2>
            <p>Спасибо за ваш интерес к культуре и туризму Таджикистана! Ваша заявка на бронирование успешно принята.</p>
            
            <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin: 0 0 10px 0; color: #16a34a;">Детали вашего бронирования:</h4>
                <p style="margin: 5px 0;"><strong>Услуга:</strong> {booking.service_name}</p>
                <p style="margin: 5px 0;"><strong>Дата:</strong> {booking.booking_date.strftime('%d.%m.%Y') if booking.booking_date else 'Не указана'}</p>
                <p style="margin: 5px 0;"><strong>Телефон для связи:</strong> {booking.customer_phone}</p>
            </div>
            
            <p>Наш менеджер свяжется с вами в ближайшее время по указанному телефону или электронной почте для уточнения деталей и подтверждения бронирования.</p>
            <p>Если у вас возникнут вопросы, вы можете ответить на это письмо.</p>
            
            <p style="margin-top: 30px;">С наилучшими пожеланиями,<br><strong>Команда Туризма Таджикистана</strong></p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него напрямую, если адрес отправления не поддерживается.</p>
        </div>
    </body>
    </html>
    """
    
    text_content_customer = (
        f"Здравствуйте, {booking.customer_name}!\n\n"
        f"Ваша заявка на бронирование успешно принята.\n\n"
        f"Услуга: {booking.service_name}\n"
        f"Дата: {booking.booking_date.strftime('%d.%m.%Y') if booking.booking_date else 'Не указана'}\n\n"
        f"Наш менеджер свяжется с вами в ближайшее время.\n\n"
        f"С уважением,\nКоманда Туризма Таджикистана"
    )
    
    if booking.customer_email:
        try:
            send_mail(
                subject=subject_customer,
                message=text_content_customer,
                from_email=from_email or 'no-reply@tajik-tourism.tj',
                recipient_list=[booking.customer_email],
                html_message=html_content_customer,
                fail_silently=False
            )
            logger.info(f"Booking confirmation email successfully sent to customer: {booking.customer_email}")
        except Exception as e:
            logger.error(f"Failed to send booking confirmation email to customer: {e}")


def send_contact_emails(contact_message):
    """
    Отправляет email-уведомление администратору о новом сообщении из формы контактов.
    """
    admin_email = getattr(settings, 'ADMIN_EMAIL', 'lilamin210@gmail.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', '')
    
    # 1. Письмо администратору
    subject_admin = f"Новое сообщение с сайта: {contact_message.subject or 'Без темы'}"
    
    html_content_admin = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 6px solid #0284c7;">
            <h2 style="color: #0284c7; margin-top: 0;">Новое обращение через контакты</h2>
            <p>Отправитель оставил сообщение на сайте:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f3f4f6;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb; width: 30%;">Имя:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">{contact_message.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Email:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:{contact_message.email}" style="color: #0284c7;">{contact_message.email}</a></td>
                </tr>
                <tr style="background-color: #f3f4f6;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Тема:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">{contact_message.subject or 'Не указана'}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Дата:</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">{contact_message.created_at.strftime('%d.%m.%Y %H:%M') if contact_message.id and contact_message.created_at else 'Только что'}</td>
                </tr>
            </table>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-top: 15px;">
                <h4 style="margin: 0 0 10px 0; color: #475569;">Сообщение:</h4>
                <p style="margin: 0; white-space: pre-wrap; font-style: italic; color: #334155;">{contact_message.message}</p>
            </div>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">Сообщение отправлено автоматически с сайта Туризм Таджикистана</p>
        </div>
    </body>
    </html>
    """
    
    text_content_admin = (
        f"Новое сообщение через форму контактов\n\n"
        f"Отправитель: {contact_message.name}\n"
        f"Email: {contact_message.email}\n"
        f"Тема: {contact_message.subject or 'Без темы'}\n\n"
        f"Сообщение:\n{contact_message.message}\n"
    )
    
    if admin_email:
        try:
            send_mail(
                subject=subject_admin,
                message=text_content_admin,
                from_email=from_email or 'no-reply@tajik-tourism.tj',
                recipient_list=[admin_email],
                html_message=html_content_admin,
                fail_silently=False
            )
            logger.info(f"Contact form notification email successfully sent to admin: {admin_email}")
        except Exception as e:
            logger.error(f"Failed to send contact notification email to admin: {e}")
