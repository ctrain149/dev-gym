%% sim-03: Second-Order Underdamped System

pkg load control;

wn = 2; zeta = 0.3;
G = tf(wn^2, [1 2*zeta*wn wn^2]);  % G(s) = wn^2 / (s^2 + 2*zeta*wn*s + wn^2)

[y, t] = step(G, 15);
info = stepinfo(G);

figure;
plot(t, y, 'b', 'LineWidth', 1.5); hold on; grid on;
yline(1, 'k--');  % steady-state
yline(1.02, 'r:'); yline(0.98, 'r:');  % 2% band

fprintf('Overshoot: %.1f%%\n', info.Overshoot);
fprintf('Settling time (2%%): %.2f s\n', info.SettlingTime);
fprintf('Rise time: %.2f s\n', info.RiseTime);
fprintf('Damped frequency: %.2f rad/s\n', wn*sqrt(1-zeta^2));

xlabel('Time (s)'); ylabel('Output');
title(sprintf('2nd-Order: \\omega_n=%.1f, \\zeta=%.1f', wn, zeta));
