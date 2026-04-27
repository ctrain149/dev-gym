%% sim-03: First-Order Transfer Function
% Model a temperature sensor with 5-second time constant

pkg load control;  % Octave compatibility

G = tf(1, [5 1]);   % G(s) = 1 / (5s + 1)
[y, t] = step(G, 30);

figure;
plot(t, y, 'b', 'LineWidth', 1.5); hold on; grid on;

% Annotate time constant (63.2%)
tc_idx = find(y >= 0.632, 1);
plot(t(tc_idx), y(tc_idx), 'ro', 'MarkerSize', 10, 'LineWidth', 2);
text(t(tc_idx)+0.5, y(tc_idx), sprintf('  \\tau = %.1f s (63.2%%)', t(tc_idx)));

% Rise time (10% to 90%)
rt_10 = find(y >= 0.1, 1);
rt_90 = find(y >= 0.9, 1);
plot([t(rt_10) t(rt_90)], [0.1 0.9], 'gs', 'MarkerSize', 8, 'LineWidth', 2);
fprintf('Time constant: %.2f s\n', t(tc_idx));
fprintf('Rise time (10-90%%): %.2f s\n', t(rt_90) - t(rt_10));
fprintf('Steady-state value: %.4f\n', y(end));

xlabel('Time (s)'); ylabel('Output');
title('First-Order Step Response — G(s) = 1/(5s+1)');
