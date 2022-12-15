const input = `1555825,18926 1498426,-85030
697941,3552290 595451,3788543
3997971,2461001 3951198,2418718
3818312,282332 4823751,1061753
2874142,3053631 3074353,3516891
1704479,2132468 1749091,2000000
3904910,2080560 3951198,2418718
657061,3898803 595451,3788543
3084398,3751092 3074353,3516891
2582061,972407 1749091,2000000
2886721,3971936 3074353,3516891
303399,548513 -1010425,986825
3426950,2290126 3951198,2418718
3132858,3592272 3074353,3516891
3773724,3751243 3568452,3274758
3987212,2416515 3951198,2418718
61559,3806326 595451,3788543
2693503,2291389 2269881,2661753
3953437,2669220 3951198,2418718
763035,3997568 595451,3788543
3999814,2370103 3951198,2418718
1290383,1696257 1749091,2000000
3505508,2805537 3568452,3274758
3276207,3323122 3568452,3274758
2244609,3517499 3074353,3516891
1370860,3436382 595451,3788543
3831063,3042662 3568452,3274758
551202,3971545 595451,3788543
336629,2519780 595451,3788543
2033602,2882628 2269881,2661753
3939808,2478271 3951198,2418718
1958708,2370822 1749091,2000000
3039958,3574483 3074353,3516891`

const testInput = `2,18 -2,15
9,16 10,16
13,2 15,3
12,14 10,16
10,20 10,16
14,17 10,16
8,7 2,10
2,0 2,10
0,11 2,10
20,14 25,17
17,20 21,22
16,7 15,3
14,3 15,3
20,1 15,3`

const y = 2000000
const testY = 10

console.log(
  input
    .split('\n')
    .map(l => l.split(' ').map(s => s.split(',').map(c => +c)))
    .map(([s, b]) => [s, b,  Math.abs(b[0] - s[0]) + Math.abs(b[1] - s[1]), Math.abs(y - s[1])])
    .filter(([, , d, D]) => d >= D)
    .map(([[sx], , d, D]) => [sx - d + D, sx + d - D])
    .sort(([a], [b]) => a - b)
    .reduce(
      (a, b) => {
        if (a.length === 0) return [b]
        const l = a.at(-1)
        if (b[0] > l[1]) a.push(b)
        else l[1] = Math.max(l[1], b[1])
        return a
      },
      [],
    ).map(([l, r]) => r - l)
    .reduce((a, b) => a + b)
)
