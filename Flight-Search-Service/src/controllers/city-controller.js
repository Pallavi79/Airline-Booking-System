const { StatusCodes } = require('http-status-codes')
const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST:/cities
 * req-body{name:'London'}
 */

async function createCity(req, res) {
    try {
        //console.log(req.body);
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        //console.log(error);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * DELETE:/cities/:id
 * req-body{}
 */

async function deleteCity(req, res) {
    try {

        const city = await CityService.deleteCity(req.params.id);
        SuccessResponse.data = city;

        return res.
            status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function updateCity(req, res) {
    try {

        const city = await CityService.updateCity({
            name: req.body.name
        }, req.params.id);
        SuccessResponse.data = city;

        return res.
            status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


module.exports = {
    createCity,
    deleteCity,
    updateCity
}