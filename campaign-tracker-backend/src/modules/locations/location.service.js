import * as repository from './location.repository.js';
export const getLocations = () => repository.findAll();
