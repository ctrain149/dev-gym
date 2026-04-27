%% sim-05: Simulink-Style Feedback Loop (script-based)
% TODO: Time-domain discrete simulation of PID + plant in a for-loop

dt = 0.01;
t = 0:dt:60;
N = length(t);

% Preallocate
y = zeros(1, N);   % plant output
u = zeros(1, N);   % control effort
e_vec = zeros(1, N); % error

% PID state
e_int = 0;
e_prev = 0;

% Gains — TODO: tune these
Kp = 5; Ki = 0.5; Kd = 2;

% Plant parameter
tau = 10; % time constant

% Setpoint
setpoint = 100;

for i = 2:N
    % TODO: Error
    % e = setpoint - y(i-1);

    % TODO: PID controller
    % e_int = e_int + e * dt;
    % e_deriv = (e - e_prev) / dt;
    % u(i) = Kp*e + Ki*e_int + Kd*e_deriv;
    % e_prev = e;

    % TODO: Plant (first-order Euler integration)
    % y(i) = y(i-1) + (u(i) - y(i-1)) / tau * dt;

    % TODO: Store error
    % e_vec(i) = e;
end

% TODO: Plot results as 3-panel subplot
% subplot(3,1,1): setpoint vs y(t)
% subplot(3,1,2): error
% subplot(3,1,3): control effort u(t)
