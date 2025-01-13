export const mainnetId = "mainnet";
export const testnetId = "testnet";
export const sandboxId = "sandbox";

export const selectedRangeValues: { [key: string]: number } = {
  "7D": 7,
  "1M": 30,
  ALL: Number.MAX_SAFE_INTEGER
};

// UI
export const statusBarHeight = 30;
export const drawerWidth = 240;
export const closedDrawerWidth = 57;
export const accountBarHeight = 57;

export const crossfiRPCTestnet = "https://rpc.testnet.ms"
export const chainRPC = "https://rpc.api.moonbeam.network"
export const contractAddress = "0xe2A4F6Cae191e6e599488E1e2C95861312Df9826"
export const providerUrl = "https://rpc.testnet.ms"

export const akashProviderUrl = "https://rpc.akashnet.net"
export const akashApiUrl = "https://api.akashnet.net:443"
export const akashChainId = "akashnet-2"

export const moonbeamContractAddress = '0xe2A4F6Cae191e6e599488E1e2C95861312Df9826'
export const mooonbeamABI = '[	{		"inputs": [			{				"internalType": "uint256",				"name": "amount",				"type": "uint256"			},			{				"internalType": "address",				"name": "recipient",				"type": "address"			}		],		"name": "adminWithdraw",		"outputs": [],		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [],		"name": "deposit",		"outputs": [],		"stateMutability": "payable",		"type": "function"	},	{		"inputs": [			{				"internalType": "address",				"name": "_admin",				"type": "address"			}		],		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"internalType": "address",				"name": "recipient",				"type": "address"			},			{				"indexed": false,				"internalType": "uint256",				"name": "amount",				"type": "uint256"			}		],		"name": "AdminWithdrawn",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"internalType": "uint256",				"name": "depositId",				"type": "uint256"			},			{				"indexed": true,				"internalType": "address",				"name": "user",				"type": "address"			},			{				"indexed": false,				"internalType": "uint256",				"name": "amount",				"type": "uint256"			},			{				"indexed": false,				"internalType": "uint256",				"name": "timestamp",				"type": "uint256"			}		],		"name": "Deposited",		"type": "event"	},	{		"inputs": [],		"name": "admin",		"outputs": [			{				"internalType": "address",				"name": "",				"type": "address"			}		],		"stateMutability": "view",		"type": "function"	},	{		"inputs": [],		"name": "currentDepositId",		"outputs": [			{				"internalType": "uint256",				"name": "",				"type": "uint256"			}		],		"stateMutability": "view",		"type": "function"	},	{		"inputs": [			{				"internalType": "uint256",				"name": "",				"type": "uint256"			}		],		"name": "depositById",		"outputs": [			{				"internalType": "address",				"name": "user",				"type": "address"			},			{				"internalType": "uint256",				"name": "amount",				"type": "uint256"			},			{				"internalType": "uint256",				"name": "timestamp",				"type": "uint256"			}		],		"stateMutability": "view",		"type": "function"	},	{		"inputs": [],		"name": "getBalance",		"outputs": [			{				"internalType": "uint256",				"name": "",				"type": "uint256"			}		],		"stateMutability": "view",		"type": "function"	},	{		"inputs": [			{				"internalType": "uint256",				"name": "depositId",				"type": "uint256"			}		],		"name": "getDeposit",		"outputs": [			{				"internalType": "address",				"name": "user",				"type": "address"			},			{				"internalType": "uint256",				"name": "amount",				"type": "uint256"			},			{				"internalType": "uint256",				"name": "timestamp",				"type": "uint256"			}		],		"stateMutability": "view",		"type": "function"	},	{		"inputs": [			{				"internalType": "address",				"name": "user",				"type": "address"			}		],		"name": "getUserDepositIds",		"outputs": [			{				"internalType": "uint256[]",				"name": "",				"type": "uint256[]"			}		],		"stateMutability": "view",		"type": "function"	},	{		"inputs": [],		"name": "totalDeposits",		"outputs": [			{				"internalType": "uint256",				"name": "",				"type": "uint256"			}		],		"stateMutability": "view",		"type": "function"	},	{		"inputs": [			{				"internalType": "address",				"name": "",				"type": "address"			},			{				"internalType": "uint256",				"name": "",				"type": "uint256"			}		],		"name": "userDepositIds",		"outputs": [			{				"internalType": "uint256",				"name": "",				"type": "uint256"			}		],		"stateMutability": "view",		"type": "function"	}]'

export const canisterKeyEcdsa = 'key_1' //prod: key_1 - test: dfx_test_key
export const dplABI = '[{"inputs":[{"internalType":"string","name":"_uri","type":"string"},{"internalType":"address","name":"_to","type":"address"}],"name":"createDeployment","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_icpOracle","type":"address"},{"internalType":"uint256","name":"_marketplaceFee","type":"uint256"},{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ERC721EnumerableForbiddenBatchMint","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"ERC721OutOfBoundsIndex","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"burnNFTOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"buyItemWithFraxETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"enum DchainDepin.USDPaymentType","name":"_USDPaymentType","type":"uint8"}],"name":"buyItemWithUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"cancelDeployment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"closeDeployment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"DeploymentCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"uri","type":"string"},{"indexed":false,"internalType":"address","name":"minter","type":"address"}],"name":"DeploymentCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"fundDeployment","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"}],"name":"itemAddedForSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"enum DchainDepin.PaymentType","name":"_paymentType","type":"uint8"}],"name":"itemSold","type":"event"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"enum DchainDepin.PaymentType","name":"_paymentType","type":"uint8"}],"name":"putItemForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"enum DchainDepin.PaymentType","name":"_paymentType","type":"uint8"}],"name":"putItemForSaleOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_bool","type":"bool"}],"name":"setContractEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setNewICPOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_USDCAddress","type":"address"},{"internalType":"address","name":"_USDTAddress","type":"address"}],"name":"setTokensAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"}],"name":"unsaledItem","type":"event"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"unsaleItem","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_akashHash","type":"string"}],"name":"updateDeployment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fundingId","type":"uint256"},{"internalType":"bool","name":"_executed","type":"bool"}],"name":"updateFunding","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"_contractAddress","type":"address"}],"name":"withdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Fundings","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getAllNFTIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"icpOracle","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Items","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"bidAmount","type":"uint256"},{"internalType":"string","name":"akashTxHash","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"bool","name":"live","type":"bool"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"enum DchainDepin.PaymentType","name":"paymentType","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketplaceFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTCharacterToURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"nftsMintedPerWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDCAddress","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDTAddress","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}]'

// Deployment creation
export enum RouteStepKeys {
  chooseTemplate = "choose-template",
  editDeployment = "edit-deployment",
  createLeases = "create-leases"
}

const productionMainnetApiUrl = "https://api.cloudmos.io";
const productionTestnetApiUrl = "https://api-testnet.cloudmos.io";
const productionSandboxApiUrl = "https://api-sandbox.cloudmos.io";
const productionStatsAppUrl = "https://stats.akash.network";
const productionHostnames = ["deploy.cloudmos.io", "console.akash.network", "staging-console.akash.network", "beta.cloudmos.io"];

export const isProd = process.env.NODE_ENV === "production";
export const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
export const BASE_API_MAINNET_URL = getApiMainnetUrl();
export const BASE_API_TESTNET_URL = getApiTestnetUrl();
export const BASE_API_SANDBOX_URL = getApiSandboxUrl();
export const STATS_APP_URL = getStatsAppUrl();

export const BASE_API_URL = getApiUrl();

export function getNetworkBaseApiUrl(network: string) {
  switch (network) {
    case testnetId:
      return BASE_API_TESTNET_URL;
    case sandboxId:
      return BASE_API_SANDBOX_URL;
    default:
      return BASE_API_MAINNET_URL;
  }
}

export const PROVIDER_PROXY_URL = getProviderProxyHttpUrl();
export const PROVIDER_PROXY_URL_WS = getProviderProxyWsUrl();

// TODO: Fix for console
export const auth0TokenNamespace = "https://console.akash.network";

export const uAktDenom = "uakt";
export const usdcIbcDenoms = {
  [mainnetId]: "ibc/170C677610AC31DF0904FFE09CD3B5C657492170E7E52372E48756B71E56F2F1",
  [sandboxId]: "ibc/12C6A0C374171B595A0A9E18B83FA09D295FB1F2D8C6DAA3AC28683471752D84"
};
const readableAktDenom = "uAKT";
const readableUsdcDenom = "uUSDC";
export const readableDenoms = {
  [uAktDenom]: readableAktDenom,
  [usdcIbcDenoms[mainnetId]]: readableUsdcDenom,
  [usdcIbcDenoms[sandboxId]]: readableUsdcDenom
};

function getApiMainnetUrl() {
  if (process.env.API_MAINNET_BASE_URL) return process.env.API_MAINNET_BASE_URL;
  if (typeof window === "undefined") return "http://localhost:3080";
  if (productionHostnames.includes(window.location?.hostname)) return productionMainnetApiUrl;
  return "http://localhost:3080";
}

function getApiTestnetUrl() {
  if (process.env.API_TESTNET_BASE_URL) return process.env.API_TESTNET_BASE_URL;
  if (typeof window === "undefined") return "http://localhost:3080";
  if (productionHostnames.includes(window.location?.hostname)) return productionTestnetApiUrl;
  return "http://localhost:3080";
}

function getApiSandboxUrl() {
  if (process.env.API_SANDBOX_BASE_URL) return process.env.API_SANDBOX_BASE_URL;
  if (typeof window === "undefined") return "http://localhost:3080";
  if (productionHostnames.includes(window.location?.hostname)) return productionSandboxApiUrl;
  return "http://localhost:3080";
}

function getApiUrl() {
  if (process.env.API_BASE_URL) return process.env.API_BASE_URL;
  if (typeof window === "undefined") return "http://localhost:3080";
  if (productionHostnames.includes(window.location?.hostname)) {
    try {
      const _selectedNetworkId = localStorage.getItem("selectedNetworkId");
      return getNetworkBaseApiUrl(_selectedNetworkId || mainnetId);
    } catch (e) {
      console.error(e);
      return productionMainnetApiUrl;
    }
  }
  return "http://localhost:3080";
}

function getStatsAppUrl() {
  if (process.env.STATS_APP_URL) return process.env.STATS_APP_URL;
  if (typeof window === "undefined") return "http://localhost:3001";
  if (productionHostnames.includes(window.location?.hostname)) return productionStatsAppUrl;
  return "http://localhost:3001";
}

function getProviderProxyHttpUrl() {
  if (process.env.PROVIDER_PROXY_URL) return process.env.PROVIDER_PROXY_URL;
  if (typeof window === "undefined") return "http://localhost:3040";
  if (window.location?.hostname === "deploybeta.cloudmos.io") return "https://deployproxybeta.cloudmos.io";
  if (productionHostnames.includes(window.location?.hostname)) return "https://providerproxy.cloudmos.io";
  return "http://localhost:3040";
}

function getProviderProxyWsUrl() {
  if (typeof window === "undefined") return "ws://localhost:3040";
  if (window.location?.hostname === "deploybeta.cloudmos.io") return "wss://deployproxybeta.cloudmos.io";
  if (productionHostnames.includes(window.location?.hostname)) return "wss://providerproxy.cloudmos.io";
  return "ws://localhost:3040";
}

export let selectedNetworkId = "";

// 0.5AKT aka 500000uakt
export const defaultInitialDeposit = 500000;

export let networkVersion: "v1beta2" | "v1beta3" | "v1beta4";
export let networkVersionMarket: "v1beta2" | "v1beta3" | "v1beta4";

export function setNetworkVersion() {
  const _selectedNetworkId = localStorage.getItem("selectedNetworkId");

  switch (_selectedNetworkId) {
    case mainnetId:
      networkVersion = "v1beta3";
      networkVersionMarket = "v1beta4";
      selectedNetworkId = mainnetId;
      break;
    case testnetId:
      networkVersion = "v1beta3";
      networkVersionMarket = "v1beta3";
      selectedNetworkId = testnetId;
      break;
    case sandboxId:
      networkVersion = "v1beta3";
      networkVersionMarket = "v1beta4";
      selectedNetworkId = sandboxId;
      break;

    default:
      networkVersion = "v1beta3";
      networkVersionMarket = "v1beta4";
      selectedNetworkId = mainnetId;
      break;
  }
}

export const monacoOptions = {
  selectOnLineNumbers: true,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  scrollbar: {
    verticalScrollbarSize: 8
  },
  minimap: {
    enabled: false
  },
  padding: {
    bottom: 50
  },
  hover: {
    enabled: false
  }
};

export const txFeeBuffer = 10000; // 10000 uAKT
