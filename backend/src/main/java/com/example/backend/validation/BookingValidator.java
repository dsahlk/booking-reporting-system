package com.example.backend.validation;

import java.math.BigDecimal;

public class BookingValidator {
    private BookingValidator() {
    }

    public static boolean isNegativeAmount(BigDecimal amount) {

        return amount.compareTo(BigDecimal.ZERO) < 0;

    }

    public static boolean isEmpty(String value) {

        return value == null || value.trim().isEmpty();

    }
}
