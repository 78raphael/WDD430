import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('11', 'Grades', 'The grades for this assignment have been posted', 'Bro. Jackson'),
    new Message('12', 'Grades', 'When is assignment 3 due', 'Steve Johnson'),
    new Message('13', 'Grades', 'Assignment 3 is due on Saturday at 11:30 PM', 'Bro. Jackson'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message)  {
    this.messages.push(message);
    console.log('message: ', message);
  }

}
