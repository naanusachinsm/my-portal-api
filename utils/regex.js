const EMAIL_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const FIRST_NAME_PATTERN = /^[a-zA-Z]{4,255}$/
const LAST_NAME_PATTERN = /^[a-zA-Z]{2,255}$/
const PASSWORD_PATTERN = /^[a-zA-Z0-9]{6,30}$/;

module.exports = {
    EMAIL_PATTERN,
    FIRST_NAME_PATTERN,
    LAST_NAME_PATTERN,
    PASSWORD_PATTERN
}
