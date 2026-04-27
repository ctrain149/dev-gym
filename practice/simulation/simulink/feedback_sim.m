%% sim-05: Simulink-Style Feedback Loop (script-based)
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
