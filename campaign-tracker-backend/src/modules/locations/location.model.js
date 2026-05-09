import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Location = sequelize.define(
  'Location',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    city_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'locations',
    timestamps: false,
  }
);

export default Location;
