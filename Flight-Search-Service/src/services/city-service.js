const { CityRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            //console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    }
    catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The City you requested to delete is not present ', error.statusCode);
        }

        throw new AppError('Not able to fectch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function updateCity(data, id) {
    try {
        const response = await cityRepository.update(data, id);
        return response;
    }
    catch (error) {

        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to update is not present ', error.statusCode);
        }

        throw new AppError('Not able to fectch data of the city you requested', StatusCodes.INTERNAL_SERVER_ERROR)

    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity
}