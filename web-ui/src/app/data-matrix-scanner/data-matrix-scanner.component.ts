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

        if (this.isURLOfNewTicket(this.result))
          this.handleURLOfNewTicket(this.result);
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

  handleURLOfNewTicket(url: string) {
    // for example, 'https://website.com/mailer/new-ticket?type=printer&code=I5040&model=Zebra%20TLP%202844-Z&serialNumber=45A053500255'
    console.log("router navigate", url);
    window.location.href = url;
  }

  isAssetCode(code: string): boolean {
    const parts = code.split("-");
    return parts[0].length === 3
  }

  isURLOfNewTicket(code: string): boolean {
    console.log("code :", code);
    const parts = code.split("&");
    return code.indexOf("?") != -1 && code.indexOf("new-ticket") != -1 && parts.length > 1 && parts.every(part => part.includes("="));
  }
}
