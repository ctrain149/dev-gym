package com.devgym.backend.nuclearprep;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final StudyModuleRepository studyModuleRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final CodingExerciseRepository codingExerciseRepository;

    @Override
    public void run(String... args) {
        // Only seed if database is empty
        if (studyModuleRepository.count() > 0) {
            return;
        }

        seedStudyModules();
        seedCodingExercises();
    }

    private void seedStudyModules() {
        // Module 1: IEEE 7-4.3.2 Software Standards
        StudyModule ieeeStandards = StudyModule.builder()
            .title("IEEE 7-4.3.2 - Software Standards for Nuclear Power")
            .category(StudyModule.ModuleCategory.IEEE_STANDARDS)
            .description("Learn the IEEE Standard for Digital Computers in Safety Systems of Nuclear Power Generating Stations")
            .estimatedMinutes(45)
            .difficultyLevel(StudyModule.DifficultyLevel.ADVANCED)
            .orderIndex(1)
            .content("""
                IEEE Std 7-4.3.2 is the critical standard for software in nuclear safety systems.
                
                Key Concepts:
                
                1. Software Integrity Levels (SIL)
                   - Level A: Highest integrity (reactor protection)
                   - Level B: High integrity (engineered safety features)
                   - Level C: Moderate integrity (radiation monitoring)
                   - Level D: Low integrity (non-safety display)
                
                2. Software Verification & Validation (V&V)
                   - Requirements traceability
                   - Design reviews at each phase
                   - Code reviews and static analysis
                   - Testing at unit, integration, and system levels
                
                3. Documentation Requirements
                   - Software Requirements Specification (SRS)
                   - Software Design Description (SDD)
                   - Test plans and procedures
                   - User manuals and maintenance guides
                
                4. Configuration Management
                   - Baseline control
                   - Change control process
                   - Version control for all deliverables
                
                5. Software Safety Analysis
                   - Failure modes and effects analysis (FMEA)
                   - Fault tree analysis
                   - Common cause failure analysis
                
                Remember: Nuclear software must fail-safe and fail-secure!
                """)
            .build();
        studyModuleRepository.save(ieeeStandards);

        // Add quiz questions for IEEE module
        QuizQuestion q1 = QuizQuestion.builder()
            .studyModule(ieeeStandards)
            .question("What is the highest Software Integrity Level (SIL) in IEEE 7-4.3.2?")
            .questionType(QuizQuestion.QuestionType.MULTIPLE_CHOICE)
            .options(Arrays.asList("Level A", "Level B", "Level C", "Level D"))
            .correctAnswerIndex(0)
            .explanation("Level A is the highest integrity level, used for reactor protection systems where failure could result in severe consequences.")
            .isFlashcard(false)
            .build();

        QuizQuestion q2 = QuizQuestion.builder()
            .studyModule(ieeeStandards)
            .question("What does V&V stand for in nuclear software development?")
            .questionType(QuizQuestion.QuestionType.SHORT_ANSWER)
            .correctAnswerText("Verification and Validation")
            .explanation("Verification ensures the product is built right; Validation ensures the right product is built.")
            .isFlashcard(true)
            .build();

        QuizQuestion q3 = QuizQuestion.builder()
            .studyModule(ieeeStandards)
            .question("Nuclear safety software must fail-safe and fail-secure. True or False?")
            .questionType(QuizQuestion.QuestionType.TRUE_FALSE)
            .options(Arrays.asList("True", "False"))
            .correctAnswerIndex(0)
            .explanation("True. Fail-safe means the system defaults to a safe state on failure. Fail-secure means no unauthorized access during failure.")
            .isFlashcard(false)
            .build();

        quizQuestionRepository.saveAll(Arrays.asList(q1, q2, q3));

        // Module 2: NRC Regulations (10 CFR)
        StudyModule nrcRegs = StudyModule.builder()
            .title("NRC Regulations - 10 CFR Part 50 & 52")
            .category(StudyModule.ModuleCategory.NRC_REGULATIONS)
            .description("Understanding Nuclear Regulatory Commission requirements for reactor licensing and operation")
            .estimatedMinutes(60)
            .difficultyLevel(StudyModule.DifficultyLevel.ADVANCED)
            .orderIndex(2)
            .content("""
                10 CFR - Code of Federal Regulations for Nuclear
                
                Part 50: Domestic Licensing of Production and Utilization Facilities
                - Appendix A: General Design Criteria for Nuclear Power Plants
                - Appendix B: Quality Assurance Criteria
                
                Part 52: Licenses, Certifications, and Approvals for Nuclear Power Plants
                
                Key Software-Related Requirements:
                
                1. General Design Criterion 1 (GDC 1): Quality standards and records
                   - Computer software must be developed using established quality standards
                   - Full documentation and traceability required
                
                2. GDC 19: Control room
                   - Safety-related computer systems must support operator decision-making
                   - HMI design must reduce operator error likelihood
                
                3. 10 CFR 50.59: Changes, tests, and experiments
                   - Software modifications may require NRC review
                   - Unreviewed Safety Questions (USQs) must be identified
                
                4. Digital Instrumentation and Control (I&C) Systems
                   - Cyber security requirements per 10 CFR 73.54
                   - Software common cause failure analysis
                   - Diversity and defense-in-depth strategies
                
                Regulatory Guide 1.152 provides guidance on software for safety systems.
                """)
            .build();
        studyModuleRepository.save(nrcRegs);

        QuizQuestion q4 = QuizQuestion.builder()
            .studyModule(nrcRegs)
            .question("Which 10 CFR part covers quality assurance criteria for nuclear facilities?")
            .questionType(QuizQuestion.QuestionType.MULTIPLE_CHOICE)
            .options(Arrays.asList("Part 50 Appendix A", "Part 50 Appendix B", "Part 73", "Part 100"))
            .correctAnswerIndex(1)
            .explanation("10 CFR 50 Appendix B contains the 18 Quality Assurance criteria applicable to all nuclear facility activities including software.")
            .isFlashcard(true)
            .build();

        QuizQuestion q5 = QuizQuestion.builder()
            .studyModule(nrcRegs)
            .question("What is a USQ in nuclear software modification context?")
            .questionType(QuizQuestion.QuestionType.SHORT_ANSWER)
            .correctAnswerText("Unreviewed Safety Question")
            .explanation("A USQ occurs when a change might increase the probability of an accident or challenge a technical specification. Requires NRC notification.")
            .isFlashcard(true)
            .build();

        quizQuestionRepository.saveAll(Arrays.asList(q4, q5));

        // Module 3: Secure Coding for Critical Systems
        StudyModule secureCoding = StudyModule.builder()
            .title("Secure Coding Practices for Nuclear Applications")
            .category(StudyModule.ModuleCategory.SECURE_CODING)
            .description("Learn OWASP Top 10, CERT C++ guidelines, and secure coding patterns for safety-critical systems")
            .estimatedMinutes(90)
            .difficultyLevel(StudyModule.DifficultyLevel.INTERMEDIATE)
            .orderIndex(3)
            .content("""
                Secure Coding for Safety-Critical Systems
                
                CERT C++ Coding Standard - Key Rules:
                
                1. Memory Safety
                   - MEM30-C: Do not access freed memory
                   - MEM31-C: Free dynamically allocated memory exactly once
                   - MEM35-C: Allocate sufficient memory for an object
                   - STR31-C: Guarantee that storage for strings has sufficient space
                
                2. Input Validation
                   - INT04-C: Enforce limits on integer values originating from tainted sources
                   - FIO30-C: Exclude user input from format strings
                   - ENV32-C: All exit handlers must return normally
                
                3. Concurrency
                   - CON30-C: Clean up thread-specific storage
                   - CON31-C: Do not destroy a mutex while it is locked
                   - CON50-CPP: Do not destroy a mutex while it is locked
                
                4. Error Handling
                   - ERR30-C: Set errno to zero before calling library functions
                   - ERR33-C: Detect and handle standard library errors
                   - MEM32-C: Detect and handle memory allocation errors
                
                Nuclear-Specific Secure Coding:
                
                1. No dynamic memory allocation in safety loops
                2. All functions must have deterministic execution time
                3. No recursion in safety-critical paths
                4. Initialize all variables before use
                5. Check all function return values
                6. Use static analysis tools (SonarQube, Coverity)
                7. Code reviews mandatory for safety-related code
                
                Defense in Depth:
                - Input validation at multiple layers
                - Least privilege principle
                - Fail-safe default behaviors
                - Complete mediation (every access checked)
                """)
            .build();
        studyModuleRepository.save(secureCoding);

        QuizQuestion q6 = QuizQuestion.builder()
            .studyModule(secureCoding)
            .question("Which CERT C++ rule prevents accessing freed memory?")
            .questionType(QuizQuestion.QuestionType.MULTIPLE_CHOICE)
            .options(Arrays.asList("MEM30-C", "MEM31-C", "STR31-C", "CON30-C"))
            .correctAnswerIndex(0)
            .explanation("MEM30-C: Do not access freed memory. Use-after-free is a common security vulnerability.")
            .isFlashcard(true)
            .build();

        QuizQuestion q7 = QuizQuestion.builder()
            .studyModule(secureCoding)
            .question("Dynamic memory allocation should be avoided in nuclear safety loops. True or False?")
            .questionType(QuizQuestion.QuestionType.TRUE_FALSE)
            .options(Arrays.asList("True", "False"))
            .correctAnswerIndex(0)
            .explanation("True. Dynamic allocation can fail unpredictably and cause timing issues. Pre-allocate all needed memory during initialization.")
            .isFlashcard(false)
            .build();

        quizQuestionRepository.saveAll(Arrays.asList(q6, q7));

        // Module 4: Socket Programming
        StudyModule socketProg = StudyModule.builder()
            .title("Windows Socket Programming - TCP/UDP")
            .category(StudyModule.ModuleCategory.NETWORK_PROGRAMMING)
            .description("Learn Windows socket APIs, TCP vs UDP protocols, and network programming for nuclear SCADA systems")
            .estimatedMinutes(75)
            .difficultyLevel(StudyModule.DifficultyLevel.INTERMEDIATE)
            .orderIndex(4)
            .content("""
                Windows Socket Programming for Industrial Systems
                
                Windows Sockets (Winsock) API:
                
                1. Initialization
                   WSADATA wsaData;
                   WSAStartup(MAKEWORD(2, 2), &wsaData);
                
                2. TCP Client Socket Creation
                   SOCKET sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
                   sockaddr_in serverAddr;
                   serverAddr.sin_family = AF_INET;
                   serverAddr.sin_port = htons(port);
                   inet_pton(AF_INET, ipAddress, &serverAddr.sin_addr);
                   connect(sock, (sockaddr*)&serverAddr, sizeof(serverAddr));
                
                3. TCP Server Socket
                   SOCKET serverSock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
                   bind(serverSock, (sockaddr*)&serverAddr, sizeof(serverAddr));
                   listen(serverSock, SOMAXCONN);
                   SOCKET clientSock = accept(serverSock, nullptr, nullptr);
                
                4. UDP Socket
                   SOCKET udpSock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
                   // No connect() needed - use sendto()/recvfrom()
                
                5. Sending/Receiving Data
                   send(sock, buffer, length, 0);
                   recv(sock, buffer, bufferSize, 0);
                   sendto(sock, buffer, length, 0, (sockaddr*)&destAddr, sizeof(destAddr));
                   recvfrom(sock, buffer, bufferSize, 0, (sockaddr*)&srcAddr, &addrLen);
                
                6. Cleanup
                   closesocket(sock);
                   WSACleanup();
                
                TCP vs UDP for Nuclear Systems:
                
                TCP (Transmission Control Protocol):
                - Connection-oriented, reliable, ordered delivery
                - Use for: Configuration updates, logged data transfer
                - Overhead: Connection establishment, acknowledgments
                
                UDP (User Datagram Protocol):
                - Connectionless, unreliable, no ordering guarantee
                - Use for: Real-time sensor data, where latest value matters
                - Lower latency, less overhead
                
                Industrial Protocols:
                - Modbus TCP: Common in SCADA systems
                - DNP3: Distributed Network Protocol for utilities
                - OPC UA: Unified Architecture for industrial communication
                
                Security Considerations:
                - Always validate data length before buffer operations
                - Use TLS/SSL for remote connections
                - Implement message authentication
                - Network segmentation (air gaps for safety systems)
                """)
            .build();
        studyModuleRepository.save(socketProg);

        // Module 5: Wireshark Troubleshooting
        StudyModule wireshark = StudyModule.builder()
            .title("Wireshark Troubleshooting for Network Analysis")
            .category(StudyModule.ModuleCategory.TOOLS)
            .description("Learn to capture, filter, and analyze network traffic using Wireshark for debugging industrial protocols")
            .estimatedMinutes(60)
            .difficultyLevel(StudyModule.DifficultyLevel.INTERMEDIATE)
            .orderIndex(5)
            .content("""
                Wireshark for Industrial Network Troubleshooting
                
                Basic Capture Setup:
                1. Select the correct network interface
                2. Start capture with or without filters
                3. Save captures for later analysis
                
                Essential Display Filters:
                
                IP Address Filters:
                - ip.addr == 192.168.1.10       (host traffic)
                - ip.src == 192.168.1.0/24      (source subnet)
                - ip.dst == 192.168.1.50        (destination)
                
                Protocol Filters:
                - tcp.port == 502                (Modbus TCP)
                - tcp.port == 20000              (DNP3)
                - tcp.port == 4840               (OPC UA)
                - icmp                             (ping/diagnostics)
                
                Advanced Filters:
                - tcp.analysis.retransmission      (retransmissions)
                - tcp.flags.syn == 1               (connection attempts)
                - tcp.flags.reset == 1             (connection resets)
                - frame.len > 1000               (large packets)
                
                Industrial Protocol Analysis:
                
                Modbus TCP:
                - Port 502
                - Function codes: 01 (Read Coils), 03 (Read Holding Registers)
                - Analyze request/response pairs
                
                DNP3:
                - Port 20000
                - Application layer protocol for electric utilities
                - Look for unsolicited responses (events)
                
                OPC UA:
                - Port 4840
                - Binary or JSON encoding
                - Session management and subscriptions
                
                Troubleshooting Techniques:
                
                1. Connection Issues:
                   - Check TCP SYN/SYN-ACK/ACK handshake
                   - Look for RST packets (rejected connections)
                   - Verify port numbers match
                
                2. Performance Issues:
                   - Check for TCP retransmissions (packet loss)
                   - Analyze round-trip time (RTT)
                   - Look for duplicate ACKs
                
                3. Protocol Errors:
                   - Examine error responses
                   - Check CRC/ checksums
                   - Verify sequence numbers
                
                4. Security Analysis:
                   - Detect unexpected traffic patterns
                   - Identify unknown devices
                   - Spot unusual port usage
                
                Export and Reporting:
                - Export specific packets
                - Generate IO graphs for bandwidth analysis
                - Use Follow TCP Stream for conversation reconstruction
                """)
            .build();
        studyModuleRepository.save(wireshark);

        // Module 6: Documentation & Specifications
        StudyModule documentation = StudyModule.builder()
            .title("Writing Specifications & Technical Documentation")
            .category(StudyModule.ModuleCategory.DOCUMENTATION)
            .description("Learn to write Software Requirements Specifications, test procedures, and user guides for nuclear systems")
            .estimatedMinutes(50)
            .difficultyLevel(StudyModule.DifficultyLevel.INTERMEDIATE)
            .orderIndex(6)
            .content("""
                Technical Documentation for Nuclear Software
                
                Software Requirements Specification (SRS):
                
                IEEE 830-1998 Standard for SRS:
                
                1. Functional Requirements
                   - SHALL statements (mandatory)
                   - SHOULD statements (recommended)
                   - MAY statements (optional)
                   
                   Example: "The system SHALL display reactor pressure within 100ms of data acquisition."
                
                2. Non-Functional Requirements
                   - Performance: Response time, throughput
                   - Reliability: Availability, MTBF, MTTR
                   - Safety: Fail-safe behaviors
                   - Security: Access control, audit logging
                
                3. Interface Requirements
                   - User interfaces (HMI)
                   - Hardware interfaces (sensors, actuators)
                   - Software interfaces (APIs, protocols)
                   - Communication interfaces (network)
                
                4. Traceability
                   - Each requirement has unique ID
                   - Trace to design elements
                   - Trace to test cases
                   - Bidirectional traceability matrix
                
                Test Procedures:
                
                1. Test Case Format
                   - Test ID and Title
                   - Objective/Requirement traced
                   - Preconditions/Setup
                   - Test Steps (numbered, specific)
                   - Expected Results
                   - Pass/Fail Criteria
                
                2. Types of Testing
                   - Unit Testing (module level)
                   - Integration Testing (interfaces)
                   - System Testing (end-to-end)
                   - Acceptance Testing (user validation)
                   - Regression Testing (after changes)
                
                3. Test Coverage
                   - Statement coverage
                   - Branch/decision coverage
                   - Modified condition/decision coverage (MC/DC)
                   - For SIL A software: 100% MC/DC required
                
                User Guides:
                
                1. Structure
                   - Introduction and scope
                   - Safety warnings and cautions
                   - Operating procedures (step-by-step)
                   - Troubleshooting guide
                   - Maintenance procedures
                   - Emergency procedures
                
                2. Writing Style
                   - Use active voice
                   - Imperative mood for procedures
                   - Avoid ambiguity ("as appropriate", "if necessary")
                   - Include screen shots/diagrams
                   - Use consistent terminology
                
                Document Control:
                - Revision history
                - Approval signatures
                - Configuration management
                - Change history with rationale
                """)
            .build();
        studyModuleRepository.save(documentation);

        QuizQuestion q8 = QuizQuestion.builder()
            .studyModule(documentation)
            .question("Which coverage metric is required for SIL A (highest integrity) software?")
            .questionType(QuizQuestion.QuestionType.MULTIPLE_CHOICE)
            .options(Arrays.asList("Statement coverage", "Branch coverage", "MC/DC", "Path coverage"))
            .correctAnswerIndex(2)
            .explanation("Modified Condition/Decision Coverage (MC/DC) requires 100% coverage for SIL A software per IEEE standards.")
            .isFlashcard(true)
            .build();

        QuizQuestion q9 = QuizQuestion.builder()
            .studyModule(documentation)
            .question("In an SRS, mandatory requirements use which keyword?")
            .questionType(QuizQuestion.QuestionType.SHORT_ANSWER)
            .correctAnswerText("SHALL")
            .explanation("RFC 2119 defines SHALL as an absolute requirement. SHOULD is recommended, MAY is optional.")
            .isFlashcard(true)
            .build();

        quizQuestionRepository.saveAll(Arrays.asList(q8, q9));
    }

    private void seedCodingExercises() {
        // Exercise 1: TCP Client
        CodingExercise tcpClient = CodingExercise.builder()
            .title("TCP Socket Client Implementation")
            .category(CodingExercise.ExerciseCategory.SOCKET_PROGRAMMING)
            .description("Implement a TCP client that connects to a server and sends/receives data. Handle errors properly.")
            .difficultyLevel(StudyModule.DifficultyLevel.INTERMEDIATE)
            .timeLimitMinutes(30)
            .isInteractive(false)
            .starterCode("""
                // Complete this TCP client function
                // Returns 0 on success, -1 on failure
                
                #include <winsock2.h>
                #include <ws2tcpip.h>
                #pragma comment(lib, "ws2_32.lib")
                
                int tcpClient(const char* serverIp, int port) {
                    // TODO: Initialize Winsock
                    
                    // TODO: Create socket
                    
                    // TODO: Set up server address structure
                    
                    // TODO: Connect to server
                    
                    // TODO: Send data
                    
                    // TODO: Receive response
                    
                    // TODO: Cleanup and return
                    return -1;
                }
                """)
            .solutionCode("""
                int tcpClient(const char* serverIp, int port) {
                    WSADATA wsaData;
                    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
                        return -1;
                    }
                    
                    SOCKET sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
                    if (sock == INVALID_SOCKET) {
                        WSACleanup();
                        return -1;
                    }
                    
                    sockaddr_in serverAddr;
                    serverAddr.sin_family = AF_INET;
                    serverAddr.sin_port = htons(port);
                    inet_pton(AF_INET, serverIp, &serverAddr.sin_addr);
                    
                    if (connect(sock, (sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
                        closesocket(sock);
                        WSACleanup();
                        return -1;
                    }
                    
                    const char* message = "Hello, Server!";
                    send(sock, message, strlen(message), 0);
                    
                    char buffer[1024];
                    int bytesReceived = recv(sock, buffer, sizeof(buffer) - 1, 0);
                    if (bytesReceived > 0) {
                        buffer[bytesReceived] = '\\0';
                        printf("Received: %s\\n", buffer);
                    }
                    
                    closesocket(sock);
                    WSACleanup();
                    return 0;
                }
                """)
            .testCases("""
                Test Case 1: Valid server connection
                - Input: serverIp="127.0.0.1", port=8080
                - Expected: Return 0, message sent and received
                
                Test Case 2: Invalid IP address
                - Input: serverIp="999.999.999.999", port=8080
                - Expected: Return -1 (connection failure handled)
                
                Test Case 3: Connection refused
                - Input: serverIp="127.0.0.1", port=99999
                - Expected: Return -1 (invalid port handled)
                """)
            .hints("Remember to call WSAStartup before any socket operations and WSACleanup before returning. Always check return values from socket functions.")
            .build();

        // Exercise 2: Secure Code Review
        CodingExercise secureReview = CodingExercise.builder()
            .title("Secure Code Review - Find the Vulnerabilities")
            .category(CodingExercise.ExerciseCategory.SECURE_CODE_REVIEW)
            .description("Review this C++ code snippet and identify all security vulnerabilities. List them with line numbers.")
            .difficultyLevel(StudyModule.DifficultyLevel.ADVANCED)
            .timeLimitMinutes(20)
            .isInteractive(false)
            .starterCode("""
                // REVIEW THIS CODE - Find security vulnerabilities
                
                void processUserInput(char* input) {
                    char buffer[64];
                    strcpy(buffer, input);  // Line 3
                    
                    char* cmd = new char[128];
                    sprintf(cmd, "echo %s", buffer);  // Line 6
                    system(cmd);  // Line 7
                    
                    delete cmd;  // Line 9
                }
                
                void allocateData(size_t size) {
                    int* data = (int*)malloc(size);  // Line 14
                    for (int i = 0; i < size; i++) {  // Line 15
                        data[i] = i;  // Line 16
                    }
                    // missing free
                }
                """)
            .solutionCode("""
                Vulnerabilities found:
                
                Line 3: strcpy() - Buffer overflow if input > 64 bytes
                Fix: Use strncpy(buffer, input, sizeof(buffer)-1); buffer[63] = '\\0';
                
                Line 6: sprintf() with user input - Format string vulnerability + command injection
                Fix: Use snprintf() and validate/sanitize input; never pass user input to system commands
                
                Line 7: system() with user-controlled input - Command injection vulnerability
                Fix: Don't use system() with user input. Use execve() with argument array instead.
                
                Line 9: Wrong delete operator
                Fix: Use delete[] cmd since allocated with new char[]
                
                Line 14: Missing malloc return check
                Fix: if (data == NULL) return; // handle error
                
                Line 15: Integer overflow - size_t vs int comparison
                Fix: for (size_t i = 0; i < size / sizeof(int); i++)
                
                Missing: No free() call - Memory leak
                Fix: free(data) before function returns
                """)
            .testCases("""
                Expected findings (at minimum):
                1. Buffer overflow (strcpy)
                2. Format string vulnerability (sprintf with user input)
                3. Command injection (system with user input)
                4. Wrong delete operator
                5. Missing malloc null check
                6. Integer overflow in loop
                7. Memory leak (missing free)
                """)
            .hints("Check for: buffer overflows, format string bugs, command injection, memory leaks, wrong memory operators, and integer overflows.")
            .build();

        // Exercise 3: Thread Safety
        CodingExercise threading = CodingExercise.builder()
            .title("Thread-Safe Nuclear Data Logger")
            .description("Make this sensor data logger thread-safe for multi-threaded nuclear data acquisition. Use proper synchronization.")
            .category(CodingExercise.ExerciseCategory.THREADING)
            .difficultyLevel(StudyModule.DifficultyLevel.ADVANCED)
            .timeLimitMinutes(25)
            .isInteractive(false)
            .starterCode("""
                // Make this thread-safe for concurrent sensor access
                
                #include <vector>
                #include <thread>
                
                class SensorDataLogger {
                private:
                    std::vector<double> readings;
                    double maxReading;
                    
                public:
                    void addReading(double value) {
                        readings.push_back(value);
                        if (value > maxReading) {
                            maxReading = value;
                        }
                    }
                    
                    double getMaxReading() {
                        return maxReading;
                    }
                    
                    size_t getCount() {
                        return readings.size();
                    }
                };
                """)
            .solutionCode("""
                #include <vector>
                #include <thread>
                #include <mutex>
                #include <shared_mutex>
                
                class SensorDataLogger {
                private:
                    std::vector<double> readings;
                    double maxReading;
                    mutable std::shared_mutex mutex;  // C++17
                    
                public:
                    void addReading(double value) {
                        std::unique_lock lock(mutex);  // Exclusive lock for write
                        readings.push_back(value);
                        if (value > maxReading) {
                            maxReading = value;
                        }
                    }
                    
                    double getMaxReading() const {
                        std::shared_lock lock(mutex);  // Shared lock for read
                        return maxReading;
                    }
                    
                    size_t getCount() const {
                        std::shared_lock lock(mutex);  // Shared lock for read
                        return readings.size();
                    }
                };
                
                // Alternative with std::mutex (C++11):
                /*
                class SensorDataLogger {
                private:
                    std::vector<double> readings;
                    double maxReading;
                    mutable std::mutex mutex;
                    
                public:
                    void addReading(double value) {
                        std::lock_guard<std::mutex> lock(mutex);
                        readings.push_back(value);
                        if (value > maxReading) {
                            maxReading = value;
                        }
                    }
                    
                    double getMaxReading() const {
                        std::lock_guard<std::mutex> lock(mutex);
                        return maxReading;
                    }
                    
                    size_t getCount() const {
                        std::lock_guard<std::mutex> lock(mutex);
                        return readings.size();
                    }
                };
                */
                """)
            .testCases("""
                Test concurrent access:
                - Multiple threads calling addReading() simultaneously
                - Multiple threads calling getMaxReading() during writes
                - No data races, no crashes, consistent results
                """)
            .hints("Use std::mutex for exclusive access, or std::shared_mutex for reader-writer locks. Ensure all member functions lock appropriately.")
            .build();

        codingExerciseRepository.saveAll(Arrays.asList(tcpClient, secureReview, threading));
    }
}
