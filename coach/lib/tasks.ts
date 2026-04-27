export type TaskCategory = "angular" | "spring" | "thymeleaf";
export type TaskStatus = "locked" | "available" | "completed";

export interface Task {
  id: string;
  title: string;
  phase: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: TaskCategory;
  objectives: string[];
  acceptanceCriteria: string[];
  filesInvolved: string[];
  hints: string[];
  gitTag: string;
}

export const angularTasks: Task[] = [
  {
    id: "ang-01",
    title: "App Shell & Routing",
    phase: 1,
    difficulty: "beginner",
    category: "angular",
    objectives: [
      "Clean up the default app.component.html and build a real app shell",
      "Set up RouterModule with at least two routes: /feed and /products",
      "Add a NavbarComponent with links to each route",
    ],
    acceptanceCriteria: [
      "Default Angular placeholder content is removed",
      "Navigating to /feed and /products renders different components",
      "Navbar is visible on all pages",
    ],
    filesInvolved: [
      "src/app/app.component.html",
      "src/app/app.routes.ts",
      "src/app/navbar/navbar.component.ts",
    ],
    hints: [
      "Use ng generate component navbar to scaffold the component",
      "RouterLink directive is needed in the navbar template",
      "<router-outlet> must be in app.component.html",
    ],
    gitTag: "ang-01-start",
  },
  {
    id: "ang-02",
    title: "Services & HttpClient",
    phase: 1,
    difficulty: "beginner",
    category: "angular",
    objectives: [
      "Create a ProductService that fetches from the Spring Boot API",
      "Inject HttpClient and call GET /api/products",
      "Display the product list in ProductsComponent",
    ],
    acceptanceCriteria: [
      "ProductService exists and injects HttpClient",
      "Products load from the backend on component init",
      "Loading and error states are handled",
    ],
    filesInvolved: [
      "src/app/products/product.service.ts",
      "src/app/products/products.component.ts",
      "src/app/products/products.component.html",
    ],
    hints: [
      "provideHttpClient() must be in app.config.ts",
      "Use the async pipe or subscribe in ngOnInit",
      "CORS must be enabled on the Spring Boot side",
    ],
    gitTag: "ang-02-start",
  },
  {
    id: "ang-03",
    title: "Reactive Forms & Validation",
    phase: 2,
    difficulty: "beginner",
    category: "angular",
    objectives: [
      "Build a product create/edit form using ReactiveFormsModule",
      "Add validators: name required, price min(0)",
      "Show inline validation error messages",
    ],
    acceptanceCriteria: [
      "Form uses FormBuilder and FormGroup",
      "Submit button is disabled when form is invalid",
      "Error messages appear below invalid fields",
    ],
    filesInvolved: [
      "src/app/products/product-form/product-form.component.ts",
      "src/app/products/product-form/product-form.component.html",
    ],
    hints: [
      "Import ReactiveFormsModule in the component imports array",
      "Use formControlName directive to bind controls",
      "Access errors with form.get('name')?.errors",
    ],
    gitTag: "ang-03-start",
  },
  {
    id: "ang-04",
    title: "RxJS Operators & Search",
    phase: 2,
    difficulty: "intermediate",
    category: "angular",
    objectives: [
      "Add a live search input that debounces API calls",
      "Use debounceTime, distinctUntilChanged, and switchMap",
      "Cancel in-flight requests when a new search is typed",
    ],
    acceptanceCriteria: [
      "Search input triggers API call after 300ms debounce",
      "Rapid typing only fires one request per settled input",
      "Previous request is cancelled when a new one starts",
    ],
    filesInvolved: ["src/app/products/products.component.ts"],
    hints: [
      "Use a Subject<string> as the search source",
      "Pipe: debounceTime(300), distinctUntilChanged(), switchMap(...)",
      "Remember to unsubscribe — use takeUntilDestroyed()",
    ],
    gitTag: "ang-04-start",
  },
  {
    id: "ang-05",
    title: "Route Guards & Auth",
    phase: 3,
    difficulty: "intermediate",
    category: "angular",
    objectives: [
      "Create an AuthService that tracks login state",
      "Implement a canActivate guard for protected routes",
      "Redirect unauthenticated users to /login",
    ],
    acceptanceCriteria: [
      "Navigating to /admin while logged out redirects to /login",
      "AuthService stores a token in localStorage",
      "Guard uses inject(AuthService) functional style",
    ],
    filesInvolved: [
      "src/app/auth/auth.service.ts",
      "src/app/auth/auth.guard.ts",
      "src/app/app.routes.ts",
    ],
    hints: [
      "Use the functional canActivate: [authGuard] syntax",
      "inject() works inside a plain function guard",
      "Router.navigate([\"/login\"]) for the redirect",
    ],
    gitTag: "ang-05-start",
  },
  {
    id: "ang-06",
    title: "NgRx Signal Store",
    phase: 3,
    difficulty: "advanced",
    category: "angular",
    objectives: [
      "Replace the ProductService subject with an NgRx Signal Store",
      "Define state, computed, and updater methods",
      "Connect the store to the products list component",
    ],
    acceptanceCriteria: [
      "ProductStore is provided in app.config.ts",
      "Component reads from store signals, not local state",
      "Loading and error signals are tracked in the store",
    ],
    filesInvolved: [
      "src/app/products/product.store.ts",
      "src/app/products/products.component.ts",
    ],
    hints: [
      "Use signalStore() from @ngrx/signals",
      "withState(), withComputed(), withMethods() are the building blocks",
      "Inject the store with inject(ProductStore)",
    ],
    gitTag: "ang-06-start",
  },
];

export const springTasks: Task[] = [
  {
    id: "spr-01",
    title: "H2, Security & Health",
    phase: 1,
    difficulty: "beginner",
    category: "spring",
    objectives: [
      "Configure H2 in-memory datasource in application.properties",
      "Enable the H2 console at /h2-console",
      "Expose the /actuator/health endpoint",
      "Configure Spring Security to permit /h2-console and /actuator/health",
    ],
    acceptanceCriteria: [
      "GET /actuator/health returns {status: UP}",
      "/h2-console is accessible in the browser at localhost:8080/h2-console",
      "No 401 Unauthorized on the health endpoint",
      "Angular app (localhost:4200) can call the API without CORS errors",
    ],
    filesInvolved: [
      "src/main/resources/application.properties",
      "src/main/java/com/devgym/backend/config/SecurityConfig.java",
    ],
    hints: [
      "application.properties — Datasource: Spring Boot needs to know how to connect to the database. For H2 (an in-memory DB that resets on restart — perfect for dev), set: spring.datasource.url=jdbc:h2:mem:devfeed;DB_CLOSE_DELAY=-1, spring.datasource.driver-class-name=org.h2.Driver, spring.datasource.username=sa, spring.datasource.password= (empty), spring.jpa.database-platform=org.hibernate.dialect.H2Dialect, spring.jpa.hibernate.ddl-auto=create-drop (auto-creates tables from your @Entity classes on startup and drops them on shutdown).",
      "application.properties — H2 Console: The H2 console is a browser UI to inspect your in-memory database. Enable it with: spring.h2.console.enabled=true, spring.h2.console.path=/h2-console. Without this, you can't see your tables during development.",
      "application.properties — Actuator Health: Spring Actuator provides production-ready endpoints like /actuator/health. Expose it with: management.endpoints.web.exposure.include=health. By default Actuator endpoints are not exposed over HTTP, so you must explicitly include them.",
      "SecurityConfig.java — Why you need this class: Spring Security locks down ALL endpoints by default the moment it's on the classpath. Without a SecurityConfig, even GET /api/products returns a 401. Create a @Configuration class with a SecurityFilterChain @Bean.",
      "SecurityConfig.java — Permitting public paths: Inside filterChain(), use .authorizeHttpRequests(auth -> auth.requestMatchers(\"/h2-console/**\", \"/actuator/health\").permitAll().anyRequest().permitAll()). The /** on h2-console is important — the console makes multiple sub-requests.",
      "SecurityConfig.java — H2 console iframe fix: The H2 console loads inside an <iframe>. Spring Security blocks iframes by default via X-Frame-Options headers. Fix it with: .headers(h -> h.frameOptions(f -> f.sameOrigin())). Without this the console will show a blank page.",
      "SecurityConfig.java — CORS for Angular: Your Angular app runs on port 4200, the API on 8080. Browsers block cross-origin requests unless the server explicitly allows them. Add a CorsConfigurationSource @Bean that allows origin http://localhost:4200, methods GET/POST/PUT/DELETE/OPTIONS, and headers *. Then wire it in with .cors(cors -> cors.configurationSource(yourBean)).",
      "SecurityConfig.java — CSRF: Disable CSRF for this dev setup with .csrf(csrf -> csrf.disable()). CSRF protection is designed for browser form submissions with session cookies — it conflicts with stateless REST APIs and will cause 403 errors on POST/PUT/DELETE requests.",
    ],
    gitTag: "spr-01-start",
  },
  {
    id: "spr-02",
    title: "JPA Entity & Repository",
    phase: 1,
    difficulty: "beginner",
    category: "spring",
    objectives: [
      "Create a Product @Entity with id, name, price, stock fields",
      "Add @NotBlank and @DecimalMin validation annotations",
      "Extend JpaRepository<Product, Long>",
      "Seed 5 sample products with a CommandLineRunner",
    ],
    acceptanceCriteria: [
      "H2 console shows a PRODUCT table with seed data",
      "productRepository.findAll() returns all 5 products",
      "Validation annotations are present on the entity",
    ],
    filesInvolved: [
      "src/main/java/.../product/Product.java",
      "src/main/java/.../product/ProductRepository.java",
      "src/main/java/.../DataSeeder.java",
    ],
    hints: [
      "@Entity, @Id, @GeneratedValue(strategy = GenerationType.IDENTITY)",
      "@Column(nullable = false) pairs with @NotBlank",
      "Implement CommandLineRunner or use @PostConstruct",
    ],
    gitTag: "spr-02-start",
  },
  {
    id: "spr-03",
    title: "REST CRUD Endpoints",
    phase: 1,
    difficulty: "beginner",
    category: "spring",
    objectives: [
      "Implement GET /api/products, POST /api/products",
      "Implement GET /api/products/{id}, PUT /api/products/{id}, DELETE /api/products/{id}",
      "Use @Valid on request bodies and return proper HTTP status codes",
    ],
    acceptanceCriteria: [
      "POST with valid body returns 201 Created with Location header",
      "GET /api/products/{id} returns 404 when not found",
      "DELETE returns 204 No Content",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductController.java",
      "src/main/java/.../product/ProductService.java",
    ],
    hints: [
      "Use ResponseEntity<> for full control over status and headers",
      "ServletUriComponentsBuilder.fromCurrentRequest() builds the Location header",
      "@PathVariable Long id maps the URL segment",
    ],
    gitTag: "spr-03-start",
  },
  {
    id: "spr-03a",
    title: "JPQL Queries",
    phase: 2,
    difficulty: "intermediate",
    category: "spring",
    objectives: [
      "Add a JPQL @Query to search products by name (case-insensitive, partial match)",
      "Add a JPQL @Query to find products above a given price",
      "Add a JPQL @Query to get the total count of in-stock products",
      "Wire the queries into a GET /api/products/search?name=...&minPrice=... endpoint",
    ],
    acceptanceCriteria: [
      "GET /api/products/search?name=widget returns matching products (case-insensitive)",
      "GET /api/products/search?minPrice=20.00 returns products with price >= 20",
      "GET /api/products/in-stock/count returns a numeric count",
      "All queries use JPQL @Query annotations, NOT derived query methods",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductRepository.java",
      "src/main/java/.../product/ProductController.java",
    ],
    hints: [
      "JPQL vs Derived Methods: Spring Data can auto-generate queries from method names (findByNameContaining), but real-world projects need JPQL for anything beyond simple lookups. JPQL queries against your entity model, not raw SQL tables. You write them with @Query(\"SELECT p FROM Product p WHERE ...\").",
      "Case-insensitive search: Use LOWER() on both sides: @Query(\"SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))\"). The :name is a named parameter bound with @Param(\"name\").",
      "Filtering by price: @Query(\"SELECT p FROM Product p WHERE p.price >= :minPrice\"). Use @Param(\"minPrice\") BigDecimal on the method parameter.",
      "Aggregate queries: JPQL supports COUNT, SUM, AVG, etc. @Query(\"SELECT COUNT(p) FROM Product p WHERE p.stock > 0\") Long countInStock(). Note the return type is Long, not int.",
      "Combining filters: You can combine name + price in one query: WHERE LOWER(p.name) LIKE ... AND p.price >= :minPrice. Use Optional<BigDecimal> params and build the query conditionally, or use separate repository methods.",
      "Controller wiring: Create a @GetMapping(\"/search\") that takes @RequestParam(required = false) String name, @RequestParam(required = false) BigDecimal minPrice. Call different repo methods based on which params are present.",
    ],
    gitTag: "spr-03a-start",
  },
  {
    id: "spr-03b",
    title: "Native SQL Queries",
    phase: 2,
    difficulty: "intermediate",
    category: "spring",
    objectives: [
      "Write a native SQL query with @Query(nativeQuery = true) to get product statistics (count, avg price, total stock)",
      "Write a native SQL query that joins or uses SQL-specific functions not available in JPQL",
      "Map native query results to a projection interface or DTO",
      "Expose a GET /api/products/stats endpoint returning the statistics",
    ],
    acceptanceCriteria: [
      "GET /api/products/stats returns {count, avgPrice, totalStock}",
      "At least one query uses @Query(value = \"...\", nativeQuery = true)",
      "Results are mapped via an interface projection (e.g., ProductStats) not a raw Object[]",
      "Queries use actual SQL syntax (SELECT ... FROM product), not JPQL entity names",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductRepository.java",
      "src/main/java/.../product/ProductStats.java",
      "src/main/java/.../product/ProductController.java",
    ],
    hints: [
      "Native vs JPQL: JPQL queries your Java entities (Product). Native queries your actual database tables (product). Use native when you need DB-specific functions (STRING_AGG, COALESCE, window functions) or complex aggregates that JPQL can't express.",
      "Syntax: @Query(value = \"SELECT COUNT(*) AS count, AVG(price) AS avg_price, SUM(stock) AS total_stock FROM product\", nativeQuery = true). Note: table/column names are SQL names (snake_case), not Java field names.",
      "Interface projection: Create a simple interface: public interface ProductStats { Long getCount(); Double getAvgPrice(); Integer getTotalStock(); }. Spring Data auto-maps the SQL column aliases to getter methods. The alias avg_price maps to getAvgPrice() (Spring handles the conversion).",
      "Why not Object[]? Returning Object[] is fragile — you lose type safety and have to cast by index. Interface projections give you named, typed accessors and are the idiomatic Spring Data approach for native query results.",
      "Second native query idea: Try a query that uses COALESCE or CASE WHEN, e.g., categorizing products by price range: SELECT CASE WHEN price < 15 THEN 'budget' WHEN price < 30 THEN 'mid' ELSE 'premium' END AS tier, COUNT(*) AS count FROM product GROUP BY tier.",
      "Controller: Create @GetMapping(\"/stats\") that returns the ProductStats projection directly. Spring will serialize the interface proxy to JSON automatically.",
    ],
    gitTag: "spr-03b-start",
  },
  {
    id: "spr-04",
    title: "DTOs & MapStruct",
    phase: 2,
    difficulty: "beginner",
    category: "spring",
    objectives: [
      "Create CreateProductRequest and ProductResponse DTOs",
      "Never expose the entity directly from the controller",
      "Map between entity and DTO in the service layer",
    ],
    acceptanceCriteria: [
      "ProductResponse omits internal fields (e.g., no @Version field exposed)",
      "Controller methods accept/return DTOs only",
      "Mapping is done manually or with MapStruct",
    ],
    filesInvolved: [
      "src/main/java/.../product/dto/CreateProductRequest.java",
      "src/main/java/.../product/dto/ProductResponse.java",
      "src/main/java/.../product/ProductService.java",
    ],
    hints: [
      "Record classes make great immutable DTOs",
      "MapStruct @Mapper(componentModel = \"spring\") for auto-wiring",
      "Keep validation annotations on the Request DTO, not the entity",
    ],
    gitTag: "spr-04-start",
  },
  {
    id: "spr-05",
    title: "Global Exception Handling",
    phase: 2,
    difficulty: "intermediate",
    category: "spring",
    objectives: [
      "Create a @RestControllerAdvice GlobalExceptionHandler",
      "Handle ResourceNotFoundException → 404",
      "Handle MethodArgumentNotValidException → 400 with field errors",
      "Return a consistent ErrorResponse JSON shape",
    ],
    acceptanceCriteria: [
      "GET /api/products/999 returns {status:404, message:...}",
      "POST with missing name returns 400 with errors array",
      "No stack traces leak to the client",
    ],
    filesInvolved: [
      "src/main/java/.../exception/GlobalExceptionHandler.java",
      "src/main/java/.../exception/ResourceNotFoundException.java",
      "src/main/java/.../exception/ErrorResponse.java",
    ],
    hints: [
      "@ExceptionHandler(ResourceNotFoundException.class) maps the exception",
      "MethodArgumentNotValidException#getBindingResult() has field errors",
      "Use ProblemDetail (Spring 6) or a custom record for the error body",
    ],
    gitTag: "spr-05-start",
  },
  {
    id: "spr-06",
    title: "Pagination & Filtering",
    phase: 2,
    difficulty: "intermediate",
    category: "spring",
    objectives: [
      "Add GET /api/products?page=0&size=10&sort=name,asc",
      "Support keyword search via ?search=widget",
      "Return a Page<ProductResponse> envelope",
    ],
    acceptanceCriteria: [
      "Response includes totalPages, totalElements, content array",
      "Search filters by name case-insensitively",
      "Default page size is 10",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductRepository.java",
      "src/main/java/.../product/ProductController.java",
    ],
    hints: [
      "Pageable is injected automatically from @RequestParam or Pageable param",
      "findByNameContainingIgnoreCase(keyword, pageable) in the repository",
      "Spring Data's Page<T> maps to JSON automatically",
    ],
    gitTag: "spr-06-start",
  },
  {
    id: "spr-07",
    title: "Spring Security — Basic Auth",
    phase: 3,
    difficulty: "intermediate",
    category: "spring",
    objectives: [
      "Secure all /api/** endpoints with HTTP Basic authentication",
      "Create an in-memory UserDetailsService with ADMIN and USER roles",
      "Restrict DELETE to ADMIN role only",
    ],
    acceptanceCriteria: [
      "GET /api/products without credentials returns 401",
      "DELETE with USER credentials returns 403",
      "DELETE with ADMIN credentials returns 204",
    ],
    filesInvolved: ["src/main/java/.../config/SecurityConfig.java"],
    hints: [
      "httpBasic(Customizer.withDefaults()) enables basic auth",
      ".requestMatchers(HttpMethod.DELETE).hasRole(\"ADMIN\")",
      "InMemoryUserDetailsManager for the UserDetailsService bean",
    ],
    gitTag: "spr-07-start",
  },
  {
    id: "spr-08",
    title: "JWT Authentication",
    phase: 3,
    difficulty: "advanced",
    category: "spring",
    objectives: [
      "Replace Basic Auth with JWT Bearer tokens",
      "POST /api/auth/login returns access + refresh tokens",
      "JwtAuthFilter validates the token on each request",
    ],
    acceptanceCriteria: [
      "POST /api/auth/login with valid credentials returns {accessToken, refreshToken}",
      "Protected endpoints return 401 without a valid Bearer token",
      "Token expiry is configurable via application.properties",
    ],
    filesInvolved: [
      "src/main/java/.../auth/JwtService.java",
      "src/main/java/.../auth/JwtAuthFilter.java",
      "src/main/java/.../auth/AuthController.java",
    ],
    hints: [
      "Use io.jsonwebtoken:jjwt library",
      "JwtAuthFilter extends OncePerRequestFilter",
      "Store the secret as a base64-encoded string in properties",
    ],
    gitTag: "spr-08-start",
  },
];

export const thymeleafTasks: Task[] = [
  {
    id: "tmvc-01",
    title: "First Controller & Template",
    phase: 1,
    difficulty: "beginner",
    category: "thymeleaf",
    objectives: [
      "Add a featuredProducts attribute to the model (List<String>)",
      "Return the view name 'home/index' from GET /",
      "Add a second mapping GET /about that returns 'home/about'",
      "Render the featured products list in the template with th:each",
    ],
    acceptanceCriteria: [
      "GET / renders the home page with a product list",
      "GET /about renders the about page",
      "No hardcoded HTML — all dynamic content via Thymeleaf expressions",
    ],
    filesInvolved: [
      "src/main/java/.../home/HomeController.java",
      "src/main/resources/templates/home/index.html",
      "src/main/resources/templates/home/about.html",
    ],
    hints: [
      "@Controller (NOT @RestController) renders view names",
      "Model.addAttribute(\"key\", value) → available as ${key} in Thymeleaf",
      "th:each=\"item : ${list}\" iterates the list",
    ],
    gitTag: "tmvc-01-start",
  },
  {
    id: "tmvc-02",
    title: "Product List Page",
    phase: 1,
    difficulty: "beginner",
    category: "thymeleaf",
    objectives: [
      "Fetch all products from the repository and pass to the model",
      "Render the product list with th:each in product/list.html",
      "Add th:href links to the detail page for each product",
    ],
    acceptanceCriteria: [
      "GET /products shows all seeded products",
      "Each product row has a link to /products/{id}",
      "Empty state shown when no products exist",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductController.java",
      "src/main/resources/templates/product/list.html",
    ],
    hints: [
      "th:href=\"@{/products/{id}(id=${product.id})}\" builds dynamic links",
      "th:if and th:unless for conditional rendering",
      "th:text=\"${product.name}\" renders escaped text",
    ],
    gitTag: "tmvc-02-start",
  },
  {
    id: "tmvc-03",
    title: "Fragment Layout System",
    phase: 1,
    difficulty: "beginner",
    category: "thymeleaf",
    objectives: [
      "Define th:fragment='nav' and th:fragment='flash' in layout/base.html",
      "Replace the <nav> block in each page with th:replace",
      "Replace the flash block with th:replace='~{layout/base :: flash}'",
    ],
    acceptanceCriteria: [
      "Nav and flash markup defined once in layout/base.html",
      "All pages use th:replace to include nav and flash",
      "No duplicate <nav> HTML in individual templates",
    ],
    filesInvolved: [
      "src/main/resources/templates/layout/base.html",
      "src/main/resources/templates/home/index.html",
      "src/main/resources/templates/product/list.html",
    ],
    hints: [
      "th:fragment='nav' marks a reusable block in base.html",
      "th:replace='~{layout/base :: nav}' pulls it in",
      "Fragments can accept parameters: th:replace='~{base :: frag(${val})}'",
    ],
    gitTag: "tmvc-03-start",
  },
  {
    id: "tmvc-04",
    title: "Create Product Form with Validation",
    phase: 2,
    difficulty: "beginner",
    category: "thymeleaf",
    objectives: [
      "Build a GET /products/new form using th:object and th:field",
      "Handle POST /products/new with @Valid and BindingResult",
      "Show field-level errors with th:errors",
    ],
    acceptanceCriteria: [
      "Form submits and saves a valid product",
      "Validation errors appear inline next to each field",
      "On success, redirect to /products with a flash message",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductController.java",
      "src/main/resources/templates/product/form.html",
    ],
    hints: [
      "th:object='${product}' and th:field='*{name}' bind the model",
      "th:errors='*{name}' renders the validation message",
      "Return the form view name (not a redirect) when BindingResult has errors",
    ],
    gitTag: "tmvc-04-start",
  },
  {
    id: "tmvc-05",
    title: "Edit & Delete Products",
    phase: 2,
    difficulty: "beginner",
    category: "thymeleaf",
    objectives: [
      "Add GET /products/{id}/edit that pre-populates the form",
      "Handle POST /products/{id}/edit to update the entity",
      "Add a delete button using a POST form with method override",
    ],
    acceptanceCriteria: [
      "Edit form pre-fills with existing product data",
      "Submitting edit updates the record in H2",
      "Delete removes the product and redirects to the list",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductController.java",
      "src/main/resources/templates/product/form.html",
      "src/main/resources/templates/product/detail.html",
    ],
    hints: [
      "The form action must POST to /products/{id}/edit",
      "Use a hidden <input type='hidden' name='_method' value='DELETE'> if using HiddenHttpMethodFilter",
      "Or simply POST to /products/{id}/delete and handle it as a delete",
    ],
    gitTag: "tmvc-05-start",
  },
  {
    id: "tmvc-06",
    title: "Search, Pagination & Sorting",
    phase: 2,
    difficulty: "intermediate",
    category: "thymeleaf",
    objectives: [
      "Add a search form that filters products by name",
      "Implement pagination using Spring Data Pageable",
      "Render prev/next page links in the template",
    ],
    acceptanceCriteria: [
      "Search input filters results by name",
      "Pagination controls show correct page numbers",
      "Current page is highlighted",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductController.java",
      "src/main/resources/templates/product/list.html",
    ],
    hints: [
      "th:href=\"@{/products(page=${i})}\" builds page links",
      "th:classappend=\"${currentPage == i ? 'active' : ''}\"",
      "Pass totalPages and currentPage as model attributes",
    ],
    gitTag: "tmvc-06-start",
  },
  {
    id: "tmvc-07",
    title: "JPA Entity & @PrePersist",
    phase: 3,
    difficulty: "intermediate",
    category: "thymeleaf",
    objectives: [
      "Add createdAt and updatedAt fields to Product",
      "Use @PrePersist and @PreUpdate lifecycle callbacks",
      "Display the formatted date on the detail page",
    ],
    acceptanceCriteria: [
      "createdAt is set automatically on first save",
      "updatedAt changes on every update",
      "Detail page shows a formatted date string",
    ],
    filesInvolved: [
      "src/main/java/.../product/Product.java",
      "src/main/resources/templates/product/detail.html",
    ],
    hints: [
      "@PrePersist sets createdAt = LocalDateTime.now()",
      "#temporals.format(product.createdAt, 'yyyy-MM-dd') in Thymeleaf",
      "Add thymeleaf-extras-java8time dependency for #temporals",
    ],
    gitTag: "tmvc-07-start",
  },
  {
    id: "tmvc-08",
    title: "Spring Security Form Login",
    phase: 3,
    difficulty: "intermediate",
    category: "thymeleaf",
    objectives: [
      "Configure formLogin() in SecurityConfig",
      "Create a custom login page at /login using Thymeleaf",
      "Use th:action='@{/login}' and CSRF token handling",
    ],
    acceptanceCriteria: [
      "Unauthenticated users are redirected to /login",
      "Valid credentials redirect to /products",
      "Invalid credentials show an error message on the login page",
    ],
    filesInvolved: [
      "src/main/java/.../config/SecurityConfig.java",
      "src/main/resources/templates/auth/login.html",
    ],
    hints: [
      "formLogin().loginPage(\"/login\").permitAll()",
      "th:action='@{/login}' ensures the CSRF token is included",
      "?error param is set by Spring Security on failed login",
    ],
    gitTag: "tmvc-08-start",
  },
  {
    id: "tmvc-09",
    title: "UserDetailsService & Role-Based Access",
    phase: 3,
    difficulty: "intermediate",
    category: "thymeleaf",
    objectives: [
      "Implement UserDetailsService backed by a User entity in H2",
      "Restrict /products/new and /products/{id}/edit to ADMIN role",
      "Show/hide nav links based on role using Thymeleaf Security extras",
    ],
    acceptanceCriteria: [
      "Login with a USER account cannot access create/edit pages",
      "sec:authorize='hasRole(\"ADMIN\")' hides/shows nav items correctly",
      "UserDetails loads from the H2 database",
    ],
    filesInvolved: [
      "src/main/java/.../auth/UserDetailsServiceImpl.java",
      "src/main/resources/templates/layout/base.html",
    ],
    hints: [
      "Implement UserDetailsService and annotate with @Service",
      "Add thymeleaf-extras-springsecurity6 dependency",
      "xmlns:sec='http://www.thymeleaf.org/extras/spring-security' in the HTML tag",
    ],
    gitTag: "tmvc-09-start",
  },
  {
    id: "tmvc-10",
    title: "Flash Messages & PRG Pattern",
    phase: 4,
    difficulty: "intermediate",
    category: "thymeleaf",
    objectives: [
      "Use RedirectAttributes.addFlashAttribute() after create/edit/delete",
      "Render the flash message in the layout fragment",
      "Ensure the message only appears once (POST-Redirect-GET)",
    ],
    acceptanceCriteria: [
      "A success banner appears after creating a product",
      "Refreshing the page after redirect does not re-show the message",
      "Flash message is styled distinctly from normal content",
    ],
    filesInvolved: [
      "src/main/java/.../product/ProductController.java",
      "src/main/resources/templates/layout/base.html",
    ],
    hints: [
      "redirectAttrs.addFlashAttribute(\"successMessage\", \"...\")",
      "th:if='${successMessage}' in the layout fragment",
      "Flash attributes are stored in the session and cleared after one request",
    ],
    gitTag: "tmvc-10-start",
  },
];

export const allTasks: Task[] = [
  ...angularTasks,
  ...springTasks,
  ...thymeleafTasks,
];

export function getTasksByCategory(category: TaskCategory): Task[] {
  return allTasks.filter((t) => t.category === category);
}
