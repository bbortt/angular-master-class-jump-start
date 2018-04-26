import {Action} from '@ngrx/store';
import {Contact} from '../../models/contact';

export enum ContactsActionTypes {
  LOAD_CONTACT = '[Contacts] Load one',
  LOAD_CONTACTS = '[Contacts] Load all',
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load success',
  SELECT_CONTACT = '[Contacts] Select contact',
  UPDATE_CONTACT = '[Contacts] Update contact',
  UPDATE_CONTACT_SUCCESS = '[Contacts] Update success'
}

export class LoadContactAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACT;

  constructor(public payload: Contact) {
  }
}

export class LoadContactsAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS;

  constructor() {
  }
}

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) {
  }
}

export class SelectContactAction implements Action {
  readonly type = ContactsActionTypes.SELECT_CONTACT;

  constructor(public payload: number) {
  }
}

export class UpdateContactAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT;

  constructor(public payload: Contact) {
  }
}

export class UpdateContactSuccessAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT_SUCCESS;

  constructor(public payload: Contact) {
  }
}

export type ContactsActions = LoadContactAction | LoadContactsAction | LoadContactsSuccessAction
  | SelectContactAction | UpdateContactAction | UpdateContactSuccessAction;
