package com.devgym.frontend.product;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public String list(@RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "") String search,
                       Model model) {
        Page<Product> productPage;
        if (search != null && !search.isBlank()) {
            productPage = productRepository.findByNameContainingIgnoreCase(search, PageRequest.of(page, 10));
        } else {
            productPage = productRepository.findAll(PageRequest.of(page, 10));
        }
        model.addAttribute("products", productPage.getContent());
        model.addAttribute("currentPage", productPage.getNumber());
        model.addAttribute("totalPages", productPage.getTotalPages());
        model.addAttribute("search", search);
        return "product/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
        model.addAttribute("product", product);
        return "product/detail";
    }

    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("product", new Product());
        return "product/form";
    }

    @PostMapping("/new")
    public String create(@Valid @ModelAttribute("product") Product product,
                         BindingResult result,
                         RedirectAttributes redirectAttrs) {
        if (result.hasErrors()) return "product/form";
        productRepository.save(product);
        redirectAttrs.addFlashAttribute("successMessage", "Product created successfully!");
        return "redirect:/products";
    }

    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Long id, Model model) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
        model.addAttribute("product", product);
        return "product/form";
    }

    @PostMapping("/{id}/edit")
    public String update(@PathVariable Long id,
                         @Valid @ModelAttribute("product") Product product,
                         BindingResult result,
                         RedirectAttributes redirectAttrs) {
        if (result.hasErrors()) { product.setId(id); return "product/form"; }
        product.setId(id);
        productRepository.save(product);
        redirectAttrs.addFlashAttribute("successMessage", "Product updated successfully!");
        return "redirect:/products";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes redirectAttrs) {
        productRepository.deleteById(id);
        redirectAttrs.addFlashAttribute("successMessage", "Product deleted.");
        return "redirect:/products";
    }
}
