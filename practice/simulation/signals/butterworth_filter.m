%% sim-02: Butterworth Low-Pass Filter

% Generate noisy signal
t = 0:0.1:60;
clean = 300 + 20*sin(2*pi*0.05*t);
noise = 2*randn(size(t));
raw = clean + noise;

% Design 4th-order Butterworth low-pass
[b, a] = butter(4, 0.1);  % normalized cutoff 0.1 (= 0.5 Hz at 10 Hz sample rate)
filtered = filter(b, a, raw);

% SNR comparison
snr_raw = 10*log10(var(clean) / var(noise));
snr_filtered = 10*log10(var(clean) / var(raw - filtered));
fprintf('SNR raw: %.1f dB\n', snr_raw);
fprintf('SNR Butterworth: %.1f dB\n', snr_filtered);

figure;
plot(t, raw, 'Color', [0.7 0.7 0.7]); hold on;
plot(t, filtered, 'r', 'LineWidth', 1.5);
plot(t, clean, 'k--');
xlabel('Time (s)'); ylabel('Temperature (°C)');
legend('Raw', 'Butterworth', 'True Signal');
title('4th-Order Butterworth Low-Pass Filter'); grid on;
