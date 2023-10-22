import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: RoomComponent },
  { path: ':roomId', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }