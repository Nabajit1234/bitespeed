import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database/mysql_sequelize.database";

class Contact extends Model<
  InferAttributes<Contact>,
  InferCreationAttributes<Contact>
> {
  declare id: CreationOptional<number>;
  declare phoneNumber: string | null;
  declare email: string | null;
  declare linkedId: number | null;
  declare linkPrecedence: "primary" | "secondary";
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

Contact.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkedId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    // references: {
    //   model: 'contact',
    //   key: 'id'
    // }
  },
  linkPrecedence: {
    type: DataTypes.ENUM("primary", "secondary"),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  sequelize: sequelize,
  timestamps: true,
  modelName: 'contact',
  tableName: 'contacts',
  paranoid: true
})

export {
  Contact
}