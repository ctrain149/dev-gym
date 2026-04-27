%% sim-02: Moving Average Filter (implement manually)

% Generate noisy signal
t = 0:0.1:60;
clean = 300 + 20*sin(2*pi*0.05*t);
noise = 2*randn(size(t));
raw = clean + noise;

% Moving average — manual loop
N = 10; % window size
filtered_loop = zeros(size(raw));
for i = 1:length(raw)
    start_idx = max(1, i-N+1);
    filtered_loop(i) = mean(raw(start_idx:i));
end

% Moving average — vectorized
filtered_conv = conv(raw, ones(1,N)/N, 'same');

% SNR comparison
snr_raw = 10*log10(var(clean) / var(noise));
snr_filtered = 10*log10(var(clean) / var(raw - filtered_loop));
fprintf('SNR raw: %.1f dB\n', snr_raw);
fprintf('SNR filtered (MA): %.1f dB\n', snr_filtered);

figure;
plot(t, raw, 'Color', [0.7 0.7 0.7]); hold on;
plot(t, filtered_loop, 'b', 'LineWidth', 1.5);
plot(t, clean, 'k--');
xlabel('Time (s)'); ylabel('Temperature (°C)');
legend('Raw', 'Moving Avg', 'True Signal');
title('Moving Average Filter — N=10'); grid on;

pause;
