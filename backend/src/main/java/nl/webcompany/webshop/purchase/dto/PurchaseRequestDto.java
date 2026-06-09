package nl.webcompany.webshop.purchase.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public record PurchaseRequestDto(@NotEmpty @Valid List<PurchaseItemDto> items) {
}
