import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  // @Output() contactSelected = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) { }
  // constructor() { }

  ngOnInit(): void {
  }

  onSelected()  {
    console.log("clicked", this.contact);
    this.contactService.contactSelectedEvent.emit(this.contact);
    // this.contactSelected.emit(this.contact);
  }

}
