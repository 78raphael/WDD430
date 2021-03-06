import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {
    this.contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe(
      (cons: Contact[]) => {
        this.contacts = cons;
      }
    );

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string)  {
    console.log('SearchBox: ', value);
    this.term = value;
  }

}
