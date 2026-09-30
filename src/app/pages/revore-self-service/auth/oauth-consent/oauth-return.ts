// Guarda la URL de consentimiento OAuth mientras el usuario hace login con Google,
// para que AuthCallbackComponent lo regrese ahí en lugar del dashboard.
const OAUTH_RETURN_KEY = 'revore_oauth_return';
const CONSENT_PATH = '/oauth/consent';

export function saveOAuthReturnUrl(url: string): void {
    sessionStorage.setItem(OAUTH_RETURN_KEY, url);
}

/** Lee y borra la URL guardada. Solo acepta rutas de consentimiento (evita open redirects). */
export function takeOAuthReturnUrl(): string | null {
    const url = sessionStorage.getItem(OAUTH_RETURN_KEY);
    sessionStorage.removeItem(OAUTH_RETURN_KEY);
    return url?.startsWith(`${CONSENT_PATH}?`) ? url : null;
}
