import { Component } from '@angular/core';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {

  rooms: any[] = [];

  constructor(
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.roomService.list().subscribe(
      (data) => {
        this.rooms = (data as any)["Rooms"];
      }
    )
  }

}
