%% sim-06: Simplified Nuclear Reactor Thermal Model
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
fprintf('Final T_fuel: %.1f °C, T_cool: %.1f °C\n', T_fuel(end), T_cool(end));
