(function(){json={"/gcse/electronics/":"","/gcse/electronics/1/1/":"\n        <ol>\n          <li>A system can be defined as something that responds in a predictable way when it receives input signals</li>\n          <li>Electronic systems can be divided up into three sections: input sensing, signal processing and output devices</li>\n          <li>The subsystems in an electronic system can be represented as individual blocks in a block diagram, with arrows showing the path of signal</li>\n        </ol>\n","/gcse/electronics/1/2/":"\n        <ol>\n          <li>\nStandard component symbols: <img src=\"/gcse/img/electronics/symbols.png\" alt=\"Table of component symbols\" title=\"\" />\n          </li>\n          <li>\n            <h3>Current</h3>\n            <ol>\n              <li>Current is the flow of charge and is preserved in a circuit</li>\n              <li>The current at a junction rule states that any junction in a circuit, the sum of the currents flowing into it is equal to the sum of the currents flowing out of it</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Voltage</h3>\n            <ol>\n              <li>Voltage is the electric potential energy per unit charge between two points, and is used up in a circuit</li>\n              <li>The voltage at a point is indicated by calculating the potential difference relative to a 0 V reference using the voltage drops of the components in the circuit</li>\n              <li>Analogue signals continuously vary and digital signals are two-state</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Resistance</h3>\n            <ol>\n              <li>\nResistance is the opposition to current flow and is measured in ohms <i class=\"equation\">Ω</i>\n              </li>\n              <li>\nThe potential difference between two points is equal to the product of the current &amp; resistance: <i class=\"equation\">V = IR</i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>Power</h3>\n            <ol>\n              <li>\nPower is dissipated when current flows through resistance and is measured in Watts <i class=\"equation\">W</i>\n              </li>\n              <li>\nThe power is equal to the product of the voltage &amp; current: <i class=\"equation\">P = VI</i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>Unit prefixes</h3>\n            <table>\n              <thead>\n                <tr>\n                  <th align=\"center\">Prefix</th>\n                  <th align=\"center\">Symbol</th>\n                  <th align=\"center\">Magnitude</th>\n                </tr>\n              </thead>\n              <tr>\n                <td align=\"center\">Mega-</td>\n                <td align=\"center\">M</td>\n                <td align=\"center\">10<sup>6</sup></td>\n              </tr>\n              <tr>\n                <td align=\"center\">Kilo-</td>\n                <td align=\"center\">k</td>\n                <td align=\"center\">10<sup>3</sup></td>\n              </tr>\n              <tr>\n                <td align=\"center\">-</td>\n                <td align=\"center\">-</td>\n                <td align=\"center\">10<sup>0</sup></td>\n              </tr>\n              <tr>\n                <td align=\"center\">Milli-</td>\n                <td align=\"center\">m</td>\n                <td align=\"center\">10<sup>-3</sup></td>\n              </tr>\n              <tr>\n                <td align=\"center\">Micro-</td>\n                <td align=\"center\">μ</td>\n                <td align=\"center\">10<sup>-6</sup></td>\n              </tr>\n              <tr>\n                <td align=\"center\">Nano-</td>\n                <td align=\"center\">n</td>\n                <td align=\"center\">10<sup>-9</sup></td>\n              </tr>\n              <tr>\n                <td align=\"center\">Pico-</td>\n                <td align=\"center\">p</td>\n                <td align=\"center\">10<sup>-12</sup></td>\n              </tr>\n            </table>\n          </li>\n        </ol>\n","/gcse/electronics/1/6/":"\n        <ol>\n          <li>\n            <h3>Principle</h3>\n            <ol>\n              <li>Diodes only conduct when forward biased</li>\n              <li>A diodes can be used to allow a current in one direction and prevent current in the opposite direction in parts of a circuit</li>\n              <li>The forward volt drop across a forward biased silicon diode is about 0.7 V</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Uses</h3>\n            <ol>\n              <li>A diode is used to protect transistors and comparators for circuits that drive motors and solenoids</li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/1/4/":"\n        <ol>\n          <li>\n            <h3>Output devices</h3>\n            <table>\n              <thead>\n                <tr>\n                  <th align=\"center\">Device</th>\n                  <th align=\"center\">Function</th>\n                </tr>\n              </thead>\n              <tr>\n                <td align=\"center\">Buzzer</td>\n                <td align=\"center\">Produces sound</td>\n              </tr>\n              <tr>\n                <td align=\"center\">Lamp</td>\n                <td align=\"center\">Produces light<br>Most are filament lamps that burn out after around 1000 hours of continuous use</td>\n              </tr>\n              <tr>\n                <td align=\"center\">Light-emitting diode (LED)</td>\n                <td align=\"center\">Produces light more efficiently than a lamp, so does not get so hot, in a larger variety of colours, and lasts longer, around 100,000 hours of continuous use</td>\n              </tr>\n              <tr>\n                <td align=\"center\">Motors</td>\n                <td align=\"center\">Produces movement</td>\n              </tr>\n              <tr>\n                <td align=\"center\">Solenoid</td>\n                <td align=\"center\">Produces a magnetic field</td>\n              </tr>\n            </table>\n          </li>\n          <li>\n            <h3>Current-limiting resistor</h3>\n            <ol>\n              <li>If a component drops (virtually) no resistance, if no other components are wired in series, a very high current, effectively infinite, flows through the component, breaking it, so a resistor must be wired in series in order to limit the current</li>\n              <li>For example: an LED drops 2 V and the standard maximum current used to drive it is 350 mA</li>\n              <li>\nThe current-limiting resistor has a resistance calculated using Ohm&#8217;s law: <i class=\"equation\"><span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">e.m.f. - 2 V</span><span class=\"layer text-align-center\">350 mA</span></span></i>\n              </li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/1/7/":"\n        <ol>\n          <li>\n            <h3>Logic</h3>\n            <ol>\n              <li>High/low and 1/0 are two-state logic levels</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Truth tables</h3>\n            <table>\n              <thead>\n                <tr>\n                  <th align=\"center\">Gate</th>\n                  <th align=\"center\">Symbol (ANSI)</th>\n                  <th align=\"center\">Truth table</th>\n                </tr>\n              </thead>\n              <tr>\n                <td align=\"center\">AND</td>\n                <td align=\"center\"><img src=\"/gcse/img/electronics/and.png\" alt=\"AND gate\" title=\"\" /></td>\n                <td align=\"center\">ABQ000010100111</td>\n              </tr>\n              <tr>\n                <td align=\"center\">OR</td>\n                <td align=\"center\"><img src=\"/gcse/img/electronics/or.png\" alt=\"OR gate\" title=\"\" /></td>\n                <td align=\"center\">ABQ000011101111</td>\n              </tr>\n              <tr>\n                <td align=\"center\">NOT</td>\n                <td align=\"center\"><img src=\"/gcse/img/electronics/not.png\" alt=\"NOT gate\" title=\"\" /></td>\n                <td align=\"center\">ANOT A      01          10                                                                                        </td>\n              </tr>\n              <tr>\n                <td align=\"center\">NOR</td>\n                <td align=\"center\"><img src=\"/gcse/img/electronics/nor.png\" alt=\"NOR gate\" title=\"\" /></td>\n                <td align=\"center\">ABQ001010100110</td>\n              </tr>\n              <tr>\n                <td align=\"center\">NAND</td>\n                <td align=\"center\"><img src=\"/gcse/img/electronics/nand.png\" alt=\"NAND gate\" title=\"\" /></td>\n                <td align=\"center\">ABQ001011101110</td>\n              </tr>\n            </table>\n          </li>\n          <li>\n            <h3>Gates from a truth table</h3>\n            <ol>\n              <li>The simplest way of devising a system of gates from a truth table is to use the AND-OR method</li>\n              <li>This is done by taking the inputs of each row of the table that has a high output, inverting the inputs that must be low, then ANDing them with all the inputs that must be high</li>\n              <li>Then, OR the outputs of the systems constructed from each row</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Boolean notation</h3>\n            <ol>\n              <li>Boolean notation can be used as a shorthand notation for expressing a truth table</li>\n              <li>\n                <i class=\"equation\">A AND B = A⋅B</i>\n              </li>\n              <li>\n                <i class=\"equation\">A OR B = A+B</i>\n              </li>\n              <li>\n                <i class=\"equation\">NOT A = <span class=\"negated\">A</sub></i>\n              </li>\n              <li>\n                <i class=\"equation\">A NOR B = <span class=\"negated\">A+B</sub></i>\n              </li>\n              <li>\n                <i class=\"equation\">A NAND B = <span class=\"negated\">A⋅B</sub></i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>NAND gates</h3>\n            <ol>\n              <li>The NAND gate is called the universal logic gate, since all other logic systems can be constructed from it</li>\n              <li>\n                <i class=\"equation\">A AND B = (A NAND B) NAND (A NAND B)</i>\n              </li>\n              <li>\n                <i class=\"equation\">A OR B = (A NAND A) NAND (B NAND B)</i>\n              </li>\n              <li>\n                <i class=\"equation\">NOT A = A NAND A</i>\n              </li>\n              <li>\n                <i class=\"equation\">A NOR B = ((A NAND A) NAND (B NAND B)) NAND ((A NAND A) NAND (B NAND B))</i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>Pull up/down resistors</h3>\n            <ol>\n              <li>When an input of a gate is not connected, such as if a switch connecting it to an input voltage is open, the input is left floating and cannot be resolved into a boolean value</li>\n              <li>A pull up/down resistor connecting the input to the input voltage pulls the voltage of the input high or low respectively when the switch is open</li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/2/1/":"\n        <ol>\n          <li>\n            <h3>Resistor-capacitor network</h3>\n            <ol>\n              <li>A capacitor is a component that can store energy electrostatically, and consists of two conducting plates, separated by a dielectric</li>\n              <li>When there is a potential difference across the plates, positive charge collects on one plate and negative charge on the other until the voltage drop across the capacitor reaches the supply voltage</li>\n              <li>The capacitor can then be used to a circuit, discharging it until the voltage drop across the capacitor reaches 0</li>\n              <li>A capacitor with a single resistor in series charges &amp; discharges at a predictable exponential rate, whereby the time it takes for the voltage drop to rise to <i class=\"equation\">V<sub>CC</sub>(1 - <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">1</span><span class=\"layer text-align-center\">e</span></span>)</i> or fall to <i class=\"equation\"><span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">V^CC</span><span class=\"layer text-align-center\">e</span></span></i> respectively is the product of the resistance &amp; capacitance: <i class=\"equation\">t = RC</i>.</li>\n              <li>This (dis)charging rate means that an RC circuit can be used as a time-delay circuit</li>\n              <li>An RC circuit cannot be used to drive a load directly since drawing current from the circuit would change the (dis)charging rate, so the output must be buffered</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Monostable</h3>\n            <ol>\n              <li>A monostable is a circuit that produces a single pulse when triggered</li>\n              <li>\nA 555 timer IC can be configured as a monostable: <img src=\"/gcse/img/electronics/monostable.png\" alt=\"Monostable circuit diagram\" title=\"\" />\n              </li>\n              <li>\nThe length of the pulse is directly proportional to the sizes of the resistor &amp; capacitor: <i class=\"equation\">t = 1.1RC</i><a href=\"#fn:monostable\" id=\"fnref:monostable\" title=\"See footnote\" class=\"footnote\">1</a>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>Astable</h3>\n            <ol>\n              <li>An astable is a circuit that produces a continuous train of OFF-ON pulses</li>\n              <li>\nA 555 timer IC can be configured as an astable: <img src=\"/gcse/img/electronics/astable.png\" alt=\"Astable circuit diagram\" title=\"\" />\n              </li>\n              <li>\nThe frequency of the pulses can be calculated from the sizes of the resistors &amp; capacitors: <i class=\"equation\">f = <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">1.44</span><span class=\"layer text-align-center\">C⋅(R<sub>1</sub> + R<sub>2</sub>)</span></span></i><a href=\"#fn:astable\" id=\"fnref:astable\" title=\"See footnote\" class=\"footnote\">2</a>\n              </li>\n            </ol>\n          </li>\n        </ol>\n        <div class=\"footnotes\"><hr>\n        <ol>\n          <li id=\"fn:monostable\">\nThe time period is more accurately <i class=\"equation\">t = ln(3)⋅RC</i> <a href=\"#fnref:monostable\" title=\"Return to article\" class=\"reversefootnote\">&#8617;</a>\n          </li>\n          <li id=\"fn:astable\">\nThe frequency is more accurately <i class=\"equation\">f = <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">1</span><span class=\"layer text-align-center\">ln(2)⋅C⋅(R<sub>1</sub> + R<sub>2</sub>)</span></span></i> <a href=\"#fnref:astable\" title=\"Return to article\" class=\"reversefootnote\">&#8617;</a>\n          </li>\n        </ol>\n        </div>","/gcse/electronics/2/2/":"\n        <ol>\n          <li>\n            <h3>D-type flip-flops</h3>\n            <ol>\n              <li>\nCircuit symbol: <img src=\"/gcse/img/electronics/dtype.png\" alt=\"D-type flip-flop circuit symbol\" title=\"\" />\n              </li>\n              <li>In a rising-edge triggered D-type flip-flop, on the rising edge of the clock input, the value of the <i class=\"equation\">D</i> input is copied into the <i class=\"equation\">Q</i> output</li>\n              <li>At all other times, the <i class=\"equation\">Q</i> output is latched</li>\n              <li>\nD-types also have a <i class=\"equation\"><span class=\"negated\">Q</sub></i> output pin that is always the negation of <i class=\"equation\">Q</i>\n              </li>\n              <li>Most D-type ICs have additional input pins <i class=\"equation\">R</i> &amp; <i class=\"equation\">S</i>: the <i class=\"equation\">R</i> &#8220;reset&#8221; pin makes <i class=\"equation\">Q</i> low and the <i class=\"equation\">S</i> &#8220;set&#8221; pin makes <i class=\"equation\">Q</i> high</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Binary counters</h3>\n            <ol>\n              <li>A D-type flip-flop can be configured to produce a divide-by-two function by connecting <i class=\"equation\"><span class=\"negated\">Q</sub></i> to <i class=\"equation\">D</i>, so that on every rising edge of the clock pulse, <i class=\"equation\">Q</i> changes state, resulting in an output pulse that is half the frequency of the input pulse</li>\n              <li>2 D-type flip-flops can be connected together to form a 2-bit binary up-counter by connecting the <i class=\"equation\"><span class=\"negated\">Q</sub></i> of the least significant flip-flop to the clock input of the most significant flip-flop</li>\n              <li>Counters can be made to reset at a given value by using logic that takes the values of the counter as inputs and outputs high only when the desired value is reached, and connecting that output to the reset pins of the counters</li>\n            </ol>\n          </li>\n          <li>\n            <h3>BCD counter</h3>\n            <ol>\n              <li>BCD counters count between 0 &amp; 9, resetting when counting outside those values, and outputs the binary representation of the number</li>\n              <li>BCD counters can be connected to a 7-segment display for human interpretation, using logic to translate the binary outputs into the right segments</li>\n              <li>Dedicated decoder/driver ICs are available that can translate a BCD output into a 7-segment display input, such as a 4051</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Decade counter</h3>\n            <ol>\n              <li>A decade counter counts between 0 &amp; 9, with 10 output pins, each one representing one of the possible outputs</li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/2/3/":"\n        <ol>\n          <li>\n            <h3>Inputs</h3>\n            <ol>\n              <li>Signals from analogue sensors can be converted into logic levels for digital systems using interfaces such as transistors, which turn on or off at a single threshold, comparators, which compares the signal to a reference voltage, and Schmitt inverters</li>\n              <li>A Schmitt inverter gate has two different input switching levels so that the traditional effect of noise at the switching level causing the gate to switch many times is negated, resulting in a clean switch</li>\n              <li>Schmitt inverters are needed to connect a noisy signal to a counting system so that supernumerary switchings are not counted</li>\n              <li>Schmitt inverters can be used to debounce mechanical switches by connecting a capacitor across the switch that suppresses the noise, and using a Schmitt inverter to remove it completely</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Outputs</h3>\n            <ol>\n              <li>Transistors can be used as switches or amplifiers</li>\n              <li>\nWhen <i class=\"equation\">V<sub>IN</sub> &lt; 0.7 V</i> the voltage across the base &amp; emitter is <i class=\"equation\">V<sub>BE</sub> = V<sub>IN</sub></i> and the voltage across the collector &amp; emitter is <i class=\"equation\">V<sub>CE</sub> = supply voltage</i>, and when <i class=\"equation\">V<sub>IN</sub> ≥ 0.7 V</i>, <i class=\"equation\">V<sub>BE</sub> = 0.7 V</i> &amp; <i class=\"equation\">V<sub>CE</sub> = 0.7 V</i>\n              </li>\n              <li>Because <i class=\"equation\">V<sub>BE</sub></i> saturates at 0.7 V, a current-limiting resistor must be connected to base</li>\n              <li>Transistors amplify current according to the formula <i class=\"equation\">h<sub>FE</sub> = <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">I<sub>C</sub></span><span class=\"layer text-align-center\">I<sub>B</sub></span></span></i>, wherein <i class=\"equation\">I<sub>C</sub></i> is the current going into the collector and <i class=\"equation\">I<sub>B</sub></i> is the current going into the base</li>\n              <li>Every transistor has a distinct current gain and collector current, which must be taken into account for circuit calculations, such as calculating the value of the current-limiting resistor</li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/2/5/":"\n        <ol>\n          <li>\n            <h3>Sequence controllers</h3>\n            <ol>\n              <li>Memory is persistent data that is stored in an array of data units</li>\n              <li>Each data unit stores a number of bits of data that can be handled through a set of pins <i class=\"equation\">A<sub>0</sub></i> called a data bus</li>\n              <li>Each data unit has a unique memory address that is chosen through a set of pins called a memory bus</li>\n              <li>Data can be read or written according to a <i class=\"equation\">Read/<span class=\"negated\">Write</sub></i> pin: when reading, the data from the address referenced by the address bus is outputted through the data buss; when writing, the data from the data bus is stored into the address referenced by the address bus</li>\n              <li>By connecting a counter to the address bus, a memory IC can be made to output a sequence of preloaded data, and can be made to reset when reaching a certain state using logic</li>\n            </ol>\n          </li>\n          <li>\n            <p>Software-based controllers</p>\n            <ol>\n              <li>A microcontroller is a multipurpose chip whose function is programmed into it</li>\n              <li>It contains its own program memory, data storage memory, input/output ports and a clock oscillator</li>\n              <li>This allows it to take signals from input sensors and send signals to output devices</li>\n              <li>\n                <p>A program is a sequence of instructions, which can be represented using a flowchart, which typically contains the following nodes:</p>\n                <ol>\n                  <li>\n                    <img src=\"/gcse/img/electronics/start.png\" alt=\"Start node\" title=\"\" /> Start: a single start node is used to indicate the beginning of every flowchart\n                  </li>\n                  <li>\n                    <img src=\"/gcse/img/electronics/stop.png\" alt=\"Stop node\" title=\"\" /> Stop: used to end program; there can be any number of stop nodes, even none\n                  </li>\n                  <li>\n                    <img src=\"/gcse/img/electronics/process.png\" alt=\"Process node\" title=\"\" /> Process: used for calculations or delays\n                  </li>\n                  <li>\n                    <img src=\"/gcse/img/electronics/decision.png\" alt=\"Decision node\" title=\"\" /> Decision: branches according to whether the conditional in the node is true or false\n                  </li>\n                  <li>\n                    <img src=\"/gcse/img/electronics/output.png\" alt=\"Output node\" title=\"\" /> Output: sends data to an output pin\n                  </li>\n                </ol>\n              </li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/1/3/1/":"\n        <ol>\n          <li>\n            <h3>Changing resistance</h3>\n            <ol>\n              <li>\nResistance can be increased by connecting resistors in series: <i class=\"equation\">R = R<sub>1</sub> + R<sub>2</sub></i>\n              </li>\n              <li>\nResistance can be decreased by connecting resistors in parallel: <i class=\"equation\"><span class=\"layered-text\" 1>/{R}</span> = <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">1</span><span class=\"layer text-align-center\">R<sub>1</sub></span></span> + <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">1</span><span class=\"layer text-align-center\">R<sub>2</sub></span></span></i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>Types</h3>\n            <ol>\n              <li>A light-dependent resistor (LDR) is a resistor whose resistance decreases in a non-linear fashion as light intensity increases</li>\n              <li>A &#8220;negative temperature coefficient&#8221; thermistor is a resistor whose resistance decreases in a non-linear fashion as temperature increases</li>\n            </ol>\n          </li>\n          <li>\n            <h3>Practice</h3>\n            <ol>\n              <li>The resistance of a resistor is denoted by bands of colour on them</li>\n              <li>The first bands of colour represent a value that is multiplied by 10 to the power of the penultimate band to calculate the total resistance</li>\n              <li>The final band represents the resistor&#8217;s tolerance</li>\n              <li>\n                <p>Colour code:</p>\n                <table>\n                  <thead>\n                    <tr>\n                      <th align=\"center\">Colour</th>\n                      <th align=\"center\">Value</th>\n                    </tr>\n                  </thead>\n                  <tr>\n                    <td align=\"center\">Black</td>\n                    <td align=\"center\">0</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Brown</td>\n                    <td align=\"center\">1</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Red</td>\n                    <td align=\"center\">2</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Orange</td>\n                    <td align=\"center\">3</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Yellow</td>\n                    <td align=\"center\">4</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Green</td>\n                    <td align=\"center\">5</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Blue</td>\n                    <td align=\"center\">6</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Violet</td>\n                    <td align=\"center\">7</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Grey</td>\n                    <td align=\"center\">8</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">White</td>\n                    <td align=\"center\">9</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Silver</td>\n                    <td align=\"center\">±10%</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\">Gold</td>\n                    <td align=\"center\">±5%</td>\n                  </tr>\n                </table>\n              </li>\n              <li>The E24 series is a logarithmic scale of 24 resistance values to 2 significant figures with a 5% tolerance, from which resistors should be chosen from</li>\n              <li>In practice, when a resistance is needed, the least resistant resistor with a resistance higher than the required resistance is used to limit the current</li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/1/3/2/":"\n        <ol>\n          <li>\nA potential divider circuit is used to produce an output voltage that is a fraction of the input voltage: <img src=\"/gcse/img/electronics/potentialdivider.png\" alt=\"potential divider circuit diagram\" title=\"\" />\n          </li>\n          <li>\nThe potential divider rule states: <i class=\"equation\">V<sub>out</sub> = <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">R<sub>2</sub></span><span class=\"layer text-align-center\">R<sub>1</sub> + R<sub>2</sub></span></span>⋅V<sub>in</sub></i>\n          </li>\n          <li>Fixed resistors can be used in a potential divider to produce an output voltage that is a known fraction of the input voltage</li>\n          <li>A variable resistor can be used in a potential divider to produce an output voltage that is controlled by changing the resistance in the variable resister</li>\n          <li>A potentiometer a three-terminal resistor with a sliding contact that forms an adjustable potential divider</li>\n        </ol>\n","/gcse/electronics/1/3/3/":"\n        <table>\n          <thead>\n            <tr>\n              <th align=\"center\">Type</th>\n              <th align=\"center\">Function</th>\n            </tr>\n          </thead>\n          <tr>\n            <td align=\"center\">Push</td>\n            <td align=\"center\">It causes a temporary change in state whilst physically actuated</td>\n          </tr>\n          <tr>\n            <td align=\"center\">Toggle</td>\n            <td align=\"center\">It is manually actuated by a mechanical lever, handle or rocking mechanism</td>\n          </tr>\n          <tr>\n            <td align=\"center\">Reed</td>\n            <td align=\"center\">It is a pair of contacts on ferrous metal reeds that is actuated in magnetic field</td>\n          </tr>\n          <tr>\n            <td align=\"center\">Micro</td>\n            <td align=\"center\">It is actuated at very high speed by very little physical force but separating the contacts requires significant force in the opposite direction</td>\n          </tr>\n          <tr>\n            <td align=\"center\">Tilt</td>\n            <td align=\"center\">It is actuated using a small amount of liquid mercury, or ball bearings, which falls onto the contacts under gravity when the switch is tilted to an appropriate angle</td>\n          </tr>\n          <tr>\n            <td align=\"center\">Rotary</td>\n            <td align=\"center\">It is operated by rotation and is often used when more than two positions are needed</td>\n          </tr>\n        </table>\n","/gcse/electronics/1/5/1/":"\n        <ol>\n          <li>As an interface between analogue &amp; digital sub-systems</li>\n          <li>As a transducer driver, which amplifies a low current to drive a high-current circuit</li>\n        </ol>\n","/gcse/electronics/1/5/2/":"\n        <ol>\n          <li>\n            <h3>NPN transistor</h3>\n            <ol>\n              <li>\nCircuit diagram: <img src=\"/gcse/img/electronics/npntransistor.png\" alt=\"NPN transistor symbol\" title=\"\" />\n              </li>\n              <li>Leads: corresponding to the diagram with the flat side pointing to the right</li>\n              <li>A small base current be used to control a much larger load current</li>\n              <li>\nThe transistor is off if <i class=\"equation\">V<sub>IN</sub> &lt; 0.7 V</i> and on if <i class=\"equation\">V<sub>IN</sub>  0.7 V</i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>N channel MOSFET</h3>\n            <ol>\n              <li>\nCircuit diagram: <img src=\"/gcse/img/electronics/mosfet.png\" alt=\"MOSFET symbol\" title=\"\" />\n              </li>\n              <li>Leads: corresponding to the diagram with the flat side pointing to the right</li>\n              <li>MOSFET stands for Metal Oxide Semiconductor Field Effect Transistor</li>\n              <li>A MOSFET is on at any non-zero voltage and draws very little current, so is ideal for driving heavy loads from the output of a logic system, since they cannot drive high currents</li>\n            </ol>\n          </li>\n        </ol>\n","/gcse/electronics/1/5/3/":"\n        <ol>\n          <li>\nCircuit diagram: <img src=\"/gcse/img/electronics/thyristor.png\" alt=\"Thyristor symbol\" title=\"\" />\n          </li>\n          <li>Leads: </li>\n          <li>A small gate voltage can be used to latch a large load current whilst forward biased</li>\n          <li>A thyristor can be reset by reversing the current through it</li>\n        </ol>\n","/gcse/electronics/1/5/4/":"\n        <ol>\n          <li>Comparators have a greater sensitivity than transistor switches</li>\n          <li>The output is low if the non-inverting input is lower than the inverting output and high if the non-inverting input is higher than the inverting input</li>\n          <li>Comparators can be used with input sensors so that when the input voltage rises above a certain threshold, the comparator outputs a signal to the rest of the circuit</li>\n          <li>Comparators are unable to drive a very high current so a transistor is often used as a transducer driver</li>\n        </ol>\n","/gcse/electronics/2/4/1/":"\n        <ol>\n          <li>Amplifiers increase the power of signals</li>\n          <li>\n            <p>A typical amplifier system has the following subsystems:</p>\n            <ol>\n              <li>A signal source, such as a microphone</li>\n              <li>A preamplifier, such as a voltage amplifier, to increase the amplitude of the signal voltage, as well as the signal-to-noise ratio</li>\n              <li>A mixer, to combine the signal from several sources</li>\n              <li>A power amplifier, that amplifies the voltage, but more notable the current</li>\n              <li>A signal output, such as a loudspeaker</li>\n            </ol>\n          </li>\n          <li>\nThe gain of a voltage amplifier is <i class=\"equation\">G = <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">V<sub>OUT</sub></span><span class=\"layer text-align-center\">V<sub>IN</sub></span></span></i>\n          </li>\n          <li>If the input signal goes so high that the output signal would go above the supply voltage, the output signal is clipped at the supply voltage</li>\n          <li>Amplifiers contain components that respond differently at different frequencies, so the gain goes down at higher frequencies</li>\n          <li>\nThe bandwidth of an amplifier is the frequency at which the voltage gain falls to 70% of the maximum gain<a href=\"#fn:bandwidth\" id=\"fnref:bandwidth\" title=\"See footnote\" class=\"footnote\">1</a>\n          </li>\n          <li>\nThe higher the voltage gain, the lower the bandwidth: <i class=\"equation\">gain⋅bandwidth = constant</i>\n          </li>\n          <li>Multiple-stage voltage amplifiers are used when both high gain &amp; bandwidth are needed</li>\n        </ol>\n        <div class=\"footnotes\"><hr>\n        <ol>\n          <li id=\"fn:bandwidth\">\nThe bandwidth is more accurately the point at which the power gain falls to half the maximum gain, which is where voltage gain falls to <i class=\"equation\"><span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">1</span><span class=\"layer text-align-center\">√2</span></span></i> <a href=\"#fnref:bandwidth\" title=\"Return to article\" class=\"reversefootnote\">&#8617;</a>\n          </li>\n        </ol>\n        </div>","/gcse/electronics/2/4/2/":"\n        <ol>\n          <li>\n            <h3>Non-inverting amplifier</h3>\n            <ol>\n              <li>\nCircuit diagram: <img src=\"/gcse/img/electronics/noninvertingamplifier.png\" alt=\"Non-inverting amplifier circuit diagram\" title=\"\" />\n              </li>\n              <li>\nThe gain is <i class=\"equation\">G = 1 + <span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">R<sub>F</sub></span><span class=\"layer text-align-center\">R<sub>1</sub></span></span></i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>Inverting amplifier</h3>\n            <ol>\n              <li>\nCircuit diagram: <img src=\"/gcse/img/electronics/invertingamplifier.png\" alt=\"Inverting amplifier circuit diagram\" title=\"\" />\n              </li>\n              <li>\nThe gain is <i class=\"equation\">G = -<span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">R<sub>F</sub></span><span class=\"layer text-align-center\">R<sub>IN</sub></span></span></i>\n              </li>\n            </ol>\n          </li>\n          <li>\n            <h3>Summing amplifier</h3>\n            <ol>\n              <li>\nCircuit diagram for an op-amp summing amplifier: <img src=\"/gcse/img/electronics/summingamplifier.png\" alt=\"Summing amplifier circuit diagram\" title=\"\" />\n              </li>\n              <li>\nThe gain is <i class=\"equation\">G = -R<sub>f</sub>∙<span class=\"layered-text\"><span class=\"layer text-align-center\"><span style=\"position: relative; top: 1em; left: .25em; font-size: .7em;\">n</span></span><span class=\"layer text-align-center\"><span style=\"font-size: 2em;\">Σ</span></span><span class=\"layer text-align-center\"><span style=\"position: relative; top: -1em; left: -.25em; font-size: .7em;\">i=0</span></span></span><span class=\"layered-text\"><span class=\"layer text-align-center layer-line\">V<sub>i</sub></span><span class=\"layer text-align-center\">R<sub>i</sub></span></span></i>\n              </li>\n            </ol>\n          </li>\n        </ol>\n"};for(href in json)sessionStorage.setItem(href,json[href])})();