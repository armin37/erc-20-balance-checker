const web3_sha3 = require('js-sha3');
const axios = require('axios').default;

async function getBalance() {

    const accountAddress = (document.getElementById('account') as HTMLInputElement).value;
    const tokenContractAddress = (document.getElementById('contract') as HTMLInputElement).value;

    let data = web3_sha3.keccak256("balanceOf(address)");
    data = '0x' + data.substring(0, 8) + '000000000000000000000000';
    data += accountAddress.substring(2);
    console.log(data);

    try {
        const response = await axios.post(
            'https://mainnet.infura.io/v3/a46d09f75f8f4932bd7bc17c2ce2e37a',
            {
                "id": 1,
                "jsonrpc": "2.0",
                "method": "eth_call",
                "params": [
                    {
                        to: tokenContractAddress,
                        data: data
                    }, "latest"],
            }
        );
        let bal = parseInt(response.data.result, 16);
        document.getElementById('balance').innerText = `Balance: ${bal}`
    } catch (error) {
        console.error(error);
    }
}


document.getElementById('balanceBtn').addEventListener('click', getBalance);

