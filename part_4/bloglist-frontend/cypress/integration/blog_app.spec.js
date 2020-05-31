describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    });
  });
});
