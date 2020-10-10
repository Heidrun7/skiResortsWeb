/* Tests to make sure the endpoints from Blika are returning data as expected */

let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = require("chai").expect;
chai.use(chaiHttp);

function testSuite(name, id) {
  describe(name, () => {
    describe("GET /GetBlikaForecast24klst/" + id + "/", function () {
      it("Should return data as expected for " + name + " endpoint", function (
        done
      ) {
        chai
          .request("https://api.blika.is/")
          .get("GetBlikaForecast24klst/" + id)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            var data = JSON.parse(res.text);
            expect(res).to.have.status(200);
            expect(data).to.be.an("array");
            expect(data.length).to.be.above(6); // Data should include at least 7 days of weather forecasts
            expect(data[0]).to.be.an("object");
            expect(Object.keys(data[0]).length).to.be.equal(9);
            expect(data[0].stodid).to.equal(id);
            expect(data[0].nafn).to.be.a("string");
            expect(data[0].nafn).to.equal(name); // Name of station/resort
            expect(data[0].t2).to.be.a("number"); // Temperature should be a number
            expect(data[0].f10).to.be.a("number"); // Wind speed should be a number
            expect(data[0].merki).to.be.a("string"); // Weather conditions should be a string
            expect(data[0].dags_spar).to.be.a("string"); // Date should be a string
            expect(
              new Date(data[0].dags_spar).toISOString().slice(0, 10)
            ).to.equal(new Date().toISOString().slice(0, 10)); // The first object should contain the forecast for the current day

            done();
          });
      });
    });
  });
}

testSuite("Bláfjöll", 149);
testSuite("Skálafell", 704);
testSuite("Tungudalur", 983);
testSuite("Tindastóll", 984);
testSuite("Skarðsdalur", 985);
testSuite("Tindaöxl", 986);
testSuite("Böggvisstaðafjall", 987);
testSuite("Hlíðarfjall", 988);
testSuite("Stafdalur", 989);
testSuite("Oddsskarð", 924);
