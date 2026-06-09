package nl.webcompany.webshop.purchase.dto;

import jakarta.validation.constraints.Positive;

public record PurchaseItemDto(@Positive int productId, @Positive int quantity) {
}
