import { Model,
    Optional,
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    HasManySetAssociationsMixin,
    HasManyGetAssociationsMixin,
    Association,
} from 'sequelize';

import { sequelize } from '../sequelize';

import { Company } from './company'
import { ContactLine } from './contactLine';

interface ContactAttributes {
    id: string,
    name: string,
}

interface ContactCreationAttributes extends Optional<ContactAttributes,
    'id' |
    'name'>
{}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    public readonly id!: string;
    public readonly name!: string;

    public getCompany!: HasOneGetAssociationMixin<Company>;
    public setCompany!: HasOneSetAssociationMixin<Company, string>;

    public getContactLines!: HasManyGetAssociationsMixin<ContactLine>;
    public setContactLines!: HasManySetAssociationsMixin<ContactLine, string>;

    public readonly company?: Company;
    public readonly contactLines?: ContactLine[];
}

Contact.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'contacts',
    sequelize: sequelize,
});

export { Contact };
