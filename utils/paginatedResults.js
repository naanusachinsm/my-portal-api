const User = require('../models/user.model');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('./response')

function paginatedResults(model)  {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        if (!page)
            res.status(StatusCodes.BAD_REQUEST).send(new ErrorResponse(StatusCodes.BAD_REQUEST, 'query parameters should page and limit'));
        if (!limit)
            res.status(StatusCodes.BAD_REQUEST).send(new ErrorResponse(StatusCodes.BAD_REQUEST, 'query parameters should page and limit'));

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        results.current = {
            page: page,
            limit: limit
        }

        const totalRecords = await model.countDocuments().exec();
        if (endIndex < totalRecords) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.totalRecords = totalRecords;
            results.totalPages =  totalRecords < limit ? 1 : Math.ceil(totalRecords / limit);
            results.users = await model.find().limit(limit).skip(startIndex).exec();
            res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, results));
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
        }
    }
  }

  module.exports = paginatedResults;
