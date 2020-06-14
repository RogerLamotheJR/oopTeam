const Base = require('./Employee');

module.exports = class Engineer extends Base {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getRole() {
    return 'Engineer';
  }

  getGithub() {
    return this.github;
  }
};
