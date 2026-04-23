package com.devgym.backend.springmvc.payment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * mvc-09: Factory that selects the right PaymentProcessor by PaymentType.
 *
 * Spring injects ALL PaymentProcessor beans as a list automatically.
 * This factory builds a map from PaymentType → processor at startup.
 *
 * TODO: Implement getProcessor(PaymentType type):
 *   1. Look up in the map
 *   2. Throw IllegalArgumentException if not found
 *
 * TODO: Create StripePaymentProcessor and PayPalPaymentProcessor as @Component beans.
 */
@Component
@RequiredArgsConstructor
public class PaymentProcessorFactory {

    private final List<PaymentProcessor> processors;

    private Map<PaymentProcessor.PaymentType, PaymentProcessor> processorMap;

    // Called by Spring after all dependencies are injected
    @jakarta.annotation.PostConstruct
    private void init() {
        processorMap = processors.stream()
            .collect(Collectors.toMap(PaymentProcessor::getSupportedType, Function.identity()));
    }

    public PaymentProcessor getProcessor(PaymentProcessor.PaymentType type) {
        // TODO: Implement — look up in processorMap, throw if missing
        throw new UnsupportedOperationException("Not yet implemented — mvc-09");
    }
}
