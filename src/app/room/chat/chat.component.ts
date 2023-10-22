import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ChatService } from './chat.service';
import { BroadCast } from './interfaces';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  message = new FormControl('');
  messages: BroadCast['Body'][] = [];

  constructor(
    private service: ChatService
  ) { }

  ngOnInit() {
    this.service.initWebsocket((broadCast: BroadCast) => {
      const { Body, Type } = broadCast;

      switch (Type) {
        case 1: {
          this.messages.push(Body);
          break;
        }
        case 2: {
          console.log("new user joinded", Body)
          break;
        }
        case 3: {
          console.warn("Websocket disconnected")
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  sendMessage(){
    if (this.message.value?.length === 0) {
      console.warn("No message provided");
      return;
    }

    this.service.sendMesasges(
      "user@", this.message.value as string, 10
    );
    this.message.reset();
  }
}
