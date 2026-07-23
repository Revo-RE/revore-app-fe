import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@private/shared/components/header/header.component';
import { IHeader } from '@private/shared/interfaces/header.interface';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { EStates } from '@shared/enums/states.enum';
import { IToast } from '@shared/interfaces/toast.interface';
import { AlertasService } from '../../services/alertas.service';
import {
    Alerta,
    autoName,
    CANALES_ALERTA,
    TIPOS_ALERTA,
} from '../../models/alerta.model';

@Component({
    selector: 'app-alertas-listado',
    standalone: true,
    imports: [CommonModule, RouterLink, HeaderComponent, ToastComponent],
    template: `
        <app-header [data]="headerData" />
        <section class="content">
            <div class="toolbar">
                <a routerLink="/dashboard/alertas/crear" class="btn-primary">+ Nueva alerta</a>
            </div>

            @if (alertas().length === 0) {
                <div class="empty">No hay alertas configuradas todavía.</div>
            } @else {
                <table class="alertas-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cliente</th>
                            <th>Tipo</th>
                            <th>Canal</th>
                            <th>Periodicidad</th>
                            <th>Destinatarios</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (alerta of alertas(); track alerta.id) {
                            <tr [class.inactive]="!alerta.activo">
                                <td>{{ nombreMostrado(alerta) }}</td>
                                <td>{{ alerta.developer_name ?? '—' }}</td>
                                <td>{{ labelTipo(alerta) }}</td>
                                <td>{{ labelCanal(alerta) }}</td>
                                <td>{{ formatPeriodicidad(alerta) }}</td>
                                <td>{{ countDestinatarios(alerta) }}</td>
                                <td>
                                    <button
                                        class="ss-toggle"
                                        [class.ss-toggle--on]="alerta.activo"
                                        (click)="toggleAlerta(alerta)"
                                        [title]="alerta.activo ? 'Desactivar' : 'Activar'">
                                        <span class="ss-toggle__knob"></span>
                                    </button>
                                </td>
                                <td>
                                    <div class="actions-cell">
                                        <button class="action-link" (click)="disparar(alerta)" title="Disparar ahora">Disparar</button>
                                        <a [routerLink]="['/dashboard/alertas/editar', alerta.id]" class="action-link" title="Editar">Editar</a>
                                        <button class="action-link action-link-danger" (click)="eliminar(alerta)" title="Eliminar">Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            }

            <!-- Modal de confirmación (eliminar / disparar) -->
            @if (confirmAction()) {
                <div class="modal-overlay" (click)="cancelConfirm()">
                    <div class="modal-dialog" (click)="$event.stopPropagation()">
                        <h3>{{ confirmAction()!.title }}</h3>
                        <p>{{ confirmAction()!.message }}</p>
                        <div class="modal-actions">
                            <button class="btn-secondary" (click)="cancelConfirm()">Cancelar</button>
                            <button
                                class="btn-primary"
                                [class.btn-danger]="confirmAction()!.danger"
                                (click)="acceptConfirm()">
                                {{ confirmAction()!.confirmLabel }}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </section>

        <app-toast [data]="toastData" />
    `,
    styles: [`
        .content { padding: 20px; }
        .toolbar { display: flex; justify-content: flex-end; margin-bottom: 16px; }
        .btn-primary {
            background: #2E3C59; color: white; padding: 10px 18px;
            border-radius: 4px; text-decoration: none; font-weight: 600;
        }
        .btn-primary:hover { background: #111B30; }
        .empty {
            background: white; padding: 40px; border-radius: 8px;
            border: 1px solid #E8E9ED; text-align: center; color: #657A9B;
        }
        .alertas-table {
            width: 100%; border-collapse: collapse; background: white;
            border-radius: 8px; overflow: hidden; border: 1px solid #E8E9ED;
        }
        .alertas-table th, .alertas-table td {
            padding: 12px 16px; text-align: left; border-bottom: 1px solid #E8E9ED;
            font-size: 14px;
        }
        .alertas-table th {
            background: #2E3C59; color: #fff; font-weight: 600;
            font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
            border-bottom: none;
        }
        .alertas-table tbody tr:nth-child(even) td { background: #F7F8FA; }
        .alertas-table tr.inactive td { color: #657A9B; }

        .actions-cell { display: flex; gap: 12px; align-items: center; }

        .ss-toggle {
            width: 44px; height: 24px; border-radius: 12px;
            background: #D5D5DD; border: none; cursor: pointer;
            position: relative; transition: background 0.2s ease; padding: 0;
        }
        .ss-toggle--on { background: #2E3C59; }
        .ss-toggle__knob {
            position: absolute; top: 3px; left: 3px;
            width: 18px; height: 18px; border-radius: 50%;
            background: white; transition: transform 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .ss-toggle--on .ss-toggle__knob { transform: translateX(20px); }

        /* ── Modal ── */
        .modal-overlay {
            position: fixed; inset: 0; background: rgba(17, 27, 48, 0.5);
            display: flex; align-items: center; justify-content: center;
            z-index: 1000; backdrop-filter: blur(2px);
        }
        .modal-dialog {
            background: white; padding: 28px 32px; border-radius: 12px;
            width: 420px; max-width: 90vw;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .modal-dialog h3 {
            margin: 0 0 12px; font-size: 18px; color: #111B30; font-weight: 700;
        }
        .modal-dialog p {
            margin: 0 0 24px; font-size: 14px; color: #3E5170; line-height: 1.5;
        }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
        .modal-actions .btn-primary {
            background: #2E3C59; color: white; border: none; padding: 10px 20px;
            border-radius: 4px; font-weight: 600; cursor: pointer;
        }
        .modal-actions .btn-primary:hover { background: #111B30; }
        .modal-actions .btn-primary.btn-danger { background: #C0394B; }
        .modal-actions .btn-secondary {
            background: white; color: #3E5170; border: 1px solid #D5D5DD;
            padding: 10px 18px; border-radius: 4px; font-weight: 500; cursor: pointer;
        }
    `]
})
export class AlertasListadoComponent implements OnInit {
    headerData: IHeader = {
        title: 'Alertas automáticas',
        description: 'Gestiona y configura todas tus alertas automáticas en un solo lugar',
        margin_top: '45px'
    };

    private readonly svc = inject(AlertasService);
    readonly alertas = signal<Alerta[]>([]);

    toastData: IToast = { isOpen: false, type: EStates.success, message: '' };

    readonly confirmAction = signal<{
        title: string;
        message: string;
        confirmLabel: string;
        danger: boolean;
        onAccept: () => void;
    } | null>(null);

    private showToast(message: string, type: EStates = EStates.success) {
        this.toastData = { isOpen: true, type, message };
    }

    cancelConfirm(): void {
        this.confirmAction.set(null);
    }

    acceptConfirm(): void {
        const action = this.confirmAction();
        if (!action) return;
        action.onAccept();
        this.confirmAction.set(null);
    }

    ngOnInit(): void {
        this.svc.list().subscribe(list => this.alertas.set(list));
    }

    nombreMostrado(a: Alerta): string {
        if (a.nombre) return a.nombre;
        const base = autoName(a);
        const scope = a.developer_group_name || a.sub_project_name;
        return scope ? `${base} · ${scope}` : base;
    }

    countDestinatarios(a: Alerta): string {
        if (a.canal === 'whatsapp') {
            const n = a.destinatarios.telefonos?.length ?? 0;
            return `${n} teléfono(s)`;
        }
        const to = a.destinatarios.to?.length ?? 0;
        const cc = a.destinatarios.cc?.length ?? 0;
        const bcc = a.destinatarios.bcc?.length ?? 0;
        const extras = [cc && `${cc} CC`, bcc && `${bcc} BCC`].filter(Boolean).join(', ');
        return extras ? `${to} TO · ${extras}` : `${to} TO`;
    }

    toggleAlerta(alerta: Alerta): void {
        if (!alerta.id) return;
        const activo = !alerta.activo;
        this.svc.toggle(alerta.id, activo).subscribe(() => {
            this.alertas.update(list =>
                list.map(a => (a.id === alerta.id ? { ...a, activo } : a))
            );
        });
    }

    eliminar(alerta: Alerta): void {
        if (!alerta.id) return;
        this.confirmAction.set({
            title: 'Eliminar alerta',
            message: `Esta acción no se puede deshacer. ¿Eliminar "${this.nombreMostrado(alerta)}"?`,
            confirmLabel: 'Eliminar',
            danger: true,
            onAccept: () => {
                this.svc.delete(alerta.id!).subscribe({
                    next: () => {
                        this.alertas.update(list => list.filter(a => a.id !== alerta.id));
                        this.showToast('Alerta eliminada.', EStates.success);
                    },
                    error: (e) => {
                        console.error(e);
                        this.showToast('No se pudo eliminar la alerta.', EStates.error);
                    },
                });
            },
        });
    }

    disparar(alerta: Alerta): void {
        if (!alerta.id) return;
        this.confirmAction.set({
            title: 'Disparar alerta ahora',
            message: `Se enviará "${this.nombreMostrado(alerta)}" a los destinatarios configurados. ¿Continuar?`,
            confirmLabel: 'Disparar',
            danger: false,
            onAccept: () => {
                this.svc.runNow(alerta.id!).subscribe({
                    next: () =>
                        this.showToast(
                            'Alerta encolada. Se procesará en unos segundos — revisa el Historial.',
                            EStates.success
                        ),
                    error: (e) => {
                        console.error(e);
                        this.showToast('No se pudo disparar la alerta.', EStates.error);
                    },
                });
            },
        });
    }

    labelTipo(a: Alerta): string {
        return TIPOS_ALERTA.find(t => t.value === a.tipo)?.label ?? a.tipo;
    }

    labelCanal(a: Alerta): string {
        return CANALES_ALERTA.find(c => c.value === a.canal)?.label ?? a.canal;
    }

    formatPeriodicidad(a: Alerta): string {
        const dias = a.periodicidad.dias.join(', ').toUpperCase();
        return `${dias} · ${a.periodicidad.hora}`;
    }
}
