1. ###Logic

 1. High/low and 1/0 are two-state logic levels
2. ###Truth tables

    |Gate|               Symbol (ANSI)                |                                                                                                                  Truth table                                                                                                                   |
    |:--:|:------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
    |AND | ![AND gate](/gcse/img/electronics/and.png) |<table><thead><tr><th>A</th><th>B</th><th>Q</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></tbody></table>|
    | OR |  ![OR gate](/gcse/img/electronics/or.png)  |<table><thead><tr><th>A</th><th>B</th><th>Q</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></tbody></table>|
    |NOT | ![NOT gate](/gcse/img/electronics/not.png) |<table><thead><tr><th>A</th><th>NOT A</th>      </tr></thead><tbody><tr><td>0</td><td>1</td>          </tr><tr><td>1</td><td>0</td>          </tr>                                                                              </tbody></table>|
    |NOR | ![NOR gate](/gcse/img/electronics/nor.png) |<table><thead><tr><th>A</th><th>B</th><th>Q</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></tbody></table>|
    |NAND|![NAND gate](/gcse/img/electronics/nand.png)|<table><thead><tr><th>A</th><th>B</th><th>Q</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></tbody></table>|
3. ###Gates from a truth table

    1. The simplest way of devising a system of gates from a truth table is to use the AND-OR method
    2. This is done by taking the inputs of each row of the table that has a high output, inverting the inputs that must be low, then ANDing them with all the inputs that must be high
    3. Then, OR the outputs of the systems constructed from each row
4. ###Boolean notation

    1. Boolean notation can be used as a shorthand notation for expressing a truth table
    2. [[A AND B = A⋅B]]
    3. [[A OR B = A+B]]
    4. [[NOT A = ¬A¬]]
    5. [[A NOR B = ¬A+B¬]]
    6. [[A NAND B = ¬A⋅B¬]]
5. ###NAND gates

    1. The NAND gate is called the universal logic gate, since all other logic systems can be constructed from it
    2. [[A AND B = (A NAND B) NAND (A NAND B)]]
    3. [[A OR B = (A NAND A) NAND (B NAND B)]]
    4. [[NOT A = A NAND A]]
    5. [[A NOR B = ((A NAND A) NAND (B NAND B)) NAND ((A NAND A) NAND (B NAND B))]]
6. ###Pull up/down resistors

    1. When an input of a gate is not connected, such as if a switch connecting it to an input voltage is open, the input is left floating and cannot be resolved into a boolean value
    2. A pull up/down resistor connecting the input to the input voltage pulls the voltage of the input high or low respectively when the switch is open
