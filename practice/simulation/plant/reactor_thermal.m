%% sim-06: Simplified Nuclear Reactor Thermal Model
% Coupled ODEs: fuel temperature, coolant temperature, power

% Parameters
C_fuel = 500;    % J/°C  fuel heat capacity
C_cool = 2000;   % J/°C  coolant heat capacity
h = 100;         % W/°C  heat transfer coefficient
flow = 10;       % kg/s  coolant flow rate
Cp = 4180;       % J/(kg·°C) specific heat of water
T_inlet = 280;   % °C    coolant inlet temperature
P0 = 1e6;        % W     initial power (1 MW)
T_fuel0 = 400;   % °C    initial fuel temperature
T_cool0 = 300;   % °C    initial coolant temperature

% TODO: Simulation
% dt = 0.01; t = 0:dt:60;
% Preallocate: T_fuel, T_cool, P arrays
%
% ODE loop:
%   dT_fuel = (P(i) - h*(T_fuel(i) - T_cool(i))) / C_fuel;
%   dT_cool = (h*(T_fuel(i) - T_cool(i)) - flow*Cp*(T_cool(i) - T_inlet)) / C_cool;
%   T_fuel(i+1) = T_fuel(i) + dT_fuel * dt;
%   T_cool(i+1) = T_cool(i) + dT_cool * dt;
%   P(i+1) = P0; % constant power for now
%
% TODO: Plot 3-panel: T_fuel, T_cool, Power vs time
