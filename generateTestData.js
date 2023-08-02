const fs = require('fs');

function generateRandomUKNumber() {
    const mobilePrefix = '+44 7';
    const landlinePrefixes = ['+44 1', '+44 2', '+44 3', '+44 5', '+44 6', '+44 8', '+44 9'];

    let number = '';
    if (Math.random() < 0.5) {
        // Generate a valid UK mobile number
        number = mobilePrefix;
        for (let i = 0; i < 9; i++) {
            number += Math.floor(Math.random() * 10);
        }
    } else {
        // Generate a valid UK landline number
        const randomLandlinePrefix = landlinePrefixes[Math.floor(Math.random() * landlinePrefixes.length)];
        number = randomLandlinePrefix;
        for (let i = 0; i < 9; i++) {
            number += Math.floor(Math.random() * 10);
        }
    }
    return number;
}
function generateUKMobileData() {
    const testCases = [];

    // Generating 250 sample UK numbers with 50% valid and 50% invalid
    for (let i = 0; i < 125; i++) {
        const validMobileNumber = generateRandomUKNumber();
        const validLandlineNumber = generateRandomUKNumber();
        const invalidNumber = generateRandomUKNumber();

        const validMobileTestCase = {
            number: validMobileNumber,
            type: 'mobile',
            regions: ['UK'],
            expectedValidity: {
                'UK': true
            }
        };
        const validLandlineTestCase = {
            number: validLandlineNumber,
            type: 'landline',
            regions: ['UK'],
            expectedValidity: {
                'UK': true
            }
        };
        const invalidTestCase = {
            number: invalidNumber,
            type: 'mobile', // For simplicity, we can set this to mobile as it is invalid
            regions: ['UK'],
            expectedValidity: {
                'UK': false
            }
        };

        testCases.push(validMobileTestCase);
        testCases.push(validLandlineTestCase);
        testCases.push(invalidTestCase);
    }

    const fileContent = `module.exports = ${JSON.stringify(testCases, null, 2)};\n`;

    fs.writeFile('ukMobileData.js', fileContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('ukMobileData.js file has been saved to the root directory.');
        }
    });
}

// Call the function to generate and save the test cases
generateUKMobileData();