import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Result } from '@zxing/library';

@Component({
  selector: 'app-data-matrix-scanner',
  imports: [],
  templateUrl: './data-matrix-scanner.component.html'
})
export class DataMatrixScannerComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  result: string | null = null;

  ngAfterViewInit(): void {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(undefined, this.videoElement.nativeElement, (res, err) => {
      //console.log("res", res);
      //console.log("err", err);
      if (res) {
        this.result = res.getText();
        console.log('Decoded text:', this.result);
      }
      if (err) {
        // console.error('Error or no code found', err); // optional for debugging
      }
    });
  }

  ngOnInit(): void {
  }
}
