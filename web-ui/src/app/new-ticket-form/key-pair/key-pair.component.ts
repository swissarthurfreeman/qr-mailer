import { Component, input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyPair } from '../new-ticket-form-container.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-key-pair',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './key-pair.component.html'
})
export class KeyPairComponent implements OnInit {
  ngOnInit(): void {
    console.log("Input FormGroup", this.keypairFormGroup());
  }
  keypairFormGroup = input<FormGroup<KeyPair>>();
}
