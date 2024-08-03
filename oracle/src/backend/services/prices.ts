import { getHttpRequest } from "./external_https";

export async function getEthAkashPrice() {
    const ethUrl = 'https://api.squidrouter.com/v1/token-price?chainId=1&tokenAddress=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    const ethUSDPrice = await getHttpRequest(ethUrl, 2_000_000n, 50_000_000_000n)

    const akashUrl = 'https://api.squidrouter.com/v1/token-price?chainId=akashnet-2&tokenAddress=uakt'
    const akashUSDPrice = await getHttpRequest(akashUrl, 2_000_000n, 50_000_000_000n)

    return ethUSDPrice?.price / akashUSDPrice?.price
}