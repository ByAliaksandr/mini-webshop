package nl.webcompany.webshop.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ProductServiceTest {

	private ProductService service;

	@BeforeEach
	void setUp() {
		service = new ProductService(new ObjectMapper());
	}

	@Test
	void getAllProducts() {
		assertThat(service.getProducts(null, null)).hasSize(32);
	}
	
	@Test
	void filterBySearch_WhitespaceOnly() {
		assertThat(service.getProducts("   ", null)).hasSize(32);
	}

	@Test
	void filterBySearch_Name() {
		assertThat(service.getProducts("qled", null)).hasSize(1);
		assertThat(service.getProducts("QLED", null)).hasSize(1);
	}

	@Test
	void filterBySearch_Brand() {
		assertThat(service.getProducts("western digital", null)).hasSize(1);
		assertThat(service.getProducts("Western Digital", null)).hasSize(1);
	}

	@Test
	void filterByCategory() {
		assertThat(service.getProducts(null, "storage")).hasSize(2);
		assertThat(service.getProducts(null, "Storage")).hasSize(2);
	}

	@Test
	void filterBySearchAndCategory() {
		assertThat(service.getProducts("samsung", "tablets")).hasSize(1);
		assertThat(service.getProducts("Samsung", "Tablets")).hasSize(1);
	}
	
	@Test
	void filterBySearch_NoMatch() {
		assertThat(service.getProducts("XXXXXXXXXXXXX", null)).isEmpty();
	}

	@Test
	void getCategories() {
		List<String> categories = service.getCategories();
		assertThat(categories).hasSize(14);
		assertThat(categories.get(0)).isEqualTo("Accessories");
	}
}
