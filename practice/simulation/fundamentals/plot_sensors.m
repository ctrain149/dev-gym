%% sim-01: Plot sensor data as 3-panel subplot

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

pause;  % press any key in the terminal to close
