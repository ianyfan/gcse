1. ###Uses

    1. As an interface between analogue & digital sub-systems
    2. As a transducer driver, which amplifies a low current to drive a high-current circuit
2. ###Transistors

    1. ####NPN transistor

        1. Circuit diagram: ![NPN transistor symbol](/gcse/img/electronics/npntransistor.png)
        2. Leads: corresponding to the diagram with the flat side pointing to the right
        3. A small base current be used to control a much larger load current
        4. The transistor is off if [[V^IN^ < 0.7 V]] and on if [[V^IN^  0.7 V]]
    2. ####N channel MOSFET

        1. Circuit diagram: ![MOSFET symbol](/gcse/img/electronics/mosfet.png)
        2. Leads: corresponding to the diagram with the flat side pointing to the right
        3. MOSFET stands for Metal Oxide Semiconductor Field Effect Transistor
        4. A MOSFET is on at any non-zero voltage and draws very little current, so is ideal for driving heavy loads from the output of a logic system, since they cannot drive high currents
3. ###Thyristor

    1. Circuit diagram: ![Thyristor symbol](/gcse/img/electronics/thyristor.png)
    2. Leads: 
    3. A small gate voltage can be used to latch a large load current whilst forward biased
    4. A thyristor can be reset by reversing the current through it
4. ###Voltage comparator

    1. Comparators have a greater sensitivity than transistor switches
    2. The output is low if the non-inverting input is lower than the inverting output and high if the non-inverting input is higher than the inverting input
    3. Comparators can be used with input sensors so that when the input voltage rises above a certain threshold, the comparator outputs a signal to the rest of the circuit
    3. Comparators are unable to drive a very high current so a transistor is often used as a transducer driver
