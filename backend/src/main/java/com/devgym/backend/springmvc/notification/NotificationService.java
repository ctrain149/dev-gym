package com.devgym.backend.springmvc.notification;

/**
 * mvc-11: Notification service interface.
 * Two implementations: EmailNotificationService and SmsNotificationService.
 *
 * TODO: Create both implementations as @Service beans.
 * TODO: Mark one as @Primary.
 * TODO: Use @Qualifier to select a specific one at injection points.
 */
public interface NotificationService {

    void send(String recipient, String message);
}
