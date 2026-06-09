package nl.webcompany.webshop.product;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping
	public ResponseEntity<List<Product>> getProducts(@RequestParam(required = false) String search,
			@RequestParam(required = false) String category) {
		return ResponseEntity.ok(productService.getProducts(search, category));
	}

	@GetMapping("/categories")
	public ResponseEntity<List<String>> getCategories() {
		return ResponseEntity.ok(productService.getCategories());
	}

}
