import { Component, OnInit } from '@angular/core';
import { OAuthAuthorizationDetails } from '@supabase/supabase-js';
import { SupabaseService } from '@revore/services/supabase.service';
import { saveOAuthReturnUrl } from './oauth-return';

type ConsentState = 'loading' | 'login' | 'consent' | 'error';

const SCOPE_LABELS: Record<string, string> = {
    openid: 'Confirmar tu identidad',
    email: 'Ver tu correo electrónico',
    profile: 'Ver tu nombre y foto de perfil',
};

/**
 * Pantalla de consentimiento del OAuth 2.1 Server de Supabase.
 * Supabase redirige aquí con ?authorization_id=... cuando un cliente (p. ej. Claude vía MCP)
 * pide acceso; el usuario aprueba o rechaza y el SDK lo regresa al cliente.
 */
@Component({
    selector: 'app-revore-oauth-consent',
    standalone: true,
    templateUrl: './oauth-consent.component.html',
    styleUrl: './oauth-consent.component.scss',
})
export class OAuthConsentComponent implements OnInit {
    state: ConsentState = 'loading';
    errorMessage = '';
    details: OAuthAuthorizationDetails | null = null;
    scopes: string[] = [];
    isSubmitting = false;

    private authorizationId: string | null = null;

    constructor(private supabaseS: SupabaseService) {}

    async ngOnInit(): Promise<void> {
        this.authorizationId = new URLSearchParams(window.location.search).get('authorization_id');
        if (!this.authorizationId) {
            this.showError('Falta el parámetro authorization_id. Vuelve a iniciar la conexión desde la aplicación.');
            return;
        }

        const { data: { session } } = await this.supabaseS.db.auth.getSession();
        if (!session) {
            this.state = 'login';
            return;
        }

        const { data, error } = await this.supabaseS.db.auth.oauth.getAuthorizationDetails(this.authorizationId);
        if (error || !data) {
            console.error('[oauth-consent] getAuthorizationDetails', error);
            this.showError('No se pudo cargar la solicitud de autorización. Es posible que haya expirado.');
            return;
        }

        // El usuario ya había dado su consentimiento: Supabase solo devuelve la URL de regreso
        if (!('authorization_id' in data)) {
            window.location.assign(data.redirect_url);
            return;
        }

        this.details = data;
        this.scopes = data.scope.split(' ').filter(Boolean).map(s => SCOPE_LABELS[s] ?? s);
        this.state = 'consent';
    }

    async signInWithGoogle(): Promise<void> {
        if (this.isSubmitting) return;
        this.isSubmitting = true;
        saveOAuthReturnUrl(window.location.pathname + window.location.search);
        await this.supabaseS.db.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/revore/auth/callback` },
        });
    }

    async approve(): Promise<void> {
        await this.decide('approve');
    }

    async deny(): Promise<void> {
        await this.decide('deny');
    }

    private async decide(action: 'approve' | 'deny'): Promise<void> {
        if (!this.authorizationId || this.isSubmitting) return;
        this.isSubmitting = true;

        // Por defecto el SDK redirige el navegador al cliente con el code (o el error)
        const { error } = action === 'approve'
            ? await this.supabaseS.db.auth.oauth.approveAuthorization(this.authorizationId)
            : await this.supabaseS.db.auth.oauth.denyAuthorization(this.authorizationId);

        if (error) {
            console.error(`[oauth-consent] ${action}Authorization`, error);
            this.isSubmitting = false;
            this.showError('No se pudo procesar tu respuesta. Vuelve a iniciar la conexión desde la aplicación.');
        }
    }

    private showError(message: string): void {
        this.errorMessage = message;
        this.state = 'error';
    }
}
