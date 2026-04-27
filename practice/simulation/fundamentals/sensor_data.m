%% sim-01: Sensor Data Generation
% Create vectors for temperature, pressure, and flow rate over 60 seconds.

% Time vector (10 Hz for 60 seconds)
t = 0:0.1:60;

% Simulated sensor data with realistic baselines + oscillation + noise
temp = 300 + 20*sin(2*pi*0.05*t) + 2*randn(size(t));    % °C
pres = 155 + 5*sin(2*pi*0.03*t) + 0.5*randn(size(t));   % bar
flow = 12 + 2*sin(2*pi*0.02*t) + 0.3*randn(size(t));    % kg/s

% Display basic statistics
fprintf('Temperature: mean=%.1f, std=%.2f, min=%.1f, max=%.1f\n', ...
    mean(temp), std(temp), min(temp), max(temp));
fprintf('Pressure:    mean=%.1f, std=%.2f, min=%.1f, max=%.1f\n', ...
    mean(pres), std(pres), min(pres), max(pres));
fprintf('Flow rate:   mean=%.1f, std=%.2f, min=%.1f, max=%.1f\n', ...
    mean(flow), std(flow), min(flow), max(flow));
