import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';


export enum tableActions {
  show = 'show',
  update = 'update',
  delete = 'delete',
  selectRow = 'selectRow',
  refresh = 'refresh',
  add = 'add',
  archive = 'archive',
  selectMany = 'selectMany',
  search = 'search',

  transportCardRequest = 'transportCardRequest',
  view = 'view',
  pay = 'pay',
  cashpay = "cashpay",
  print = "print",
  calibrage = 'calibrage',

  editWaybill = 'editWaybill',
  updateWaybill = 'updateWaybill',
  futherInformation = 'futherInformation',
}

export enum tableExportMethod {
  XLSX = 'XLSX',
  CSV = 'CSV',
  JSON = 'JSON',
  TXT = 'TXT',
}

export type TableDefinition = {
  /**
   *
   * label to display has title
   * @type {string}
   **/
  title: string;

  /**
  * pageSizeOptions
  * @type {Array<tableActions>}
  **/
  pageSizeOptions?: Array<number>;

  /**
   * list of actions to display
   * @type {Array<tableActions>}
   **/
  actions: Set<tableActions.show | tableActions.add | tableActions.delete | tableActions.update
    | tableActions.archive | tableActions.calibrage | tableActions.refresh
    | tableActions.pay | tableActions.cashpay | tableActions.print | tableActions.editWaybill
    | tableActions.updateWaybill
  >;

  /**
   * list of export methods to display
   * @type {Array<tableActions>}
   **/
  exportOptions?: Set<tableExportMethod>;

  /**
   * can Select many row
   * @type {boolean}
   **/
  selectMany: boolean

  /**
   * list of columns definition
   * @type {Array<ColumnDefinition>}
   **/
  columns: ColumnDefinition[];
}

export type ColumnDefinition = {
  /**
   * label to display has title
   * can be JSON path to translate
   * @type {string}
   **/
  label: string;
  /**
   * column name for html Binding
   * @type {string}
   **/
  column: string;

  /**
   * custom fonction to use for rendered value
   * @type {string}
   **/
  customValue?: (data: any) => HTMLElement | string | number;
}


export type TextField = {
  /**
   * label to display has title
   * can be JSON path to translate
   * @type {string}
   **/
  label: string;

  /**
   * class to display has title
   * can be JSON path to translate
   * @type {string}
   **/
  class: string;

  /**
   * fieldId how must match with formControlId
   * @type {string}
   **/
  fieldId: string;

  /**
   * field Type checkBox or
   * @type {string}
   **/
  type: string;

  /**
   * field inputType number, checkbox or text
   * @type {string}
   **/
  inputType?: string;

  /**
   * validators function
   * @type {Array<ValidatorFn>}
   **/
  validatorFns?: ValidatorFn[];

  /**
   * validators function
   * @type {Array<ValidatorFn>}
   **/
  disabled?: boolean;

  /**
   * values observable
   * @type {Observable<any>}
   **/
  values?: Observable<any>;

  /**
  * comparator function
  * @type boolean
  **/
  comparatorFn?: (item1: any, item2: any) => boolean;

  /**
   * hidden = true if the field will display
   * @type {}
   */
  hidden?: boolean;

  /**
   *
   * @param value the value to emit
   * @returns value as Observable
   */

  onValueChangeFn?: (value: any) => void;

}


export interface IUser {
  name: string,
  surname: string,
  phone: string,
  country: string,
  town: string,
}
