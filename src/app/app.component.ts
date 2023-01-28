import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IUser, TextField } from './utils/form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-dynamique';

  userForm!: UntypedFormGroup;
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.userForm = this.createForm(this.userFormField)
  }

  createForm(textFields: TextField[]): UntypedFormGroup {
    const form = new UntypedFormGroup({});

    const textFieldControls = textFields.map((value) => {
      return {
        fieldId: value.fieldId,
        control: value.type === 'checkbox' ? new UntypedFormControl({ value: false, disabled: value.disabled }, value.validatorFns) : new UntypedFormControl({ value: null, disabled: value.disabled }, value.validatorFns),
        updateFn: value.onValueChangeFn
      }
    })

    textFieldControls.forEach((value) => {
      form.addControl(value.fieldId, value.control);
      form.get(`${value.fieldId}`)?.valueChanges.subscribe((data) => {
        if (value.updateFn) {
          value?.updateFn(data);
        }
      })
    })

    return form;
  }

  submitMethod(form: any) {
    console.log(form);
  }

  userFormField: Array<TextField> = [
    {
      fieldId: 'name',
      label: 'name',
      type: 'text',
      hidden: false,
      disabled: false,
      validatorFns: [Validators.required]
    },
    {
      fieldId: 'surname',
      label: 'surname',
      type: 'text',
      hidden: false,
      disabled: false,
    },
    {
      fieldId: 'phone',
      label: 'phone',
      type: 'text',
      hidden: false,
      disabled: false,
    }, {
      fieldId: 'country',
      label: 'country',
      type: 'select',
      hidden: false,
      values: countries$,
      onValueChangeFn: (value) => {
        let filteredTown: Array<any>;
        if (value) {
          console.log(value);
          filteredTown = town.filter((current) => current.country === value) as Array<any>;
          towns$ = of(filteredTown);
          const index = this.userFormField.findIndex(value => value.fieldId === 'town');
          this.userFormField[index].values = towns$;
        }
      },
      disabled: false,
    }, {
      fieldId: 'town',
      label: 'town',
      type: 'select',
      hidden: false,
      values: towns$,
      disabled: false,
    }
  ]
}


const countries$ = of([{ key: 'Cameroun', value: 'Cameroun' }, { key: 'Gabon', value: 'Gabon' }, { key: 'Benin', value: 'Benin' }, { key: 'Tchad', value: "Tchad" }]);
let towns$: Observable<any> = of();
const town = [{ key: "Yaounde", value: 'Yaounde', country: 'Cameroun' }, { key: "Daoula", value: 'Daoula', country: 'Cameroun' }, { key: "Buea", value: 'Buea', country: 'Cameroun' }, { key: 'Libre-Ville', value: 'Libre-Ville', country: 'Gabon' }, { key: 'Cotonou', value: 'Cotonou', country: 'Benin' }, { key: 'Pala', value: 'Pala', country: 'Tchad' }];
