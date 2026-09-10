// Practice problem generators.
//
// This is a direct port of worksheet.py — the Python tool used to make the
// class worksheets. Same approach: pick the answer first and build the problem
// backwards from it, so every solution is a whole number.
//
// github.com/anuragchat/worksheet-generator

// ---------------------------------------------------------------------------
// Seeded random. Standing in for Python's random.Random(seed) so that a
// worksheet number always regenerates the same sheet.
// ---------------------------------------------------------------------------
export function makeRng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    random: next,
    randint: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    choice: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
  };
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** A trailing term: " + 5" or " - 5", never " + -5". */
const signed = (n) => ` ${n >= 0 ? '+' : '-'} ${Math.abs(n)}`;

/** A leading x-term: 1 -> "x", -1 -> "-x", 4 -> "4x". */
function xTerm(coef) {
  if (coef === 1) return 'x';
  if (coef === -1) return '-x';
  return `${coef}x`;
}

/** A simplified linear expression: "6x - 4", "x + 5", "-x", "5". */
function linear(coef, constant) {
  if (coef === 0) return String(constant);
  if (constant === 0) return xTerm(coef);
  return xTerm(coef) + signed(constant);
}

/** Right-hand operand: -4 -> "(-4)", 4 -> "4". */
const operand = (n) => (n < 0 ? `(${n})` : String(n));

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

// Never 0, and never 1 or -1 where a bare "x" would make a two-step
// problem into a one-step one.
const COEFFS = [-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9];

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

function oneStepEquation(rng) {
  let x = rng.randint(-12, 12);

  if (rng.random() < 0.5) {
    let a = rng.randint(1, 15);
    if (rng.random() < 0.5) a = -a;
    const b = x + a;
    return { question: `x${signed(a)} = ${b}`, answer: `x = ${x}` };
  }

  // "-9x = 0" is a strange problem to put in front of a student
  if (x === 0) x = rng.choice([-1, 1]) * rng.randint(1, 12);
  const a = rng.choice(COEFFS);
  return { question: `${a}x = ${a * x}`, answer: `x = ${x}` };
}

function twoStepEquation(rng) {
  const x = rng.randint(-10, 10);
  const a = rng.choice(COEFFS);
  const b = rng.choice([-1, 1]) * rng.randint(1, 15); // never 0
  return { question: `${a}x${signed(b)} = ${a * x + b}`, answer: `x = ${x}` };
}

function combiningLikeTerms(rng) {
  const coefs = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let attempt = 0; attempt < 60; attempt++) {
    const terms = [];
    const howMany = rng.choice([2, 2, 3]);
    for (let i = 0; i < howMany; i++) terms.push(['x', rng.choice(coefs)]);
    for (let i = 0; i < 2; i++) terms.push(['c', rng.choice([-1, 1]) * rng.randint(1, 12)]);
    rng.shuffle(terms);

    const [firstKind, firstValue] = terms[0];
    const parts = [firstKind === 'x' ? xTerm(firstValue) : String(firstValue)];

    for (const [kind, value] of terms.slice(1)) {
      if (kind === 'x') parts.push(` ${value > 0 ? '+' : '-'} ${xTerm(Math.abs(value))}`);
      else parts.push(signed(value));
    }

    const question = parts.join('');
    const coef = terms.filter(([k]) => k === 'x').reduce((s, [, v]) => s + v, 0);
    const constant = terms.filter(([k]) => k === 'c').reduce((s, [, v]) => s + v, 0);
    const answer = linear(coef, constant);

    if (!question.includes(answer)) return { question, answer };
  }
  return { question: '2x + 3 + 3x - 1', answer: '5x + 2' };
}

function integerArithmetic(rng) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const op = rng.choice(['+', '-', '×']);
    let a, b;
    if (op === '×') {
      a = rng.randint(2, 12);
      b = rng.randint(2, 12);
    } else {
      a = rng.randint(1, 20);
      b = rng.randint(1, 20);
    }

    // roughly 85% of problems carry a negative
    const roll = rng.random();
    if (roll < 0.4) a = -a;
    else if (roll < 0.7) b = -b;
    else if (roll < 0.85) {
      a = -a;
      b = -b;
    }

    const result = op === '+' ? a + b : op === '-' ? a - b : a * b;
    const question = `${a} ${op} ${operand(b)}`;
    const answer = String(result);

    if (!question.includes(answer)) return { question, answer };
  }
  return { question: '-8 + 5', answer: '-3' };
}

function distributiveProperty(rng) {
  const a = rng.choice(COEFFS);
  const b = rng.choice([-1, 1]) * rng.randint(1, 12);
  return { question: `${a}(x${signed(b)})`, answer: linear(a, a * b) };
}

function fractionAdd(rng) {
  for (let attempt = 0; attempt < 120; attempt++) {
    const d1 = rng.randint(2, 12);
    const d2 = rng.randint(2, 12);
    if (d1 === d2) continue;

    const n1 = rng.randint(1, d1 - 1);
    const n2 = rng.randint(1, d2 - 1);
    // ask the question in lowest terms too
    if (gcd(n1, d1) !== 1 || gcd(n2, d2) !== 1) continue;

    let num = n1 * d2 + n2 * d1;
    let den = d1 * d2;
    const g = gcd(num, den);
    num /= g;
    den /= g;

    const question = `${n1}/${d1} + ${n2}/${d2}`;
    const answer = den === 1 ? String(num) : `${num}/${den}`; // improper, never mixed

    if (!question.includes(answer)) return { question, answer };
  }
  return { question: '1/4 + 2/3', answer: '11/12' };
}

// ---------------------------------------------------------------------------

export const GENERATORS = [
  { id: 'one_step_equation', label: 'One-step equations', example: 'x + 7 = 12', fn: oneStepEquation },
  { id: 'two_step_equation', label: 'Two-step equations', example: '3x + 4 = 19', fn: twoStepEquation },
  { id: 'combining_like_terms', label: 'Combining like terms', example: '4x + 3 + 2x - 7', fn: combiningLikeTerms },
  { id: 'distributive_property', label: 'Distributive property', example: '3(x + 4)', fn: distributiveProperty },
  { id: 'integer_arithmetic', label: 'Signed integers', example: '-8 + 5', fn: integerArithmetic },
  { id: 'fraction_add', label: 'Adding fractions', example: '1/4 + 2/3', fn: fractionAdd },
];

/**
 * Build a worksheet. Same specs and same seed always give the same sheet,
 * so a lost worksheet can be reprinted by its number.
 *
 * Unlike the first version of the Python tool, this one refuses to put the
 * same problem on a sheet twice.
 */
export function buildProblems(specs, seed) {
  const rng = makeRng(seed);
  const problems = [];
  const seen = new Set();

  for (const { id, count } of specs) {
    const generator = GENERATORS.find((g) => g.id === id);
    if (!generator) continue;

    for (let i = 0; i < count; i++) {
      let problem = null;
      for (let attempt = 0; attempt < 40; attempt++) {
        const candidate = generator.fn(rng);
        if (!seen.has(candidate.question)) {
          problem = candidate;
          break;
        }
      }
      if (!problem) problem = generator.fn(rng); // give up rather than loop forever
      seen.add(problem.question);
      problems.push(problem);
    }
  }

  return problems;
}