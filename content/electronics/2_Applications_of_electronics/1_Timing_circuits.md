1. ###Resistor-capacitor network

    1. A capacitor is a component that can store energy electrostatically, and consists of two conducting plates, separated by a dielectric
    2. When there is a potential difference across the plates, positive charge collects on one plate and negative charge on the other until the voltage drop across the capacitor reaches the supply voltage
    3. The capacitor can then be used to a circuit, discharging it until the voltage drop across the capacitor reaches 0
    4. A capacitor with a single resistor in series charges & discharges at a predictable exponential rate, whereby the time it takes for the voltage drop to rise to [[V^CC^(1 - {{: 1 :}|{: e :}})]] or fall to [[{{: V^CC^ :}|{: e :}}]] respectively is the product of the resistance & capacitance: [[t = RC]].
    5. This (dis)charging rate means that an RC circuit can be used as a time-delay circuit
    6. An RC circuit cannot be used to drive a load directly since drawing current from the circuit would change the (dis)charging rate, so the output must be buffered
2. ###Monostable

    1. A monostable is a circuit that produces a single pulse when triggered
    2. A 555 timer IC can be configured as a monostable: ![Monostable circuit diagram](/gcse/img/electronics/monostable.png)
    3. The length of the pulse is directly proportional to the sizes of the resistor & capacitor: [[t = 1.1RC]][^monostable]
3. ###Astable

    1. An astable is a circuit that produces a continuous train of OFF-ON pulses
    2. A 555 timer IC can be configured as an astable: ![Astable circuit diagram](/gcse/img/electronics/astable.png)
    3. The frequency of the pulses can be calculated from the sizes of the resistors & capacitors: [[f = {{: 1.44 :}|{: C⋅(R^1^ + R^2^) :}}]][^astable]



[^monostable]: The time period is more accurately [[t = ln(3)⋅RC]]

[^astable]: The frequency is more accurately [[f = {{: 1 :}|{: ln(2)⋅C⋅(R^1^ + R^2^) :}}]]
