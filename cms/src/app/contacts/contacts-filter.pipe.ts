import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term)  {
    let filtered: Contact[] = [];

    for(let i = 0; i < contacts.length; i++)  {
      let person = contacts[i];
      if(person.name.toLowerCase().includes(term))  {
        filtered.push(person);
      }
    }

    return (filtered.length < 1) ? contacts : filtered;
  }

}
