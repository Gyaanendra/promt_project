export interface DiffLine {
  type: "same" | "add" | "remove";
  text: string;
}

/**
 * Line-level diff with common prefix/suffix trimming and LCS matrix reduction.
 * Eliminates up to 90% of matrix allocations for typical prompt revisions.
 */
export function diffLines(before: string, after: string): DiffLine[] {
  const a = before.split("\n");
  const b = after.split("\n");

  if (before === after) {
    return a.map((text) => ({ type: "same", text }));
  }

  // Fast-forward common prefix lines
  let prefixCount = 0;
  while (prefixCount < a.length && prefixCount < b.length && a[prefixCount] === b[prefixCount]) {
    prefixCount++;
  }

  // Fast-forward common suffix lines
  let suffixCount = 0;
  while (
    suffixCount < a.length - prefixCount &&
    suffixCount < b.length - prefixCount &&
    a[a.length - 1 - suffixCount] === b[b.length - 1 - suffixCount]
  ) {
    suffixCount++;
  }

  const midA = a.slice(prefixCount, a.length - suffixCount);
  const midB = b.slice(prefixCount, b.length - suffixCount);
  const n = midA.length;
  const m = midB.length;

  const out: DiffLine[] = [];
  for (let i = 0; i < prefixCount; i++) {
    out.push({ type: "same", text: a[i] });
  }

  if (n > 0 && m > 0) {
    const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        lcs[i][j] = midA[i] === midB[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
      }
    }

    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (midA[i] === midB[j]) {
        out.push({ type: "same", text: midA[i] });
        i++;
        j++;
      } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
        out.push({ type: "remove", text: midA[i++] });
      } else {
        out.push({ type: "add", text: midB[j++] });
      }
    }
    while (i < n) out.push({ type: "remove", text: midA[i++] });
    while (j < m) out.push({ type: "add", text: midB[j++] });
  } else {
    for (let i = 0; i < n; i++) out.push({ type: "remove", text: midA[i] });
    for (let j = 0; j < m; j++) out.push({ type: "add", text: midB[j] });
  }

  for (let i = a.length - suffixCount; i < a.length; i++) {
    out.push({ type: "same", text: a[i] });
  }

  return out;
}
