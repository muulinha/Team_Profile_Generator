const generateManager = function (manager) {
    return `<div class="card"> 
      <div class="card-header">
        <h2 class="name">${manager.name}</h2>
        <h3 class="job-title">Manager</h3>
    </div>
    <div class="card-body">
        <div class="info">ID: ${manager.id}</div>
        <div class="info">Email: <a href="${manager.email}"> ${manager.email}</a></div>
        <div class="info">Office: ${manager.officeNumber}</div>     
    </div>
    </div>`;
  };

  

  const generateEngineer = function (engineer) {
    return   `<div class="card"> 
    <div class="card-header">
    <h2 class="name">${engineer.name}</h2>
    <h3 class="job-title">Engineer</h3>
  </div>
    <div class="card-body">
        <div class="info">ID: ${engineer.id}</div>
        <div class="info">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></div>
        <div class="info">GitHub:<a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a></div>     
    </div>
  </div>`;
  };



  const generateIntern = function (intern) {
    return  `<div class="card"> 
    <div class="card-header">
    <h2 class="name">${intern.name}</h2>
    <h3 class="job-title">Intern</h3>
  </div>
    <div class="card-body">
        <div class="info">ID: ${intern.id}</div>
        <div class="info">Email: <a href="mailto:${intern.email}">${intern.email}</a></div>
        <div class="info">University: ${intern.school}</div>     
    </div>
  </div>`;
  };



  generateHTML = (data) => {
    pageArray = [];
  
    for (var i = 0; i < data.length; i++) {
      const employee = data[i];
      const role = employee.getRole();
      if (role === "Manager") {
        const managerCard = generateManager(employee);
        pageArray.push(managerCard);
      }
      if (role === "Engineer") {
        const engineerCard = generateEngineer(employee);
        pageArray.push(engineerCard);
      }
      if (role === "Intern") {
        const internCard = generateIntern(employee);
        pageArray.push(internCard);
      }
    }
    const employeeCards = pageArray.join(" ");
    const generateTeam = generateTeamPage(employeeCards);
    return generateTeam;
  };

  const generateTeamPage = function (employeeCards) {
    return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset='utf-8'>
      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
      <title>Team Profile Generator</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <link rel='stylesheet' type='text/css' media='screen' href='./style.css'>
      <script src='main.js'></script>
    </head>
    <body>
      <header>
        <h1>My Team</h1>
      </header>
      <section>
        ${employeeCards}
      </section>
      <script src="../index.js"></script>
    </body>
  </html>`;
  };
  
  module.exports = generateHTML;