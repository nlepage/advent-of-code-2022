const input = `78, 53, 89, 51, 52, 59, 58, 85
old * 3
5
2
7

64
old + 7
2
3
6

71, 93, 65, 82
old + 5
13
5
4

67, 73, 95, 75, 56, 74
old + 8
19
6
0

85, 91, 90
old + 4
11
3
1

67, 96, 69, 55, 70, 83, 62
old * 2
3
4
1

53, 86, 98, 70, 64
old + 6
7
7
0

88, 64
old * old
17
2
5`

function allez(R, z) {
  const M = input
    .split('\n\n')
    .map(a => {
      const [b, c, d, e, f] = a.split('\n')
      const i = b.split(', ').map(z => +z)
      const [o1, op, o2] = c.split(' ')
      return {
        i,
        o1: o1 === 'old' ? undefined : +o1,
        op,
        o2: o2 === 'old' ? undefined : +o2,
        d: +d,
        t: +e,
        f: +f,
        x: 0,
      }
    })
  
  const D = M.reduce((a, m) => a * m.d, 1)

  for (let r = 0; r < R; r++) {
    for (const m of M) {
      let i;
      while (i = m.i.shift()) {
        let { o1 = i, o2 = i } = m
        switch (m.op) {
        case '+':
          i = o1 + o2
          break
        case '*':
          i = o1 * o2
          break
        }
        if (z) i = Math.floor(i / 3)
        M[i % m.d === 0 ? m.t : m.f].i.push(z ? i : (i % D))
        m.x++
      }
    }
  }

  console.log(M.map(({ x }) => x).sort((a, b) => a - b).slice(-2).reduce((a, b) => a * b))
}

allez(20, true)
allez(10000, false)
