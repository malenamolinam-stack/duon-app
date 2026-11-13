// Lists keys that exist in one language but not the other.
export function findParityGaps(strings) {
  const gaps = [];
  for (const key of Object.keys(strings.es)) {
    if (!Object.hasOwn(strings.en, key)) gaps.push({ missingIn: 'en', key });
  }
  for (const key of Object.keys(strings.en)) {
    if (!Object.hasOwn(strings.es, key)) gaps.push({ missingIn: 'es', key });
  }
  return gaps;
}
