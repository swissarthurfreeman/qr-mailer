import { Component, input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactDetails, KeyPair } from '../new-ticket-form-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { KeyPairComponent } from '../key-pair/key-pair.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-contact-details',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, TranslateModule, MatCheckboxModule],
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent implements OnInit {

  contactFormGroup = input<FormGroup<ContactDetails>>();

  ngOnInit(): void {}
}
