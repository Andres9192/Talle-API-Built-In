function validatorHandler(schema, property){
    return (req, res, next)=>{
        const data = req[property]
        const {error} = schema.validate(data, {stripUnknown: true, abortEarly: false})
        if(error){
            res.status(422).json({
                errors: error.details.map((err)=> err.message)
            })
        }else {
            next()
        }
    }
}

module.exports = { validatorHandler }