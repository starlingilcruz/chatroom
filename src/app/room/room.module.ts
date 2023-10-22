import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';

import { RoomRoutingModule } from './room-routing.module';
import { RoomService } from './room.service';
import { RoomListComponent } from './room-list/room-list.component';

@NgModule({
  declarations: [
    RoomComponent,
    RoomListComponent
  ],
  imports: [
    CommonModule,

    RoomRoutingModule
  ],
  providers: [RoomService]
})
export class RoomModule { }
