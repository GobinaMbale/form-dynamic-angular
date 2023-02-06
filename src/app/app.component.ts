import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TextField } from './utils/form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-dynamique';
  constructor() {}
  ngOnInit(): void {
  }

  getValue(form: any): void {
    console.log(form);
  }

  userFormField: Array<TextField> = [
    {
      fieldId: 'name',
      label: 'name',
      type: 'text',
      inputType: 'text',
      hidden: false,
      disabled: false,
      validatorFns: [Validators.required],
      class: 'form-control'
    },
    {
      fieldId: 'surname',
      label: 'surname',
      type: 'text',
      inputType: 'text',
      hidden: false,
      disabled: false,
      class: 'form-control'
    },
    {
      fieldId: 'phone',
      label: 'phone',
      type: 'text',
      inputType: 'number',
      hidden: false,
      disabled: false,
      class: 'form-control'
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
      class: 'form-control'
    }, {
      fieldId: 'town',
      label: 'town',
      type: 'select',
      hidden: false,
      values: towns$,
      disabled: false,
      class: 'form-control'
    }
  ]
}


const countries$ = of([{ key: 'Cameroun', value: 'Cameroun' }, { key: 'Gabon', value: 'Gabon' }, { key: 'Benin', value: 'Benin' }, { key: 'Tchad', value: "Tchad" }]);
let towns$: Observable<any> = of();
const town = [{ key: "Yaounde", value: 'Yaounde', country: 'Cameroun' }, { key: "Daoula", value: 'Daoula', country: 'Cameroun' }, { key: "Buea", value: 'Buea', country: 'Cameroun' }, { key: 'Libre-Ville', value: 'Libre-Ville', country: 'Gabon' }, { key: 'Cotonou', value: 'Cotonou', country: 'Benin' }, { key: 'Pala', value: 'Pala', country: 'Tchad' }];
