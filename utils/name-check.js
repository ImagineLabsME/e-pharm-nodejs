/**
 * This function determines whether a string contains the characters of a specified string.
 * @param { String } name 
 * @returns { Boolean }
 */
const nameCheck = (name) => {
    const badCharacter = "`~!@#$%^&*()_+-=/*-/.,<>?';:|";
    for (let i = 0; i < name.length; i++) {
        for (let k = 0; k < badCharacter.length; k++) {
            if (name.charAt(i) === badCharacter.charAt(k)) {
                return false;
            }
        }
    }
    return true;
}

module.exports = nameCheck;