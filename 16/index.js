const input = `JZ,0,IR,LY
KD,0,NJ,ZS
VW,0,IT,VH
HS,0,OC,PN
EU,19,GQ
XF,0,WL,QD
DD,8,GQ,YY,JV,SK
TA,0,NJ,VJ
IR,9,JZ,WI,VJ,GC,WG
SS,17,SI,IZ,RK,WI
SG,0,NV,NJ
IT,0,LL,VW
CP,24,HN,ZK,EJ
SK,0,LL,DD
IS,0,AA,LL
HN,0,FF,CP
VH,10,QO,VW,RV,PN
JV,0,DD,RK
ZS,0,KD,LL
UC,25,JD,IV
WI,0,SS,IR
UR,0,QD,LY
GC,0,AA,IR
YY,0,DD,AA
IV,0,ZK,UC
BM,0,SA,WL
JD,0,IZ,UC
WL,12,EF,BM,EJ,XF
AA,0,NV,YY,GC,IS,QO
WG,0,LL,IR
GQ,0,EU,DD
SI,0,SS,NJ
KH,13,SA,ON
PC,22,ON
QD,14,XF,UR
IZ,0,SS,JD
QO,0,AA,VH
SA,0,BM,KH
NV,0,AA,SG
ZK,0,CP,IV
ON,0,PC,KH
PN,0,HS,VH
RV,0,NJ,VH
RK,0,SS,JV
OC,18,HS
EF,0,LY,WL
VJ,0,TA,IR
LL,5,ZS,IT,SK,IS,WG
FF,0,HN,LY
LY,21,EF,FF,UR,JZ
EJ,0,WL,CP
NJ,6,RV,KD,SG,SI,TA`

const testInput = `AA,0,DD,II,BB
BB,13,CC,AA
CC,2,DD,BB
DD,20,CC,AA,EE
EE,3,FF,DD
FF,0,EE,GG
GG,0,FF,HH
HH,22,GG
II,0,AA,JJ
JJ,21,II`

const z = input.split('\n').map(l => l.split(',')).map(([v, p, ...t]) => [v, +p, t])

const P = new Map(z.filter(([, p]) => p))
// console.log(P)
const T = new Map(z.map(([v, , t]) => [v, t]))

const E = new Map(Array.from(P.keys(), v => [v, fsp(v)]))
// console.log(E)

function fsp(sv) {
  const R = []
  const V = new Set([sv])
  const Q = T.get(sv).map(v => [v, 1])
  const X = sv === 'AA' ? P.size : P.size - 1
  while (R.length !== X) {
    const [v, c] = Q.shift()
    if (V.has(v)) continue
    if (P.has(v)) R.push([v, c])
    Q.push(...T.get(v).map(v => [v, c + 1]))
    V.add(v)
  }
  return R
}

const Q = fsp('AA').map(([v, c]) => [v, 29 - c, (29 - c) * P.get(v), [v]])
let B = 0

while (Q.length) {
  const [v, m, p, V] = Q.shift()
  const e = E.get(v)
  const n = e.filter(([v]) => !V.includes(v)).map(([v, c]) => [v, m - c - 1]).filter(([, m]) => m > 0)
  if (n.length === 0) B = Math.max(B, p)
  Q.push(...n.map(([v, m]) => [v, m, p + m * P.get(v), [...V, v]]))
}

console.log(B)
