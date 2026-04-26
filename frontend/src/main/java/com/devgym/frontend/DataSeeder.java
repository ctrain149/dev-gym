package com.devgym.frontend;

import com.devgym.frontend.product.Product;
import com.devgym.frontend.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) return;
        productRepository.save(product("Widget Pro", "High-quality widget for professionals", "29.99", 100));
        productRepository.save(product("Gadget Plus", "Next-gen gadget with extended battery", "49.99", 75));
        productRepository.save(product("Doohickey Deluxe", "Premium doohickey with warranty", "14.99", 200));
        productRepository.save(product("Thingamajig Basic", "Entry-level thingamajig", "9.99", 50));
        productRepository.save(product("Whatchamacallit X", "Limited edition whatchamacallit", "99.99", 10));
    }

    private Product product(String name, String description, String price, int stock) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(description);
        p.setPrice(new BigDecimal(price));
        p.setStockQuantity(stock);
        return p;
    }
}
