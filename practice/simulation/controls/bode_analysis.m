%% sim-03: Bode Plot Analysis

pkg load control;

G1 = tf(1, [5 1]);             % first-order
G2 = tf(4, [1 1.2 4]);         % second-order (wn=2, zeta=0.3)

figure;
bode(G1, G2);
grid on;
legend('First-order: 1/(5s+1)', 'Second-order: 4/(s^2+1.2s+4)');
title('Bode Plot — Frequency Response Comparison');

pause;
