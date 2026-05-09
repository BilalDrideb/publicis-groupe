import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Campaign = sequelize.define(
  'Campaign',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'campaigns',
    timestamps: false,
  }
);

export default Campaign;
