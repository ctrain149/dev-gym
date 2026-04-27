# Practice Directory

Create your Java files here, organized by category:

```
practice/
├── oop/
│   ├── srp/          → SRP refactoring (oop-01)
│   ├── ocp/          → Open/Closed + DIP (oop-02)
│   ├── factory/      → Factory pattern (oop-03)
│   ├── observer/     → Observer pattern (oop-04)
│   ├── strategy/     → Strategy pattern (oop-05)
│   └── command/      → Command pattern (oop-06)
├── networking/
│   ├── tcp/          → TCP echo + multi-threaded (net-01, net-02)
│   ├── udp/          → UDP datagrams (net-03)
│   ├── protocol/     → Custom binary protocol (net-04)
│   ├── filetransfer/ → TCP file transfer (net-05)
│   └── diagnostics/  → Port scanner + ping (net-06)
├── security/
│   ├── validation/   → Input validation (sec-01)
│   ├── sql/          → SQL injection prevention (sec-02)
│   ├── crypto/       → AES encryption (sec-03)
│   ├── auth/         → Password hashing (sec-04)
│   ├── config/       → Secure config management (sec-05)
│   └── audit/        → Security audit exercise (sec-06)
└── testing/
    ├── junit/        → JUnit 5 fundamentals (tst-01)
    ├── mockito/      → Mocking (tst-02)
    ├── tdd/          → TDD red-green-refactor (tst-03)
    ├── integration/  → Integration tests (tst-04)
    ├── coverage/     → Test coverage (tst-05)
    └── docs/         → Test procedures & specs (tst-06)
```

## Compiling

Each exercise is standalone Java. Compile and run with:

```bash
# Single file
javac practice/oop/srp/ReportGenerator.java
java -cp practice/oop/srp ReportGenerator

# With JUnit (download junit-platform-console-standalone.jar)
javac -cp junit.jar practice/testing/junit/InputValidatorTest.java
java -jar junit.jar --class-path practice/testing/junit --scan-class-path
```

Or use your IDE's run button.
