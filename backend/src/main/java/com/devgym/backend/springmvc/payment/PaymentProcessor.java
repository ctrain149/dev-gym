package com.devgym.backend.springmvc.payment;

import java.math.BigDecimal;

/**
 * mvc-09: Strategy interface for payment processors (Factory pattern).
 * Implementations: StripePaymentProcessor, PayPalPaymentProcessor.
 *
 * TODO: Create at least two concrete implementations as @Component beans.
 * TODO: Implement PaymentProcessorFactory to return the right one by PaymentType enum.
 */
public interface PaymentProcessor {

    PaymentType getSupportedType();

    PaymentResult process(String customerId, BigDecimal amount);

    enum PaymentType {
        STRIPE, PAYPAL, MOCK
    }

    record PaymentResult(boolean success, String transactionId, String message) {
    }
}
