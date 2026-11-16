// A synthetic route diagnoses hosting behavior; it does not gate a release.
export function classifyMissingRoute(status) {
  if (status === 404) return { outcome: 'confirmed', detail: 'Synthetic route returned HTTP 404' };
  if (status == null || status >= 500 || status === 429) return { outcome: 'unconfirmed', detail: status == null ? 'Synthetic route request failed' : `Synthetic route could not be verified: HTTP ${status}` };
  return { outcome: 'unexpected', detail: `Synthetic route returned unexpected HTTP ${status}` };
}

export async function probeMissingRoute(request) {
  try {
    const response = await request.get('./__ams_live_missing_route__/', { timeout: 10000, maxRetries: 0, maxRedirects: 0 });
    return { ...classifyMissingRoute(response.status()), status: response.status() };
  } catch (error) {
    return { ...classifyMissingRoute(null), error: String(error) };
  }
}
