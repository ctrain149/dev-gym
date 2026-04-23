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

/**
 * tmvc-01 / tmvc-02 / tmvc-06: Thymeleaf product CRUD controller.
 *
 * URL scheme:
 *   GET  /products           → list with pagination
 *   GET  /products/{id}      → detail view
 *   GET  /products/new       → show create form
 *   POST /products/new       → handle create form (with validation)
 *   GET  /products/{id}/edit → show edit form
 *   POST /products/{id}/edit → handle edit form (with validation)
 *   POST /products/{id}/delete → delete and redirect
 *
 * Key Thymeleaf concepts covered:
 *   - th:object, th:field, th:errors (tmvc-02 form binding + validation)
 *   - th:each for iteration (tmvc-01)
 *   - th:href, th:action for links and form actions (tmvc-01)
 *   - Flash attributes for POST-redirect-GET success messages (tmvc-06)
 *
 * TODO: Inject ProductService (or ProductRepository directly for early tasks).
 * TODO: Implement each method body.
 */
@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    // GET /products
    @GetMapping
    public String list(@RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "") String search,
                       Model model) {
        // TODO: Use productRepository.findByNameContainingIgnoreCase(search)
        // TODO: Or use paged: productRepository.findAll(PageRequest.of(page, 10))
        // TODO: model.addAttribute("products", ...) and model.addAttribute("search", search)
        throw new UnsupportedOperationException("Not yet implemented — tmvc-01");
    }

    // GET /products/{id}
    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        // TODO: Find by id or throw ResourceNotFoundException
        // TODO: model.addAttribute("product", product)
        throw new UnsupportedOperationException("Not yet implemented — tmvc-01");
    }

    // GET /products/new
    @GetMapping("/new")
    public String showCreateForm(Model model) {
        // TODO: model.addAttribute("product", new Product())
        // NOTE: Must add an empty object so th:object works in the form
        throw new UnsupportedOperationException("Not yet implemented — tmvc-02");
    }

    // POST /products/new
    @PostMapping("/new")
    public String create(@Valid @ModelAttribute("product") Product product,
                         BindingResult result,
                         RedirectAttributes redirectAttrs) {
        // TODO: if (result.hasErrors()) return "product/form";
        // TODO: productRepository.save(product);
        // TODO: redirectAttrs.addFlashAttribute("successMessage", "Product created!");
        // TODO: return "redirect:/products";
        throw new UnsupportedOperationException("Not yet implemented — tmvc-02");
    }

    // GET /products/{id}/edit
    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Long id, Model model) {
        // TODO: Load product and add to model
        throw new UnsupportedOperationException("Not yet implemented — tmvc-06");
    }

    // POST /products/{id}/edit
    @PostMapping("/{id}/edit")
    public String update(@PathVariable Long id,
                         @Valid @ModelAttribute("product") Product product,
                         BindingResult result,
                         RedirectAttributes redirectAttrs) {
        // TODO: Validate, save, redirect with flash message
        throw new UnsupportedOperationException("Not yet implemented — tmvc-06");
    }

    // POST /products/{id}/delete
    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes redirectAttrs) {
        // TODO: productRepository.deleteById(id);
        // TODO: redirectAttrs.addFlashAttribute("successMessage", "Product deleted.");
        // TODO: return "redirect:/products";
        throw new UnsupportedOperationException("Not yet implemented — tmvc-06");
    }
}
