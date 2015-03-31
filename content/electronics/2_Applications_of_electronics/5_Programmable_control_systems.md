1. ###Sequence controllers

    1. Memory is persistent data that is stored in an array of data units
    2. Each data unit stores a number of bits of data that can be handled through a set of pins [[A^0^]] called a data bus
    3. Each data unit has a unique memory address that is chosen through a set of pins called a memory bus
    4. Data can be read or written according to a [[Read/¬Write¬]] pin: when reading, the data from the address referenced by the address bus is outputted through the data buss; when writing, the data from the data bus is stored into the address referenced by the address bus
    5. By connecting a counter to the address bus, a memory IC can be made to output a sequence of preloaded data, and can be made to reset when reaching a certain state using logic
2. Software-based controllers

    1. A microcontroller is a multipurpose chip whose function is programmed into it
    2. It contains its own program memory, data storage memory, input/output ports and a clock oscillator
    3. This allows it to take signals from input sensors and send signals to output devices
    4. A program is a sequence of instructions, which can be represented using a flowchart, which typically contains the following nodes:

        1. ![Start node](/gcse/img/electronics/start.png) Start: a single start node is used to indicate the beginning of every flowchart
        2. ![Stop node](/gcse/img/electronics/stop.png) Stop: used to end program; there can be any number of stop nodes, even none
        3. ![Process node](/gcse/img/electronics/process.png) Process: used for calculations or delays
        4. ![Decision node](/gcse/img/electronics/decision.png) Decision: branches according to whether the conditional in the node is true or false
        5. ![Output node](/gcse/img/electronics/output.png) Output: sends data to an output pin
