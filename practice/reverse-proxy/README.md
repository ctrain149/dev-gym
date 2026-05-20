# Spring Boot Reverse Proxy Example

Interview-ready example showing two approaches to building a reverse proxy in Spring Boot.

## Architecture

```
Client (browser/curl)
    │
    ▼
┌──────────────────────┐
│  Reverse Proxy :9090 │  ← This project
│  ┌────────────────┐  │
│  │ Global Filters │  │  LoggingFilter.java
│  │ (logging, auth)│  │
│  └───────┬────────┘  │
│          │           │
│  ┌───────▼────────┐  │
│  │  Route Matcher  │  │  GatewayConfig.java / application.yml
│  │  /api/** → :8080│  │
│  │  /auth/** →:8081│  │
│  └───────┬────────┘  │
│          │           │
│  ┌───────▼────────┐  │
│  │ Route Filters   │  │  StripPrefix, AddHeader, Retry, Rewrite
│  └───────┬────────┘  │
└──────────┼───────────┘
           │
           ▼
┌──────────────────────┐
│  Backend :8080       │  ← Your actual API
└──────────────────────┘
```

## Two Approaches

### 1. Spring Cloud Gateway (Production)
- **GatewayConfig.java** — programmatic route definitions
- **application.yml** — declarative YAML route definitions (commented out, equivalent)
- **LoggingFilter.java** — global filter for request/response logging
- Built-in: load balancing, circuit breaker, rate limiting, retries

### 2. Manual WebClient Proxy (Interview)
- **ManualProxyController.java** — hand-rolled proxy using `WebClient`
- Shows you understand the mechanics: receive → forward → return
- Good for when you can't use Spring Cloud Gateway

## Run

```bash
# Start the backend first (port 8080)
cd ../../backend && mvn spring-boot:run

# Start the proxy (port 9090)
cd ../practice/reverse-proxy && mvn spring-boot:run
```

## Test

```bash
# Via Spring Cloud Gateway routes
curl http://localhost:9090/api/products        # → proxied to localhost:8080/products

# Via manual proxy
curl http://localhost:9090/manual/products     # → proxied to localhost:8080/products

# Check registered routes
curl http://localhost:9090/actuator/gateway/routes
```

## Key Interview Talking Points

1. **What is a reverse proxy?**
   A server that sits between clients and backend services, forwarding requests on behalf of clients. Unlike a forward proxy (which acts for the client), a reverse proxy acts for the server.

2. **Why use one?**
   - Load balancing across multiple backend instances
   - SSL termination (HTTPS at the proxy, HTTP internally)
   - Caching, compression
   - Authentication/authorization gateway
   - Rate limiting
   - Path rewriting (versioned APIs, legacy migrations)

3. **Spring Cloud Gateway vs Zuul vs Nginx?**
   - **SCG**: reactive (Netty), Java-native, integrates with Spring ecosystem
   - **Zuul 1**: blocking (servlet), older Netflix OSS, simpler
   - **Nginx**: C-based, extremely fast, config-file driven, not Java

4. **Filters**: Global filters run on every route. Route filters run on specific routes. Order matters (lower number = earlier execution).

5. **Predicates**: Match conditions — Path, Header, Cookie, Method, Query, Host, Weight (for canary deployments).
