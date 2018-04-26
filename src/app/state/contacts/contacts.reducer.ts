import {Contact} from '../../models/contact';
import {
  ContactsActions,
  ContactsActionTypes,
  LoadContactAction,
  LoadContactsSuccessAction,
  SelectContactAction,
  UpdateContactSuccessAction
} from './contacts.actions';
import {createSelector} from '@ngrx/store';

export interface ContactsState {
  loaded: boolean;
  list: Array<Contact>;
  selectedContactId: number | null;
}

const INITIAL_STATE: ContactsState = {
  loaded: false,
  list: [],
  selectedContactId: null
};

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACT:
      return {
        ...state,
        list: !state.list.find(contact => contact.id === ((action as LoadContactAction).payload as Contact).id)
          ? [...state.list, (action as LoadContactAction).payload]
          : state.list
      };
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        list: (action as LoadContactsSuccessAction).payload
      };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: (action as SelectContactAction).payload
      };
    case ContactsActionTypes.UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        list: state.list.map(contact => contact.id === ((action as UpdateContactSuccessAction).payload as Contact).id
          ? {...contact, ...(action as UpdateContactSuccessAction).payload}
          : contact)
      };
    default:
      return state;
  }
}

export namespace ContactsQuery {
  export const getContacts = (state) => state.contacts.list;
  export const getLoaded = (state) => state.contacts.loaded;
  export const getSelectedContactId = (state) => state.contacts.selectedContactId;
  export const getSelectedContact = createSelector(getContacts, getSelectedContactId, (contacts, id) => {
    const foundContact = contacts.find(contact => contact.id === id);
    return {...foundContact};
  });
}
