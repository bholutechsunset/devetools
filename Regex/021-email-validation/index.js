// email-validation
/**
 * Validate Email Address
 * @param {string} email
 * @returns {boolean}
 */

function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

// Test Cases
console.log(isValidEmail("bk@gmail.com"));             // true
console.log(isValidEmail("john.doe@yahoo.in"));        // true
console.log(isValidEmail("user123@company.co.uk"));    // true

console.log(isValidEmail("bk@gmail"));                 // false
console.log(isValidEmail("@gmail.com"));               // false
console.log(isValidEmail("bk@.com"));                  // false
console.log(isValidEmail("bk@gmail."));                // false
console.log(isValidEmail("bk gmail@gmail.com"));       // false
console.log(isValidEmail(""));                         // false
