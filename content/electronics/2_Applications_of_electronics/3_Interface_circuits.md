1. ###Inputs

    1. Signals from analogue sensors can be converted into logic levels for digital systems using interfaces such as transistors, which turn on or off at a single threshold, comparators, which compares the signal to a reference voltage, and Schmitt inverters
    2. A Schmitt inverter gate has two different input switching levels so that the traditional effect of noise at the switching level causing the gate to switch many times is negated, resulting in a clean switch
    3. Schmitt inverters are needed to connect a noisy signal to a counting system so that supernumerary switchings are not counted
    4. Schmitt inverters can be used to debounce mechanical switches by connecting a capacitor across the switch that suppresses the noise, and using a Schmitt inverter to remove it completely
2. ###Outputs

    1. Transistors can be used as switches or amplifiers
    2. When [[V^IN^ < 0.7 V]], the voltage across the base & emitter is [[V^BE^ = V^IN^]] and the voltage across the collector & emitter is [[V^CE^ = supply voltage]], and when [[V^IN^ ≥ 0.7 V]], [[V^BE^ = 0.7 V]] & [[V^CE^ = 0 V]]
    3. Because [[V^BE^]] saturates at 0.7 V, a current-limiting resistor must be connected to base
    4. Transistors amplify current according to the formula [[h^FE^ = {{: I^C^ :}|{: I^B^ :}}]], wherein [[I^C^]] is the current going into the collector and [[I^B^]] is the current going into the base
    5. Every transistor has a distinct current gain and collector current, which must be taken into account for circuit calculations, such as calculating the value of the current-limiting resistor
