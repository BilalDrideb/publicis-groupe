import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import Location from '../locations/location.model.js';
import Campaign from '../campaigns/campaign.model.js';

const Lead = sequelize.define(
  'Lead',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'locations', key: 'id' },
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'campaigns', key: 'id' },
    },
  },
  {
    tableName: 'leads',
    timestamps: true,
    updatedAt: false,
  }
);

// Associations
Lead.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });
Lead.belongsTo(Campaign, { foreignKey: 'campaign_id', as: 'campaign' });

export default Lead;
