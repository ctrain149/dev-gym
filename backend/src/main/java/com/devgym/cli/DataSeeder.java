package com.devgym.cli;

import com.devgym.model.Product;
import com.devgym.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) return;

        productRepository.save(product("Widget Pro", "High-quality widget", "29.99", 100, "Widgets"));
        productRepository.save(product("Gadget Plus", "Next-gen gadget", "49.99", 75, "Gadgets"));
        productRepository.save(product("Doohickey Deluxe", "Premium doohickey", "14.99", 200, "Accessories"));
        productRepository.save(product("Thingamajig", "Versatile thingamajig", "9.99", 500, "Accessories"));
        productRepository.save(product("Whatchamacallit", "Classic whatchamacallit", "19.99", 150, "Widgets"));
    }

    private Product product(String name, String desc, String price, int stock, String category) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(Double.valueOf(price));
        p.setStock(stock);
        p.setCategory(category);
        p.setActive(true);
        return p;
    }
}
