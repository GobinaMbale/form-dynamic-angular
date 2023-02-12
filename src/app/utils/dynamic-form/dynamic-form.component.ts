import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {TextField} from "../form.model";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  title = 'form-dynamique';

  @Input() userFormField: Array<TextField> = [];

  userForm!: UntypedFormGroup;

  @Output() newItemEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.userForm = this.createForm(this.userFormField);
  }

  createForm(textFields: TextField[]): UntypedFormGroup {
    const form = new UntypedFormGroup({});

    const textFieldControls = textFields.map((value) => {
      return {
        fieldId: value.fieldId,
        control: value.type === 'checkbox' ? new UntypedFormControl({ value: false, disabled: value.disabled }, value.validatorFns) : new UntypedFormControl({ value: null, disabled: value.disabled }, value.validatorFns),
        updateFn: value.onValueChangeFn
      }
    });

    textFieldControls.forEach((value) => {
      form.addControl(value.fieldId, value.control);
      form.get(`${value.fieldId}`)?.valueChanges.subscribe((data) => {
        if (value.updateFn) {
          value?.updateFn(data);
        }
      })
    });

    return form;
  }

  submitMethod(form: any) {
    this.newItemEvent.emit(form.form);
  }

}
