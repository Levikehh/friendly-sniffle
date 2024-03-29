const ERROR_MESSAGES = {
    "400": "You need to log in!",
    "401": "You don't have permission to perform such action!",
    "500": "Internal server error. Please try again later",
}

const SCHEMA_ERROR_MESSAGES = {
    PRICE_NEGATIVE: "Price must be a positive number"
}

module.exports = {
    ERROR_MESSAGES,
    SCHEMA_ERROR_MESSAGES
}