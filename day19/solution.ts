/* 
--- Day 19: Aplenty ---
To start, each part is rated in each of four categories:

x: Extremely cool looking
m: Musical (it makes a noise when you hit it)
a: Aerodynamic
s: Shiny
Then, each part is sent through a series of workflows that will ultimately accept or reject the part. Each workflow has a name and contains a list of rules; each rule specifies a condition and where to send the part if the condition is true. The first rule that matches the part being considered is applied immediately, and the part moves on to the destination described by the rule. (The last rule in each workflow has no condition and always applies if reached.)

Consider the workflow ex{x>10:one,m<20:two,a>30:R,A}. This workflow is named ex and contains four rules. If workflow ex were considering a specific part, it would perform the following steps in order:

Rule "x>10:one": If the part's x is more than 10, send the part to the workflow named one.
Rule "m<20:two": Otherwise, if the part's m is less than 20, send the part to the workflow named two.
Rule "a>30:R": Otherwise, if the part's a is more than 30, the part is immediately rejected (R).
Rule "A": Otherwise, because no other rules matched the part, the part is immediately accepted (A).
If a part is sent to another workflow, it immediately switches to the start of that workflow instead and never returns. If a part is accepted (sent to A) or rejected (sent to R), the part immediately stops any further processing.

The system works, but it's not keeping up with the torrent of weird metal shapes. The Elves ask if you can help sort a few parts and give you the list of workflows and some part ratings (your puzzle input). For example:

px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
The workflows are listed first, followed by a blank line, then the ratings of the parts the Elves would like you to sort. All parts begin in the workflow named in. In this example, the five listed parts go through the following workflows:

{x=787,m=2655,a=1222,s=2876}: in -> qqz -> qs -> lnx -> A
{x=1679,m=44,a=2067,s=496}: in -> px -> rfg -> gd -> R
{x=2036,m=264,a=79,s=2244}: in -> qqz -> hdj -> pv -> A
{x=2461,m=1339,a=466,s=291}: in -> px -> qkq -> crn -> R
{x=2127,m=1623,a=2188,s=1013}: in -> px -> rfg -> A
Ultimately, three parts are accepted. Adding up the x, m, a, and s rating for each of the accepted parts gives 7540 for the part with x=787, 4623 for the part with x=2036, and 6951 for the part with x=2127. Adding all of the ratings for all of the accepted parts gives the sum total of 19114.

Sort through all of the parts you've been given; what do you get if you add together all of the rating numbers for all of the parts that ultimately get accepted?
*/

export const part1 = (input: string) => {
  const data = input.split('\n\n')
  const workflows = data[0].split('\n').map((workflow) => {
    const [name, rules] = workflow.split('{')
    return {
      name,
      rules: rules
        .slice(0, -1)
        .split(',')
        .map((rule) => {
          const [condition, destination] = rule.split(':')
          return { condition, destination }
        }),
    }
  })
  const parts = data[1].split('\n').map((part) => {
    const [x, m, a, s] = part
      .slice(1, -1)
      .split(',')
      .map((p) => parseInt(p.split('=')[1]))
    return { x, m, a, s }
  })

  const ratings = parts.map((part) => {
    const { x, m, a, s } = part
    const calcRating = () => Object.values(part).reduce((a, b) => a + b)

    let next: string | undefined
    let workflow = workflows.find((workflow) => workflow.name === 'in')
    while (workflow !== undefined) {
      const rules = workflow.rules
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        const { condition, destination } = rule
        if (destination === undefined) {
          next = condition
          if (condition === 'A') {
            return calcRating()
          } else if (condition === 'R') {
            return 0
          }
          break
        }

        const operation = condition.includes('>') ? '>' : '<'
        const [variable, value] = condition.split(operation)
        const theVar =
          variable === 'x' ? x : variable === 'm' ? m : variable === 'a' ? a : s
        if (operation === '>') {
          next = theVar > parseInt(value) ? destination : undefined
        } else {
          next = theVar < parseInt(value) ? destination : undefined
        }

        if (next === 'A') return calcRating()
        else if (next === 'R') return 0
        else if (next !== undefined) break
      }
      workflow = workflows.find((workflow) => workflow.name === next)
    }
    return 0
  })

  return ratings.reduce((a, b) => a + b)
}

/*
--- Part Two ---
Even with your help, the sorting process still isn't fast enough.

One of the Elves comes up with a new plan: rather than sort parts individually through all of these workflows, maybe you can figure out in advance which combinations of ratings will be accepted or rejected.

Each of the four ratings (x, m, a, s) can have an integer value ranging from a minimum of 1 to a maximum of 4000. Of all possible distinct combinations of ratings, your job is to figure out which ones will be accepted.

In the above example, there are 167409079868000 distinct combinations of ratings that will be accepted.

Consider only your list of workflows; the list of part ratings that the Elves wanted you to sort is no longer relevant. How many distinct combinations of ratings will be accepted by the Elves' workflows?
*/

export const part2 = (input: string) => {
  const data = input.split('\n\n')
  const pruneList: string[] = []
  const shortcutList: string[] = []
  const workflows = data[0].split('\n').map((workflow) => {
    const [name, rules] = workflow.split('{')
    const destinations = rules
      .slice(0, -1)
      .split(',')
      .map((rule) => {
        const [, destination] = rule.split(':')
        return destination || rule
      })
    if (destinations.every((d) => d === 'A')) {
      // mark this workflow as always accepting
      // this will be used to optimize the search
      // rename name to be 'A'
      // update all other workflows that point to this workflow
      // to point to 'A' instead
      shortcutList.push(name)
      return {
        name: 'A',
        destinations: [],
      }
    }
    if (destinations.every((d) => d === 'R')) {
      // mark this workflow as always rejecting
      // this will be used to optimize the search
      // rename name to be 'R'
      // update all other workflows that point to this workflow
      // to point to 'R' instead
      pruneList.push(name)
      return {
        name: 'R',
        destinations: [],
      }
    }
    return {
      name,
      destinations,
    }
  })
  // .filter((workflow) => workflow.name !== 'A' && workflow.name !== 'R')

  const temp = workflows.map((workflow) => {
    if (pruneList.some(workflow.destinations.some((d) => d === 'R'))) {
      return {
        name: 'R',
        destinations: [],
      }
    } else if (shortcutList.includes(workflow.name)) {
      return {
        name: 'A',
        destinations: [],
      }
    } else {
      return workflow
    }
  })

  console.log(workflows)
}

/* 
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

in  -> px  -> qkq -> A;  in -> qqz
s<1351 a<2006 x<1416

*/
