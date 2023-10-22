import { Component } from '@angular/core';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  constructor(
    private roomService: RoomService
  ) {

  }

  ngOnInit() {
    this.roomService.list().subscribe(r => console.log(r))
  }

}
