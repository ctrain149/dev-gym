/**
 * Complete solutions for Matlab/Octave simulation tasks.
 * Maps: file path (relative to project root) → solution content.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// sim-01: Matlab Fundamentals — Matrices & Plotting
// ═══════════════════════════════════════════════════════════════════════════════

const sensor_data_m = `%% sim-01: Sensor Data Generation
% Create vectors for temperature, pressure, and flow rate over 60 seconds.

% Time vector (10 Hz for 60 seconds)
t = 0:0.1:60;

% Simulated sensor data with realistic baselines + oscillation + noise
temp = 300 + 20*sin(2*pi*0.05*t) + 2*randn(size(t));    % °C
pres = 155 + 5*sin(2*pi*0.03*t) + 0.5*randn(size(t));   % bar
flow = 12 + 2*sin(2*pi*0.02*t) + 0.3*randn(size(t));    % kg/s

% Display basic statistics
fprintf('Temperature: mean=%.1f, std=%.2f, min=%.1f, max=%.1f\\n', ...
    mean(temp), std(temp), min(temp), max(temp));
fprintf('Pressure:    mean=%.1f, std=%.2f, min=%.1f, max=%.1f\\n', ...
    mean(pres), std(pres), min(pres), max(pres));
fprintf('Flow rate:   mean=%.1f, std=%.2f, min=%.1f, max=%.1f\\n', ...
    mean(flow), std(flow), min(flow), max(flow));
`;

const unit_convert_m = `%% sim-01: Unit Conversion Functions

function F = c2f(C)
    % Celsius to Fahrenheit
    F = C * 9/5 + 32;
end

function bar_val = psi2bar(psi)
    % 1 bar = 14.5038 psi
    bar_val = psi / 14.5038;
end

function gpm = kgs2gpm(kgs)
    % kg/s to gallons per minute (water, density ~1 kg/L)
    % 1 kg/s = 1 L/s = 15.8503 gpm
    gpm = kgs * 15.8503;
end
`;

const plot_sensors_m = `%% sim-01: Plot sensor data as 3-panel subplot

% Generate data
t = 0:0.1:60;
temp = 300 + 20*sin(2*pi*0.05*t) + 2*randn(size(t));
pres = 155 + 5*sin(2*pi*0.03*t) + 0.5*randn(size(t));
flow = 12 + 2*sin(2*pi*0.02*t) + 0.3*randn(size(t));

figure;

subplot(3,1,1);
plot(t, temp, 'r');
xlabel('Time (s)'); ylabel('Temp (°C)');
title('Reactor Temperature'); grid on;

subplot(3,1,2);
plot(t, pres, 'b');
xlabel('Time (s)'); ylabel('Pressure (bar)');
title('Reactor Pressure'); grid on;

subplot(3,1,3);
plot(t, flow, 'g');
xlabel('Time (s)'); ylabel('Flow (kg/s)');
title('Coolant Flow Rate'); grid on;

% sgtitle is MATLAB-only; use axes+text for Octave compatibility
axes('Position', [0 0 1 1], 'Visible', 'off');
text(0.5, 0.98, 'Reactor Sensor Data — 60-Second Window', ...
    'HorizontalAlignment', 'center', 'FontSize', 14, 'FontWeight', 'bold');
`;

// ═══════════════════════════════════════════════════════════════════════════════
// sim-02: Signal Processing — Filtering Noisy Sensor Data
// ═══════════════════════════════════════════════════════════════════════════════

const moving_avg_m = `%% sim-02: Moving Average Filter (implement manually)

% Generate noisy signal
t = 0:0.1:60;
clean = 300 + 20*sin(2*pi*0.05*t);
noise = 2*randn(size(t));
raw = clean + noise;

% Moving average — manual loop
N = 10; % window size
filtered_loop = zeros(size(raw));
for i = 1:length(raw)
    start_idx = max(1, i-N+1);
    filtered_loop(i) = mean(raw(start_idx:i));
end

% Moving average — vectorized
filtered_conv = conv(raw, ones(1,N)/N, 'same');

% SNR comparison
snr_raw = 10*log10(var(clean) / var(noise));
snr_filtered = 10*log10(var(clean) / var(raw - filtered_loop));
fprintf('SNR raw: %.1f dB\\n', snr_raw);
fprintf('SNR filtered (MA): %.1f dB\\n', snr_filtered);

figure;
plot(t, raw, 'Color', [0.7 0.7 0.7]); hold on;
plot(t, filtered_loop, 'b', 'LineWidth', 1.5);
plot(t, clean, 'k--');
xlabel('Time (s)'); ylabel('Temperature (°C)');
legend('Raw', 'Moving Avg', 'True Signal');
title('Moving Average Filter — N=10'); grid on;
`;

const butterworth_filter_m = `%% sim-02: Butterworth Low-Pass Filter

% Generate noisy signal
t = 0:0.1:60;
clean = 300 + 20*sin(2*pi*0.05*t);
noise = 2*randn(size(t));
raw = clean + noise;

% Design 4th-order Butterworth low-pass
[b, a] = butter(4, 0.1);  % normalized cutoff 0.1 (= 0.5 Hz at 10 Hz sample rate)
filtered = filter(b, a, raw);

% SNR comparison
snr_raw = 10*log10(var(clean) / var(noise));
snr_filtered = 10*log10(var(clean) / var(raw - filtered));
fprintf('SNR raw: %.1f dB\\n', snr_raw);
fprintf('SNR Butterworth: %.1f dB\\n', snr_filtered);

figure;
plot(t, raw, 'Color', [0.7 0.7 0.7]); hold on;
plot(t, filtered, 'r', 'LineWidth', 1.5);
plot(t, clean, 'k--');
xlabel('Time (s)'); ylabel('Temperature (°C)');
legend('Raw', 'Butterworth', 'True Signal');
title('4th-Order Butterworth Low-Pass Filter'); grid on;
`;

const compare_filters_m = `%% sim-02: Compare raw vs filtered signals on same plot

% Generate noisy signal
t = 0:0.1:60;
clean = 300 + 20*sin(2*pi*0.05*t);
noise = 2*randn(size(t));
raw = clean + noise;

% Moving average (N=10)
N = 10;
ma_filtered = conv(raw, ones(1,N)/N, 'same');

% Butterworth (4th order, 0.1 cutoff)
[b, a] = butter(4, 0.1);
bw_filtered = filter(b, a, raw);

% SNR comparison
snr_raw  = 10*log10(var(clean) / var(raw - clean));
snr_ma   = 10*log10(var(clean) / var(ma_filtered - clean));
snr_bw   = 10*log10(var(clean) / var(bw_filtered - clean));

fprintf('SNR Raw:         %.1f dB\\n', snr_raw);
fprintf('SNR Moving Avg:  %.1f dB\\n', snr_ma);
fprintf('SNR Butterworth: %.1f dB\\n', snr_bw);

figure;
plot(t, raw, 'Color', [0.8 0.8 0.8]); hold on;
plot(t, ma_filtered, 'b', 'LineWidth', 1.5);
plot(t, bw_filtered, 'r', 'LineWidth', 1.5);
plot(t, clean, 'k--', 'LineWidth', 1);
xlabel('Time (s)'); ylabel('Temperature (°C)');
legend('Raw', 'Moving Average', 'Butterworth', 'True Signal');
title('Filter Comparison'); grid on;
`;

// ═══════════════════════════════════════════════════════════════════════════════
// sim-03: Transfer Functions & System Response
// ═══════════════════════════════════════════════════════════════════════════════

const first_order_m = `%% sim-03: First-Order Transfer Function
% Model a temperature sensor with 5-second time constant

pkg load control;  % Octave compatibility

G = tf(1, [5 1]);   % G(s) = 1 / (5s + 1)
[y, t] = step(G, 30);

figure;
plot(t, y, 'b', 'LineWidth', 1.5); hold on; grid on;

% Annotate time constant (63.2%)
tc_idx = find(y >= 0.632, 1);
plot(t(tc_idx), y(tc_idx), 'ro', 'MarkerSize', 10, 'LineWidth', 2);
text(t(tc_idx)+0.5, y(tc_idx), sprintf('  \\\\tau = %.1f s (63.2%%)', t(tc_idx)));

% Rise time (10% to 90%)
rt_10 = find(y >= 0.1, 1);
rt_90 = find(y >= 0.9, 1);
plot([t(rt_10) t(rt_90)], [0.1 0.9], 'gs', 'MarkerSize', 8, 'LineWidth', 2);
fprintf('Time constant: %.2f s\\n', t(tc_idx));
fprintf('Rise time (10-90%%): %.2f s\\n', t(rt_90) - t(rt_10));
fprintf('Steady-state value: %.4f\\n', y(end));

xlabel('Time (s)'); ylabel('Output');
title('First-Order Step Response — G(s) = 1/(5s+1)');
`;

const second_order_m = `%% sim-03: Second-Order Underdamped System

pkg load control;

wn = 2; zeta = 0.3;
G = tf(wn^2, [1 2*zeta*wn wn^2]);  % G(s) = wn^2 / (s^2 + 2*zeta*wn*s + wn^2)

[y, t] = step(G, 15);
info = stepinfo(G);

figure;
plot(t, y, 'b', 'LineWidth', 1.5); hold on; grid on;
yline(1, 'k--');  % steady-state
yline(1.02, 'r:'); yline(0.98, 'r:');  % 2% band

fprintf('Overshoot: %.1f%%\\n', info.Overshoot);
fprintf('Settling time (2%%): %.2f s\\n', info.SettlingTime);
fprintf('Rise time: %.2f s\\n', info.RiseTime);
fprintf('Damped frequency: %.2f rad/s\\n', wn*sqrt(1-zeta^2));

xlabel('Time (s)'); ylabel('Output');
title(sprintf('2nd-Order: \\\\omega_n=%.1f, \\\\zeta=%.1f', wn, zeta));
`;

const bode_analysis_m = `%% sim-03: Bode Plot Analysis

pkg load control;

G1 = tf(1, [5 1]);             % first-order
G2 = tf(4, [1 1.2 4]);         % second-order (wn=2, zeta=0.3)

figure;
bode(G1, G2);
grid on;
legend('First-order: 1/(5s+1)', 'Second-order: 4/(s^2+1.2s+4)');
title('Bode Plot — Frequency Response Comparison');
`;

// ═══════════════════════════════════════════════════════════════════════════════
// sim-04: PID Controller Design
// ═══════════════════════════════════════════════════════════════════════════════

const pid_design_m = `%% sim-04: PID Controller Design

pkg load control;

G_plant = tf(1, [10 1]);  % slow thermal plant, 10s time constant

Kp = 5; Ki = 0.5; Kd = 2;
C = pid(Kp, Ki, Kd);
T = feedback(C * G_plant, 1);

[y, t] = step(T, 50);
info = stepinfo(T);

figure;
plot(t, y, 'b', 'LineWidth', 1.5); hold on; grid on;
yline(1, 'k--');
xlabel('Time (s)'); ylabel('Output');
title(sprintf('PID Step Response — Kp=%.1f, Ki=%.1f, Kd=%.1f', Kp, Ki, Kd));

fprintf('Rise time: %.2f s\\n', info.RiseTime);
fprintf('Overshoot: %.1f%%\\n', info.Overshoot);
fprintf('Settling time: %.2f s\\n', info.SettlingTime);
fprintf('Steady-state error: %.4f\\n', abs(1 - y(end)));
`;

const gain_comparison_m = `%% sim-04: Compare P-only, PI, PID responses

pkg load control;

G = tf(1, [10 1]);

C_p   = pid(5, 0, 0);
C_pi  = pid(5, 0.5, 0);
C_pid = pid(5, 0.5, 2);

T_p   = feedback(C_p * G, 1);
T_pi  = feedback(C_pi * G, 1);
T_pid = feedback(C_pid * G, 1);

figure;
step(T_p, T_pi, T_pid, 50);
legend('P only', 'PI', 'PID');
grid on;
title('Controller Comparison — Thermal Plant');
`;

// ═══════════════════════════════════════════════════════════════════════════════
// sim-05: Simulink Concepts — Block Diagram Simulation
// ═══════════════════════════════════════════════════════════════════════════════

const feedback_sim_m = `%% sim-05: Simulink-Style Feedback Loop (script-based)
% Time-domain discrete simulation of PID + plant in a for-loop

dt = 0.01;
t = 0:dt:60;
N = length(t);

% Preallocate
y = zeros(1, N);     % plant output
u = zeros(1, N);     % control effort
e_vec = zeros(1, N); % error

% PID state
e_int = 0;
e_prev = 0;

% Gains
Kp = 5; Ki = 0.5; Kd = 2;

% Plant parameter
tau = 10; % time constant

% Setpoint
setpoint = 100;

for i = 2:N
    % Error
    e = setpoint - y(i-1);

    % PID controller
    e_int = e_int + e * dt;
    e_deriv = (e - e_prev) / dt;
    u(i) = Kp*e + Ki*e_int + Kd*e_deriv;
    e_prev = e;

    % Plant (first-order Euler integration)
    y(i) = y(i-1) + (u(i) - y(i-1)) / tau * dt;

    % Store error
    e_vec(i) = e;
end

% Plot results as 3-panel subplot
figure;
subplot(3,1,1);
plot(t, y, 'b', 'LineWidth', 1.2); hold on;
yline(setpoint, 'r--');
xlabel('Time (s)'); ylabel('Output');
title('Setpoint vs Plant Output'); grid on;
legend('y(t)', 'Setpoint');

subplot(3,1,2);
plot(t, e_vec, 'm');
xlabel('Time (s)'); ylabel('Error');
title('Tracking Error'); grid on;

subplot(3,1,3);
plot(t, u, 'Color', [0 0.6 0]);
xlabel('Time (s)'); ylabel('u(t)');
title('Control Effort'); grid on;

sgtitle('PID Feedback Simulation');
`;

const disturbance_rejection_m = `%% sim-05: Disturbance Rejection
% PID feedback loop with load disturbance at t=30s and anti-windup

dt = 0.01;
t = 0:dt:60;
N = length(t);

y = zeros(1, N);
u = zeros(1, N);
e_vec = zeros(1, N);
d = zeros(1, N);  % disturbance signal

e_int = 0;
e_prev = 0;

Kp = 5; Ki = 0.5; Kd = 2;
tau = 10;
setpoint = 100;

for i = 2:N
    % Disturbance at t >= 30s
    if t(i) >= 30
        d(i) = 50;  % load change
    end

    e = setpoint - y(i-1);

    % PID with anti-windup (clamp integral)
    e_int = e_int + e * dt;
    e_int = max(-1000, min(1000, e_int));  % anti-windup clamp
    e_deriv = (e - e_prev) / dt;
    u(i) = Kp*e + Ki*e_int + Kd*e_deriv;
    e_prev = e;

    % Plant + disturbance
    y(i) = y(i-1) + (u(i) - y(i-1)) / tau * dt + d(i) * dt;

    e_vec(i) = e;
end

figure;
subplot(4,1,1);
plot(t, y, 'b', 'LineWidth', 1.2); hold on;
yline(setpoint, 'r--');
xline(30, 'k:', 'Disturbance');
xlabel('Time (s)'); ylabel('Output');
title('Output with Disturbance'); grid on;

subplot(4,1,2);
plot(t, e_vec, 'm');
xlabel('Time (s)'); ylabel('Error');
title('Error'); grid on;

subplot(4,1,3);
plot(t, u, 'Color', [0 0.6 0]);
xlabel('Time (s)'); ylabel('u(t)');
title('Control Effort'); grid on;

subplot(4,1,4);
plot(t, d, 'r', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('Disturbance');
title('Load Disturbance'); grid on;

sgtitle('Disturbance Rejection with Anti-Windup PID');
`;

// ═══════════════════════════════════════════════════════════════════════════════
// sim-06: Plant Modeling — Nuclear Thermal-Hydraulic Simulation
// ═══════════════════════════════════════════════════════════════════════════════

const reactor_thermal_m = `%% sim-06: Simplified Nuclear Reactor Thermal Model
% Coupled ODEs: fuel temperature, coolant temperature, power

% Parameters
C_fuel = 500;    % J/°C  fuel heat capacity
C_cool = 2000;   % J/°C  coolant heat capacity
h = 100;         % W/°C  heat transfer coefficient
flow = 10;       % kg/s  coolant flow rate
Cp = 4180;       % J/(kg·°C) specific heat of water
T_inlet = 280;   % °C    coolant inlet temperature
P0 = 1e6;        % W     initial power (1 MW)
T_fuel0 = 400;   % °C    initial fuel temperature
T_cool0 = 300;   % °C    initial coolant temperature

% Simulation setup
dt = 0.01;
t = 0:dt:60;
N = length(t);

T_fuel = zeros(1, N); T_fuel(1) = T_fuel0;
T_cool = zeros(1, N); T_cool(1) = T_cool0;
P = P0 * ones(1, N);

% ODE integration (Euler)
for i = 1:N-1
    dT_fuel = (P(i) - h*(T_fuel(i) - T_cool(i))) / C_fuel;
    dT_cool = (h*(T_fuel(i) - T_cool(i)) - flow*Cp*(T_cool(i) - T_inlet)) / C_cool;
    T_fuel(i+1) = T_fuel(i) + dT_fuel * dt;
    T_cool(i+1) = T_cool(i) + dT_cool * dt;
    P(i+1) = P0;  % constant power
end

% Plot
figure;
subplot(3,1,1);
plot(t, T_fuel, 'r', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('T_{fuel} (°C)');
title('Fuel Temperature'); grid on;

subplot(3,1,2);
plot(t, T_cool, 'b', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('T_{cool} (°C)');
title('Coolant Temperature'); grid on;

subplot(3,1,3);
plot(t, P/1e6, 'k', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('Power (MW)');
title('Reactor Power'); grid on;

sgtitle('Nuclear Reactor Thermal Model — Steady State');
fprintf('Final T_fuel: %.1f °C, T_cool: %.1f °C\\n', T_fuel(end), T_cool(end));
`;

const safety_trip_m = `%% sim-06: Safety Trip (SCRAM) Logic

% Parameters
C_fuel = 500; C_cool = 2000; h = 100;
flow = 10; Cp = 4180; T_inlet = 280;
P0 = 3e6;  % 3 MW — high enough to trigger trip
T_fuel0 = 400; T_cool0 = 300;

dt = 0.01; t = 0:dt:60; N = length(t);
T_fuel = zeros(1,N); T_fuel(1) = T_fuel0;
T_cool = zeros(1,N); T_cool(1) = T_cool0;
P = zeros(1,N); P(1) = P0;

tripped = false; t_trip = NaN;

for i = 1:N-1
    % Safety trip: SCRAM if T_fuel > 1200°C
    if ~tripped && T_fuel(i) > 1200
        tripped = true;
        t_trip = t(i);
        fprintf('SCRAM triggered at t = %.2f s, T_fuel = %.1f °C\\n', t_trip, T_fuel(i));
    end

    % Power: exponential decay after trip
    if tripped
        P(i+1) = P0 * exp(-(t(i+1) - t_trip) / 0.5);
    else
        P(i+1) = P0;
    end

    dT_fuel = (P(i) - h*(T_fuel(i) - T_cool(i))) / C_fuel;
    dT_cool = (h*(T_fuel(i) - T_cool(i)) - flow*Cp*(T_cool(i) - T_inlet)) / C_cool;
    T_fuel(i+1) = T_fuel(i) + dT_fuel * dt;
    T_cool(i+1) = T_cool(i) + dT_cool * dt;
end

figure;
subplot(3,1,1);
plot(t, T_fuel, 'r', 'LineWidth', 1.5); hold on;
yline(1200, 'k--', 'Trip Setpoint');
if ~isnan(t_trip), xline(t_trip, 'r:', 'SCRAM'); end
xlabel('Time (s)'); ylabel('T_{fuel} (°C)');
title('Fuel Temperature with Safety Trip'); grid on;

subplot(3,1,2);
plot(t, T_cool, 'b', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('T_{cool} (°C)');
title('Coolant Temperature'); grid on;

subplot(3,1,3);
plot(t, P/1e6, 'k', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('Power (MW)');
title('Reactor Power'); grid on;

sgtitle('Reactor SCRAM Simulation');
fprintf('Peak T_fuel: %.1f °C\\n', max(T_fuel));
`;

const loss_of_flow_m = `%% sim-06: Loss-of-Flow Accident (LOFA) Scenario

% Parameters
C_fuel = 500; C_cool = 2000; h = 100;
flow0 = 10; Cp = 4180; T_inlet = 280;
P0 = 1e6; T_fuel0 = 400; T_cool0 = 300;

dt = 0.01; t = 0:dt:60; N = length(t);
T_fuel = zeros(1,N); T_fuel(1) = T_fuel0;
T_cool = zeros(1,N); T_cool(1) = T_cool0;
P = zeros(1,N); P(1) = P0;
flow_vec = flow0 * ones(1,N);

tripped = false; t_trip = NaN;

for i = 1:N-1
    % Pump failure at t=10s: flow drops from 10 to 2 kg/s
    if t(i) >= 10
        flow_vec(i) = 2;
    end

    % Safety trip: SCRAM if T_fuel > 1200°C
    if ~tripped && T_fuel(i) > 1200
        tripped = true;
        t_trip = t(i);
        fprintf('SCRAM at t = %.2f s, T_fuel = %.1f °C\\n', t_trip, T_fuel(i));
    end

    if tripped
        P(i+1) = P0 * exp(-(t(i+1) - t_trip) / 0.5);
    else
        P(i+1) = P0;
    end

    dT_fuel = (P(i) - h*(T_fuel(i) - T_cool(i))) / C_fuel;
    dT_cool = (h*(T_fuel(i) - T_cool(i)) - flow_vec(i)*Cp*(T_cool(i) - T_inlet)) / C_cool;
    T_fuel(i+1) = T_fuel(i) + dT_fuel * dt;
    T_cool(i+1) = T_cool(i) + dT_cool * dt;
end

figure;
subplot(4,1,1);
plot(t, T_fuel, 'r', 'LineWidth', 1.5); hold on;
yline(1200, 'k--', 'Trip Setpoint');
if ~isnan(t_trip), xline(t_trip, 'r:', 'SCRAM'); end
xline(10, 'b:', 'Pump Fail');
xlabel('Time (s)'); ylabel('T_{fuel} (°C)');
title('Fuel Temperature'); grid on;

subplot(4,1,2);
plot(t, T_cool, 'b', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('T_{cool} (°C)');
title('Coolant Temperature'); grid on;

subplot(4,1,3);
plot(t, P/1e6, 'k', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('Power (MW)');
title('Reactor Power'); grid on;

subplot(4,1,4);
plot(t, flow_vec, 'm', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('Flow (kg/s)');
title('Coolant Flow Rate'); grid on;

sgtitle('Loss-of-Flow Accident Simulation');
fprintf('Peak T_fuel: %.1f °C\\n', max(T_fuel));
if ~isnan(t_trip)
    fprintf('Safety trip fired at %.2f s — BEFORE reaching limit.\\n', t_trip);
else
    fprintf('WARNING: Safety trip did NOT fire.\\n');
end
`;

// ═══════════════════════════════════════════════════════════════════════════════
// net-01: TCP Echo Server & Client
// ═══════════════════════════════════════════════════════════════════════════════

const net01_EchoServer = `/**
 * net-01: TCP Echo Server.
 * Listens on port 9000, accepts a client, echoes back every line.
 */
import java.net.*;
import java.io.*;

public class EchoServer {
    public static void main(String[] args) throws IOException {
        int port = 9000;
        System.out.println("Echo server starting on port " + port + "...");

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            while (true) {
                Socket client = serverSocket.accept();
                System.out.println("Client connected: " + client.getRemoteSocketAddress());

                try (
                    BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
                    PrintWriter out = new PrintWriter(client.getOutputStream(), true)
                ) {
                    String line;
                    while ((line = in.readLine()) != null) {
                        System.out.println("Received: " + line);
                        out.println(line);
                    }
                } finally {
                    System.out.println("Client disconnected: " + client.getRemoteSocketAddress());
                    client.close();
                }
            }
        }
    }
}
`;

const net01_EchoClient = `/**
 * net-01: TCP Echo Client.
 * Connects to localhost:9000, sends user input, prints response.
 */
import java.net.*;
import java.io.*;

public class EchoClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 9000;

        try (
            Socket socket = new Socket(host, port);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in))
        ) {
            System.out.println("Connected to " + host + ":" + port);
            System.out.println("Type messages (Ctrl+D to quit):");

            String line;
            while ((line = stdin.readLine()) != null) {
                out.println(line);
                String response = in.readLine();
                System.out.println("Echo: " + response);
            }
        }
        System.out.println("Disconnected.");
    }
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// net-02: Multi-Threaded TCP Server
// ═══════════════════════════════════════════════════════════════════════════════

const net02_MultiServer = `/**
 * net-02: Multi-threaded TCP server.
 * Uses ExecutorService to handle multiple clients simultaneously.
 */
import java.net.*;
import java.io.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class MultiServer {
    private static final AtomicInteger messageCount = new AtomicInteger(0);
    private static final AtomicInteger clientIdGen = new AtomicInteger(0);

    public static void main(String[] args) throws IOException {
        ExecutorService pool = Executors.newFixedThreadPool(10);
        int port = 9000;

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Multi-server listening on port " + port);
            while (true) {
                Socket client = serverSocket.accept();
                int clientId = clientIdGen.incrementAndGet();
                System.out.println("[Client " + clientId + "] connected from " + client.getRemoteSocketAddress());
                pool.submit(new ClientHandler(client, clientId));
            }
        }
    }

    public static int getMessageCount() { return messageCount.get(); }
    public static int incrementMessages() { return messageCount.incrementAndGet(); }
}
`;

const net02_ClientHandler = `/** net-02: Runnable that handles one client connection in its own thread. */
import java.net.*;
import java.io.*;

public class ClientHandler implements Runnable {
    private final Socket socket;
    private final int clientId;

    public ClientHandler(Socket socket, int clientId) {
        this.socket = socket;
        this.clientId = clientId;
    }

    @Override
    public void run() {
        try (
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true)
        ) {
            String line;
            while ((line = in.readLine()) != null) {
                int count = MultiServer.incrementMessages();
                System.out.println("[Client " + clientId + "] msg #" + count + ": " + line);
                out.println("[" + clientId + "] " + line);
            }
        } catch (IOException e) {
            System.err.println("[Client " + clientId + "] error: " + e.getMessage());
        } finally {
            try { socket.close(); } catch (IOException ignored) {}
            System.out.println("[Client " + clientId + "] disconnected. Total messages: " + MultiServer.getMessageCount());
        }
    }
}
`;

const net02_MultiClient = `/**
 * net-02: Test client for MultiServer.
 * Connects, sends a few messages, and disconnects.
 */
import java.net.*;
import java.io.*;

public class MultiClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 9000;

        try (
            Socket socket = new Socket(host, port);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in))
        ) {
            System.out.println("Connected to multi-server at " + host + ":" + port);
            System.out.println("Type messages (Ctrl+D to quit):");

            String line;
            while ((line = stdin.readLine()) != null) {
                out.println(line);
                String response = in.readLine();
                System.out.println("Server: " + response);
            }
        }
        System.out.println("Disconnected.");
    }
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// net-03: UDP Datagram Communication
// ═══════════════════════════════════════════════════════════════════════════════

const net03_SensorSender = `/**
 * net-03: UDP Sensor Sender.
 * Sends simulated sensor readings as datagrams to port 9001 every 500ms.
 * Format: SENSOR_TYPE:VALUE:TIMESTAMP
 */
import java.net.*;
import java.io.*;
import java.time.Instant;

public class SensorSender {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        InetAddress address = InetAddress.getByName("localhost");
        int port = 9001;
        String[] sensors = {"TEMP", "PRES", "FLOW"};
        double[] baselines = {300.0, 155.0, 12.0};
        double[] amplitudes = {20.0, 5.0, 2.0};

        System.out.println("Sending sensor data to " + address + ":" + port);
        int seq = 0;

        while (true) {
            for (int i = 0; i < sensors.length; i++) {
                double value = baselines[i] + amplitudes[i] * Math.sin(seq * 0.1) + Math.random() * 2;
                String msg = sensors[i] + ":" + String.format("%.2f", value) + ":" + Instant.now();
                byte[] data = msg.getBytes();
                DatagramPacket packet = new DatagramPacket(data, data.length, address, port);
                socket.send(packet);
                System.out.println("Sent: " + msg);
            }
            seq++;
            Thread.sleep(500);
        }
    }
}
`;

const net03_SensorReceiver = `/**
 * net-03: UDP Sensor Receiver.
 * Binds to port 9001, receives datagrams, parses and displays readings.
 */
import java.net.*;

public class SensorReceiver {
    public static void main(String[] args) throws Exception {
        int port = 9001;
        DatagramSocket socket = new DatagramSocket(port);
        byte[] buffer = new byte[1024];

        System.out.println("Listening for sensor data on port " + port + "...");
        int received = 0;

        while (true) {
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            socket.receive(packet);
            received++;

            String msg = new String(packet.getData(), 0, packet.getLength());
            String[] parts = msg.split(":");

            if (parts.length >= 3) {
                String sensor = parts[0];
                String value = parts[1];
                String timestamp = parts[2];
                System.out.printf("[#%d] %-5s = %s  (at %s)  from %s%n",
                    received, sensor, value, timestamp, packet.getSocketAddress());
            } else {
                System.out.println("Malformed packet: " + msg);
            }
        }
    }
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// net-04: Custom Binary Protocol
// ═══════════════════════════════════════════════════════════════════════════════

const net04_MessageType = `/** net-04: Binary protocol message types. */
public enum MessageType {
    COMMAND((byte) 0x01),
    STATUS((byte) 0x02),
    ALARM((byte) 0x03);

    private final byte code;
    MessageType(byte code) { this.code = code; }
    public byte getCode() { return code; }

    public static MessageType fromCode(byte code) {
        for (MessageType t : values()) if (t.code == code) return t;
        throw new IllegalArgumentException("Unknown message type: " + code);
    }
}
`;

const net04_ProtocolMessage = `/** net-04: Represents a message with type and payload. */
public record ProtocolMessage(MessageType type, byte[] payload) {
    public String payloadAsString() { return new String(payload); }
}
`;

const net04_ProtocolEncoder = `/**
 * net-04: Encode ProtocolMessage to bytes: [1 byte type][4 bytes length][N bytes payload]
 */
import java.nio.ByteBuffer;

public class ProtocolEncoder {
    public static byte[] encode(ProtocolMessage msg) {
        byte[] payload = msg.payload();
        ByteBuffer buf = ByteBuffer.allocate(1 + 4 + payload.length);
        buf.put(msg.type().getCode());
        buf.putInt(payload.length);
        buf.put(payload);
        return buf.array();
    }
}
`;

const net04_ProtocolDecoder = `/**
 * net-04: Decode bytes back into ProtocolMessage.
 * Reads 1 byte type, 4 bytes length, then N bytes payload.
 */
import java.io.*;

public class ProtocolDecoder {
    public static ProtocolMessage decode(DataInputStream in) throws IOException {
        byte typeCode = in.readByte();
        MessageType type = MessageType.fromCode(typeCode);
        int length = in.readInt();
        byte[] payload = new byte[length];
        in.readFully(payload);
        return new ProtocolMessage(type, payload);
    }
}
`;

const net04_ProtocolServer = `/**
 * net-04: Binary Protocol Server.
 * Accepts connections, decodes binary messages, sends responses.
 */
import java.net.*;
import java.io.*;

public class ProtocolServer {
    public static void main(String[] args) throws IOException {
        int port = 9003;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Protocol server on port " + port);

            while (true) {
                Socket client = serverSocket.accept();
                System.out.println("Client connected: " + client.getRemoteSocketAddress());

                try (
                    DataInputStream in = new DataInputStream(client.getInputStream());
                    DataOutputStream out = new DataOutputStream(client.getOutputStream())
                ) {
                    while (true) {
                        ProtocolMessage msg = ProtocolDecoder.decode(in);
                        System.out.println("Received " + msg.type() + ": " + msg.payloadAsString());

                        // Build a response
                        String response;
                        switch (msg.type()) {
                            case COMMAND:
                                response = "ACK: " + msg.payloadAsString();
                                break;
                            case STATUS:
                                response = "STATUS OK";
                                break;
                            case ALARM:
                                response = "ALARM RECEIVED — initiating safety protocol";
                                break;
                            default:
                                response = "UNKNOWN";
                        }

                        byte[] encoded = ProtocolEncoder.encode(
                            new ProtocolMessage(msg.type(), response.getBytes()));
                        out.write(encoded);
                        out.flush();
                    }
                } catch (EOFException e) {
                    System.out.println("Client disconnected.");
                }
            }
        }
    }
}
`;

const net04_ProtocolClient = `/**
 * net-04: Binary Protocol Client.
 * Sends binary-encoded messages to the protocol server and reads responses.
 */
import java.net.*;
import java.io.*;

public class ProtocolClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 9003;

        try (
            Socket socket = new Socket(host, port);
            DataInputStream in = new DataInputStream(socket.getInputStream());
            DataOutputStream out = new DataOutputStream(socket.getOutputStream())
        ) {
            System.out.println("Connected to protocol server.");

            // Send a COMMAND
            sendMessage(out, MessageType.COMMAND, "SET TEMP_SETPOINT 350");
            ProtocolMessage resp1 = ProtocolDecoder.decode(in);
            System.out.println("Response: " + resp1.payloadAsString());

            // Send a STATUS request
            sendMessage(out, MessageType.STATUS, "REACTOR_STATUS");
            ProtocolMessage resp2 = ProtocolDecoder.decode(in);
            System.out.println("Response: " + resp2.payloadAsString());

            // Send an ALARM
            sendMessage(out, MessageType.ALARM, "HIGH TEMP ZONE 4");
            ProtocolMessage resp3 = ProtocolDecoder.decode(in);
            System.out.println("Response: " + resp3.payloadAsString());
        }
    }

    private static void sendMessage(DataOutputStream out, MessageType type, String payload) throws IOException {
        byte[] encoded = ProtocolEncoder.encode(new ProtocolMessage(type, payload.getBytes()));
        out.write(encoded);
        out.flush();
        System.out.println("Sent " + type + ": " + payload);
    }
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// net-05: TCP File Transfer
// ═══════════════════════════════════════════════════════════════════════════════

const net05_FileServer = `/**
 * net-05: TCP File Server.
 * Accepts filename request, sends file size (long) then streams file bytes.
 * If file not found, sends -1 as size.
 * Uses 8KB buffer for streaming.
 */
import java.net.*;
import java.io.*;

public class FileServer {
    private static final String SERVE_DIR = "./files";

    public static void main(String[] args) throws IOException {
        int port = 9002;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("File server on port " + port + ", serving from " + SERVE_DIR);

            while (true) {
                Socket client = serverSocket.accept();
                System.out.println("Client connected: " + client.getRemoteSocketAddress());

                try (
                    DataInputStream in = new DataInputStream(client.getInputStream());
                    DataOutputStream out = new DataOutputStream(client.getOutputStream())
                ) {
                    String filename = in.readUTF();
                    System.out.println("Requested: " + filename);

                    File file = new File(SERVE_DIR, filename);
                    if (!file.exists() || !file.isFile()) {
                        System.out.println("File not found: " + filename);
                        out.writeLong(-1);
                        out.flush();
                        continue;
                    }

                    long fileSize = file.length();
                    out.writeLong(fileSize);
                    System.out.println("Sending " + filename + " (" + fileSize + " bytes)");

                    byte[] buffer = new byte[8192];
                    try (FileInputStream fis = new FileInputStream(file)) {
                        int bytesRead;
                        long totalSent = 0;
                        while ((bytesRead = fis.read(buffer)) != -1) {
                            out.write(buffer, 0, bytesRead);
                            totalSent += bytesRead;
                        }
                        out.flush();
                        System.out.println("Sent " + totalSent + " bytes.");
                    }
                } catch (IOException e) {
                    System.err.println("Transfer error: " + e.getMessage());
                } finally {
                    client.close();
                }
            }
        }
    }
}
`;

const net05_FileClient = `/**
 * net-05: TCP File Client.
 * Sends filename, receives file size (long), streams file bytes to disk.
 * Verifies received file size matches expected size.
 */
import java.net.*;
import java.io.*;

public class FileClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 9002;
        String filename = args.length > 0 ? args[0] : "test.txt";
        String savePath = "downloaded_" + filename;

        try (
            Socket socket = new Socket(host, port);
            DataInputStream in = new DataInputStream(socket.getInputStream());
            DataOutputStream out = new DataOutputStream(socket.getOutputStream())
        ) {
            // Request the file
            out.writeUTF(filename);
            out.flush();

            // Read file size
            long fileSize = in.readLong();
            if (fileSize == -1) {
                System.out.println("Error: file '" + filename + "' not found on server.");
                return;
            }
            System.out.println("Receiving " + filename + " (" + fileSize + " bytes)...");

            // Stream to disk
            byte[] buffer = new byte[8192];
            long totalReceived = 0;
            try (FileOutputStream fos = new FileOutputStream(savePath)) {
                int bytesRead;
                while (totalReceived < fileSize && (bytesRead = in.read(buffer)) != -1) {
                    fos.write(buffer, 0, bytesRead);
                    totalReceived += bytesRead;
                }
            }

            // Verify
            if (totalReceived == fileSize) {
                System.out.println("Success! Saved to " + savePath + " (" + totalReceived + " bytes)");
            } else {
                System.out.println("Warning: expected " + fileSize + " bytes but received " + totalReceived);
            }
        }
    }
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// net-06: Network Diagnostics Tool
// ═══════════════════════════════════════════════════════════════════════════════

const net06_PortScanner = `/**
 * net-06: Multi-threaded Port Scanner.
 * Scans ports in parallel, reports open ports with latency.
 */
import java.net.*;
import java.io.*;
import java.util.concurrent.*;
import java.util.*;

public class PortScanner {
    public static void main(String[] args) throws Exception {
        String host = "localhost";
        int startPort = 1, endPort = 1024, timeout = 200;

        System.out.println("Scanning " + host + " ports " + startPort + "-" + endPort + "...");
        long startTime = System.currentTimeMillis();

        ExecutorService pool = Executors.newFixedThreadPool(50);
        List<Future<String>> futures = new ArrayList<>();

        for (int port = startPort; port <= endPort; port++) {
            final int p = port;
            futures.add(pool.submit(() -> {
                long t0 = System.nanoTime();
                try (Socket s = new Socket()) {
                    s.connect(new InetSocketAddress(host, p), timeout);
                    long latency = (System.nanoTime() - t0) / 1_000_000;
                    return String.format("  Port %-5d  OPEN   %dms", p, latency);
                } catch (IOException e) {
                    return null; // closed
                }
            }));
        }

        int openCount = 0;
        for (Future<String> f : futures) {
            String result = f.get();
            if (result != null) {
                System.out.println(result);
                openCount++;
            }
        }

        pool.shutdown();
        long elapsed = System.currentTimeMillis() - startTime;
        System.out.println("\\nScan complete: " + openCount + " open port(s) found in " + elapsed + "ms");
    }
}
`;

const net06_PingTool = `/**
 * net-06: Ping-like reachability checker.
 * Sends N periodic checks, reports packet loss percentage.
 */
import java.net.*;

public class PingTool {
    public static void main(String[] args) throws Exception {
        String host = args.length > 0 ? args[0] : "localhost";
        int count = 10, timeout = 1000;

        InetAddress address = InetAddress.getByName(host);
        System.out.println("PING " + host + " (" + address.getHostAddress() + ")");

        int success = 0;
        long totalTime = 0;

        for (int i = 1; i <= count; i++) {
            long start = System.nanoTime();
            boolean reachable = address.isReachable(timeout);
            long elapsed = (System.nanoTime() - start) / 1_000_000;

            if (reachable) {
                System.out.println("Reply from " + host + ": time=" + elapsed + "ms");
                success++;
                totalTime += elapsed;
            } else {
                System.out.println("Request timed out.");
            }
            Thread.sleep(1000);
        }

        int lost = count - success;
        double lossPercent = (lost * 100.0) / count;
        System.out.println("\\n--- " + host + " ping statistics ---");
        System.out.printf("%d packets sent, %d received, %.0f%% loss%n", count, success, lossPercent);
        if (success > 0) {
            System.out.printf("avg round-trip: %dms%n", totalTime / success);
        }
    }
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// Registry: taskId → { filePath: solutionContent }
// ═══════════════════════════════════════════════════════════════════════════════

export const solutionRegistry: Record<string, Record<string, string>> = {
  "sim-01": {
    "practice/simulation/fundamentals/sensor_data.m": sensor_data_m,
    "practice/simulation/fundamentals/unit_convert.m": unit_convert_m,
    "practice/simulation/fundamentals/plot_sensors.m": plot_sensors_m,
  },
  "sim-02": {
    "practice/simulation/signals/moving_avg.m": moving_avg_m,
    "practice/simulation/signals/butterworth_filter.m": butterworth_filter_m,
    "practice/simulation/signals/compare_filters.m": compare_filters_m,
  },
  "sim-03": {
    "practice/simulation/controls/first_order.m": first_order_m,
    "practice/simulation/controls/second_order.m": second_order_m,
    "practice/simulation/controls/bode_analysis.m": bode_analysis_m,
  },
  "sim-04": {
    "practice/simulation/controls/pid_design.m": pid_design_m,
    "practice/simulation/controls/gain_comparison.m": gain_comparison_m,
  },
  "sim-05": {
    "practice/simulation/simulink/feedback_sim.m": feedback_sim_m,
    "practice/simulation/simulink/disturbance_rejection.m": disturbance_rejection_m,
  },
  "sim-06": {
    "practice/simulation/plant/reactor_thermal.m": reactor_thermal_m,
    "practice/simulation/plant/safety_trip.m": safety_trip_m,
    "practice/simulation/plant/loss_of_flow.m": loss_of_flow_m,
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // Networking
  // ═════════════════════════════════════════════════════════════════════════════

  "net-01": {
    "practice/networking/tcp/EchoServer.java": net01_EchoServer,
    "practice/networking/tcp/EchoClient.java": net01_EchoClient,
  },
  "net-02": {
    "practice/networking/tcp/MultiServer.java": net02_MultiServer,
    "practice/networking/tcp/ClientHandler.java": net02_ClientHandler,
    "practice/networking/tcp/MultiClient.java": net02_MultiClient,
  },
  "net-03": {
    "practice/networking/udp/SensorSender.java": net03_SensorSender,
    "practice/networking/udp/SensorReceiver.java": net03_SensorReceiver,
  },
  "net-04": {
    "practice/networking/protocol/MessageType.java": net04_MessageType,
    "practice/networking/protocol/ProtocolMessage.java": net04_ProtocolMessage,
    "practice/networking/protocol/ProtocolEncoder.java": net04_ProtocolEncoder,
    "practice/networking/protocol/ProtocolDecoder.java": net04_ProtocolDecoder,
    "practice/networking/protocol/ProtocolServer.java": net04_ProtocolServer,
    "practice/networking/protocol/ProtocolClient.java": net04_ProtocolClient,
  },
  "net-05": {
    "practice/networking/filetransfer/FileServer.java": net05_FileServer,
    "practice/networking/filetransfer/FileClient.java": net05_FileClient,
  },
  "net-06": {
    "practice/networking/diagnostics/PortScanner.java": net06_PortScanner,
    "practice/networking/diagnostics/PingTool.java": net06_PingTool,
  },
};
