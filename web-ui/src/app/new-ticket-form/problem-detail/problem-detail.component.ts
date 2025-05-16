import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckBoxPair } from '../new-ticket-form-container.component';

@Component({
  selector: 'app-problem-detail',
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './problem-detail.component.html'
})
export class ProblemDetailComponent {
  checkboxFormGroup = input<FormGroup<CheckBoxPair>>();
}
