%% sim-06: Safety Trip (SCRAM) Logic

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
        fprintf('SCRAM triggered at t = %.2f s, T_fuel = %.1f °C\n', t_trip, T_fuel(i));
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
fprintf('Peak T_fuel: %.1f °C\n', max(T_fuel));
