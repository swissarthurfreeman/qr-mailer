import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataMatrixScannerComponent } from "../data-matrix-scanner/data-matrix-scanner.component";

@Component({
  selector: 'app-home-container',
  imports: [MatButtonModule, DataMatrixScannerComponent],
  templateUrl: './home-container.component.html'
})
export class HomeContainerComponent {}




