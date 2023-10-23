import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ChatService } from './chat.service';
import { BroadCast } from './interfaces';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  private roomId: number = 0;

  message = new FormControl('');
  messages: BroadCast['Body'][] = [];

  constructor(
    private route: ActivatedRoute,
    private service: ChatService
  ) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params["roomId"];

    this.service.initWebsocket(this.roomId, (broadCast: BroadCast) => {
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
        case 4: {
          // bot messages
          this.messages.push(Body);
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
      this.message.value as string, Number(this.roomId)
    );
    this.message.reset();
  }
}
