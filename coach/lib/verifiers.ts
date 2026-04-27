import { readFile } from "fs/promises";
import { join } from "path";

const FRONTEND_ROOT = join(process.cwd(), "..", "frontend");
const BACKEND_ROOT = join(process.cwd(), "..", "backend");

export interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
}

export interface VerifyResult {
  taskId: string;
  passed: boolean;
  checks: CheckResult[];
}

type Verifier = () => Promise<VerifyResult>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function readProjectFile(root: string, relativePath: string): Promise<string | null> {
  try {
    return await readFile(join(root, relativePath), "utf-8");
  } catch {
    return null;
  }
}

function check(name: string, content: string | null, ...patterns: RegExp[]): CheckResult {
  if (content === null) {
    return { name, passed: false, message: "File not found" };
  }
  const failed = patterns.find((p) => !p.test(content));
  if (failed) {
    return { name, passed: false, message: `Missing: ${failed.source}` };
  }
  return { name, passed: true, message: "OK" };
}

function result(taskId: string, checks: CheckResult[]): VerifyResult {
  return { taskId, passed: checks.every((c) => c.passed), checks };
}

// ─── spr-01 ───────────────────────────────────────────────────────────────────

const verifySpr01: Verifier = async () => {
  const props = await readProjectFile(BACKEND_ROOT, "src/main/resources/application.properties");
  const securityFile = await findJavaFile(BACKEND_ROOT, "SecurityConfig.java");

  const checks: CheckResult[] = [
    check(
      "H2 datasource URL configured",
      props,
      /spring\.datasource\.url\s*=\s*jdbc:h2:/
    ),
    check(
      "H2 driver class set",
      props,
      /spring\.datasource\.driver-class-name\s*=\s*org\.h2\.Driver/
    ),
    check(
      "JPA dialect set to H2",
      props,
      /spring\.jpa\.database-platform\s*=\s*org\.hibernate\.dialect\.H2Dialect/
    ),
    check(
      "DDL auto set to create-drop",
      props,
      /spring\.jpa\.hibernate\.ddl-auto\s*=\s*create-drop/
    ),
    check(
      "H2 console enabled",
      props,
      /spring\.h2\.console\.enabled\s*=\s*true/
    ),
    check(
      "H2 console path configured",
      props,
      /spring\.h2\.console\.path\s*=\s*\/h2-console/
    ),
    check(
      "Actuator health endpoint exposed",
      props,
      /management\.endpoints\.web\.exposure\.include\s*=.*health/
    ),
    check(
      "SecurityConfig.java exists",
      securityFile,
      /@Configuration/,
      /SecurityFilterChain/
    ),
    check(
      "SecurityConfig permits h2-console",
      securityFile,
      /h2-console/,
      /permitAll/
    ),
    check(
      "SecurityConfig fixes iframe headers (frameOptions)",
      securityFile,
      /frameOptions|sameOrigin/i
    ),
    check(
      "SecurityConfig disables CSRF",
      securityFile,
      /csrf.*disable/
    ),
    check(
      "CORS configured for Angular (localhost:4200)",
      securityFile,
      /localhost:4200|localhost:\*|127\.0\.0\.1/
    ),
  ];

  return result("spr-01", checks);
};

// ─── spr-02 ───────────────────────────────────────────────────────────────────

const verifySpr02: Verifier = async () => {
  const entity = await findJavaFile(BACKEND_ROOT, "Product.java");
  const repo = await findJavaFile(BACKEND_ROOT, "ProductRepository.java");
  const seeder = await findJavaFile(BACKEND_ROOT, "DataSeeder.java");

  const checks: CheckResult[] = [
    check("Product entity exists", entity, /@Entity/),
    check("Product has @Id and @GeneratedValue", entity, /@Id/, /@GeneratedValue/),
    check("Product has name field with @NotBlank", entity, /name/, /@NotBlank/),
    check("Product has price with @DecimalMin", entity, /price/, /@DecimalMin/),
    check("Product has stock field", entity, /stock/),
    check(
      "ProductRepository extends JpaRepository",
      repo,
      /JpaRepository<Product,\s*Long>/
    ),
    check(
      "Data seeder exists and implements CommandLineRunner",
      seeder,
      /CommandLineRunner/
    ),
    check("Seeder saves at least one product", seeder, /productRepository\.save/),
  ];

  return result("spr-02", checks);
};

// ─── spr-03 ───────────────────────────────────────────────────────────────────

const verifySpr03: Verifier = async () => {
  const controller = await findJavaFile(BACKEND_ROOT, "ProductController.java");
  const service = await findJavaFile(BACKEND_ROOT, "ProductService.java");

  const checks: CheckResult[] = [
    check("ProductController exists with @RestController", controller, /@RestController/),
    check("Controller has GET /api/products mapping", controller, /@GetMapping/, /@RequestMapping.*api\/products/),
    check("Controller has POST mapping", controller, /@PostMapping/),
    check("Controller has PUT mapping", controller, /@PutMapping/),
    check("Controller has DELETE mapping", controller, /@DeleteMapping/),
    check("Controller uses @Valid on request body", controller, /@Valid/),
    check("POST returns 201 Created (ResponseEntity)", controller, /ResponseEntity/, /created\(/),
    check("DELETE returns 204 No Content", controller, /noContent/),
    check("ProductService exists with @Service", service, /@Service/),
  ];

  return result("spr-03", checks);
};

// ─── spr-03a ──────────────────────────────────────────────────────────────────

const verifySpr03a: Verifier = async () => {
  const repo = await findJavaFile(BACKEND_ROOT, "ProductRepository.java");
  const controller = await findJavaFile(BACKEND_ROOT, "ProductController.java");

  const checks: CheckResult[] = [
    check(
      "Repository has @Query with JPQL SELECT",
      repo,
      /@Query.*SELECT.*FROM.*Product/
    ),
    check(
      "JPQL uses named parameters (:param)",
      repo,
      /@Query.*:.*\w/
    ),
    check(
      "Has @Param annotation to bind parameters",
      repo,
      /@Param/
    ),
    check(
      "JPQL search by name (case-insensitive)",
      repo,
      /LOWER|lower|UPPER|upper|IgnoreCase/i
    ),
    check(
      "JPQL query for price filtering",
      repo,
      /price\s*>=|price\s*>|price.*>=|greaterThan/i
    ),
    check(
      "JPQL aggregate query (COUNT/SUM/AVG)",
      repo,
      /COUNT\s*\(|SUM\s*\(|AVG\s*\(/i
    ),
    check(
      "Controller has /search or /in-stock endpoint",
      controller,
      /search|in-stock|inStock/
    ),
  ];

  return result("spr-03a", checks);
};

// ─── spr-03b ──────────────────────────────────────────────────────────────────

const verifySpr03b: Verifier = async () => {
  const repo = await findJavaFile(BACKEND_ROOT, "ProductRepository.java");
  const stats = await findJavaFile(BACKEND_ROOT, "ProductStats.java");
  const controller = await findJavaFile(BACKEND_ROOT, "ProductController.java");

  const checks: CheckResult[] = [
    check(
      "Repository has @Query with nativeQuery = true",
      repo,
      /nativeQuery\s*=\s*true/
    ),
    check(
      "Native query uses SQL table name (lowercase 'product')",
      repo,
      /FROM\s+product|from\s+product/
    ),
    check(
      "Native query uses SQL aggregate (COUNT/AVG/SUM)",
      repo,
      /COUNT\s*\(\s*\*|AVG\s*\(|SUM\s*\(/i
    ),
    check(
      "ProductStats projection interface exists",
      stats,
      /interface\s+ProductStats/
    ),
    check(
      "ProductStats has getter methods (getCount/getAvgPrice/getTotalStock)",
      stats,
      /getCount|getAvgPrice|getTotalStock/
    ),
    check(
      "Controller has /stats endpoint",
      controller,
      /stats/
    ),
  ];

  return result("spr-03b", checks);
};

// ─── ang-01 ───────────────────────────────────────────────────────────────────

const verifyAng01: Verifier = async () => {
  const appHtml = await readProjectFile(FRONTEND_ROOT, "src/app/app.component.html");
  const appTs = await readProjectFile(FRONTEND_ROOT, "src/app/app.component.ts");
  const routes = await readProjectFile(FRONTEND_ROOT, "src/app/app.routes.ts");
  const config = await readProjectFile(FRONTEND_ROOT, "src/app/app.config.ts");

  const checks: CheckResult[] = [
    check("app.component.html has <router-outlet>", appHtml, /<router-outlet/),
    check("app.component.html has navigation links", appHtml, /routerLink/),
    check(
      "app.component.ts imports RouterOutlet",
      appTs,
      /RouterOutlet/
    ),
    check(
      "app.routes.ts has at least two routes",
      routes,
      /path.*feed/,
      /path.*products/
    ),
    check(
      "app.config.ts provides HttpClient",
      config,
      /provideHttpClient/
    ),
  ];

  return result("ang-01", checks);
};

// ─── ang-02 ───────────────────────────────────────────────────────────────────

const verifyAng02: Verifier = async () => {
  const service = await readProjectFile(FRONTEND_ROOT, "src/app/product.service.ts");
  const component = await findAngularFile(FRONTEND_ROOT, "products.component.ts");

  const checks: CheckResult[] = [
    check("product.service.ts exists", service, /Injectable/),
    check("ProductService injects HttpClient", service, /HttpClient/),
    check("ProductService has getAll() method", service, /getAll\s*\(\s*\)/),
    check("ProductService calls GET /api/products", service, /api\/products/),
    check("ProductsComponent exists", component, /Component/),
    check(
      "ProductsComponent uses ProductService",
      component,
      /ProductService/
    ),
    check(
      "ProductsComponent handles loading state",
      component,
      /loading/
    ),
    check(
      "ProductsComponent handles error state",
      component,
      /error/
    ),
  ];

  return result("ang-02", checks);
};

// ─── ang-03 ───────────────────────────────────────────────────────────────────

const verifyAng03: Verifier = async () => {
  const form = await findAngularFile(FRONTEND_ROOT, "product-form.component.ts");

  const checks: CheckResult[] = [
    check("product-form component exists", form, /Component/),
    check("Uses ReactiveFormsModule or FormBuilder", form, /FormBuilder|ReactiveFormsModule/),
    check("Has FormGroup defined", form, /FormGroup|formGroup/),
    check("Has required validator on name", form, /Validators\.required/),
    check("Has min validator on price", form, /Validators\.min/),
  ];

  return result("ang-03", checks);
};

// ─── ang-04 ───────────────────────────────────────────────────────────────────

const verifyAng04: Verifier = async () => {
  const component = await findAngularFile(FRONTEND_ROOT, "products.component.ts");

  const checks: CheckResult[] = [
    check("Uses debounceTime operator", component, /debounceTime/),
    check("Uses distinctUntilChanged operator", component, /distinctUntilChanged/),
    check("Uses switchMap operator", component, /switchMap/),
    check(
      "Has a Subject or search stream",
      component,
      /Subject|searchTerm|search\$/
    ),
  ];

  return result("ang-04", checks);
};

// ─── ang-05 ───────────────────────────────────────────────────────────────────

const verifyAng05: Verifier = async () => {
  const authService = await findAngularFile(FRONTEND_ROOT, "auth.service.ts");
  const guard = await findAngularFile(FRONTEND_ROOT, "auth.guard.ts");

  const checks: CheckResult[] = [
    check("AuthService exists with @Injectable", authService, /Injectable/),
    check("AuthService tracks login state", authService, /isLoggedIn|token|currentUser/),
    check("Auth guard exists", guard, /canActivate|CanActivateFn/),
    check("Guard redirects to /login", guard, /login/),
  ];

  return result("ang-05", checks);
};

// ─── Utility: find a Java or TS file anywhere under src/ ─────────────────────

async function findJavaFile(root: string, filename: string): Promise<string | null> {
  const { readdir, stat } = await import("fs/promises");

  async function walk(dir: string): Promise<string | null> {
    let entries;
    try {
      entries = await readdir(dir);
    } catch {
      return null;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      try {
        const s = await stat(full);
        if (s.isDirectory()) {
          const found = await walk(full);
          if (found !== null) return found;
        } else if (entry === filename) {
          return readFile(full, "utf-8");
        }
      } catch {
        continue;
      }
    }
    return null;
  }

  return walk(join(root, "src"));
}

async function findAngularFile(root: string, filename: string): Promise<string | null> {
  return findJavaFile(root, filename);
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const verifiers: Record<string, Verifier> = {
  "spr-01": verifySpr01,
  "spr-02": verifySpr02,
  "spr-03": verifySpr03,
  "spr-03a": verifySpr03a,
  "spr-03b": verifySpr03b,
  "ang-01": verifyAng01,
  "ang-02": verifyAng02,
  "ang-03": verifyAng03,
  "ang-04": verifyAng04,
  "ang-05": verifyAng05,
};

export async function runVerifier(taskId: string): Promise<VerifyResult> {
  const verifier = verifiers[taskId];
  if (!verifier) {
    return {
      taskId,
      passed: false,
      checks: [{ name: "No verifier", passed: false, message: `No verifier implemented for ${taskId} yet` }],
    };
  }
  return verifier();
}

