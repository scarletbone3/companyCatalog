import { Model,
    Optional,
    DataTypes,
    HasManyGetAssociationsMixin,
} from 'sequelize'

import { sequelize } from '../sequelize';

import { Contact } from './contact'

interface CompanyAttributes {
    id: string,
    name: string,
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes,
    'id' |
    'name'
>{}

class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
    public readonly id!: string;
    public readonly name!: string;

    public getContacts!: HasManyGetAssociationsMixin<Contact>
}

Company.init({
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
    tableName: 'companies',
    sequelize,
});

export { Company };
