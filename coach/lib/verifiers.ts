/**
 * Verification rules for each practice task.
 *
 * Three check levels:
 *   1. Pattern — file exists + contains required code patterns / lacks forbidden ones
 *   2. Compile — `javac` succeeds (Java) or `octave --eval` succeeds (Matlab)
 *   3. Test   — JUnit / Octave test harness produces expected output
 */

export interface PatternCheck {
  file: string;
  requiredPatterns?: string[];
  forbiddenPatterns?: string[];
  description: string;
}

export interface CompileCheck {
  files: string[];
  lang: "java" | "octave";
  description: string;
}

export interface TestCheck {
  command: string;
  cwd: string;
  expectedOutput?: string[];
  description: string;
}

export interface VerificationResult {
  taskId: string;
  passed: boolean;
  checks: CheckResult[];
  summary: string;
}

export interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  level: "pattern" | "compile" | "test";
}

export interface TaskVerifier {
  taskId: string;
  patterns: PatternCheck[];
  compile?: CompileCheck;
  tests?: TestCheck;
}

// ═══════════════════════════════════════════════════════════════════════════════
// OOP Verifiers
// ═══════════════════════════════════════════════════════════════════════════════

const oop01: TaskVerifier = {
  taskId: "oop-01",
  patterns: [
    {
      file: "practice/oop/srp/DataFetcher.java",
      requiredPatterns: [
        "class DataFetcher",
        "List<Map<String, Object>>",
        "fetch",
      ],
      forbiddenPatterns: ["formatAs", "exportTo", "FileWriter"],
      description: "DataFetcher has fetch logic only, no formatting or exporting",
    },
    {
      file: "practice/oop/srp/ReportFormatter.java",
      requiredPatterns: ["class ReportFormatter", "String format"],
      forbiddenPatterns: ["fetchSensorData", "FileWriter", "exportTo"],
      description: "ReportFormatter has format logic only",
    },
    {
      file: "practice/oop/srp/ReportExporter.java",
      requiredPatterns: ["class ReportExporter", "export"],
      forbiddenPatterns: ["fetchSensorData", "formatAsCSV", "formatAsTable"],
      description: "ReportExporter has export logic only",
    },
    {
      file: "practice/oop/srp/ReportGenerator.java",
      requiredPatterns: ["DataFetcher", "ReportFormatter", "ReportExporter"],
      forbiddenPatterns: [
        "String formatAsCSV(",
        "String formatAsTable(",
        "void exportToFile(",
        "void exportToConsole(",
        "List<Map<String, Object>> fetchSensorData(",
        "StringBuilder sb",
        "new ArrayList<>()",
      ],
      description: "ReportGenerator delegates to the three extracted classes (no inline logic)",
    },
  ],
  compile: {
    files: [
      "practice/oop/srp/DataFetcher.java",
      "practice/oop/srp/ReportFormatter.java",
      "practice/oop/srp/ReportExporter.java",
      "practice/oop/srp/ReportGenerator.java",
    ],
    lang: "java",
    description: "All SRP classes compile together",
  },
};

const oop02: TaskVerifier = {
  taskId: "oop-02",
  patterns: [
    {
      file: "practice/oop/ocp/DataSource.java",
      requiredPatterns: ["interface DataSource", "fetch"],
      description: "DataSource interface exists with fetch method",
    },
    {
      file: "practice/oop/ocp/Formatter.java",
      requiredPatterns: ["interface Formatter", "format"],
      description: "Formatter interface exists with format method",
    },
    {
      file: "practice/oop/ocp/Exporter.java",
      requiredPatterns: ["interface Exporter", "export"],
      description: "Exporter interface exists with export method",
    },
    {
      file: "practice/oop/ocp/ReportGenerator.java",
      requiredPatterns: ["DataSource", "Formatter", "Exporter"],
      forbiddenPatterns: ["new CsvFormatter", "new FileExporter"],
      description: "ReportGenerator depends on interfaces only",
    },
    {
      file: "practice/oop/ocp/JsonFormatter.java",
      requiredPatterns: ["implements Formatter", "format"],
      description: "JsonFormatter implements Formatter interface",
    },
  ],
  compile: {
    files: [
      "practice/oop/ocp/DataSource.java",
      "practice/oop/ocp/Formatter.java",
      "practice/oop/ocp/Exporter.java",
      "practice/oop/ocp/ReportGenerator.java",
      "practice/oop/ocp/JsonFormatter.java",
    ],
    lang: "java",
    description: "All OCP classes compile together",
  },
};

const oop03: TaskVerifier = {
  taskId: "oop-03",
  patterns: [
    {
      file: "practice/oop/factory/Sensor.java",
      requiredPatterns: ["interface Sensor", "double read()", "void calibrate()"],
      description: "Sensor interface with read() and calibrate()",
    },
    {
      file: "practice/oop/factory/TemperatureSensor.java",
      requiredPatterns: ["implements Sensor", "read()"],
      forbiddenPatterns: ["return 0;"],
      description: "TemperatureSensor implements Sensor with real read() logic",
    },
    {
      file: "practice/oop/factory/PressureSensor.java",
      requiredPatterns: ["implements Sensor", "read()"],
      forbiddenPatterns: ["return 0;"],
      description: "PressureSensor implements Sensor with real read() logic",
    },
    {
      file: "practice/oop/factory/RadiationSensor.java",
      requiredPatterns: ["implements Sensor", "read()"],
      forbiddenPatterns: ["return 0;"],
      description: "RadiationSensor implements Sensor with real read() logic",
    },
    {
      file: "practice/oop/factory/SensorFactory.java",
      requiredPatterns: ["create(", "registry", "register"],
      description: "SensorFactory uses registry-based creation",
    },
  ],
  compile: {
    files: [
      "practice/oop/factory/Sensor.java",
      "practice/oop/factory/TemperatureSensor.java",
      "practice/oop/factory/PressureSensor.java",
      "practice/oop/factory/RadiationSensor.java",
      "practice/oop/factory/SensorFactory.java",
    ],
    lang: "java",
    description: "All Factory classes compile together",
  },
};

const oop04: TaskVerifier = {
  taskId: "oop-04",
  patterns: [
    {
      file: "practice/oop/observer/AlarmSystem.java",
      requiredPatterns: ["subscribe(", "unsubscribe(", "checkReading(", "AlarmObserver"],
      description: "AlarmSystem has subscribe/unsubscribe/checkReading methods",
    },
    {
      file: "practice/oop/observer/LogObserver.java",
      requiredPatterns: ["implements AlarmObserver", "onAlarm("],
      forbiddenPatterns: ["// TODO"],
      description: "LogObserver implements onAlarm with real logic",
    },
    {
      file: "practice/oop/observer/EmailObserver.java",
      requiredPatterns: ["implements AlarmObserver", "onAlarm("],
      forbiddenPatterns: ["// TODO"],
      description: "EmailObserver implements onAlarm with real logic",
    },
    {
      file: "practice/oop/observer/ShutdownObserver.java",
      requiredPatterns: ["implements AlarmObserver", "onAlarm(", "EMERGENCY"],
      forbiddenPatterns: ["// TODO"],
      description: "ShutdownObserver triggers on EMERGENCY severity",
    },
  ],
  compile: {
    files: [
      "practice/oop/observer/AlarmEvent.java",
      "practice/oop/observer/AlarmObserver.java",
      "practice/oop/observer/AlarmSystem.java",
      "practice/oop/observer/LogObserver.java",
      "practice/oop/observer/EmailObserver.java",
      "practice/oop/observer/ShutdownObserver.java",
    ],
    lang: "java",
    description: "All Observer classes compile together",
  },
};

const oop05: TaskVerifier = {
  taskId: "oop-05",
  patterns: [
    {
      file: "practice/oop/strategy/DataProcessor.java",
      requiredPatterns: ["strategy.process(", "setStrategy("],
      forbiddenPatterns: ["return readings; // placeholder"],
      description: "DataProcessor delegates to strategy",
    },
    {
      file: "practice/oop/strategy/MovingAverageStrategy.java",
      requiredPatterns: ["implements ProcessingStrategy"],
      forbiddenPatterns: ["return readings; /* TODO */"],
      description: "MovingAverageStrategy has real implementation",
    },
    {
      file: "practice/oop/strategy/KalmanFilterStrategy.java",
      requiredPatterns: ["implements ProcessingStrategy"],
      forbiddenPatterns: ["return readings; /* TODO */"],
      description: "KalmanFilterStrategy has real implementation",
    },
    {
      file: "practice/oop/strategy/ThresholdClipStrategy.java",
      requiredPatterns: ["implements ProcessingStrategy", "min", "max"],
      forbiddenPatterns: ["return readings; /* TODO */"],
      description: "ThresholdClipStrategy has real implementation",
    },
  ],
  compile: {
    files: [
      "practice/oop/strategy/ProcessingStrategy.java",
      "practice/oop/strategy/MovingAverageStrategy.java",
      "practice/oop/strategy/KalmanFilterStrategy.java",
      "practice/oop/strategy/ThresholdClipStrategy.java",
      "practice/oop/strategy/DataProcessor.java",
    ],
    lang: "java",
    description: "All Strategy classes compile together",
  },
};

const oop06: TaskVerifier = {
  taskId: "oop-06",
  patterns: [
    {
      file: "practice/oop/command/SetParameterCommand.java",
      requiredPatterns: ["implements Command", "execute()", "undo()"],
      forbiddenPatterns: ["/* TODO */"],
      description: "SetParameterCommand implements execute and undo",
    },
    {
      file: "practice/oop/command/CommandHistory.java",
      requiredPatterns: ["undoStack", "redoStack", "execute(", "undo(", "redo("],
      forbiddenPatterns: ["/* TODO */"],
      description: "CommandHistory manages undo/redo stacks",
    },
  ],
  compile: {
    files: [
      "practice/oop/command/Command.java",
      "practice/oop/command/PlantConfig.java",
      "practice/oop/command/SetParameterCommand.java",
      "practice/oop/command/CommandHistory.java",
    ],
    lang: "java",
    description: "All Command classes compile together",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// Networking Verifiers
// ═══════════════════════════════════════════════════════════════════════════════

const net01: TaskVerifier = {
  taskId: "net-01",
  patterns: [
    {
      file: "practice/networking/tcp/EchoServer.java",
      requiredPatterns: ["ServerSocket", "accept()", "BufferedReader", "PrintWriter"],
      forbiddenPatterns: ["// TODO"],
      description: "EchoServer uses ServerSocket with I/O streams",
    },
    {
      file: "practice/networking/tcp/EchoClient.java",
      requiredPatterns: ["Socket", "BufferedReader", "PrintWriter"],
      forbiddenPatterns: ["// TODO"],
      description: "EchoClient connects and does I/O",
    },
  ],
  compile: {
    files: [
      "practice/networking/tcp/EchoServer.java",
      "practice/networking/tcp/EchoClient.java",
    ],
    lang: "java",
    description: "Echo server and client compile",
  },
};

const net02: TaskVerifier = {
  taskId: "net-02",
  patterns: [
    {
      file: "practice/networking/tcp/MultiServer.java",
      requiredPatterns: ["ExecutorService", "ServerSocket", "submit("],
      forbiddenPatterns: ["// TODO"],
      description: "MultiServer uses thread pool and accept loop",
    },
    {
      file: "practice/networking/tcp/ClientHandler.java",
      requiredPatterns: ["implements Runnable", "run()", "BufferedReader"],
      forbiddenPatterns: ["// TODO"],
      description: "ClientHandler implements Runnable with I/O logic",
    },
  ],
  compile: {
    files: [
      "practice/networking/tcp/MultiServer.java",
      "practice/networking/tcp/ClientHandler.java",
    ],
    lang: "java",
    description: "Multi-threaded server compiles",
  },
};

const net03: TaskVerifier = {
  taskId: "net-03",
  patterns: [
    {
      file: "practice/networking/udp/SensorSender.java",
      requiredPatterns: ["DatagramSocket", "DatagramPacket", "send("],
      forbiddenPatterns: ["// TODO"],
      description: "SensorSender uses DatagramSocket to send",
    },
    {
      file: "practice/networking/udp/SensorReceiver.java",
      requiredPatterns: ["DatagramSocket", "receive("],
      forbiddenPatterns: ["// TODO"],
      description: "SensorReceiver receives datagrams",
    },
  ],
  compile: {
    files: [
      "practice/networking/udp/SensorSender.java",
      "practice/networking/udp/SensorReceiver.java",
    ],
    lang: "java",
    description: "UDP sender and receiver compile",
  },
};

const net04: TaskVerifier = {
  taskId: "net-04",
  patterns: [
    {
      file: "practice/networking/protocol/ProtocolEncoder.java",
      requiredPatterns: ["ByteBuffer", "put(", "putInt("],
      forbiddenPatterns: ["return new byte[0]"],
      description: "ProtocolEncoder encodes type + length + payload",
    },
    {
      file: "practice/networking/protocol/ProtocolDecoder.java",
      requiredPatterns: ["readByte()", "readInt()", "readFully("],
      forbiddenPatterns: ["return null"],
      description: "ProtocolDecoder reads type + length + payload",
    },
  ],
  compile: {
    files: [
      "practice/networking/protocol/MessageType.java",
      "practice/networking/protocol/ProtocolMessage.java",
      "practice/networking/protocol/ProtocolEncoder.java",
      "practice/networking/protocol/ProtocolDecoder.java",
    ],
    lang: "java",
    description: "All protocol classes compile",
  },
};

const net05: TaskVerifier = {
  taskId: "net-05",
  patterns: [
    {
      file: "practice/networking/filetransfer/FileServer.java",
      requiredPatterns: ["ServerSocket", "FileInputStream", "write("],
      forbiddenPatterns: ["// TODO"],
      description: "FileServer streams file bytes to client",
    },
    {
      file: "practice/networking/filetransfer/FileClient.java",
      requiredPatterns: ["Socket", "FileOutputStream", "read("],
      forbiddenPatterns: ["// TODO"],
      description: "FileClient receives and saves file",
    },
  ],
  compile: {
    files: [
      "practice/networking/filetransfer/FileServer.java",
      "practice/networking/filetransfer/FileClient.java",
    ],
    lang: "java",
    description: "File transfer classes compile",
  },
};

const net06: TaskVerifier = {
  taskId: "net-06",
  patterns: [
    {
      file: "practice/networking/diagnostics/PortScanner.java",
      requiredPatterns: ["ExecutorService", "Socket", "connect("],
      forbiddenPatterns: ["// TODO"],
      description: "PortScanner uses threaded connection attempts",
    },
    {
      file: "practice/networking/diagnostics/PingTool.java",
      requiredPatterns: ["isReachable(", "InetAddress"],
      forbiddenPatterns: ["// TODO"],
      description: "PingTool uses InetAddress.isReachable()",
    },
  ],
  compile: {
    files: [
      "practice/networking/diagnostics/PortScanner.java",
      "practice/networking/diagnostics/PingTool.java",
    ],
    lang: "java",
    description: "Diagnostic tools compile",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// Security Verifiers
// ═══════════════════════════════════════════════════════════════════════════════

const sec01: TaskVerifier = {
  taskId: "sec-01",
  patterns: [
    {
      file: "practice/security/validation/InputValidator.java",
      requiredPatterns: ["throw", "ValidationException"],
      forbiddenPatterns: ["return value; // placeholder", "return input; // placeholder"],
      description: "InputValidator throws on invalid input",
    },
    {
      file: "practice/security/validation/InputValidator.java",
      requiredPatterns: ["validateRange(", "validateString(", "validateFilePath("],
      description: "All three validators implemented",
    },
    {
      file: "practice/security/validation/InputValidator.java",
      requiredPatterns: [".."],
      forbiddenPatterns: [],
      description: "Path traversal check present (checks for ..)",
    },
  ],
  compile: {
    files: [
      "practice/security/validation/ValidationException.java",
      "practice/security/validation/InputValidator.java",
    ],
    lang: "java",
    description: "Validation classes compile",
  },
};

const sec02: TaskVerifier = {
  taskId: "sec-02",
  patterns: [
    {
      file: "practice/security/sql/SensorDataDAO.java",
      requiredPatterns: ["PreparedStatement", "?"],
      forbiddenPatterns: ["Statement stmt", "\" + ", "' + "],
      description: "DAO uses PreparedStatement with placeholders, no string concatenation",
    },
  ],
  compile: {
    files: [
      "practice/security/sql/DatabaseSetup.java",
      "practice/security/sql/SensorDataDAO.java",
    ],
    lang: "java",
    description: "DAO classes compile",
  },
};

const sec03: TaskVerifier = {
  taskId: "sec-03",
  patterns: [
    {
      file: "practice/security/crypto/EncryptionService.java",
      requiredPatterns: [
        "AES/GCM/NoPadding",
        "PBKDF2",
        "SecureRandom",
        "GCMParameterSpec",
      ],
      forbiddenPatterns: ["return \"\""],
      description: "Uses AES-GCM with PBKDF2 key derivation and secure randomness",
    },
  ],
  compile: {
    files: ["practice/security/crypto/EncryptionService.java"],
    lang: "java",
    description: "EncryptionService compiles",
  },
};

const sec04: TaskVerifier = {
  taskId: "sec-04",
  patterns: [
    {
      file: "practice/security/auth/AuthService.java",
      requiredPatterns: ["PBKDF2", "SecureRandom", "salt"],
      forbiddenPatterns: ["return \"\"", "return false"],
      description: "Uses PBKDF2 with random salt, no empty stubs",
    },
  ],
  compile: {
    files: ["practice/security/auth/AuthService.java"],
    lang: "java",
    description: "AuthService compiles",
  },
};

const sec05: TaskVerifier = {
  taskId: "sec-05",
  patterns: [
    {
      file: "practice/security/config/SensitiveString.java",
      requiredPatterns: ["toString()", "****"],
      forbiddenPatterns: ["return value; // BUG"],
      description: "SensitiveString.toString() returns masked value",
    },
    {
      file: "practice/security/config/SecureConfig.java",
      requiredPatterns: ["System.getenv", "SensitiveString"],
      forbiddenPatterns: ["return \"\""],
      description: "SecureConfig loads from environment variables",
    },
  ],
  compile: {
    files: [
      "practice/security/config/SensitiveString.java",
      "practice/security/config/SecureConfig.java",
    ],
    lang: "java",
    description: "Config classes compile",
  },
};

const sec06: TaskVerifier = {
  taskId: "sec-06",
  patterns: [
    {
      file: "practice/security/audit/FixedApp.java",
      requiredPatterns: ["PreparedStatement", "SecureRandom"],
      forbiddenPatterns: [
        "MD5",
        "sk-abc123",
        "Sup3rS3cret",
        "System.out.println(\"Login attempt",
        "ObjectInputStream",
        "\" + userInput + \"",
      ],
      description: "FixedApp removes all 8 vulnerabilities",
    },
    {
      file: "practice/security/audit/SecurityAuditReport.md",
      requiredPatterns: ["CWE-", "SQL", "hardcoded"],
      forbiddenPatterns: ["Line ??"],
      description: "SecurityAuditReport documents all findings with CWE references",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Testing Verifiers
// ═══════════════════════════════════════════════════════════════════════════════

const tst01: TaskVerifier = {
  taskId: "tst-01",
  patterns: [
    {
      file: "practice/testing/junit/InputValidatorTest.java",
      requiredPatterns: ["@Test", "assertThrows(", "assertEquals("],
      forbiddenPatterns: ["// TODO"],
      description: "Tests use @Test, assertThrows, assertEquals — no TODOs remain",
    },
  ],
};

const tst02: TaskVerifier = {
  taskId: "tst-02",
  patterns: [
    {
      file: "practice/testing/mockito/AlarmSystemTest.java",
      requiredPatterns: ["mock(", "verify(", "ArgumentCaptor"],
      forbiddenPatterns: ["// TODO"],
      description: "Tests use Mockito mock(), verify(), and ArgumentCaptor",
    },
  ],
};

const tst03: TaskVerifier = {
  taskId: "tst-03",
  patterns: [
    {
      file: "practice/testing/tdd/RangeCheckerTest.java",
      requiredPatterns: ["@Test", "assertEquals(", "RangeResult."],
      forbiddenPatterns: ["// TODO"],
      description: "Tests exercise IN_RANGE, WARNING, OUT_OF_RANGE",
    },
    {
      file: "practice/testing/tdd/RangeChecker.java",
      requiredPatterns: ["addRange(", "check(", "RangeResult"],
      forbiddenPatterns: ["// TODO: implement using TDD"],
      description: "RangeChecker is implemented (not a stub)",
    },
  ],
  compile: {
    files: [
      "practice/testing/tdd/RangeResult.java",
      "practice/testing/tdd/RangeChecker.java",
    ],
    lang: "java",
    description: "RangeChecker + RangeResult compile",
  },
};

const tst04: TaskVerifier = {
  taskId: "tst-04",
  patterns: [
    {
      file: "practice/testing/integration/SensorDataDAOIntegrationTest.java",
      requiredPatterns: ["@BeforeAll", "@Test", "Connection", "SensorDataDAO"],
      forbiddenPatterns: ["// TODO"],
      description: "Integration tests set up H2 DB and run CRUD tests",
    },
  ],
};

const tst05: TaskVerifier = {
  taskId: "tst-05",
  patterns: [
    {
      file: "practice/testing/coverage/EncryptionServiceTest.java",
      requiredPatterns: ["@Test", "encrypt(", "decrypt(", "assertThrows("],
      forbiddenPatterns: ["// TODO"],
      description: "Coverage tests exercise encrypt, decrypt, and error paths",
    },
  ],
};

const tst06: TaskVerifier = {
  taskId: "tst-06",
  patterns: [
    {
      file: "practice/testing/docs/TestProcedure_AlarmSystem.md",
      requiredPatterns: ["TP-001", "TP-008", "Steps:"],
      forbiddenPatterns: ["Line ??", "???\n"],
      description: "Test procedure has at least 8 detailed test cases",
    },
    {
      file: "practice/testing/docs/TraceabilityMatrix.md",
      requiredPatterns: ["REQ-001", "TP-"],
      description: "Traceability matrix maps requirements to test cases",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Simulation Verifiers
// ═══════════════════════════════════════════════════════════════════════════════

const sim01: TaskVerifier = {
  taskId: "sim-01",
  patterns: [
    {
      file: "practice/simulation/fundamentals/sensor_data.m",
      requiredPatterns: ["randn(", "sin("],
      forbiddenPatterns: ["% TODO:"],
      description: "sensor_data.m generates noisy sinusoidal data",
    },
    {
      file: "practice/simulation/fundamentals/plot_sensors.m",
      requiredPatterns: ["subplot(", "plot(", "xlabel("],
      forbiddenPatterns: ["% TODO:"],
      description: "plot_sensors.m creates multi-panel plot",
    },
    {
      file: "practice/simulation/fundamentals/unit_convert.m",
      forbiddenPatterns: ["F = C; % placeholder", "bar_val = psi; % placeholder"],
      description: "Unit conversion functions have real formulas",
    },
  ],
  compile: {
    files: ["practice/simulation/fundamentals/sensor_data.m"],
    lang: "octave",
    description: "sensor_data.m runs without error in Octave",
  },
};

const sim02: TaskVerifier = {
  taskId: "sim-02",
  patterns: [
    {
      file: "practice/simulation/signals/moving_avg.m",
      requiredPatterns: ["mean(", "conv("],
      forbiddenPatterns: ["% TODO:"],
      description: "Moving average filter implemented",
    },
    {
      file: "practice/simulation/signals/butterworth_filter.m",
      requiredPatterns: ["butter(", "filter("],
      forbiddenPatterns: ["% TODO:"],
      description: "Butterworth filter implemented",
    },
  ],
  compile: {
    files: ["practice/simulation/signals/moving_avg.m"],
    lang: "octave",
    description: "moving_avg.m runs without error",
  },
};

const sim03: TaskVerifier = {
  taskId: "sim-03",
  patterns: [
    {
      file: "practice/simulation/controls/first_order.m",
      requiredPatterns: ["tf(", "step("],
      forbiddenPatterns: ["% TODO:"],
      description: "First-order transfer function created and stepped",
    },
    {
      file: "practice/simulation/controls/second_order.m",
      requiredPatterns: ["tf(", "step("],
      forbiddenPatterns: ["% TODO:"],
      description: "Second-order system created and stepped",
    },
    {
      file: "practice/simulation/controls/bode_analysis.m",
      requiredPatterns: ["bode("],
      forbiddenPatterns: ["% TODO:"],
      description: "Bode plot generated",
    },
  ],
  compile: {
    files: ["practice/simulation/controls/first_order.m"],
    lang: "octave",
    description: "first_order.m runs without error (requires control pkg)",
  },
};

const sim04: TaskVerifier = {
  taskId: "sim-04",
  patterns: [
    {
      file: "practice/simulation/controls/pid_design.m",
      requiredPatterns: ["pid(", "feedback(", "stepinfo("],
      forbiddenPatterns: ["% TODO:"],
      description: "PID controller designed with performance metrics",
    },
    {
      file: "practice/simulation/controls/gain_comparison.m",
      requiredPatterns: ["pid(", "feedback(", "legend("],
      forbiddenPatterns: ["% TODO:"],
      description: "P vs PI vs PID comparison plotted",
    },
  ],
};

const sim05: TaskVerifier = {
  taskId: "sim-05",
  patterns: [
    {
      file: "practice/simulation/simulink/feedback_sim.m",
      requiredPatterns: ["for i", "e_int", "Kp", "Ki", "Kd"],
      forbiddenPatterns: [
        "% TODO: Error",
        "% TODO: PID controller",
        "% TODO: Plant",
      ],
      description: "Feedback loop simulation implemented with PID",
    },
  ],
  compile: {
    files: ["practice/simulation/simulink/feedback_sim.m"],
    lang: "octave",
    description: "feedback_sim.m runs without error",
  },
};

const sim06: TaskVerifier = {
  taskId: "sim-06",
  patterns: [
    {
      file: "practice/simulation/plant/reactor_thermal.m",
      requiredPatterns: ["dT_fuel", "dT_cool", "C_fuel", "for"],
      forbiddenPatterns: ["% TODO: Simulation"],
      description: "Reactor thermal model has coupled ODE loop",
    },
    {
      file: "practice/simulation/plant/safety_trip.m",
      requiredPatterns: ["SCRAM", "1200", "exp("],
      forbiddenPatterns: ["% TODO:"],
      description: "Safety trip triggers SCRAM with exponential decay",
    },
    {
      file: "practice/simulation/plant/loss_of_flow.m",
      requiredPatterns: ["flow", "pump", "SCRAM"],
      forbiddenPatterns: ["% TODO:"],
      description: "Loss-of-flow scenario with safety trip",
    },
  ],
  compile: {
    files: ["practice/simulation/plant/reactor_thermal.m"],
    lang: "octave",
    description: "reactor_thermal.m runs without error",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// Registry
// ═══════════════════════════════════════════════════════════════════════════════

export const verifierRegistry: Record<string, TaskVerifier> = {
  "oop-01": oop01, "oop-02": oop02, "oop-03": oop03,
  "oop-04": oop04, "oop-05": oop05, "oop-06": oop06,
  "net-01": net01, "net-02": net02, "net-03": net03,
  "net-04": net04, "net-05": net05, "net-06": net06,
  "sec-01": sec01, "sec-02": sec02, "sec-03": sec03,
  "sec-04": sec04, "sec-05": sec05, "sec-06": sec06,
  "tst-01": tst01, "tst-02": tst02, "tst-03": tst03,
  "tst-04": tst04, "tst-05": tst05, "tst-06": tst06,
  "sim-01": sim01, "sim-02": sim02, "sim-03": sim03,
  "sim-04": sim04, "sim-05": sim05, "sim-06": sim06,
};
