import { Status } from './status.model';
import { DocumentType } from './documenttype.model';
import { City } from './city.model';

export class Client {
  id: number;
  name: string;
  lastname: string;
  documentnumber: string;
  phone: string;
  email: string;
  homeaddres: string;
  createdat: Date;
  updatedat: Date;
  status: Status;
  documenttype: DocumentType;
  city: City;
}
