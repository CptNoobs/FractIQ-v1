import { Spot } from "@binance/connector";
import { Futures } from "binance-futures-connector";

// Define base URLs
const SPOT_TESTNET_URL = "https://testnet.binance.vision";
const FUTURES_TESTNET_URL = "https://testnet.binancefuture.com";

const testnet = import.meta.env.MODE !== "production";

export const binanceService = {
  spot: (apiKey: string, apiSecret: string) => {
    return new Spot(apiKey, apiSecret, {
      baseURL: testnet ? SPOT_TESTNET_URL : undefined,
    });
  },
  futures: (apiKey: string, apiSecret: string) => {
    return new Futures(apiKey, apiSecret, {
      baseURL: testnet ? FUTURES_TESTNET_URL : undefined,
    });
  },
};
