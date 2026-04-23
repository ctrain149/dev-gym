package com.devgym.backend.springmvc.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * mvc-11: SMS implementation of NotificationService.
 * Use @Qualifier("smsNotification") at the injection point to select this one.
 *
 * TODO: Implement send() — log the SMS for now.
 * TODO: Write a unit test that selects this implementation via @Qualifier.
 */
@Service("smsNotification")
public class SmsNotificationService implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(SmsNotificationService.class);

    @Override
    public void send(String recipient, String message) {
        // TODO: log.info("SMS → {} : {}", recipient, message);
        throw new UnsupportedOperationException("Not yet implemented — mvc-11");
    }
}
