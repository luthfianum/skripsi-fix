

interface PingResponse {
  uptime: number;
  message: string;
  date: Date;
}

export default class PingController {
  public async getMessage(): Promise<PingResponse> {
    return {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    };
  }
}