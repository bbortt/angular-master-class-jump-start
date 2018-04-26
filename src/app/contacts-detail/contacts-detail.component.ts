import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../models/contact';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {Observable} from 'rxjs/Observable';
import {ContactsQuery} from '../state/contacts';
import getSelectedContact = ContactsQuery.getSelectedContact;

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private route: ActivatedRoute,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.contact$ = this.store.select(getSelectedContact);
  }
}
