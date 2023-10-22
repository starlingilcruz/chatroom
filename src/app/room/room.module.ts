import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';

import { RoomRoutingModule } from './room-routing.module';
import { RoomService } from './room.service';
import { RoomListComponent } from './room-list/room-list.component';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [
    RoomComponent,
    RoomListComponent
  ],
  imports: [
    CommonModule,

    RoomRoutingModule,
    ChatModule,

  ],
  providers: [RoomService]
})
export class RoomModule { }
