import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-data-matrix-scanner',
  imports: [TranslateModule],
  templateUrl: './data-matrix-scanner.component.html'
})
export class DataMatrixScannerComponent implements AfterViewInit {
  constructor(private router: Router) {}

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  result: string | null = null;

  ngAfterViewInit(): void {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(undefined, this.videoElement.nativeElement, (res, err) => {
      if (res) {
        this.result = res.getText();

        if (this.isQueryString(this.result))
          this.handleQueryString(this.result);
        else if (this.isAssetCode(this.result))
          this.handleAssetCode(this.result);
      }
    });
  }

  handleAssetCode(code: string) {
    this.router.navigate(['new-ticket', `?code=${code}&type=asset`]).then(() => {
      console.log("Navigated...");
    });
  }

  handleQueryString(code: string) {
    const s = code.split("/");
    this.router.navigate(['new-ticket', s[s.length - 1]]).then(() => {
      console.log("Navigated...");
    });
  }

  isAssetCode(code: string): boolean {
    const parts = code.split("-");
    return parts[0].length === 3
  }

  isQueryString(code: string): boolean {
    const parts = code.split("&");
    return code.indexOf("?") != -1 && parts.length > 1 && parts.every(part => part.includes("="));
  }
}
