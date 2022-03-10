import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    try {
      return this.http
        .get<Message[]>('https://wdd430-angular-cms-default-rtdb.firebaseio.com/messages.json',
          {
            headers: new HttpHeaders({ 'Custom-Header': 'Messages' })
          }
        )
        .subscribe({
          next:
          (messages: Message[]) => {
            this.messages = messages;
            this.maxMessageId = this.getMaxId();
            this.messages.sort((a, b) => {
              if(a < b) return -1;
              if(a > b) return 1;
              return 0;
            });

            console.log("Messages: ", this.messages);

            let messagesListClone = this.messages.slice();
            this.messageChangedEvent.next(messagesListClone);
          },
          error:
          (error: any) => {
            console.log("Error: ", error);
          }
        });
    } catch(error)  {
      console.error('Error (getMessages): ', error);
    }
  }

  storeMessages()  {
    try {
      let stringMessages = JSON.stringify(this.messages);

      this.http.put('https://wdd430-angular-cms-default-rtdb.firebaseio.com/messages.json',
        stringMessages,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
        .subscribe({
          next:
          () => {
            let messagesListClone = this.messages.slice();
            this.messageChangedEvent.next(messagesListClone);
          },
          error:
          (error: any) => {
            console.log("Error: ", error);
          }
        });


    } catch(error)  {
      console.log('Error (storeMessages): ', error);
    }
  }

  addMessage(newMessage: Message)  {
    if(!newMessage) return;
    this.maxMessageId++;

    newMessage.id = String(this.maxMessageId);
    this.messages.push(newMessage);

    this.storeMessages();
  }

  getMaxId(): number  {
    let maxId = 0;

    for(let i=0; i < this.messages.length; i++) {
      let d = this.messages[i];
      let currentId = parseInt(d.id);

      if(currentId > maxId)  {
        maxId = currentId;
      }
    }
     return maxId;
  }
}
