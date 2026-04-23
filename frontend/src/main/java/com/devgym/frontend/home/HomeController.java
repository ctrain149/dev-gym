package com.devgym.frontend.home;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * tmvc-01: Your first Thymeleaf controller.
 *
 * TODO: Add a "featuredProducts" attribute to the model (a List<String> for now).
 * TODO: Return the view name "home/index" (maps to templates/home/index.html).
 * TODO: Add a second mapping GET /about that returns "home/about".
 *
 * Key concepts:
 *   - @Controller (NOT @RestController) renders view names.
 *   - Model.addAttribute("key", value) → available as ${key} in Thymeleaf.
 *   - Return a String = the view name (no .html extension needed).
 */
@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        // TODO: Add model attributes
        // model.addAttribute("appName", "DevStore");
        // model.addAttribute("featuredProducts", List.of());
        return "home/index";
    }
}
