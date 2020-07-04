import { Status } from './status.model';
export class SmtpServer {
  id: number;
  host: string;
  port: number;
  user: string;
  password: string;
  encryption: string;
  Status:number;
  createdat: Date;
  updatedat: Date;
}