package com.devgym.backend.springmvc.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

/**
 * mvc-11: Email implementation of NotificationService.
 * Marked @Primary so it is the default when no @Qualifier is specified.
 *
 * TODO: Implement send() — log the email for now (no real SMTP needed).
 * TODO: Write a unit test that verifies this implementation is injected by default.
 */
@Service("emailNotification")
@Primary
public class EmailNotificationService implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    @Override
    public void send(String recipient, String message) {
        // TODO: log.info("EMAIL → {} : {}", recipient, message);
        throw new UnsupportedOperationException("Not yet implemented — mvc-11");
    }
}
