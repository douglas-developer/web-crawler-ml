const helper = require('../helpers/web_crawler.helper');


describe("Internal products endpoint", () => {

    it("List products of ML", async () => {
        const payload = {
            "search": "TV",
            "limit": 30
        }

        console.log(payload)

        await helper
            .apiServer
            .post(`/product`)
            .send(payload)
            .expect(200);
    });

    it("Error on list products of ML search is required", async () => {
        const payload = {
            "limit": 30
        }

        console.log(payload)

        await helper
            .apiServer
            .post(`/product`)
            .send(payload)
            .expect(422);
    });
});
