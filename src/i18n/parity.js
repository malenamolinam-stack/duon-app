// Lists keys that exist in one language but not the other.
export function findParityGaps(strings) {
  const gaps = [];
  for (const key of Object.keys(strings.es)) {
    if (!(key in strings.en)) gaps.push({ missingIn: 'en', key });
  }
  for (const key of Object.keys(strings.en)) {
    if (!(key in strings.es)) gaps.push({ missingIn: 'es', key });
  }
  return gaps;
}
