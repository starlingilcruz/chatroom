export interface Body {
  user: string;
  message: string;
  roomId: number;
}

export interface BroadCast {
  Body: Body;
  Type: number;
}