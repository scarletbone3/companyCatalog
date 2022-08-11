import { makeExecutableSchema } from 'graphql-tools';

import { Repository } from '../repository/index'
import { IContact } from '../interfaces/IContact';
import { IContactLine } from '../interfaces/IContactLine';
import { ICompany } from '../interfaces/ICompany';
import { IResult } from '../interfaces/IResult';

const typeDefs: string[] = [`
    type Result {
        description: String
    }

    type Company {
        id: String,
        name: String
    }

    type ContactLine {
        id: String,
        value: String
    }

    type Contact {
        id: String,
        name: String,
        company: Company,
        contactLines: [ContactLine]
    }

    type Query {
        contacts: [Contact]
    }

    type Mutation {
        deleteCompany(id: String): Result!
        deleteContact(id: String): Result!
    }
`];

const resolvers = {
    Query: {
        contacts: async (): Promise<IContact[]> => {
            const contacts = await Repository.Contact.findAll({
                include: [{
                    model: Repository.Company,
                    as: 'company',
                }, {
                    model: Repository.ContactLine,
                    as: 'contactLines',
                }]
            });
            if (!contacts) {
                throw new Error('Contacts not exist');
            }
            const response: IContact[] = contacts.map(item => {
                const company: ICompany = { id: item.company!.id, name: item.company!.name }
                const contactLines: IContactLine[] = item.contactLines!.map(item => { return { id: item.id, value: item.value } });
                const contact: IContact = {
                    id: item.id,
                    name: item.name,
                    company: company,
                    contactLines: contactLines,
                }
                return contact;
            });
            return response;
        }
    },
    Mutation: {
        deleteCompany: async (_: any, { id }: { id: string }): Promise<IResult> => {
            const company = await Repository.Company.findByPk(id);
            if (!company) {
                throw new Error('Company not exist');
            }
            const contacts = await company.getContacts();
            if (contacts && contacts.length !== 0) {
                return { description: 'The company cannot be deleted because contacts refer to it' };
            }
            await Repository.Company.destroy({
                where: {
                    id: id,
                }
            });
            return { description: 'Company has been deleted' };
        },
        deleteContact: async (_: any, { id }: { id: string }): Promise<IResult> => {
            const contact = await Repository.Contact.findByPk(id);
            if (!contact) {
                throw new Error('Contact not exist');
            }
            await Repository.Contact.destroy({
                where: {
                    id: id,
                }
            });
            return { description: 'Contact has been deleted' }
        }
    }
}

export const ContactSchema = makeExecutableSchema({typeDefs, resolvers});
