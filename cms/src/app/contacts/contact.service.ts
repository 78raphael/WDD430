import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  contactListChangedEvent = new Subject<Contact[]>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    return this.contacts.slice();
  };

  getContact(id: string)  {
    for(let i = 0; i < this.contacts.length; i++) {
      let c = this.contacts[i];

      if (c.id == id)
        return c;
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if(!contact) return;

    const pos = this.contacts.indexOf( contact );

    if(pos < 0 ) return;
    this.contacts.splice(pos, 1);

    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  addContact(newContact: Contact)  {
    if(!newContact) return;

    newContact.id = String(this.maxContactId++);
    this.contacts.push(newContact);

    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) return;

    let pos = this.contacts.indexOf(originalContact);
    if(pos < 0 ) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  getMaxId(): number{
    let maxId = 0;

    for(let i = 0; i > this.contacts.length; i++) {
      let c = this.contacts[i];
      let currentId = parseInt(c.id);

      if(currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
