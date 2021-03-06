pragma solidity >0.4.23 < 0.9.0;

import "./Fundraiser.sol";

contract Factory{

    Fundraiser[] private _fundraisers;
    event FundraiserCreated(Fundraiser indexed fundreaser, address indexed owner);
    uint256 constant maxLimit = 20;

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
        bio,
        beneficiary,
        msg.sender
    );
    _fundraisers.push(fundraiser);
        emit FundraiserCreated(fundraiser, msg.sender);
    }

    function fundraiserCount() public view returns(uint256) {
        return _fundraisers.length;
    }

    function fundraisers(uint256 limit, uint256 offset) public view returns(Fundraiser[] memory coll){

        require(offset <= fundraisersCount(), "offset out of bounds");
        uint256 size = fundraiserCount() < limit ? fundraiserCount() : limit;
        size = size < maxLimit ? size : maxLimit;
        coll = new Fundraiser[](size);
       for(uint256 i = 0; i < size; i++) {
            coll[i] = _fundraisers[offset + i];
        }
        return coll;
    }
}