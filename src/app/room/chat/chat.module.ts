import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from "./chat.component";
import { ChatService } from "./chat.service";


@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ChatService],
  exports: [ReactiveFormsModule, FormsModule]
})
export class ChatModule { }