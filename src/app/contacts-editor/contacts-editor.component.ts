import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact';
import {ApplicationState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {ContactsQuery, UpdateContactAction} from '../state/contacts';
import {Observable} from 'rxjs/Observable';
import {ContactsService} from '../contacts.service';
import getSelectedContact = ContactsQuery.getSelectedContact;

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  // we need to initialize since we can't use ?. operator with ngModel
  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.contact$ = this.store.select(getSelectedContact);
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.store.dispatch(new UpdateContactAction(contact));
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}

