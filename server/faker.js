const faker = require('faker');

generateUsers = () => {
  let users = [];

  for (let i=1; i<10; i++) {
    const companyName = faker.company.companyName();
    const address = faker.address.streetAddress();
    const city = faker.address.city();
    const zipCode = faker.address.zipCode();

    const date = faker.date.recent();
    const status = Math.random() >= 0.5;

    users.push({
      id: `${i}`,
      user: {
        companyName,
        address,
        city,
        zipCode
      },
      active: status,
      date
    })
  }

  return { users };
};

module.exports = generateUsers;
