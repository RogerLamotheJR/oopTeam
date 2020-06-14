const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const idCollection = [];
const team = [];

// Validations
const validateName = name => {
  return name !== '' ? true : 'Please enter valid name.';
};
const validateId = id => {
  if (!id.match(/^[1-9]\d*/)) {
    return 'Please enter valid number.';
  }
  if (idCollection.includes(id)) {
    return `The id '${id}' is already in use, please enter a different one.`;
  }
  return true;
};
const validateNumber = number => {
  return number.match(/^[1-9]\d*/) ? true : 'Please enter valid number.';
};
const validateEmail = email => {
  return email.match(/\S+@\S+\.\S+/) ? true : 'Please enter a valid email';
};

const managerPrompts = [
  {
    type: 'input',
    name: 'name',
    message: 'What\'s the manager name?',
    validate: validateName,
  },
  {
    type: 'input',
    name: 'id',
    message: 'What\'s the manager id?',
    validate: validateId,
  },
  {
    type: 'input',
    name: 'email',
    message: 'What\'s the manager email?',
    validate: validateEmail,
  },
  {
    type: 'input',
    name: 'oNumber',
    message: 'What\'s the manager office number?',
    validate: validateNumber,
  },
];

const engineerPrompts = [
  {
    type: 'input',
    name: 'name',
    message: 'What\'s the engineer name?',
    validate: validateName,
  },
  {
    type: 'input',
    name: 'id',
    message: 'What\'s the engineer id?',
    validate: validateId,
  },
  {
    type: 'input',
    name: 'email',
    message: 'What\'s the engineer email?',
    validate: validateEmail,
  },
  {
    type: 'input',
    name: 'github',
    message: 'What\'s the engineer GitHub user?',
    validate: validateName,
  },
];

const internPrompts = [
  {
    type: 'input',
    name: 'name',
    message: 'What\'s the intern name?',
    validate: validateName,
  },
  {
    type: 'input',
    name: 'id',
    message: 'What\'s the intern id?',
    validate: validateId,
  },
  {
    type: 'input',
    name: 'email',
    message: 'What\'s the intern email?',
    validate: validateEmail,
  },
  {
    type: 'input',
    name: 'school',
    message: 'What\'s the intern school name?',
    validate: validateName,
  },
];

function newMember() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Do you want to add a new member to the team?',
        choices: ['Engineer', 'Intern', 'The team is complete'],
      },
    ])
    .then(res => {
      if (res.type === 'Engineer') {
        createEngineer();
      } else if (res.type === 'Intern') {
        createIntern();
      } else {
        compile();
      }
    });
}

function handleIntern(res) {
  team.push(new Intern(res.name, res.id, res.email, res.school));
  idCollection.push(res.id);
  newMember();
}

function handleEngineer(res) {
  team.push(new Engineer(res.name, res.id, res.email, res.github));
  idCollection.push(res.id);
  newMember();
}

function handleManager(res) {
  team.push(new Manager(res.name, res.id, res.email, res.oNumber));
  idCollection.push(res.id);
  newMember();
}

function createIntern() {
  inquirer.prompt(internPrompts).then(handleIntern);
}

function createEngineer() {
  inquirer.prompt(engineerPrompts).then(handleEngineer);
}
function createManager() {
  inquirer.prompt(managerPrompts).then(handleManager);
}

function compile() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(team), 'utf-8');
}

function welcome() {
  console.log("Let's put a team together.");
  createManager();
}

welcome();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
