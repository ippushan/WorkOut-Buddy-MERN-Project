const errorHandler = (err, req, res, next) => {
    // console.log(err)


    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        error: err.message,
        emptyFields: err.emptyFields,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}

module.exports = errorHandler