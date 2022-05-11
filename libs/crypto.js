import bcrypt from "bcrypt"

/**
 * This hashes the input string.
 *
 * @param {string} input to hash
 * @returns {Promise<string>} the hashed input
 */
export function hash(input) {
  return bcrypt.hash(input, 10)
}

/**
 * This compares a plain text input to a hash.
 *
 * @param {string} input plain text input to compare
 * @param {string} hash hashed text to compare
 * @returns {Promise<any>} Promise
 */
export function compare(input, hash) {
  return bcrypt.compare(input, hash)
}
