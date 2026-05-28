package nl.webcompany.webshop.model;

public record Product(
        int id,
        String name,
        String description,
        double price,
        String category,
        String brand,
        int stock,
        String imageUrl
) {
}