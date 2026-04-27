%% sim-02: Moving Average Filter (implement manually)
% TODO:
% N = 10; % window size
% filtered = zeros(size(raw));
% for i = 1:length(raw)
%     start_idx = max(1, i-N+1);
%     filtered(i) = mean(raw(start_idx:i));
% end
% OR vectorized: filtered = conv(raw, ones(1,N)/N, 'same');
