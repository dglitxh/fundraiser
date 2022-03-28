pragma solidity >0.4.23 < 0.9.0;

import "./Fundraiser.sol";

contract Factory{

    Fundraiser[] private _fundraisers;

    function createFundraiser(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory bio,
    address payable beneficiary
    )
    public
    {
        Fundraiser fundraiser = new Fundraiser(
        name,
        url,
        imageURL,
        description,
        beneficiary,
        msg.sender
    );
    _fundraisers.push(fundraiser);
        emit FundraiserCreated(fundraiser);
    }

    function fundraiserCount() public view returns(uint256) {
        return _fundraisers.length
    }
}