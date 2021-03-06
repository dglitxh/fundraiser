const FundraiserFactoryContract = artifacts.require("Factory");
const Fundraiser = artifacts.require("Fundraiser")

contract("FundraiserFactory: deployment", () => {
    it("has been deployed", async () => {
    const fundraiserFactory = FundraiserFactoryContract.deployed();
    assert(fundraiserFactory, "fundraiser factory was not deployed");
});
});

contract("FundraiserFactory: createFundraiser", accounts => {
    let fundraiserFactory;

    const name = "Beneficiary Name";
    const url = "beneficiaryname.org";
    const imageURL = "https://placekitten.com/600/350";
    const bio = "Beneficiary Description";
    const beneficiary = accounts[1];

    it("increments the fundraiserCount", async () => {
        fundraiserFactory = await FundraiserFactoryContract.deployed();
        const currentFundraiserCount = await fundraiserFactory.fundraiserCount();
        await fundraiserFactory.createFundraiser(
            name,
            url,
            imageURL,
            bio,
            beneficiary
        );

        const newFundraiserCount = await fundraiserFactory.fundraiserCount();

        assert.equal(
            newFundraiserCount - currentFundraiserCount,
            1,
            "should increment by 1"
        )
    })
})

contract("FundraiserFactory: fundraisers", (accounts) => {
    async function createFundraiserFactory(fundraiserCount, accounts) {
        const factory = await FundraiserFactoryContract.new();
        await addFundraisers(factory, fundraiserCount, accounts);
        return factory;
    }
    async function addFundraisers(factory, count, accounts) {
  
    const name = "Beneficiary";
    const lowerCaseName = name.toLowerCase();
    const beneficiary = accounts[1];
    for (let i=0; i < count; i++) {
        await factory.createFundraiser(
        // create a series of fundraisers. The index will be used
        // to make them each unique
            `${name} ${i}`,
            `${lowerCaseName}${i}.com`,
            `${lowerCaseName}${i}.png`,
            `Description for ${name} ${i}`,
            beneficiary
        );
     }
}
    describe("when fundraisers collection is empty", () => {
        it("returns an empty collection", async () => {
            const factory = await createFundraiserFactory(0, accounts);
            const fundraisers = await factory.fundraisers(10, 0);
            assert.equal(
            fundraisers.length,
            0,
            "collection should be empty"
        );
    });
    });

    describe("varying limits", async () => {
        let factory;
        beforeEach(async () => {
            factory = await createFundraiserFactory(30, accounts);
        })
        it("returns 10 results when limit requested is 10", async ()=>{
            const fundraisers = await factory.fundraisers(10, 0);
            assert.equal(
                fundraisers.length,
                10,
                "results size should be 10"
            );
        });
        // xit marks the test as pending
        xit("returns 20 results when limit requested is 20", async ()=>{
            const fundraisers = await factory.fundraisers(20, 0);
                assert.equal(
                fundraisers.length,
                20,
                "results size should be 20"
            );
        });
            xit("returns 20 results when limit requested is 30", async ()=>{
            const fundraisers = await factory.fundraisers(30, 0);
            assert.equal(
                fundraisers.length,
                20,
                "results size should be 20"
            );
         });
     })
     describe("varying offset", () => {
        let factory;
        beforeEach(async () => {
            factory = await createFundraiserFactory(10, accounts);
        });
        it("contains the fundraiser with the appropriate offset", async ()=>{
            const fundraisers = await factory.fundraisers(1, 0);
            const fundraiser = await Fundraiser.at(fundraisers[0]);
            const name = await fundraiser.name();
            assert.ok(await name.includes(0), `${name} did not include the offset`);
        });
        xit("contains the fundraiser with the appropriate offset", async ()=>{
            const fundraisers = await factory.fundraisers(1, 7);
            const fundraiser = await Fundraiser.at(fundraisers[0]);
            const name = await fundraiser.name();
            assert.ok(await name.includes(7), `${name} did not include the offset`);
        });
    });
    describe("boundary conditions", () => {
        let factory;
        beforeEach(async () => {
            factory = await createFundraiserFactory(10, accounts);
        });
        it("raises out of bounds error", async () => {
        try {
            await factory.fundraisers(1, 11);
            assert.fail("error was not raised")
        } catch(err) {
            const expected = "offset out of bounds";
            assert.ok(err.message.includes(expected), `${err.message}`);
        }
        });
        xit("adjusts return size to prevent out of bounds error", async () => {
        try {
            const fundraisers = await factory.fundraisers(10, 5);
            assert.equal(
            fundraisers.length,
            5,
            "collection adjusted"
        );
        } catch(err) {
            assert.fail("limit and offset exceeded bounds");
        }
        });
    });
});