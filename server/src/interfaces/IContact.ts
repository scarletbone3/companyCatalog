import { ICompany } from './ICompany';
import { IContactLine } from './IContactLine';

export interface IContact {
    id: string,
    name: string,
    company: ICompany,
    contactLines: IContactLine[],
}
