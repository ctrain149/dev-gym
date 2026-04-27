%% sim-06: Loss-of-Flow Accident (LOFA) Scenario
% TODO: Copy reactor_thermal.m and:
%   - At t=10s, reduce flow from 10 to 2 kg/s (pump failure)
%   - Include safety trip from safety_trip.m
%   - Plot 4 panels: T_fuel, T_cool, Power, Flow rate
%   - Verify: safety trip fires BEFORE T_fuel reaches 1200°C
%   - This models what real RELAP/WCOBRA codes simulate at Westinghouse
