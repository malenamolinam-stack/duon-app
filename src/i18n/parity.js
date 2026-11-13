// Lists keys that exist in one language but not the other.
export function findParityGaps(strings) {
  return [
    ...missingKeys(strings.es, strings.en, 'en'),
    ...missingKeys(strings.en, strings.es, 'es'),
  ];
}

// Keys present in `source` that `target` lacks, tagged with the language that is missing them.
function missingKeys(source, target, missingIn) {
  return Object.keys(source)
    .filter((key) => !Object.hasOwn(target, key))
    .map((key) => ({ missingIn, key }));
}
