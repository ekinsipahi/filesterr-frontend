const BASE = import.meta.env.VITE_API_BASE_URL ?? ''

// ── Token helpers ──────────────────────────────────────────────────────────────

function getCsrf() {
  if (typeof document === 'undefined') return ''
  return document.cookie.match(/csrftoken=([^;]+)/)?.[1] ?? ''
}

function getAccessToken() {
  if (typeof localStorage === 'undefined') return ''
  return localStorage.getItem('access_token') ?? ''
}

function storeTokens({ access, refresh } = {}) {
  if (typeof localStorage === 'undefined') return
  if (access)  localStorage.setItem('access_token',  access)
  if (refresh) localStorage.setItem('refresh_token', refresh)
}

// Persistent user cache — survives page reload, API downtime
function cacheUser(user) {
  if (typeof localStorage === 'undefined' || !user) return
  localStorage.setItem('cached_user', JSON.stringify({
    id: user.id, email: user.email, username: user.username,
    plan: user.plan, is_email_verified: user.is_email_verified,
    avatar_url: user.avatar_url,
  }))
}

function getCachedUser() {
  if (typeof localStorage === 'undefined') return null
  try { return JSON.parse(localStorage.getItem('cached_user') || 'null') }
  catch { return null }
}

// ── Refresh logic ──────────────────────────────────────────────────────────────

let refreshPromise = null // prevent concurrent refresh storms

async function tryRefreshToken() {
  if (refreshPromise) return refreshPromise
  refreshPromise = (async () => {
    try {
      const refresh = typeof localStorage !== 'undefined' ? localStorage.getItem('refresh_token') : null
      if (!refresh) return false
      const res = await fetch(`${BASE}/api/v1/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
        credentials: 'include',
      })
      if (!res.ok) return false
      const data = await res.json().catch(() => ({}))
      if (data.access) { localStorage.setItem('access_token', data.access); return true }
      return false
    } catch { return false }
    finally { refreshPromise = null }
  })()
  return refreshPromise
}

// ── Core request with auto-refresh ────────────────────────────────────────────

async function request(path, options = {}, _retried = false) {
  const token = getAccessToken()
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCsrf(),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${BASE}${path}`, { credentials: 'include', ...options, headers })

  // Auto-refresh on 401 (expired access token), but not on auth endpoints or retry loops
  if (
    res.status === 401 &&
    !_retried &&
    path !== '/api/v1/auth/token/refresh/' &&
    path !== '/api/v1/auth/login/'
  ) {
    const refreshed = await tryRefreshToken()
    if (refreshed) return request(path, options, true)  // retry once with new token
    // Refresh failed → clear auth, send to login
    clearAuth()
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = `/login?session=expired&next=${encodeURIComponent(window.location.pathname)}`
    }
  }

  return res
}

// ── Public API ──────────────────────────────────────────────────────────────

export function setUserState(user) {
  if (typeof window === 'undefined' || !user) return
  window.__USER__ = {
    isAuthenticated: true,
    isPro: ['pro', 'promax'].includes(user.plan),
    plan: user.plan,
    email: user.email,
    username: user.username,
  }
  cacheUser(user)
}

export function clearAuth() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('cached_user')
  }
  if (typeof window !== 'undefined') {
    window.__USER__ = { isAuthenticated: false }
  }
}

export async function getMe() {
  const res = await request('/api/v1/auth/me/')
  if (!res.ok) {
    // API down or auth failed — fall back to cached user so UI stays intact
    const cached = getCachedUser()
    if (cached) {
      setUserState(cached)  // re-populate window.__USER__
      return cached
    }
    return null
  }
  const user = await res.json().catch(() => null)
  if (user) setUserState(user)
  return user
}

export async function login(email, password) {
  const res = await request('/api/v1/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const nonField = data.non_field_errors?.[0]
    if (nonField?.code === 'email_not_verified') {
      const err = new Error(nonField.message); err.code = 'email_not_verified'; throw err
    }
    throw new Error(data.detail || data.error || 'Invalid email or password.')
  }
  storeTokens(data)
  const user = await getMe()
  return { ...data, user }
}

export async function resendVerification() {
  const res = await request('/api/v1/auth/resend-verification/', { method: 'POST' })
  if (!res.ok) throw new Error('Failed to resend verification email.')
}

export async function verifyEmail(token) {
  const res = await request(`/api/v1/auth/verify-email/?token=${encodeURIComponent(token)}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error?.message ?? 'Verification failed or link expired.')
  storeTokens(data.tokens)
  if (data.user) setUserState(data.user)
  return data
}

export async function register({ email, username, password, password2, plan }) {
  const res = await request('/api/v1/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ email, username, password, password2, plan }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const field = data.email ?? data.username ?? data.password ?? data.password2
    const msg = Array.isArray(field) ? field[0] : field
    throw new Error(msg ?? data.error ?? data.detail ?? 'Registration failed.')
  }
  storeTokens(data.tokens)
  if (data.user) setUserState(data.user)
  return data
}

export async function forgotPassword(email) {
  const res = await request('/api/v1/auth/forgot-password/', {
    method: 'POST', body: JSON.stringify({ email }),
  })
  if (!res.ok) throw new Error('Request failed. Please try again.')
}

export async function resetPassword(token, password) {
  const res = await request('/api/v1/auth/reset-password/', {
    method: 'POST', body: JSON.stringify({ token, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error?.message ?? data.detail ?? 'Reset failed.')
  return data
}

export async function getPaddlePortalUrl() {
  const res = await request('/api/v1/payments/paddle/portal/')
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error ?? 'Could not open subscription portal.')
  return data.url
}

export async function startOAuth(provider) {
  const res = await request(`/api/v1/auth/${provider}/redirect/`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error('OAuth unavailable. Please try again.')
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('oauth_state', data.state ?? '')
  return data
}

export async function handleOAuthCallback(provider, code, state) {
  const res = await request(`/api/v1/auth/${provider}/callback/`, {
    method: 'POST', body: JSON.stringify({ code, state }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error?.message ?? 'OAuth failed. Please try again.')
  storeTokens(data.tokens)
  if (data.user) setUserState(data.user)
  return data
}
