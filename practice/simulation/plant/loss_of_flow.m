%% sim-06: Loss-of-Flow Accident (LOFA) Scenario

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
        fprintf('SCRAM at t = %.2f s, T_fuel = %.1f °C\n', t_trip, T_fuel(i));
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
fprintf('Peak T_fuel: %.1f °C\n', max(T_fuel));
if ~isnan(t_trip)
    fprintf('Safety trip fired at %.2f s — BEFORE reaching limit.\n', t_trip);
else
    fprintf('WARNING: Safety trip did NOT fire.\n');
end
