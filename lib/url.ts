export function buildSearchQuery(urlSearchQuery: string) {
  try {
    let url = new URL(urlSearchQuery);
    return Object.fromEntries(url.searchParams.entries());
  } catch {
    return {};
  }
}
