/*
--- Day 20: Pulse Propagation ---
Modules communicate using pulses. Each pulse is either a high pulse or a low pulse. When a module sends a pulse, it sends that type of pulse to each module in its list of destination modules.

There are several different types of modules:

Flip-flop modules (prefix %) are either on or off; they are initially off. If a flip-flop module receives a high pulse, it is ignored and nothing happens. However, if a flip-flop module receives a low pulse, it flips between on and off. If it was off, it turns on and sends a high pulse. If it was on, it turns off and sends a low pulse.

Conjunction modules (prefix &) remember the type of the most recent pulse received from each of their connected input modules; they initially default to remembering a low pulse for each input. When a pulse is received, the conjunction module first updates its memory for that input. Then, if it remembers high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.

There is a single broadcast module (named broadcaster). When it receives a pulse, it sends the same pulse to all of its destination modules.

Here at Desert Machine Headquarters, there is a module with a single button on it called, aptly, the button module. When you push the button, a single low pulse is sent directly to the broadcaster module.

After pushing the button, you must wait until all pulses have been delivered and fully handled before pushing it again. Never push the button if modules are still processing pulses.

Pulses are always processed in the order they are sent. So, if a pulse is sent to modules a, b, and c, and then module a processes its pulse and sends more pulses, the pulses sent to modules b and c would have to be handled first.

The module configuration (your puzzle input) lists each module. The name of the module is preceded by a symbol identifying its type, if any. The name is then followed by an arrow and a list of its destination modules. For example:

broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
In this module configuration, the broadcaster has three destination modules named a, b, and c. Each of these modules is a flip-flop module (as indicated by the % prefix). a outputs to b which outputs to c which outputs to another module named inv. inv is a conjunction module (as indicated by the & prefix) which, because it has only one input, acts like an inverter (it sends the opposite of the pulse type it receives); it outputs to a.

By pushing the button once, the following pulses are sent:

button -low-> broadcaster
broadcaster -low-> a
broadcaster -low-> b
broadcaster -low-> c
a -high-> b
b -high-> c
c -high-> inv
inv -low-> a
a -low-> b
b -low-> c
c -low-> inv
inv -high-> a
After this sequence, the flip-flop modules all end up off, so pushing the button again repeats the same sequence.

Here's a more interesting example:

broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
This module configuration includes the broadcaster, two flip-flops (named a and b), a single-input conjunction module (inv), a multi-input conjunction module (con), and an untyped module named output (for testing purposes). The multi-input conjunction module con watches the two flip-flop modules and, if they're both on, sends a low pulse to the output module.

Here's what happens if you push the button once:

button -low-> broadcaster
broadcaster -low-> a
a -high-> inv
a -high-> con
inv -low-> b
con -high-> output
b -high-> con
con -low-> output
Both flip-flops turn on and a low pulse is sent to output! However, now that both flip-flops are on and con remembers a high pulse from each of its two inputs, pushing the button a second time does something different:

button -low-> broadcaster
broadcaster -low-> a
a -low-> inv
a -low-> con
inv -high-> b
con -high-> output
Flip-flop a turns off! Now, con remembers a low pulse from module a, and so it sends only a high pulse to output.

Push the button a third time:

button -low-> broadcaster
broadcaster -low-> a
a -high-> inv
a -high-> con
inv -low-> b
con -low-> output
b -low-> con
con -high-> output
This time, flip-flop a turns on, then flip-flop b turns off. However, before b can turn off, the pulse sent to con is handled first, so it briefly remembers all high pulses for its inputs and sends a low pulse to output. After that, flip-flop b turns off, which causes con to update its state and send a high pulse to output.

Finally, with a on and b off, push the button a fourth time:

button -low-> broadcaster
broadcaster -low-> a
a -low-> inv
a -low-> con
inv -high-> b
con -high-> output
This completes the cycle: a turns off, causing con to remember only low pulses and restoring all modules to their original states.

To get the cables warmed up, the Elves have pushed the button 1000 times. How many pulses got sent as a result (including the pulses sent by the button itself)?

In the first example, the same thing happens every time the button is pushed: 8 low pulses and 4 high pulses are sent. So, after pushing the button 1000 times, 8000 low pulses and 4000 high pulses are sent. Multiplying these together gives 32000000.

In the second example, after pushing the button 1000 times, 4250 low pulses and 2750 high pulses are sent. Multiplying these together gives 11687500.

Consult your module configuration; determine the number of low pulses and high pulses that would be sent after pushing the button 1000 times, waiting for all pulses to be fully handled after each push of the button. What do you get if you multiply the total number of low pulses sent by the total number of high pulses sent?

*/
interface BasicNode {
  name: string
  output: 0 | 1
  outputNodes: string[]
}

interface Broadcaster extends BasicNode {
  type: 'broadcaster'
  output: 0
}

interface FlipFlop extends BasicNode {
  type: 'flipflop'
}

interface Conjunction extends BasicNode {
  type: 'conjunction'
  state: Record<string, number>
  inputNodes: string[]
}

type Node = FlipFlop | Conjunction

export const part1 = (input: string) => {
  let broadcaster = {} as Broadcaster
  const graph: Node[] = input
    .split('\n')
    .map((line) => {
      const [name, edgeCluster] = line.split(' -> ')
      const edges = edgeCluster.split(', ')
      if (name.startsWith('%')) {
        return {
          name: name.slice(1),
          output: 0,
          outputNodes: edges,
          type: 'flipflop',
        } as FlipFlop
      } else if (name.startsWith('&')) {
        return {
          name: name.slice(1),
          state: {},
          output: 0,
          inputNodes: [], // need to populate
          outputNodes: edges,
          type: 'conjunction',
        } as Conjunction
      } else {
        broadcaster = {
          name,
          output: 0,
          outputNodes: edges,
          type: 'broadcaster',
        } as Broadcaster
      }
    })
    .filter((n) => n !== undefined) as Node[]

  // populate inputNodes for conjunctions
  ;(
    graph.filter((node) => node.type === 'conjunction') as Conjunction[]
  ).forEach((conjunc) => {
    const pointsToThisConjunction = graph.filter((node) =>
      node.outputNodes.includes(conjunc.name)
    )
    conjunc.inputNodes = pointsToThisConjunction.map((node) => node.name)
    conjunc.state = Object.fromEntries(
      conjunc.inputNodes.map((node) => [node, 0])
    )
  })

  pressButton(broadcaster, graph)
  console.log(graph)
  return 0
}

const pressButton = (broadcaster: Broadcaster, graph: Node[]) => {
  const nextNodes: { node: string; input: 0 | 1 }[] = []
  let lowPulses = 1
  let highPulses = 0
  broadcaster.outputNodes.forEach((outputNodeName) => {
    broadcaster.output === 0 ? lowPulses++ : highPulses++
    nextNodes.push({ node: outputNodeName, input: broadcaster.output })
  })

  let cycles = 0
  let current = nextNodes.shift() as { node: string; input: 0 | 1 }
  const init = processNode(graph, current)
  lowPulses = init.lowPulses + 1
  highPulses = init.highPulses
  nextNodes.push(...init.nextNodes)
  current = nextNodes.shift() as { node: string; input: 0 | 1 }
  let flipFlops = graph.filter((node) => node.type === 'flipflop') as FlipFlop[]
  while (!flipFlops.every((node) => node.output === 0)) {
    const processed = processNode(graph, current)

    lowPulses += processed.lowPulses
    highPulses += processed.highPulses
    nextNodes.push(...processed.nextNodes)
    cycles++
    current = nextNodes.shift() as { node: string; input: 0 | 1 }
  }
}

const processNode = (
  graph: Node[],
  current: { node: string; input: 0 | 1 }
) => {
  let lowPulses = 0
  let highPulses = 0
  const nextNodes: { node: string; input: 0 | 1 }[] = []

  const currNode = graph.find((node) => node.name === current?.node) as Node
  const input = current?.input as 0 | 1
  currNode.outputNodes.forEach((outputNodeName) => {
    const processed =
      currNode.type === 'flipflop'
        ? processFlipFlop(currNode as FlipFlop, input)
        : processConjunction(currNode as Conjunction, outputNodeName, input)
    processed.output === 0 ? lowPulses++ : highPulses++
    nextNodes.push({ node: outputNodeName, input: processed.output })
  })

  return { lowPulses, highPulses, nextNodes }
}

const processFlipFlop = (node: FlipFlop, incomingPulse: 0 | 1) => {
  if (incomingPulse === 0) {
    const newState = node.output === 0 ? 1 : 0
    node.output = newState
  }
  return node
}

// may need to change this to handle multiple inputs
const processConjunction = (
  node: Conjunction,
  inputNode: string,
  pulse: 0 | 1
) => {
  // node.state[inputNode] = pulse
  if (Object.values(node.state).every((value) => value === 1)) {
    node.output = 0
  } else {
    node.output = 1
  }
  return node
}
