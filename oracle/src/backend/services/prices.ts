import { getHttpRequest } from "./external_https";

export async function getEthAkashPrice() {
    let ethUSDPrice = 2616.38
    let akashUSDPrice = 2.47
    try {
        const ethUrl = 'https://api.squidrouter.com/v1/token-price?chainId=1&tokenAddress=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
        const ethUSDPriceData = await getHttpRequest(ethUrl, 2_000_000n, 50_000_000_000n)
        ethUSDPrice = ethUSDPriceData?.price

        const akashUrl = 'https://api.squidrouter.com/v1/token-price?chainId=akashnet-2&tokenAddress=uakt'
        const akashUSDPriceData = await getHttpRequest(akashUrl, 2_000_000n, 50_000_000_000n)    
        akashUSDPrice = akashUSDPriceData?.price
    } catch(err) {
        console.log(err)
    }

    return ethUSDPrice / akashUSDPrice
}

export async function getCoreDaoAkashPrice() {
    const coreUSDPrice = 1

    const akashUrl = 'https://api.squidrouter.com/v1/token-price?chainId=akashnet-2&tokenAddress=uakt'
    const akashUSDPrice = await getHttpRequest(akashUrl, 2_000_000n, 50_000_000_000n)

    return coreUSDPrice / akashUSDPrice?.price
}