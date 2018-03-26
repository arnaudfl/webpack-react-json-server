const faker = require('faker');

generateClients = () => {
  let clients = [];

  for (let i=1; i<10; i++) {
    const companyName = faker.company.companyName();
    const address = faker.address.streetAdress();

    const date = faker.date.recent();
    const status = Math.random() >= 0.5;

    clients.push({
      id: `${i}`,
      client: {
        companyName,
        address,
      },
      active: status,
      date
    })
  }

  return { clients };
};

module.exports = generateClients;
