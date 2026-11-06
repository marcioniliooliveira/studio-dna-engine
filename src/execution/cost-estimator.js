function unknownEstimate(usage, model, service) {
  return Object.freeze({ usd: null, estimated: false, rateVersion: null, model, service, usage: structuredClone(usage) });
}

function integer(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function timestamp(at) {
  const value = at instanceof Date ? at.getTime() : new Date(at).getTime();
  return Number.isFinite(value) ? value : null;
}

function decimal(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const text = String(value);
  if (!/^\d+(?:\.\d+)?$/.test(text)) return null;
  const [, whole, fraction = ''] = text.match(/^(\d+)(?:\.(\d+))?$/);
  return { digits: BigInt(`${whole}${fraction}`), scale: fraction.length };
}

function selectRate(rateCard, model, service, at) {
  if (!rateCard || !Array.isArray(rateCard.rates) || at === null) return null;
  const matching = rateCard.rates.filter((rate) => {
    const from = timestamp(rate.effectiveFrom);
    const until = rate.effectiveUntil === null ? Infinity : timestamp(rate.effectiveUntil);
    return rate.model === model && rate.service === service && from !== null && until !== null && from <= at && at <= until;
  });
  return matching.length === 1 ? matching[0] : null;
}

function roundRational(numerator, denominator) {
  return (numerator + denominator / 2n) / denominator;
}

function estimateCost(usage, rateCard, at) {
  const source = usage && typeof usage === 'object' ? usage : usage;
  const model = source?.model ?? source?.m;
  const service = source?.service ?? source?.svc;
  const normalized = {
    inputTokens: source?.inputTokens ?? source?.it,
    cachedTokens: source?.cachedTokens ?? source?.ct,
    outputTokens: source?.outputTokens ?? source?.ot,
    cacheWriteTokens: source?.cacheWriteTokens
  };
  if (typeof model !== 'string' || typeof service !== 'string' || Object.values(normalized).some((value) => !integer(value)) || normalized.cachedTokens > normalized.inputTokens) {
    return unknownEstimate(usage, model, service);
  }
  const rate = selectRate(rateCard, model, service, timestamp(at));
  if (!rate) return unknownEstimate(usage, model, service);
  const prices = [rate.inputUsdPerMillion, rate.outputUsdPerMillion, rate.cacheReadUsdPerMillion, rate.cacheWriteUsdPerMillion].map(decimal);
  if (prices.some((price) => price === null)) return unknownEstimate(usage, model, service);
  const scale = Math.max(...prices.map((price) => price.scale));
  const factor = (price) => price.digits * 10n ** BigInt(scale - price.scale);
  const tokens = [normalized.inputTokens - normalized.cachedTokens, normalized.outputTokens, normalized.cachedTokens, normalized.cacheWriteTokens];
  const microUsd = roundRational(tokens.reduce((sum, count, index) => sum + BigInt(count) * factor(prices[index]), 0n), 10n ** BigInt(scale));
  if (microUsd > BigInt(Number.MAX_SAFE_INTEGER)) return unknownEstimate(usage, model, service);
  return Object.freeze({
    usd: Number(microUsd) / 1_000_000,
    estimated: true,
    rateVersion: rate.version,
    model,
    service,
    usage: structuredClone(usage)
  });
}

module.exports = { estimateCost };
