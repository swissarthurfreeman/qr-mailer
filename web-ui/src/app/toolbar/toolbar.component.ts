import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSelectModule,
    TranslateModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  languages = ['fr', 'en'];
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
  }

  changeLang(event: any) {
    this.translate.use(event.value);
    this.currentLang = event.value;
  }
}