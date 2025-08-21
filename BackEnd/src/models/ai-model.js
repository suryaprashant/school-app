export const FromType = Object.freeze({
  USER: 'User',
  SERVER: 'Server',
});

const FeesRange = Object.freeze([
  "1000 - 10000",
  "10000 - 25000",
  "25000 - 50000",
  "50000 - 75000",
  "75000 - 100000",
  "1 Lakh - 2 Lakh",
  "2 Lakh - 3 Lakh",
  "3 Lakh - 4 Lakh",
  "4 Lakh - 5 Lakh",
  "More than 5 Lakh",
]);

const SchoolMode = Object.freeze(['convent', 'private', 'government']);
const SchoolShift = Object.freeze(['morning', 'afternoon', 'night school']);
const GenderType = Object.freeze(['boy', 'girl', 'co-ed']);

class AiModel {

  constructor({
    _id='',
    from = '',
    name = '',
    fees = '',
    board = '',
    state = '',
    schoolMode = '',
    schoolShift = '',
    genderType = '',
    languageMedium = '',
    activities = [],
    amenities = [],
  } = {}) {
    // Required validations
    if (!from || ![FromType.USER, FromType.SERVER].includes(from)) {
      throw new Error(`'from' is required and must be either 'User' or 'Server'.`);
    }

    if (from === FromType.SERVER && (!name || typeof name !== 'string')) {
      throw new Error(`'name' is required when 'from' is 'Server' and must be a non-empty string.`);
    }

      if (from === FromType.SERVER && (!_id || typeof _id !== 'string')) {
      throw new Error(`'_id' is required when 'from' is 'Server' and must be a non-empty string.`);
    }

    if (!board || typeof board !== 'string') {
      throw new Error(`'board' is required and must be a string.`);
    }

    if (!state || typeof state !== 'string') {
      throw new Error(`'state' is required and must be a string.`);
    }

    // Optional validations
    if (fees && !FeesRange.includes(fees)) {
      throw new Error(`Invalid 'fees' range. Must be one of: ${FeesRange.join(', ')}`);
    }

    if (schoolMode && !SchoolMode.includes(schoolMode)) {
      throw new Error(`Invalid 'schoolMode'. Must be one of: ${SchoolMode.join(', ')}`);
    }

    if (schoolShift && !SchoolShift.includes(schoolShift)) {
      throw new Error(`Invalid 'schoolShift'. Must be one of: ${SchoolShift.join(', ')}`);
    }

    if (genderType && !GenderType.includes(genderType)) {
      throw new Error(`Invalid 'genderType'. Must be one of: ${GenderType.join(', ')}`);
    }

    this.from = from;
    this.name = from === FromType.SERVER ? name : null;
    this.fees = fees;
    this.board = board;
    this.state = state;
    this.schoolMode = schoolMode;
    this.schoolShift = schoolShift;
    this.genderType = genderType;
    this.languageMedium = languageMedium;
    this.activities = activities;
    this.amenities = amenities;
  }
}

export default AiModel;
