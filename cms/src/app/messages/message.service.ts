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
        .get<Message[]>('http://localhost:3000/messages/',
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        )
        .subscribe({
          next:
          (messages: Message[]) => {
            this.messages = messages['messages'];
            this.maxMessageId = this.getMaxId();
            this.messages.sort((a, b) => {
              if(a < b) return -1;
              if(a > b) return 1;
              return 0;
            });

            // console.log("Messages: ", this.messages);

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

  addMessage(message: Message)  {
    if (!message) {
      return;
    }

    // make sure id of the new Document is empty
    message.id = '';

    // console.log('addMessage: ', this.messages);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: Message }>('http://localhost:3000/messages/',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.message);
          // this.sortAndSend();
        }
      );
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
