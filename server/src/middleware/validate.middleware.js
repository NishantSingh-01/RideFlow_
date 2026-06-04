import ApiError from "../utils/apierror.js"

const validate = (schema) => {
    return (req, res, next) => {
        console.log("Schema:", schema)

        const result = schema.safeParse(req.body)

        // console.log("Result:", result)

        if (!result.success) {
            // console.log(result.error)
            return next(
                new ApiError(
                    400,
                    result.error.issues[0].message
                )
            )
        }

        req.body = result.data
        next()
    }
}

export default validate