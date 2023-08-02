const globalValidationRules = {
    US: {
        mobile: {
            regex: new RegExp('^(\\+?1)?[2-9]\\d{9}$'),
            errorMessage: "Invalid US mobile number",
        },
        landline: {
            regex: new RegExp('^(\\+?1)?[2-9]\\d{9}$'),
            errorMessage: "Invalid US landline number",
        },
    },
    ES: { // Spain
        mobile: {
            regex: new RegExp('^\\+?34?6\\d{8}$'),
            errorMessage: "Invalid ES mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?34?9\\d{8}$'),
            errorMessage: "Invalid ES landline number",
        },
    },
    UK: {
        mobile: {
            regex: new RegExp('^\\+?44?7\\d{9}$'),
            errorMessage: "Invalid UK mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?44?[1-5]\\d{9}$'),
            errorMessage: "Invalid UK landline number",
        },
    },
    IE: { // Republic of Ireland
        mobile: {
            regex: new RegExp('^\\+?353?8\\d{8}$'),
            errorMessage: "Invalid IE mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?353?[1-9]\\d{8}$'),
            errorMessage: "Invalid IE landline number",
        },
    },
    NL: { // Netherlands
        mobile: {
            regex: new RegExp('^\\+?31?6\\d{8}$'),
            errorMessage: "Invalid NL mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?31?[1-5,7-9]\\d{7}$'),
            errorMessage: "Invalid NL landline number",
        },
    },
    SE: { // Sweden
        mobile: {
            regex: new RegExp('^\\+?46?7[0236]\\d{7}$'),
            errorMessage: "Invalid SE mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?46?[1-8]\\d{7}$'),
            errorMessage: "Invalid SE landline number",
        },
    },
    NO: { // Norway
        mobile: {
            regex: new RegExp('^\\+?47?[49]\\d{7}$'),
            errorMessage: "Invalid NO mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?47?[1-8]\\d{7}$'),
            errorMessage: "Invalid NO landline number",
        },
    },
    DK: { // Denmark
        mobile: {
            regex: new RegExp('^\\+?45?\\d{8}$'),
            errorMessage: "Invalid DK mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?45?\\d{8}$'),
            errorMessage: "Invalid DK landline number",
        },
    },
    FI: { // Finland
        mobile: {
            regex: new RegExp('^\\+?358?4\\d{7}$'),
            errorMessage: "Invalid FI mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?358?[1-9]\\d{6,7}$'),
            errorMessage: "Invalid FI landline number",
        },
    },
    AU: { // Australia
        mobile: {
            regex: new RegExp('^\\+?61?4\\d{8}$'),
            errorMessage: "Invalid AU mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?61?[2-8]\\d{8}$'),
            errorMessage: "Invalid AU landline number",
        },
    },
    NZ: { // New Zealand
        mobile: {
            regex: new RegExp('^\\+?64?2\\d{7,9}$'),
            errorMessage: "Invalid NZ mobile number",
        },
        landline: {
            regex: new RegExp('^\\+?64?[3-9]\\d{6,7}$'),
            errorMessage: "Invalid NZ landline number",
        },
    },
    CA: { // Canada
        mobile: {
            regex: new RegExp('^(\\+?1)?[2-9]\\d{9}$'),
            errorMessage: "Invalid CA mobile number",
        },
        landline: {
            regex: new RegExp('^(\\+?1)?[2-9]\\d{9}$'),
            errorMessage: "Invalid CA landline number",
        },
    },
};


class PhoneNumberValidator {
    constructor(type, regions, rules = globalValidationRules) {
        this.type = type;
        this.rules = {};
        for (const region of regions) {
            if (!rules[region]) {
                throw new Error(`No rules defined for region: ${region}`);
            }
            this.rules[region] = rules[region][type];
            if (!this.rules[region]) {
                throw new Error(`No rules defined for type: ${type} in region: ${region}`);
            }
        }
    }

    validatePhoneNumber(phoneNumber) {
        let results = {};
        for (let region in this.rules) {
            results[region] = this._validate(phoneNumber, region);
        }
        return results;
    }

    _validate(phoneNumber, region) {
        phoneNumber = phoneNumber.replace(/\D/g, '');

        const checkE164Compatibility = (phoneNumber) => {
            const e164Regex = /^\+?[1-9]\d{1,14}$/;
            return e164Regex.test(phoneNumber);
        }

        if (!checkE164Compatibility(phoneNumber)) {
            return 'The phone number is not E.164 compatible';
        }

        const rule = this.rules[region];

        if (!rule.regex.test(phoneNumber)) {
            return false
        }

        return true;
    }
}

// Usage:

let mobileValidator = new PhoneNumberValidator('mobile', ['UK', 'IE', 'SE']);

let result = mobileValidator.validatePhoneNumber('+44 7449234611');

console.log(result)

module.exports = PhoneNumberValidator;
