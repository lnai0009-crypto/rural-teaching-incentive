/**
 * Map FastAPI explorer location payloads to the flat shape the Vue UI expects.
 * Merges top-level fields with `lifestyle_metrics` when present.
 */

export function toNum(value, fallback = 0) {
  if (value === null || value === undefined || value === '') return fallback
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

/** QLD → '1', NSW → '2' for chip styling; otherwise string of state_id */
export function normalizeStateIdForUi(raw) {
  if (!raw || typeof raw !== 'object') return ''
  const code = String(raw.state_code || raw.stateCode || '').toUpperCase()
  if (code === 'QLD') return '1'
  if (code === 'NSW') return '2'
  const sid = raw.state_id
  if (sid === 1 || sid === '1') return '1'
  if (sid === 2 || sid === '2') return '2'
  return sid != null ? String(sid) : ''
}

export function stateLabelFromRecord(s) {
  const code = String(s?.state_code || s?.stateCode || '').toUpperCase()
  if (code === 'QLD') return 'QLD'
  if (code === 'NSW') return 'NSW'
  const sid = normalizeStateIdForUi(s || {})
  if (sid === '1') return 'QLD'
  if (sid === '2') return 'NSW'
  return s?.state_name || s?.stateName || '—'
}

/**
 * @param {Record<string, unknown>} raw - one row from API (list, detail, compare, or hero)
 * @returns {Record<string, unknown>}
 */
export function normalizeLocationRecord(raw) {
  if (!raw || typeof raw !== 'object') return {}
  const lm =
    raw.lifestyle_metrics && typeof raw.lifestyle_metrics === 'object'
      ? raw.lifestyle_metrics
      : {}
  const pick = (key, fb = null) => {
    if (raw[key] !== undefined && raw[key] !== null && raw[key] !== '') return raw[key]
    if (lm[key] !== undefined && lm[key] !== null && lm[key] !== '') return lm[key]
    return fb
  }
  const metricValue = (m) => {
    if (m === null || m === undefined || m === '') return null
    if (typeof m === 'object') {
      const v = m.value
      return v === null || v === undefined || v === '' ? null : String(v)
    }
    return String(m)
  }

  const id = raw.id ?? raw.location_id ?? raw.locationId
  const rid = raw.remoteness_id ?? raw.remoteness_category_id ?? raw.remotenessCategoryId

  return {
    ...raw,
    id,
    state_id: normalizeStateIdForUi(raw),
    remoteness_id: rid != null ? String(rid) : '',
    remoteness:
      raw.remoteness_name ||
      raw.remotenessName ||
      raw.remoteness ||
      pick('remoteness_name', '—'),
    type: raw.location_type_name || raw.locationTypeName || raw.type || '—',
    lat: raw.latitude != null ? toNum(raw.latitude, NaN) : raw.lat != null ? toNum(raw.lat, NaN) : null,
    lng: raw.longitude != null ? toNum(raw.longitude, NaN) : raw.lng != null ? toNum(raw.lng, NaN) : null,
    annual_incentive: toNum(raw.annual_incentive ?? raw.annualIncentive, 0),
    healthcare_count: toNum(raw.healthcare_count ?? raw.healthcareCount, 0),
    distance_to_city: toNum(raw.distance_to_city ?? raw.distanceToCity, 0),
    nearest_city: (() => {
      const v = pick('nearest_city')
      return v != null && v !== '' ? String(v) : '—'
    })(),
    median_rent: toNum(pick('median_rent'), 0),
    median_income: toNum(pick('median_income'), 0),
    median_age: toNum(pick('median_age'), 0),
    crime_rank: toNum(pick('crime_rank'), 0),
    education_count: toNum(pick('education_count'), 0),
    national_parks: toNum(pick('national_parks'), 0),
    nature_reserves: toNum(pick('nature_reserves'), 0),
    healthcare_grade: metricValue(pick('healthcare_grade')),
    education_grade: metricValue(pick('education_grade')),
    inc_label:
      raw.inc_label ||
      raw.incLabel ||
      raw.incentive_label ||
      raw.incentiveLabel ||
      '',
  }
}

export function normalizeLocationList(rows) {
  if (!Array.isArray(rows)) return []
  return rows.map((r) => normalizeLocationRecord(r))
}
