import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { experienceValidator } from '../validators/experience.validator';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MessageComponent, NgClass],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  showMessage = false;
  showNameText = false;
  showSurnameText = false;
  showEmailText = false;
  showEmailValid = false;
  showExperienceText = false;
  showExperienceValid = false;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    experience: ['', [Validators.required, experienceValidator(1)]],
  });

  constructor(private formBuilder: FormBuilder) { }

  message: { text: string, type: string } = { text: '', type: 'info' }; 

  onSubmit() {
    this.showMessage = false;
    if (this.form.valid) {
      this.form.reset();
      this.message = { text: 'Form submitted successfully', type: 'success' };
      
    } else {
      this.message = { text: 'Form is not valid', type: 'error' };
      this.requiredAndValidCheck('email');
      this.requiredAndValidCheck('experience');
      this.requiredCheck('name');
      this.requiredCheck('surname');
    }

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 6000)
  }

  onReset() {
    this.showMessage = false
    this.form.reset();
    this.showMessage = false;
    this.showNameText = false;
    this.showSurnameText = false;
    this.showEmailText = false;
    this.showEmailValid = false;
    this.showExperienceText = false;
    this.showExperienceValid = false;

    this.message = { text: 'Form was cleared', type: 'info' };
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 6000)
  }

  requiredCheck(field: string) {
    const control = this.form.get(field);

    if (control?.invalid) {
      this.setShowText(field, true);
    } else {
      this.setShowText(field, false);
    }
  }

  requiredAndValidCheck(field: string) {
    const control = this.form.get(field);

    if (control?.value == "" || control?.value == null) {
      this.setShowText(field, true, false);
    } else if (control?.invalid) {
      this.setShowText(field, false, true);
    } else {
      this.setShowText(field, false, false);
    }
  }

  private setShowText(field: string, showText: boolean, showValid: boolean = false) {
    switch (field) {
      case 'name':
        this.showNameText = showText;
        break;
      case 'surname':
        this.showSurnameText = showText;
        break;
      case 'email':
        this.showEmailText = showText;
        this.showEmailValid = showValid;
        break;
      case 'experience':
        this.showExperienceText = showText;
        this.showExperienceValid = showValid;
        break;
      default:
        break;
    }
  }
}

