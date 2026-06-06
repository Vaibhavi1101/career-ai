export function getTopItems(
  items: string[],
  limit = 5
) {
  const counts: Record<string, number> = {};

  items.forEach((item) => {
    if (!item) return;

    counts[item] = (counts[item] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([item]) => item);
}