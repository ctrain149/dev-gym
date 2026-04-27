%% sim-05: Disturbance Rejection
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
