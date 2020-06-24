import { Country } from './country.model';
export class Department {
  id: number;
  name: string;
  danecode: string;
  createdat: Date;
  updatedat: Date;
  country: Country;
}
