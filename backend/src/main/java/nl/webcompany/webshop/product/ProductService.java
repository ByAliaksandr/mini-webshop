package nl.webcompany.webshop.product;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProductService {
	private final List<Product> products;

	public ProductService(ObjectMapper objectMapper) {
		this.products = loadProducts(objectMapper);
	}

	private List<Product> loadProducts(ObjectMapper objectMapper) {
		try {
			var resource = new ClassPathResource("products.json");
			return objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Product>>() {
			});
		} catch (IOException e) {
			throw new UncheckedIOException("Failed to load products.json", e);
		}
	}

	public List<Product> getProducts(String search, String category) {
		String normalizedSearch = search == null ? "" : search.trim().toLowerCase();
		String normalizedCategory = category == null ? "" : category.trim().toLowerCase();

		return products.stream().filter(product -> matchesSearch(product, normalizedSearch))
				.filter(product -> matchesCategory(product, normalizedCategory)).toList();
	}

	public List<String> getCategories() {
		return products.stream().map(Product::category).distinct().sorted().toList();
	}

	private boolean matchesSearch(Product product, String search) {
		return search.isBlank() || product.name().toLowerCase().contains(search)
				|| product.brand().toLowerCase().contains(search);
	}

	private boolean matchesCategory(Product product, String category) {
		return category.isBlank() || product.category().toLowerCase().equals(category);
	}
}
