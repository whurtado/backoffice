import { Status } from './status.model';
export class SmtpServer {
  id: number;
  host: string;
  port: number;
  user: string;
  password: string;
  encryption: string;
  status: Status;
  createdat: Date;
  updatedat: Date;
}
