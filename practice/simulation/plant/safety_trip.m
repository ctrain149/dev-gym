%% sim-06: Safety Trip (SCRAM) Logic
% TODO: Copy reactor_thermal.m and add:
%   - Trip condition: if T_fuel > 1200, trigger SCRAM
%   - SCRAM: P drops exponentially: P = P0 * exp(-(t - t_trip) / 0.5)
%   - Plot trip indicator (vertical line at trip time)
%   - Print trip time and peak fuel temperature
