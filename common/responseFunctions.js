/**
 * 
 * @param {Function} res Response from the request
 * @param {object} object Data object  
 */
 const createSuccessResponse = (res, object) => {
    res.status(201).json({
        message: 'Saved Successful',
        ok: true,
        data: object
    })
}

/**
 * 
 * @param {res} res Respone from the request 
 * @param {string} msg Error Message from request
 */
const createErrorResponse = (res, msg) => {
    res.status(500).json({
        message: 'An Error Occured',
        errorMessage: msg,
        ok: false,
        data: {}
    })
}

/**
 * 
 * @param {res} res Respone from the request 
 * @param {string} msg Error Message from request
 */
const getErrorResponse = (res, msg) => {
    res.status(500).json({
        message: 'An Error Occured',
        errorMessage: msg,
        ok: false,
        data: {}
    })
}

/**
 * 
 * @param {Function} res Response from the request
 * @param {object} object Data object  
 */
 const getSuccessResponse = (res, object) => {
    res.status(200).json({
        message: 'Successful',
        ok: true,
        data: object
    })
}

module.exports = { createSuccessResponse, createErrorResponse, getErrorResponse, getSuccessResponse };