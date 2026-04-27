%% sim-01: Unit Conversion Functions

function F = c2f(C)
    % Celsius to Fahrenheit
    F = C * 9/5 + 32;
end

function bar_val = psi2bar(psi)
    % 1 bar = 14.5038 psi
    bar_val = psi / 14.5038;
end

function gpm = kgs2gpm(kgs)
    % kg/s to gallons per minute (water, density ~1 kg/L)
    % 1 kg/s = 1 L/s = 15.8503 gpm
    gpm = kgs * 15.8503;
end
