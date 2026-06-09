package nl.webcompany.webshop.purchase;

import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import nl.webcompany.webshop.purchase.dto.PurchaseRequestDto;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {
	private static final Logger log = LoggerFactory.getLogger(PurchaseController.class);

	@PostMapping
	public ResponseEntity<Void> purchase(@Valid @RequestBody PurchaseRequestDto request) {
		String summary = request.items().stream()
				.map(item -> "productId=%d quantity=%d".formatted(item.productId(), item.quantity()))
				.collect(Collectors.joining(", "));
		log.info("Purchase received: [{}]", summary);
		return ResponseEntity.status(HttpStatus.CREATED).<Void>build();
	}
}
