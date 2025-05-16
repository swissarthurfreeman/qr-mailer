import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import queryString from 'query-string';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  imports: [
    ZXingScannerModule
  ]
})
export class ScannerComponent {

  constructor(private router: Router) {}
  
  qrResultString: string = '';

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    
    const s = resultString.split("/");
    
    console.log("Navigate to ", ['new-ticket', s[s.length - 1]]);
    
    this.router.navigate(['new-ticket', s[s.length - 1]]).then(() => {
      console.log("Navigated...");
    });
  }
}