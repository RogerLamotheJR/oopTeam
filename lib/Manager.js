const Base = require('./Employee');

module.exports = class Manager extends Base {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return 'Manager';
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
};
