%% sim-02: Compare raw vs filtered signals on same plot

% Generate noisy signal
t = 0:0.1:60;
clean = 300 + 20*sin(2*pi*0.05*t);
noise = 2*randn(size(t));
raw = clean + noise;

% Moving average (N=10)
N = 10;
ma_filtered = conv(raw, ones(1,N)/N, 'same');

% Butterworth (4th order, 0.1 cutoff)
[b, a] = butter(4, 0.1);
bw_filtered = filter(b, a, raw);

% SNR comparison
snr_raw  = 10*log10(var(clean) / var(raw - clean));
snr_ma   = 10*log10(var(clean) / var(ma_filtered - clean));
snr_bw   = 10*log10(var(clean) / var(bw_filtered - clean));

fprintf('SNR Raw:         %.1f dB\n', snr_raw);
fprintf('SNR Moving Avg:  %.1f dB\n', snr_ma);
fprintf('SNR Butterworth: %.1f dB\n', snr_bw);

figure;
plot(t, raw, 'Color', [0.8 0.8 0.8]); hold on;
plot(t, ma_filtered, 'b', 'LineWidth', 1.5);
plot(t, bw_filtered, 'r', 'LineWidth', 1.5);
plot(t, clean, 'k--', 'LineWidth', 1);
xlabel('Time (s)'); ylabel('Temperature (°C)');
legend('Raw', 'Moving Average', 'Butterworth', 'True Signal');
title('Filter Comparison'); grid on;
