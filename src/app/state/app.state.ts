import {contactsReducer, ContactsState} from './contacts';
import {ActionReducerMap} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../environments/environment';

export interface ApplicationState {
  contacts: ContactsState;
}

export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  contacts: contactsReducer
};

export const META_REDUCERS = !environment.production ? [storeFreeze] : [];
