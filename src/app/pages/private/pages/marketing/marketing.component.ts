import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environments/environments.local';
import { HeaderComponent } from '@private/shared/components/header/header.component';
import { IHeader } from '@private/shared/interfaces/header.interface';

@Component({
	selector: 'app-marketing',
	standalone: true,
	imports: [HeaderComponent],
	template: `
		<app-header [data]="headerData" />
		<section class="mkt">
			<div class="mkt__bar">
				<span class="mkt__eyebrow">Atelier · Estudio de marca</span>
				<a class="mkt-btn" [href]="atelierUrl" target="_blank" rel="noopener">Abrir en pantalla completa</a>
			</div>
			<div class="mkt__frame">
				<iframe [src]="safeAtelierUrl" title="Atelier" allow="clipboard-write"></iframe>
			</div>
		</section>
	`,
	styles: [`
		:host { display: block; margin-top: -20px; }
		.mkt { padding: 0 24px 0; display: flex; flex-direction: column; }
		.mkt__bar { display: flex; align-items: center; gap: 12px; margin: 0 4px 10px; }
		.mkt__eyebrow { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: .12em;
			text-transform: uppercase; color: #657A9B; flex: 1; }
		.mkt-btn { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; border-radius: 4px;
			padding: 7px 14px; cursor: pointer; text-decoration: none; white-space: nowrap;
			background: #fff; border: 1px solid #D5D5DD; color: #2E3C59; }
		.mkt-btn:hover { background: #F7F8FA; border-color: #2E3C59; }
		.mkt__frame { border: 1px solid #E8E9ED; border-radius: 8px; overflow: hidden;
			background: #111B30; box-shadow: 0 2px 8px rgba(17,27,48,.08); }
		.mkt__frame iframe { width: 100%; height: calc(100vh - 128px); min-height: 680px; border: 0; display: block; }
	`],
})
export class MarketingComponent {
	headerData: IHeader = { title: 'Marketing', margin_top: '45px' };

	readonly atelierUrl: string;
	readonly safeAtelierUrl: SafeResourceUrl;

	constructor(sanitizer: DomSanitizer) {
		// Pasa la URL del backend al Atelier para que jale desarrolladores/proyectos de la base.
		// Se usa tanto en el iframe incrustado como en el link "Abrir en pantalla completa",
		// para que los desarrolladores carguen en ambos casos.
		const api = encodeURIComponent(environment.revore.backendUrl);
		this.atelierUrl = `assets/atelier/index.html?api=${api}`;
		this.safeAtelierUrl = sanitizer.bypassSecurityTrustResourceUrl(this.atelierUrl);
	}
}
