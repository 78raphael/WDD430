import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {

    try{
      return this.http
        .get<Contact[]>('https://wdd430-angular-cms-default-rtdb.firebaseio.com/contacts.json',
          {
            headers: new HttpHeaders({ 'Customer-Header': 'Contacts' })
          }
        )
        .subscribe({
          next:
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contacts.sort((a, b) => {
              if(a < b) return -1;
              if(a > b) return 1;
              return 0;
            });

            let contactsListClone = this.contacts.slice();
            this.contactChangedEvent.next(contactsListClone);
          },
          error:
          (error: any) => {
            console.log("Error: ", error);
          }
        });
    } catch(error) {
      console.log('Error (getContacts): ', error);
    }
  };

  storeContacts() {
    try {
      let stringContacts = JSON.stringify(this.contacts);

      this.http.put('https://wdd430-angular-cms-default-rtdb.firebaseio.com/contacts.json',
        stringContacts,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
        .subscribe({
          next:
          () => {
            let contactsListClone = this.contacts.slice();
            this.contactChangedEvent.next(contactsListClone);
          },
          error:
          (error: any) => {
            console.log("Error: ", error);
          }
        });


    } catch(error)  {
      console.log('Error (storeContacts): ', error);
    }
  }

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

    this.storeContacts();
  }

  addContact(newContact: Contact)  {
    if(!newContact) return;

    newContact.id = String(this.maxContactId++);
    this.contacts.push(newContact);

    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) return;

    let pos = this.contacts.indexOf(originalContact);
    if(pos < 0 ) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    this.storeContacts();
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
