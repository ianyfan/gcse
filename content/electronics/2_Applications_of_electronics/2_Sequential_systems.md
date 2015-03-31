1. ###D-type flip-flops

    1. Circuit symbol: ![D-type flip-flop circuit symbol](/gcse/img/electronics/dtype.png)
    2. In a rising-edge triggered D-type flip-flop, on the rising edge of the clock input, the value of the [[D]] input is copied into the [[Q]] output
    3. At all other times, the [[Q]] output is latched
    4. D-types also have a [[¬Q¬]] output pin that is always the negation of [[Q]]
    5. Most D-type ICs have additional input pins [[R]] & [[S]]: the [[R]] "reset" pin makes [[Q]] low and the [[S]] "set" pin makes [[Q]] high
2. ###Binary counters

    1. A D-type flip-flop can be configured to produce a divide-by-two function by connecting [[¬Q¬]] to [[D]], so that on every rising edge of the clock pulse, [[Q]] changes state, resulting in an output pulse that is half the frequency of the input pulse
    2. 2 D-type flip-flops can be connected together to form a 2-bit binary up-counter by connecting the [[¬Q¬]] of the least significant flip-flop to the clock input of the most significant flip-flop
    3. Counters can be made to reset at a given value by using logic that takes the values of the counter as inputs and outputs high only when the desired value is reached, and connecting that output to the reset pins of the counters
3. ###BCD counter

    1. BCD counters count between 0 & 9, resetting when counting outside those values, and outputs the binary representation of the number
    2. BCD counters can be connected to a 7-segment display for human interpretation, using logic to translate the binary outputs into the right segments
    3. Dedicated decoder/driver ICs are available that can translate a BCD output into a 7-segment display input, such as a 4051
4. ###Decade counter

    1. A decade counter counts between 0 & 9, with 10 output pins, each one representing one of the possible outputs
