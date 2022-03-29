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
    // this.getContacts();
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    try{
      return this.http
        .get<Contact[]>('http://localhost:3000/contacts/',
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        )
        .subscribe({
          next:
          (contacts: Contact[]) => {
            this.contacts = contacts['contacts'];
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

  getContact(id: string)  {
    for(let i = 0; i < this.contacts.length; i++) {
      let c = this.contacts[i];
      // console.log('contact[', i, ']: ', this.contacts[i]);
      // console.log('c.id: ', c.id , ' ::: id: ', id);

      if (c.id == id) {
        // console.log('c.id: ', c.id , ' ::: id: ', id);
        return c;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          // this.sortAndSend();
        }
      );
  }

  addContact(contact: Contact)  {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts/',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          // this.sortAndSend();
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    // this.http.put('' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          // this.sortAndSend();
        }
      );
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
