import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

interface ContactLineAttributes {
    id: string,
    value: string,
}

interface ContactLineCreationAttributes extends Optional<ContactLineAttributes,
    'id' |
    'value'>
{}

class ContactLine extends Model<ContactLineAttributes, ContactLineCreationAttributes> implements ContactLineAttributes {
    public readonly id!: string;
    public readonly value!: string;
}

ContactLine.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'contact_lines',
    sequelize: sequelize,
});

export { ContactLine };
