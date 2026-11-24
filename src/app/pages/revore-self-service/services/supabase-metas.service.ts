import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@environments/environments.local';

// Cliente Supabase para Metas. Apunta al MISMO proyecto que SupabaseService
// (xujscamqorwckpqamnie), pero nunca inicia sesión: todas sus llamadas llegan a
// la base como rol `anon`. Pendiente de retirar: Metas debe pasar a
// SupabaseService, como ya se hizo con Orígenes, para poder cerrar las
// políticas de anon en "Metas".
@Injectable({ providedIn: 'root' })
export class SupabaseMetasService {
    private readonly _client: SupabaseClient;

    constructor() {
        this._client = createClient(
            environment.supabaseMetas.url,
            environment.supabaseMetas.anonKey,
            {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                    storageKey: 'revore_metas_auth',
                },
            }
        );
    }

    get db(): SupabaseClient {
        return this._client;
    }
}
