import LendingPoolAddressesProviderABI from "../../abi/LendingPoolAddressesProvider.json"
import LendingPoolABI from "../../abi/LendingPool.json"

/**
 * Returns the Lending pool address provider contract
 * @param {contract address} address 
 */
export const getLpAddressProviderContract = (address) => {
    return new web3.eth.Contract(LendingPoolAddressesProviderABI, address)
}

/**
 * Returns the Lending pool address
 * @param @param {Address provider contract} lpAddressProviderContract 
 */
export const getLendingPoolAddress = async (lpAddressProviderContract) => {
    return lpAddressProviderContract.methods
        .getPool()
        .call()
        .catch((e) => {
            throw Error(`Error getting lendingPool address: ${e.message}`)
        })
}

/**
 * Returns the lending pooll contract
 * @param {Lending pool address} addr 
 */
export const getlpContract = (addr) => {
    return new web3.eth.Contract(LendingPoolABI, addr)
}
















