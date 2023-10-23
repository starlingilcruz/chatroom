import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from "./chat.component";
import { ChatService } from "./chat.service";


@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ChatService],
  exports: [ReactiveFormsModule, FormsModule]
})
export class ChatModule { }