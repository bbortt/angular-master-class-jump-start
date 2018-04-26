import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {ApplicationState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {ContactsQuery, LoadContactsAction} from '../state/contacts';
import getContacts = ContactsQuery.getContacts;

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private contactsService: ContactsService,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.contacts$ = this.store.select(getContacts);

    this.store.dispatch(new LoadContactsAction());
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
