import {Injectable} from '@angular/core';
import {ContactsService} from './contacts.service';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {ContactsActionTypes, LoadContactsSuccessAction, UpdateContactAction} from './state/contacts';
import {Contact} from './models/contact';
import {map, switchMap, tap} from 'rxjs/operators';
import {UpdateContactSuccessAction} from './state/contacts/contacts.actions';

@Injectable()
export class ContactsEffectsService {

  constructor(private actions$: Actions,
              private contactsService: ContactsService,
              private router: Router) {
  }

  @Effect() getContacts$ = this.actions$
    .ofType(ContactsActionTypes.LOAD_CONTACTS).pipe(
      switchMap(_ => {
        return this.contactsService.getContacts();
      }),
      map((contacts: Array<Contact>) => {
        return new LoadContactsSuccessAction(contacts);
      })
    );

  @Effect() updateContact$ = this.actions$
    .ofType(ContactsActionTypes.UPDATE_CONTACT).pipe(
      map((action: UpdateContactAction) => action.payload),
      switchMap((contact: Contact) => this.contactsService.updateContact(contact)),
      tap((contact: Contact) => this.router.navigate(['/contact', contact.id])),
      map((contact: Contact) => new UpdateContactSuccessAction(contact))
    );
}
