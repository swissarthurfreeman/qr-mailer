import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import queryString from 'query-string';
import { KeyPairComponent } from "./key-pair/key-pair.component";
import { ProblemDetailComponent } from "./problem-detail/problem-detail.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../shared/services/ticket.service';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { error } from 'console';
import { Ticket } from '../shared/model/Ticket.model';
import { TicketType } from '../shared/model/TicketType.enum';
import { ActivatedRoute } from '@angular/router';


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
  equipmentType!: TicketType;

  ticketFormGroup!: FormGroup<TicketFormGroup>;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute) { }

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
    this.route.queryParams.subscribe(parsed => {
      console.log(parsed);

      for (let key in parsed) {
        this.ticketFormGroup.controls.keypairs.push(new FormGroup<KeyPair>({
          label: new FormControl(key, { nonNullable: true }),
          text: new FormControl(parsed[key], { nonNullable: true })
        }));
      }

      this.equipmentType = parsed['type'].toUpperCase() as TicketType;
      console.log(this.equipmentType);
      switch (this.equipmentType) {
        case TicketType.PRINTER:
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.paper-jam", false));
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.no-paper", false));
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.toner", false));
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.other", false));
          break;
        case TicketType.MEETING_ROOM:
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.sound", false));
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.image", false));
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.conference", false));
          this.ticketFormGroup.controls.choices.push(this.buildCheckBoxPair("app.form.checkboxes.other", false));
          break;
        case TicketType.ASSET:
          // add custom checkboxes for asset, for now none required.
          break;
        default:
          throw new Error("Equipment Type not supported.");
      }
    });
  }

  buildCheckBoxPair(label: string, value: boolean) {
    return new FormGroup<CheckBoxPair>({
      label: new FormControl(label, { nonNullable: true }),
      value: new FormControl(value, { nonNullable: true })
    })
  }

  ticketService = inject(TicketService);

  submitTicket() {
    console.log("Submit ticket");
    console.log(this.formToTicket(this.ticketFormGroup));

    this.ticketService.postTicket(this.formToTicket(this.ticketFormGroup))
      .subscribe({
        complete: () => {
          this.openConfirmationDialog();
        },
        error: (err) => {
          this.openConfirmationDialog();
          console.error("Error while submitting ticket", err);
        },
      });
  }

  formToTicket(form: FormGroup<TicketFormGroup>): Ticket {
    const ticket = new Ticket();

    ticket.formFields = {};

    form.controls.keypairs.controls.forEach((keypair) => {
      ticket.formFields[keypair.controls.label.value] = keypair.controls.text.value;
    });

    ticket.formCheckBoxes = {};
    form.controls.choices.controls.forEach((checkbox) => {
      ticket.formCheckBoxes[checkbox.controls.label.value] = checkbox.controls.value.value;
    });


    ticket.contactEmail = form.controls.contact.controls.email.value;
    ticket.type = this.equipmentType;
    ticket.comment = form.controls.comment.value!;
    return ticket;
  }

  readonly dialog = inject(MatDialog);

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result :', result);
    });
  }

  changeLang() {
    this.translate.use('en');
  }
}

