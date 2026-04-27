export type TaskCategory = "oop" | "networking" | "security" | "testing";

export type TaskStatus = "locked" | "available" | "complete";

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
  gitTag?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// OOP & Design Patterns
// ═══════════════════════════════════════════════════════════════════════════════

export const oopTasks: Task[] = [
  {
    id: "oop-01",
    title: "SOLID — Single Responsibility",
    phase: 1,
    difficulty: "beginner",
    category: "oop",
    objectives: [
      "Refactor a monolithic ReportGenerator class into separate classes each with one responsibility",
      "Create DataFetcher, ReportFormatter, and ReportExporter classes",
      "Each class should have exactly one reason to change",
    ],
    acceptanceCriteria: [
      "ReportGenerator delegates to DataFetcher, ReportFormatter, and ReportExporter",
      "Each class has a single public method that performs its core responsibility",
      "No class exceeds 50 lines of logic",
    ],
    filesInvolved: [
      "practice/oop/srp/ReportGenerator.java",
      "practice/oop/srp/DataFetcher.java",
      "practice/oop/srp/ReportFormatter.java",
      "practice/oop/srp/ReportExporter.java",
    ],
    hints: [
      "Start by identifying every VERB in the original class — fetch, format, export. Each verb becomes its own class.",
      "DataFetcher: Takes a data source configuration and returns raw data (List<Map<String, Object>>). It should know nothing about formatting or exporting.",
      "ReportFormatter: Takes raw data and produces a formatted String (HTML, CSV, plain text). It should not know where data came from or where the report goes.",
      "ReportExporter: Takes a formatted string and writes it somewhere (file, email, console). It should not know about data or formatting.",
      "ReportGenerator becomes a coordinator — it calls DataFetcher, passes the result to ReportFormatter, and hands that to ReportExporter. This is also called the Facade pattern.",
      "Test: If the export format changes, only ReportExporter changes. If the data source changes, only DataFetcher changes. That's SRP working correctly.",
    ],
  },
  {
    id: "oop-02",
    title: "SOLID — Open/Closed & Dependency Inversion",
    phase: 1,
    difficulty: "beginner",
    category: "oop",
    objectives: [
      "Define interfaces: DataSource, Formatter, Exporter",
      "Make ReportGenerator depend on abstractions, not concrete classes",
      "Add a new JsonFormatter without modifying any existing class",
    ],
    acceptanceCriteria: [
      "Three interfaces exist with clear contracts",
      "ReportGenerator constructor accepts interfaces, not concrete types",
      "Adding JsonFormatter requires zero changes to ReportGenerator",
    ],
    filesInvolved: [
      "practice/oop/ocp/DataSource.java",
      "practice/oop/ocp/Formatter.java",
      "practice/oop/ocp/Exporter.java",
      "practice/oop/ocp/ReportGenerator.java",
      "practice/oop/ocp/JsonFormatter.java",
    ],
    hints: [
      "interface Formatter { String format(List<Map<String, Object>> data); } — this is the contract. Any class implementing it can be swapped in.",
      "ReportGenerator's constructor: public ReportGenerator(DataSource source, Formatter formatter, Exporter exporter). It never says 'new CsvFormatter()' internally.",
      "To add JSON support, create JsonFormatter implements Formatter. ReportGenerator never changes — that's the Open/Closed Principle (open for extension, closed for modification).",
      "Dependency Inversion: High-level modules (ReportGenerator) should not depend on low-level modules (CsvFormatter). Both depend on abstractions (Formatter interface).",
      "This is how nuclear/safety-critical software achieves replaceability — swap implementations without touching the orchestrator.",
    ],
  },
  {
    id: "oop-03",
    title: "Factory Pattern",
    phase: 1,
    difficulty: "intermediate",
    category: "oop",
    objectives: [
      "Create a SensorFactory that produces different Sensor types based on a string identifier",
      "Implement TemperatureSensor, PressureSensor, and RadiationSensor",
      "All sensors implement a common Sensor interface with read() and calibrate() methods",
    ],
    acceptanceCriteria: [
      "SensorFactory.create('temperature') returns a TemperatureSensor",
      "SensorFactory.create('radiation') returns a RadiationSensor",
      "Adding a new sensor type requires only a new class and one factory registration",
      "Client code never uses 'new TemperatureSensor()' directly",
    ],
    filesInvolved: [
      "practice/oop/factory/Sensor.java",
      "practice/oop/factory/TemperatureSensor.java",
      "practice/oop/factory/PressureSensor.java",
      "practice/oop/factory/RadiationSensor.java",
      "practice/oop/factory/SensorFactory.java",
    ],
    hints: [
      "interface Sensor { double read(); void calibrate(); String getType(); } — all sensors share this contract.",
      "Simple factory: use a switch/map inside SensorFactory.create(String type). Return new TemperatureSensor() for 'temperature', etc.",
      "Better: use a Map<String, Supplier<Sensor>> registry. Register sensors in a static block. SensorFactory.register('temperature', TemperatureSensor::new).",
      "This pattern is common in industrial/nuclear software where sensor types are configured at deployment, not compile time.",
      "Each sensor's read() should return a simulated value (use Random with realistic ranges: temp 20-500C, pressure 0-200 bar, radiation 0-100 mSv).",
    ],
  },
  {
    id: "oop-04",
    title: "Observer Pattern — Event Notification",
    phase: 2,
    difficulty: "intermediate",
    category: "oop",
    objectives: [
      "Create an AlarmSystem that publishes events when sensor readings exceed thresholds",
      "Implement Observer interface with update(AlarmEvent) method",
      "Create LogObserver, EmailObserver, and ShutdownObserver",
      "Demonstrate loose coupling — adding observers requires no changes to AlarmSystem",
    ],
    acceptanceCriteria: [
      "AlarmSystem accepts subscriber registration and fires events",
      "Each observer receives AlarmEvent with sensor type, value, threshold, and severity",
      "Observers can be added/removed at runtime",
      "AlarmSystem has no direct reference to any concrete observer class",
    ],
    filesInvolved: [
      "practice/oop/observer/AlarmEvent.java",
      "practice/oop/observer/AlarmObserver.java",
      "practice/oop/observer/AlarmSystem.java",
      "practice/oop/observer/LogObserver.java",
      "practice/oop/observer/EmailObserver.java",
      "practice/oop/observer/ShutdownObserver.java",
    ],
    hints: [
      "AlarmEvent: record AlarmEvent(String sensorType, double value, double threshold, Severity severity). Use an enum for Severity: WARNING, CRITICAL, EMERGENCY.",
      "AlarmObserver interface: void onAlarm(AlarmEvent event). Simple and focused.",
      "AlarmSystem holds a List<AlarmObserver>. Methods: subscribe(observer), unsubscribe(observer), checkReading(sensor).",
      "checkReading compares the sensor value to the threshold. If exceeded, create an AlarmEvent and notify all subscribers.",
      "LogObserver prints to console. EmailObserver simulates sending an email. ShutdownObserver triggers emergency shutdown when severity is EMERGENCY.",
      "This is how real plant monitoring systems work — the alarm system doesn't know or care what happens when an alarm fires. It just publishes events.",
    ],
  },
  {
    id: "oop-05",
    title: "Strategy Pattern — Swappable Algorithms",
    phase: 2,
    difficulty: "intermediate",
    category: "oop",
    objectives: [
      "Create a DataProcessor that applies different processing strategies at runtime",
      "Implement MovingAverageStrategy, KalmanFilterStrategy, and ThresholdClipStrategy",
      "Allow strategy switching without restarting the processor",
    ],
    acceptanceCriteria: [
      "ProcessingStrategy interface defines process(double[] readings) -> double[]",
      "DataProcessor accepts any strategy and can switch strategies at runtime via setStrategy()",
      "Each strategy transforms input data differently",
      "A main() demo shows switching from MovingAverage to KalmanFilter mid-stream",
    ],
    filesInvolved: [
      "practice/oop/strategy/ProcessingStrategy.java",
      "practice/oop/strategy/MovingAverageStrategy.java",
      "practice/oop/strategy/KalmanFilterStrategy.java",
      "practice/oop/strategy/ThresholdClipStrategy.java",
      "practice/oop/strategy/DataProcessor.java",
    ],
    hints: [
      "interface ProcessingStrategy { double[] process(double[] readings); } — one method, clear contract.",
      "MovingAverageStrategy: Average each value with its N neighbors. Constructor takes window size. Smooths noisy data.",
      "KalmanFilterStrategy: Simplified Kalman — maintain an estimate, blend each new reading with the estimate using a gain factor (0.0-1.0). Good for tracking.",
      "ThresholdClipStrategy: Clamp all values to [min, max] range. Any reading outside the range gets clipped. Used for safety bounds.",
      "DataProcessor: holds a ProcessingStrategy field. setStrategy(strategy) swaps it. process(readings) delegates to the current strategy.",
      "This pattern is essential in control systems — you might switch from a conservative to an aggressive filter based on operating mode.",
    ],
  },
  {
    id: "oop-06",
    title: "Command Pattern — Undoable Operations",
    phase: 2,
    difficulty: "advanced",
    category: "oop",
    objectives: [
      "Implement a command system for a plant configuration editor",
      "Each command (SetParameter, EnableSystem, AdjustThreshold) supports execute() and undo()",
      "Build a CommandHistory that supports undo/redo stacks",
    ],
    acceptanceCriteria: [
      "Command interface has execute() and undo() methods",
      "Each command stores the previous state for rollback",
      "CommandHistory tracks executed commands and supports multi-level undo",
      "Demo shows: execute 3 commands, undo 2, redo 1",
    ],
    filesInvolved: [
      "practice/oop/command/Command.java",
      "practice/oop/command/SetParameterCommand.java",
      "practice/oop/command/EnableSystemCommand.java",
      "practice/oop/command/AdjustThresholdCommand.java",
      "practice/oop/command/CommandHistory.java",
      "practice/oop/command/PlantConfig.java",
    ],
    hints: [
      "interface Command { void execute(); void undo(); String describe(); }",
      "SetParameterCommand stores: PlantConfig target, String paramName, Object newValue, Object previousValue. execute() sets the new value, undo() restores previousValue.",
      "CommandHistory: two stacks — Stack<Command> undoStack and Stack<Command> redoStack. execute(cmd) runs it and pushes to undoStack, clears redoStack. undo() pops from undoStack, calls undo(), pushes to redoStack.",
      "PlantConfig: a Map<String, Object> of configuration parameters. Represents the system being configured.",
      "This pattern is critical in safety systems — every configuration change must be traceable and reversible. Audit logging comes free because each command has describe().",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Network Programming (TCP/UDP Sockets)
// ═══════════════════════════════════════════════════════════════════════════════

export const networkingTasks: Task[] = [
  {
    id: "net-01",
    title: "TCP Echo Server & Client",
    phase: 1,
    difficulty: "beginner",
    category: "networking",
    objectives: [
      "Create a TCP server that listens on port 9000 and echoes back any received message",
      "Create a TCP client that sends a message and prints the echo response",
      "Handle connection lifecycle: connect, send, receive, close",
    ],
    acceptanceCriteria: [
      "Server binds to port 9000 using ServerSocket",
      "Client connects with Socket, sends a string, receives the echo",
      "Both sides properly close streams and sockets in finally blocks or try-with-resources",
      "Server prints client address on connect and disconnect",
    ],
    filesInvolved: [
      "practice/networking/tcp/EchoServer.java",
      "practice/networking/tcp/EchoClient.java",
    ],
    hints: [
      "Server: ServerSocket serverSocket = new ServerSocket(9000); Socket client = serverSocket.accept(); — accept() blocks until a client connects.",
      "Streams: BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream())); PrintWriter out = new PrintWriter(client.getOutputStream(), true);",
      "Echo loop: String line; while ((line = in.readLine()) != null) { out.println(line); } — readLine() returns null when the client disconnects.",
      "Client: Socket socket = new Socket('localhost', 9000); — then same stream pattern. Send with out.println(), receive with in.readLine().",
      "ALWAYS use try-with-resources: try (ServerSocket ss = new ServerSocket(9000)) { ... } — this ensures sockets close even on exceptions.",
      "Test: Run server in one terminal, client in another. Type messages in the client, see them echoed back.",
    ],
  },
  {
    id: "net-02",
    title: "Multi-Threaded TCP Server",
    phase: 1,
    difficulty: "intermediate",
    category: "networking",
    objectives: [
      "Extend the echo server to handle multiple simultaneous clients",
      "Each client connection runs in its own thread",
      "Add a shared message counter (thread-safe) that tracks total messages processed",
    ],
    acceptanceCriteria: [
      "Server uses a thread pool (ExecutorService) to handle clients",
      "Multiple clients can connect and communicate simultaneously",
      "AtomicInteger or synchronized counter tracks total messages across all clients",
      "Server logs [clientId] prefix for each message",
    ],
    filesInvolved: [
      "practice/networking/tcp/MultiServer.java",
      "practice/networking/tcp/ClientHandler.java",
      "practice/networking/tcp/MultiClient.java",
    ],
    hints: [
      "ExecutorService pool = Executors.newFixedThreadPool(10); — limits concurrent clients to 10. In production, use a cached thread pool or virtual threads.",
      "Accept loop: while (true) { Socket client = serverSocket.accept(); pool.submit(new ClientHandler(client, clientId++)); }",
      "ClientHandler implements Runnable. Its run() method does the read/echo loop. When the client disconnects, the thread ends.",
      "Shared counter: private static final AtomicInteger messageCount = new AtomicInteger(0); — AtomicInteger is lock-free and thread-safe.",
      "Why not synchronized? AtomicInteger uses CAS (compare-and-swap) which is faster than synchronized for simple counters. Use synchronized for compound operations.",
      "Test: Open 3 terminal windows as clients. Each sends messages. The server logs show interleaved handling from different threads.",
    ],
  },
  {
    id: "net-03",
    title: "UDP Datagram Communication",
    phase: 1,
    difficulty: "intermediate",
    category: "networking",
    objectives: [
      "Create a UDP sender that broadcasts sensor readings as datagrams",
      "Create a UDP receiver that listens for and displays sensor data",
      "Demonstrate connectionless, fire-and-forget semantics",
    ],
    acceptanceCriteria: [
      "Sender uses DatagramSocket and DatagramPacket to send data to port 9001",
      "Receiver binds to port 9001 and prints received packets",
      "Data format: 'SENSOR_TYPE:VALUE:TIMESTAMP' encoded as UTF-8 bytes",
      "Sender does NOT wait for acknowledgment (fire-and-forget)",
    ],
    filesInvolved: [
      "practice/networking/udp/SensorSender.java",
      "practice/networking/udp/SensorReceiver.java",
    ],
    hints: [
      "UDP is connectionless — no connect/accept handshake. You just send packets to an address:port. Perfect for sensor telemetry where occasional packet loss is acceptable.",
      "Sender: DatagramSocket socket = new DatagramSocket(); byte[] data = message.getBytes(); DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getByName('localhost'), 9001); socket.send(packet);",
      "Receiver: DatagramSocket socket = new DatagramSocket(9001); byte[] buffer = new byte[1024]; DatagramPacket packet = new DatagramPacket(buffer, buffer.length); socket.receive(packet); — receive() blocks.",
      "Parse: String received = new String(packet.getData(), 0, packet.getLength()); String[] parts = received.split(':');",
      "TCP vs UDP: TCP guarantees delivery and order (good for commands). UDP is faster with no overhead (good for telemetry/monitoring where latest value matters more than every value).",
      "Simulate: sender sends temp readings every 500ms with Thread.sleep. Receiver prints them as they arrive.",
    ],
  },
  {
    id: "net-04",
    title: "Custom Binary Protocol",
    phase: 2,
    difficulty: "advanced",
    category: "networking",
    objectives: [
      "Design a binary protocol for plant control messages",
      "Implement encode/decode using ByteBuffer for the message format",
      "Send structured messages over TCP with a header (type, length) and payload",
    ],
    acceptanceCriteria: [
      "Message format: [1 byte type][4 bytes length][N bytes payload]",
      "At least 3 message types: COMMAND(0x01), STATUS(0x02), ALARM(0x03)",
      "ProtocolEncoder and ProtocolDecoder handle serialization",
      "Server receives binary messages, decodes them, and sends appropriate responses",
    ],
    filesInvolved: [
      "practice/networking/protocol/MessageType.java",
      "practice/networking/protocol/ProtocolMessage.java",
      "practice/networking/protocol/ProtocolEncoder.java",
      "practice/networking/protocol/ProtocolDecoder.java",
      "practice/networking/protocol/ProtocolServer.java",
      "practice/networking/protocol/ProtocolClient.java",
    ],
    hints: [
      "Why binary? Text protocols (HTTP, SMTP) are human-readable but wasteful. Industrial protocols use binary for speed and compactness. A 4-byte int is 4 bytes in binary but up to 11 bytes as text.",
      "ByteBuffer: ByteBuffer buf = ByteBuffer.allocate(1 + 4 + payload.length); buf.put(type); buf.putInt(payload.length); buf.put(payload); return buf.array();",
      "Decoding: Read 1 byte for type, 4 bytes for length (buf.getInt()), then read exactly 'length' bytes for payload. This is a TLV (Type-Length-Value) protocol.",
      "Message types: COMMAND payload = 'SHUTDOWN' or 'START_PUMP_3'. STATUS payload = sensor readings as packed bytes. ALARM payload = severity + sensor + value.",
      "Handle partial reads: TCP is a stream protocol — one send() might arrive as multiple read()s. Read the header first, then read exactly 'length' bytes for the payload. Use DataInputStream.readFully().",
      "This is exactly how protocols like Modbus (used in nuclear plants) work — fixed headers with typed, length-prefixed payloads.",
    ],
  },
  {
    id: "net-05",
    title: "TCP File Transfer",
    phase: 2,
    difficulty: "intermediate",
    category: "networking",
    objectives: [
      "Create a file server that serves files from a directory over TCP",
      "Client requests a file by name, server streams the file content back",
      "Handle file-not-found and large files (buffered streaming)",
    ],
    acceptanceCriteria: [
      "Client sends filename, server responds with file size then file bytes",
      "Transfer uses buffered reads/writes (8KB buffer), not loading entire file to memory",
      "Client saves received file and verifies size matches",
      "Server returns an error code (0xFF) if file doesn't exist",
    ],
    filesInvolved: [
      "practice/networking/filetransfer/FileServer.java",
      "practice/networking/filetransfer/FileClient.java",
    ],
    hints: [
      "Protocol: Client sends filename as UTF string. Server responds with 8-byte file size (long), then streams file bytes. If file not found, server sends -1 as the size.",
      "Server: DataOutputStream dos = new DataOutputStream(out); dos.writeLong(file.length()); Then loop: read 8192 bytes from FileInputStream, write to socket output stream.",
      "Client: DataInputStream dis = new DataInputStream(in); long size = dis.readLong(); if (size == -1) { error; return; } Then loop: read from socket, write to FileOutputStream.",
      "Buffer loop: byte[] buf = new byte[8192]; int bytesRead; while ((bytesRead = fileIn.read(buf)) != -1) { socketOut.write(buf, 0, bytesRead); }",
      "Always flush and close streams. Use try-with-resources for automatic cleanup.",
      "Test with a large file (>1MB) to verify buffered streaming works — you should see constant low memory usage, not a spike.",
    ],
  },
  {
    id: "net-06",
    title: "Network Diagnostics Tool",
    phase: 2,
    difficulty: "advanced",
    category: "networking",
    objectives: [
      "Build a port scanner that checks if ports 1-1024 are open on localhost",
      "Implement a simple ping-like tool using InetAddress.isReachable()",
      "Measure and display connection latency for each open port",
    ],
    acceptanceCriteria: [
      "PortScanner scans a range of ports with configurable timeout",
      "Uses multithreading to scan ports in parallel (not one at a time)",
      "Reports: port number, service name (if known), latency in ms",
      "PingTool sends periodic reachability checks and reports packet loss percentage",
    ],
    filesInvolved: [
      "practice/networking/diagnostics/PortScanner.java",
      "practice/networking/diagnostics/PingTool.java",
    ],
    hints: [
      "Port scan: try { Socket s = new Socket(); s.connect(new InetSocketAddress(host, port), timeout); s.close(); return true; } catch (IOException) { return false; }",
      "Parallel scanning: ExecutorService pool = Executors.newFixedThreadPool(50); List<Future<ScanResult>> futures = ports.stream().map(p -> pool.submit(() -> scan(host, p))).toList();",
      "Latency: long start = System.nanoTime(); socket.connect(...); long elapsed = (System.nanoTime() - start) / 1_000_000; // ms",
      "Common ports: Map.of(22, 'SSH', 80, 'HTTP', 443, 'HTTPS', 3306, 'MySQL', 5432, 'PostgreSQL', 8080, 'HTTP-ALT')",
      "PingTool: InetAddress addr = InetAddress.getByName(host); boolean reachable = addr.isReachable(timeout); Track successes/failures over N attempts.",
      "This combines socket programming with concurrency — exactly the kind of diagnostic tooling referenced in the Wireshark/troubleshooting requirements.",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Secure Coding Practices
// ═══════════════════════════════════════════════════════════════════════════════

export const securityTasks: Task[] = [
  {
    id: "sec-01",
    title: "Input Validation & Sanitization",
    phase: 1,
    difficulty: "beginner",
    category: "security",
    objectives: [
      "Create an InputValidator utility class with methods for common validation patterns",
      "Validate: numeric ranges, string length, regex patterns, file paths",
      "Reject null, empty, and malformed inputs with descriptive error messages",
    ],
    acceptanceCriteria: [
      "validateRange(value, min, max) throws IllegalArgumentException with details on failure",
      "validateString(input, maxLength) rejects null, empty, and over-length strings",
      "validateFilePath(path) rejects path traversal attempts (../, ~/, absolute paths)",
      "All methods return the validated value on success (fluent pattern)",
    ],
    filesInvolved: [
      "practice/security/validation/InputValidator.java",
      "practice/security/validation/ValidationException.java",
      "practice/security/validation/InputValidatorTest.java",
    ],
    hints: [
      "Defense in depth: Validate at EVERY boundary — user input, file reads, network messages, database results. Never assume upstream code validated.",
      "Path traversal: if (path.contains('..') || path.startsWith('/') || path.startsWith('~')) throw. Then resolve the canonical path and verify it's within the allowed directory.",
      "Numeric ranges: public static double validateRange(double value, double min, double max, String fieldName). Include fieldName in the error: 'Temperature must be between 0 and 500, got: 750'.",
      "Whitelist > blacklist: Instead of rejecting known-bad patterns, only allow known-good patterns. For a sensor ID: if (!id.matches('[A-Z]{3}-[0-9]{4}')) reject.",
      "Fluent pattern: return the validated value so callers can chain: double temp = InputValidator.validateRange(rawTemp, 0, 500, 'temperature');",
      "In nuclear software, every input from an external system must be validated before processing. Unvalidated input is a safety hazard.",
    ],
  },
  {
    id: "sec-02",
    title: "SQL Injection Prevention",
    phase: 1,
    difficulty: "beginner",
    category: "security",
    objectives: [
      "Demonstrate a vulnerable query using string concatenation",
      "Fix it using PreparedStatement with parameterized queries",
      "Create a SensorDataDAO with safe CRUD operations",
    ],
    acceptanceCriteria: [
      "No SQL query uses string concatenation for user-supplied values",
      "All queries use PreparedStatement with ? placeholders",
      "SensorDataDAO has: insert, findById, findByType, updateReading, delete",
      "A test class demonstrates that SQL injection payloads are harmlessly escaped",
    ],
    filesInvolved: [
      "practice/security/sql/SensorDataDAO.java",
      "practice/security/sql/DatabaseSetup.java",
      "practice/security/sql/SqlInjectionDemo.java",
    ],
    hints: [
      "VULNERABLE: stmt.executeQuery(\"SELECT * FROM sensors WHERE type = '\" + userInput + \"'\"); — if userInput is \"'; DROP TABLE sensors; --\" you lose the table.",
      "SAFE: PreparedStatement ps = conn.prepareStatement(\"SELECT * FROM sensors WHERE type = ?\"); ps.setString(1, userInput); — the driver escapes the value. The ' in the payload becomes a literal apostrophe, not SQL syntax.",
      "Use H2 in-memory for testing: Connection conn = DriverManager.getConnection('jdbc:h2:mem:testdb');",
      "DatabaseSetup: Create the sensors table with columns: id (auto_increment), type (varchar), value (double), timestamp (timestamp), location (varchar).",
      "Demo: Create the table, insert some data, then try injection attacks against the parameterized version. Show they return empty results instead of destroying data.",
      "This is the #1 web vulnerability (OWASP A03). In safety-critical systems, SQL injection could alter configuration data or safety parameters.",
    ],
  },
  {
    id: "sec-03",
    title: "Encryption — Data at Rest",
    phase: 1,
    difficulty: "intermediate",
    category: "security",
    objectives: [
      "Encrypt sensitive configuration data using AES-256-GCM",
      "Implement key derivation from a passphrase using PBKDF2",
      "Create EncryptionService with encrypt(plaintext, passphrase) and decrypt(ciphertext, passphrase)",
    ],
    acceptanceCriteria: [
      "Uses AES/GCM/NoPadding (authenticated encryption)",
      "Key derived with PBKDF2WithHmacSHA256, 600_000 iterations, 256-bit key",
      "Random 12-byte IV generated for each encryption (never reused)",
      "Output format: Base64(IV + ciphertext + GCM tag)",
      "Encrypting the same plaintext twice produces different ciphertexts",
    ],
    filesInvolved: [
      "practice/security/crypto/EncryptionService.java",
      "practice/security/crypto/EncryptionDemo.java",
    ],
    hints: [
      "Key derivation: SecretKeyFactory factory = SecretKeyFactory.getInstance('PBKDF2WithHmacSHA256'); KeySpec spec = new PBEKeySpec(passphrase.toCharArray(), salt, 600_000, 256); SecretKey key = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), 'AES');",
      "GCM mode provides both encryption AND authentication (integrity check). If anyone tampers with the ciphertext, decryption fails with AEADBadTagException. This is critical for configuration files.",
      "IV (nonce): byte[] iv = new byte[12]; SecureRandom.getInstanceStrong().nextBytes(iv); GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv);",
      "Encrypt: Cipher cipher = Cipher.getInstance('AES/GCM/NoPadding'); cipher.init(Cipher.ENCRYPT_MODE, key, gcmSpec); byte[] ciphertext = cipher.doFinal(plaintext.getBytes(UTF_8));",
      "Store IV with ciphertext: byte[] combined = new byte[iv.length + ciphertext.length]; System.arraycopy(iv, 0, combined, 0, 12); System.arraycopy(ciphertext, 0, combined, 12, ciphertext.length); return Base64.getEncoder().encodeToString(combined);",
      "Never use ECB mode, never reuse IVs, never use MD5/SHA for key derivation. PBKDF2 with high iteration count resists brute-force.",
    ],
  },
  {
    id: "sec-04",
    title: "Authentication & Password Hashing",
    phase: 2,
    difficulty: "intermediate",
    category: "security",
    objectives: [
      "Implement password hashing using bcrypt (or PBKDF2 with per-user salt)",
      "Create an AuthService with register(username, password) and authenticate(username, password)",
      "Store hashed passwords — never plaintext",
    ],
    acceptanceCriteria: [
      "Passwords are hashed with a unique random salt per user",
      "authenticate() compares hashes in constant time (no timing attacks)",
      "Same password for two users produces different hashes (due to unique salts)",
      "Password strength validation: min 8 chars, mixed case, digit, special char",
    ],
    filesInvolved: [
      "practice/security/auth/AuthService.java",
      "practice/security/auth/PasswordHasher.java",
      "practice/security/auth/UserStore.java",
      "practice/security/auth/AuthDemo.java",
    ],
    hints: [
      "PBKDF2 approach (no external deps): Generate 16-byte random salt per user. Hash with PBKDF2WithHmacSHA256, 600_000 iterations. Store: salt:hash (both Base64-encoded).",
      "Constant-time comparison: MessageDigest.isEqual(expectedHash, computedHash). Do NOT use Arrays.equals() or String.equals() — they short-circuit on first mismatch, leaking timing info.",
      "UserStore: in-memory Map<String, String> mapping username -> 'base64salt:base64hash'. In production this would be a database.",
      "Password validation: regex or manual checks. At minimum: length >= 8, hasUpper, hasLower, hasDigit, hasSpecial. Return a list of failures, not just pass/fail.",
      "Why not SHA-256? SHA is fast by design — attackers can try billions per second. PBKDF2/bcrypt are intentionally slow (600K iterations ≈ 300ms per hash). That's negligible for a user login but catastrophic for brute-force.",
    ],
  },
  {
    id: "sec-05",
    title: "Secure Configuration Management",
    phase: 2,
    difficulty: "intermediate",
    category: "security",
    objectives: [
      "Create a SecureConfig class that loads sensitive values from environment variables",
      "Never log or print sensitive configuration values",
      "Implement config validation on startup (fail fast if required values missing)",
    ],
    acceptanceCriteria: [
      "Database passwords, API keys loaded from env vars or encrypted config file",
      "toString() and log output mask sensitive fields ('db.password=****')",
      "Missing required config throws ConfigurationException at startup with a clear message",
      "A SensitiveString wrapper class prevents accidental logging of secrets",
    ],
    filesInvolved: [
      "practice/security/config/SecureConfig.java",
      "practice/security/config/SensitiveString.java",
      "practice/security/config/ConfigurationException.java",
      "practice/security/config/ConfigDemo.java",
    ],
    hints: [
      "SensitiveString: wraps a String but overrides toString() to return '****'. Provides getValue() for authorized access. This prevents accidental exposure in logs.",
      "SecureConfig: reads from System.getenv() first, falls back to a properties file. Environment variables always take precedence (12-factor app principle).",
      "Fail fast: In the constructor, check all required fields. If DB_PASSWORD is missing, throw new ConfigurationException('Required env var DB_PASSWORD is not set') — don't let the app start in an insecure state.",
      "Masking: Override toString() on SecureConfig to show field names but mask values. log.info('Config loaded: {}', config) should be safe.",
      "In nuclear/critical systems, configuration errors must be caught BEFORE the system enters operational mode. Fail-fast startup is a safety requirement.",
    ],
  },
  {
    id: "sec-06",
    title: "Secure Coding Audit Checklist",
    phase: 2,
    difficulty: "advanced",
    category: "security",
    objectives: [
      "Review and fix a deliberately vulnerable Java application",
      "The app has 8 security flaws — find and fix all of them",
      "Document each vulnerability: what it is, why it's dangerous, how you fixed it",
    ],
    acceptanceCriteria: [
      "All 8 vulnerabilities identified and fixed",
      "Fixes include: SQL injection, path traversal, hardcoded credentials, missing validation, insecure deserialization, weak crypto, sensitive data exposure, missing error handling",
      "Each fix documented with a comment explaining the vulnerability category (OWASP/CWE reference)",
      "A SecurityAuditReport.md file documents findings",
    ],
    filesInvolved: [
      "practice/security/audit/VulnerableApp.java",
      "practice/security/audit/FixedApp.java",
      "practice/security/audit/SecurityAuditReport.md",
    ],
    hints: [
      "Vulnerability 1 — SQL Injection: Look for string concatenation in SQL queries.",
      "Vulnerability 2 — Path Traversal: Look for file reads that don't validate the path.",
      "Vulnerability 3 — Hardcoded Credentials: Look for passwords in source code.",
      "Vulnerability 4 — Missing Input Validation: Look for user input used without checks.",
      "Vulnerability 5 — Weak Crypto: Look for MD5, SHA-1, DES, or ECB mode.",
      "Vulnerability 6 — Sensitive Data Exposure: Look for passwords/keys in log statements.",
      "Vulnerability 7 — Missing Error Handling: Look for empty catch blocks that swallow exceptions.",
      "Vulnerability 8 — Insecure Deserialization: Look for ObjectInputStream on untrusted data.",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Testing & Documentation
// ═══════════════════════════════════════════════════════════════════════════════

export const testingTasks: Task[] = [
  {
    id: "tst-01",
    title: "JUnit 5 Fundamentals",
    phase: 1,
    difficulty: "beginner",
    category: "testing",
    objectives: [
      "Write unit tests for the InputValidator class from sec-01",
      "Use @Test, @BeforeEach, @DisplayName, and assertion methods",
      "Test both valid inputs (happy path) and invalid inputs (edge cases)",
    ],
    acceptanceCriteria: [
      "At least 10 test methods covering all InputValidator methods",
      "Tests use descriptive @DisplayName annotations",
      "assertEquals, assertTrue, assertFalse, assertThrows all used appropriately",
      "Edge cases tested: null, empty, boundary values, overflow",
    ],
    filesInvolved: [
      "practice/testing/junit/InputValidatorTest.java",
    ],
    hints: [
      "@Test @DisplayName('validateRange rejects value above maximum') void rangeAboveMax() { assertThrows(ValidationException.class, () -> InputValidator.validateRange(501, 0, 500, 'temp')); }",
      "@BeforeEach: Set up common test fixtures. If multiple tests need a validator instance, create it in setup.",
      "Boundary testing: For range [0, 500], test: -1 (below), 0 (lower boundary), 250 (middle), 500 (upper boundary), 501 (above). Boundaries are where bugs hide.",
      "assertThrows returns the exception: ValidationException ex = assertThrows(ValidationException.class, () -> ...); assertTrue(ex.getMessage().contains('temperature'));",
      "Naming convention: testMethodName_scenario_expectedResult or use @DisplayName for human-readable names.",
      "In safety-critical development, unit tests ARE the evidence that requirements are met. Each test traces back to a requirement.",
    ],
  },
  {
    id: "tst-02",
    title: "Mocking with Mockito",
    phase: 1,
    difficulty: "intermediate",
    category: "testing",
    objectives: [
      "Test AlarmSystem (from oop-04) in isolation using mock observers",
      "Use Mockito to create mock AlarmObservers and verify interactions",
      "Test that observers are called with correct AlarmEvent data",
    ],
    acceptanceCriteria: [
      "Mock observers created with Mockito.mock(AlarmObserver.class)",
      "verify() confirms observers receive the correct events",
      "ArgumentCaptor captures and inspects AlarmEvent details",
      "Tests cover: alarm fired, alarm not fired (below threshold), multiple observers",
    ],
    filesInvolved: [
      "practice/testing/mockito/AlarmSystemTest.java",
    ],
    hints: [
      "Setup: AlarmObserver mockLogger = mock(AlarmObserver.class); AlarmObserver mockEmail = mock(AlarmObserver.class); alarmSystem.subscribe(mockLogger); alarmSystem.subscribe(mockEmail);",
      "Verify called: verify(mockLogger).onAlarm(any(AlarmEvent.class)); — confirms onAlarm was called at least once.",
      "Verify NOT called: verify(mockLogger, never()).onAlarm(any()); — confirms no alarm was fired when readings are normal.",
      "ArgumentCaptor: ArgumentCaptor<AlarmEvent> captor = ArgumentCaptor.forClass(AlarmEvent.class); verify(mockLogger).onAlarm(captor.capture()); assertEquals(Severity.CRITICAL, captor.getValue().severity());",
      "Why mock? You don't want unit tests sending real emails or triggering real shutdowns. Mocks let you verify behavior without side effects.",
      "Mockito.times(3) — verify exactly 3 invocations. Useful for testing that all 3 high readings triggered 3 alarms.",
    ],
  },
  {
    id: "tst-03",
    title: "TDD — Red-Green-Refactor",
    phase: 1,
    difficulty: "intermediate",
    category: "testing",
    objectives: [
      "Build a RangeChecker class entirely using TDD (write tests FIRST)",
      "RangeChecker validates sensor readings against configurable safety ranges",
      "Follow the strict cycle: Red (failing test) -> Green (minimal code) -> Refactor",
    ],
    acceptanceCriteria: [
      "Git history (or comments) show tests written before implementation",
      "RangeChecker supports: addRange(name, min, max), check(name, value) -> RangeResult",
      "RangeResult: IN_RANGE, WARNING (within 10% of boundary), OUT_OF_RANGE",
      "At least 12 tests covering all result types and edge cases",
    ],
    filesInvolved: [
      "practice/testing/tdd/RangeChecker.java",
      "practice/testing/tdd/RangeResult.java",
      "practice/testing/tdd/RangeCheckerTest.java",
    ],
    hints: [
      "Step 1 (Red): Write @Test void checkReturnsInRange() { RangeChecker rc = new RangeChecker(); rc.addRange('temp', 0, 500); assertEquals(RangeResult.IN_RANGE, rc.check('temp', 250)); } — it won't compile. Good.",
      "Step 2 (Green): Create RangeChecker with just enough code to pass. addRange stores in a Map. check() returns IN_RANGE if min <= value <= max.",
      "Step 3 (Red): Write test for OUT_OF_RANGE. @Test void checkReturnsOutOfRange() { assertEquals(RangeResult.OUT_OF_RANGE, rc.check('temp', 600)); }",
      "Step 4 (Green): Add the else branch in check().",
      "Step 5 (Red): Write test for WARNING zone. 'Value within 10% of max should warn'. assertEquals(RangeResult.WARNING, rc.check('temp', 460)); // 460 is within 10% of 500.",
      "TDD forces you to think about requirements FIRST. In safety-critical development, this traces requirements -> tests -> code in a verifiable chain.",
    ],
  },
  {
    id: "tst-04",
    title: "Integration Testing with H2",
    phase: 2,
    difficulty: "intermediate",
    category: "testing",
    objectives: [
      "Write integration tests for SensorDataDAO (from sec-02) using an in-memory H2 database",
      "Test the full lifecycle: insert, query, update, delete",
      "Use @BeforeEach to set up a clean database for each test",
    ],
    acceptanceCriteria: [
      "Each test runs against a fresh H2 in-memory database",
      "Tests cover all CRUD operations on SensorDataDAO",
      "Tests verify data integrity: inserted data matches queried data",
      "Connection and table setup happens in @BeforeEach, teardown in @AfterEach",
    ],
    filesInvolved: [
      "practice/testing/integration/SensorDataDAOIntegrationTest.java",
    ],
    hints: [
      "@BeforeEach: conn = DriverManager.getConnection('jdbc:h2:mem:test;DB_CLOSE_DELAY=-1'); Run CREATE TABLE statement. Initialize dao = new SensorDataDAO(conn);",
      "@AfterEach: Run DROP TABLE sensors; conn.close(); — ensures each test starts clean.",
      "Test insert + query: dao.insert('temperature', 42.5, 'reactor-1'); SensorData result = dao.findById(1); assertEquals('temperature', result.getType()); assertEquals(42.5, result.getValue());",
      "Test update: dao.insert(...); dao.updateReading(1, 99.9); SensorData updated = dao.findById(1); assertEquals(99.9, updated.getValue());",
      "Integration tests are slower than unit tests but catch real issues: wrong SQL syntax, type mismatches, constraint violations.",
      "In regulated environments, integration tests demonstrate that components work together correctly — not just in isolation.",
    ],
  },
  {
    id: "tst-05",
    title: "Test Coverage & Edge Cases",
    phase: 2,
    difficulty: "advanced",
    category: "testing",
    objectives: [
      "Achieve >90% line coverage on the EncryptionService (from sec-03)",
      "Test error paths: wrong passphrase, corrupted ciphertext, null inputs",
      "Use parameterized tests for data-driven testing",
    ],
    acceptanceCriteria: [
      "Tests cover: successful encrypt/decrypt round-trip, wrong passphrase fails, tampered ciphertext fails, null/empty inputs throw",
      "@ParameterizedTest with @ValueSource or @CsvSource for multiple inputs",
      "Every catch block in EncryptionService is exercised by a test",
      "Test proves: encrypting same plaintext twice yields different ciphertexts (IV uniqueness)",
    ],
    filesInvolved: [
      "practice/testing/coverage/EncryptionServiceTest.java",
    ],
    hints: [
      "Round-trip: String encrypted = service.encrypt('secret', 'pass'); String decrypted = service.decrypt(encrypted, 'pass'); assertEquals('secret', decrypted);",
      "Wrong passphrase: assertThrows(SecurityException.class, () -> service.decrypt(encrypted, 'wrongpass')); — GCM mode detects this as a tag mismatch.",
      "Tampered ciphertext: Decode base64, flip a byte, re-encode, try to decrypt. Should throw.",
      "@ParameterizedTest @ValueSource(strings = {'hello', 'a', '', 'a very long string...'}) void encryptDecryptRoundTrip(String input) { ... }",
      "IV uniqueness: String enc1 = service.encrypt('same', 'pass'); String enc2 = service.encrypt('same', 'pass'); assertNotEquals(enc1, enc2);",
      "Coverage tools: Use JaCoCo (mvn jacoco:report) to visualize coverage. Target >90% line coverage for security-critical code.",
    ],
  },
  {
    id: "tst-06",
    title: "Writing Test Procedures & Specs",
    phase: 2,
    difficulty: "advanced",
    category: "testing",
    objectives: [
      "Write a formal Test Procedure document for the AlarmSystem",
      "Include: test ID, description, preconditions, steps, expected results",
      "Create a Requirements Traceability Matrix linking requirements to tests",
    ],
    acceptanceCriteria: [
      "Test Procedure has at least 8 test cases in a structured format",
      "Each test case has: ID, title, preconditions, steps (numbered), expected result, actual result (blank for execution)",
      "Traceability matrix maps each requirement to at least one test case",
      "Document follows IEEE 829 style (or similar structured format)",
    ],
    filesInvolved: [
      "practice/testing/docs/TestProcedure_AlarmSystem.md",
      "practice/testing/docs/TraceabilityMatrix.md",
    ],
    hints: [
      "Test case format: | TP-001 | Alarm fires on threshold breach | AlarmSystem configured with temp threshold 500C | 1. Set threshold 500C 2. Send reading 501C | AlarmEvent with CRITICAL severity fired to all observers |",
      "Preconditions matter: 'AlarmSystem has 2 observers subscribed' — tests are only valid when preconditions are met.",
      "Traceability: REQ-001 (System shall fire alarm when threshold exceeded) -> TP-001, TP-002, TP-005. Every requirement must have at least one test.",
      "The job posting specifically mentions 'writing specifications, test procedures, user's guides and test reports' — this is a core competency they're evaluating.",
      "In nuclear software, test procedures are reviewed and approved before execution. The document IS the deliverable, not just the code.",
      "Include negative tests: 'Alarm does NOT fire when reading equals threshold exactly' and 'System handles null sensor reading gracefully'.",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Phase titles for dashboard
// ═══════════════════════════════════════════════════════════════════════════════

export const phaseTitles: Record<TaskCategory, Record<number, string>> = {
  oop: {
    1: "SOLID Principles",
    2: "Design Patterns",
  },
  networking: {
    1: "Socket Fundamentals",
    2: "Advanced Protocols",
  },
  security: {
    1: "Defensive Coding",
    2: "Security Architecture",
  },
  testing: {
    1: "Unit Testing",
    2: "Integration & Documentation",
  },
};
