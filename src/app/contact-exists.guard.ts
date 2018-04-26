import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {ContactsService} from './contacts.service';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {ApplicationState} from './state/app.state';
import {ContactsQuery, LoadContactAction, SelectContactAction} from './state/contacts';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import getLoaded = ContactsQuery.getLoaded;

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private store: Store<ApplicationState>,
              private contactsService: ContactsService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const contactId = route.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    return this.store.select(getLoaded).pipe(
      take(1),
      switchMap(loaded => {
        if (loaded) {
          return of(true);
        }

        return this.contactsService.getContact(contactId).pipe(
          tap(contact => this.store.dispatch(new LoadContactAction(contact))),
          map(contact => !!contact)
        );
      })
    );
  }
}
