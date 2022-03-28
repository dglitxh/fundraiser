const FundraiserFactoryContract = artifacts.require("Factory");

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
            description,
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