import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import queryString from 'query-string';
import { KeyValuePipe } from '@angular/common';
import { KeyPairComponent } from "./key-pair/key-pair.component";
import { ProblemDetailComponent } from "./problem-detail/problem-detail.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../shared/services/ticket.service';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";



interface Dictionary<T> {
  [Key: string]: T;
}

export interface KeyPair {
  label: FormControl<string>;
  text: FormControl<string>;
}

export interface CheckBoxPair {
  label: FormControl<string>;
  value: FormControl<boolean>;
}

export interface ContactDetails {
  email: FormControl<string>;
  emailChecked: FormControl<boolean>;
}

// this might become more complex in the future, yeah but YAGNI
export interface TicketFormGroup {
  keypairs: FormArray<FormGroup<KeyPair>>;
  choices: FormArray<FormGroup<CheckBoxPair>>;
  comment: FormControl<string | null>;
  contact: FormGroup<ContactDetails>;
}


@Component({
  selector: 'app-new-ticket-form-container',
  imports: [
    MatButtonModule,
    KeyPairComponent,
    ProblemDetailComponent,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    ContactDetailsComponent
],
  templateUrl: './new-ticket-form-container.component.html'
})
export class NewTicketFormContainerComponent implements OnInit {

  t = input<string>();
  parsed: Dictionary<string> = {};
  equipmentType: string = '';

  ticketFormGroup!: FormGroup<TicketFormGroup>;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.ticketFormGroup = new FormGroup<TicketFormGroup>({
      comment: new FormControl<string>(''),
      keypairs: new FormArray<FormGroup<KeyPair>>([]),
      choices: new FormArray<FormGroup<CheckBoxPair>>([]),
      contact: new FormGroup<ContactDetails>({
        email: new FormControl<string>('', { nonNullable: true }),
        emailChecked: new FormControl<boolean>(false, { nonNullable: true })
      })
    });
    this.AddKeyPairs();
  }

  AddKeyPairs() {
    if (this.t()) {
      this.parsed = queryString.parse(this.t() as string) as Dictionary<string>;
      console.log(this.parsed);

      for (let key in this.parsed) {
        this.ticketFormGroup.controls.keypairs.push(new FormGroup<KeyPair>({
          label: new FormControl(key, { nonNullable: true }),
          text: new FormControl(this.parsed[key], { nonNullable: true })
        }));
      }

      
      this.equipmentType = this.parsed['type'];
      if(this.equipmentType === 'Printer') {
        this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.paper-jam", false));
        this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.no-paper", false));
        this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.toner", false));
        this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.other", false));

      } else if(this.equipmentType === undefined && this.parsed['code'] && this.parsed['code'].split("-")[0].length === 3) {
        this.equipmentType = "Équipement Asset"
      } else {
        throw new Error("Equipment Type not supported.");
      }

    } else {
      throw new Error("Not implemented yet when no querystring.")
    }
  }

  buildCheckBoxPair(label: string, value: boolean) {
    return new FormGroup<CheckBoxPair>({
      label: new FormControl(label, { nonNullable: true }),
      value: new FormControl(value, { nonNullable: true })
    })
  }

  ticketService = inject(TicketService);

  submitTicket() {
    console.log("Submit ticket")
    this.ticketService.postTicket(this.ticketFormGroup.getRawValue()).subscribe(value => console.log(value));
  }

  changeLang() {
    this.translate.use('en');
  }
}

