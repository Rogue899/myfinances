const { LocalDrinkSharp } = require("@material-ui/icons");
const { v4: uuidv4 } = require("uuid");

module.exports = () => {
  var faker = require("faker");
  var lodash = require("lodash");

  return {
    company: lodash.times(100, (n) => {
      return {
        id: uuidv4(),
        companyName: faker.company.companyName(),
        payout: lodash.times(5, (n) => {
          return {
            id: uuidv4(),
            payoutName: faker.commerce.productName(),
            description: "",
            amount: faker.commerce.price(1, 100),
            paymentMethod: "",
            currency: "",
            paid: false,
            dateCreated: faker.date.recent(),
          };
        }),
      };
    }),
  };
};
