1. ###General amplifier systems

    1. Amplifiers increase the power of signals
    2. A typical amplifier system has the following subsystems:

        1. A signal source, such as a microphone
        2. A preamplifier, such as a voltage amplifier, to increase the amplitude of the signal voltage, as well as the signal-to-noise ratio
        3. A mixer, to combine the signal from several sources
        4. A power amplifier, that amplifies the voltage, but more notable the current
        5. A signal output, such as a loudspeaker
    3. The gain of a voltage amplifier is [[G = {{: V^OUT^ :}|{: V^IN^ :}}]]
    4. If the input signal goes so high that the output signal would go above the supply voltage, the output signal is clipped at the supply voltage
    5. Amplifiers contain components that respond differently at different frequencies, so the gain goes down at higher frequencies
    6. The bandwidth of an amplifier is the frequency at which the voltage gain falls to 70% of the maximum gain[^bandwidth]
    7. The higher the voltage gain, the lower the bandwidth: [[gain⋅bandwidth = constant]]
    8. Multiple-stage voltage amplifiers are used when both high gain & bandwidth are needed
2. ###Operational amplifiers

    1. ####Non-inverting amplifier

        1. Circuit diagram: ![Non-inverting amplifier circuit diagram](/gcse/img/electronics/noninvertingamplifier.png)
        2. The gain is [[G = 1 + {{: R^2^ :}|{: R^1^ :}}]]
    2. ####Inverting amplifier

        1. Circuit diagram: ![Inverting amplifier circuit diagram](/gcse/img/electronics/invertingamplifier.png)
        2. The gain is [[G = -{{: R^f^ :}|{: R^in^ :}}]]
    3. ####Summing amplifier

        1. Circuit diagram for an op-amp summing amplifier: ![Summing amplifier circuit diagram](/gcse/img/electronics/summingamplifier.png)
        2. The gain is [[G = -R^f^∙{{: <span style="position: relative; top: 1em; left: .25em; font-size: .7em;">n</span> :}{: <span style="font-size: 2em;">Σ</span> :}{: <span style="position: relative; top: -1em; left: -.25em; font-size: .7em;">i=0</span> :}}{{: V^i^ :}|{: R^i^ :}}]]



[^bandwidth]: The bandwidth is more accurately the point at which the power gain falls to half the maximum gain, which is where voltage gain falls to [[{{: 1 :}|{: √2 :}}]]
