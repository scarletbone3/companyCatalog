import { sequelize } from './sequelize'
import { Company } from './models/company';
import { Contact } from './models/contact';
import { ContactLine } from './models/contactLine';

Contact.hasMany(ContactLine, {
    foreignKey: 'contactId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    as: 'contactLines',
});
ContactLine.belongsTo(Contact, {
    foreignKey: 'contactId',
})

Company.hasMany(Contact, {
    foreignKey: 'companyId',
})
Contact.belongsTo(Company, {
    foreignKey: 'companyId', 
    as: 'company',
})

export { sequelize }

export const Repository = {
    Company,
    Contact,
    ContactLine
}
