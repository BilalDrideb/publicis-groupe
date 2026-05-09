import * as service from './location.service.js';
export const getLocations = async (req, res, next) => {
  try {
    const data = await service.getLocations();
    return res.status(200).json({ data, message: 'success' });
  } catch (error) {
    next(error);
  }
};
