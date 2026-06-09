package nl.webcompany.webshop.product;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ProductService productService;

	@Test
	void getProducts_getAll() throws Exception {
		List<Product> products = List
				.of(new Product(1, "Sony WH-1000XM5 Wireless Headphones", "", 279.99, "Audio", "Sony", 14, ""));

		when(productService.getProducts(null, null)).thenReturn(products);

		mockMvc.perform(get("/api/products")).andExpect(status().isOk()).andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].name").value("Sony WH-1000XM5 Wireless Headphones"))
				.andExpect(jsonPath("$[0].brand").value("Sony")).andExpect(jsonPath("$[0].category").value("Audio"));
	}

	@Test
	void getProducts_withSearchAndCategory() throws Exception {
		List<Product> products = List
				.of(new Product(2, "Apple MacBook Air M3 13", "", 1299.00, "Laptops", "Apple", 7, ""));

		when(productService.getProducts("apple", "laptops")).thenReturn(products);

		mockMvc.perform(get("/api/products").param("search", "apple").param("category", "laptops"))
				.andExpect(status().isOk()).andExpect(jsonPath("$[0].id").value(2))
				.andExpect(jsonPath("$[0].name").value("Apple MacBook Air M3 13"))
				.andExpect(jsonPath("$[0].brand").value("Apple")).andExpect(jsonPath("$[0].category").value("Laptops"));
	}

	@Test
	void getCategories() throws Exception {
		List<String> categories = List.of("Accessories", "Audio");

		when(productService.getCategories()).thenReturn(categories);

		mockMvc.perform(get("/api/products/categories")).andExpect(status().isOk())
				.andExpect(jsonPath("$[0]").value("Accessories"));
	}
}
