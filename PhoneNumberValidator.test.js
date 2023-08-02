
const PhoneNumberValidator = require("./PhoneNumberValidator");

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


const testCases = [
    {
        number: '+44 7449235611',
        type: 'mobile',
        regions: ['UK'],
        expectedValidity: {
            'UK': true
        }
    },
    {
        number: '+44 744923461',
        type: 'mobile',
        regions: ['UK'],
        expectedValidity: {
            'UK': false
        },

    },
    {
        number: '+44161714362',
        type: 'landline',
        regions: ['UK'],
        expectedValidity: {
            'UK': true
        },

    },
    {
        number: '+4416171436267',
        type: 'landline',
        regions: ['UK'],
        expectedValidity: {
            'UK': false
        },

    }
];

describe("PhoneNumberValidator", () => {
    testCases.forEach((testCase) => {
        const { number, type, regions, expectedValidity } = testCase;

        describe(`when validating ${type} numbers in regions ${regions.join(", ")}`, () => {
            const validator = new PhoneNumberValidator(type, regions);

            regions.forEach((region) => {
                test(`validates ${number} as ${expectedValidity[region] ? 'correct' : 'incorrect'} for ${region}`, () => {
                    const result = validator.validatePhoneNumber(number);
                    expect(result[region]).toBe(expectedValidity[region]);
                });
            });
        });
    });
});