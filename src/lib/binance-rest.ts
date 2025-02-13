// Simple REST-based implementation for browser
const BASE_URLS = {
  spot: {
    production: "https://api.binance.com",
    testnet: "https://testnet.binance.vision",
  },
  futures: {
    production: "https://fapi.binance.com",
    testnet: "https://testnet.binancefuture.com",
  },
};

type BinanceConfig = {
  apiKey: string;
  apiSecret: string;
  testnet?: boolean;
};

class BinanceAPI {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor(config: BinanceConfig, type: "spot" | "futures" = "spot") {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.baseUrl = config.testnet
      ? BASE_URLS[type].testnet
      : BASE_URLS[type].production;
  }

  private async signRequest(params: Record<string, any> = {}) {
    const timestamp = Date.now();
    const queryString = Object.entries({ ...params, timestamp })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const signature = await this.generateSignature(queryString);
    return { queryString, signature };
  }

  private async generateSignature(queryString: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = encoder.encode(this.apiSecret);
    const message = encoder.encode(queryString);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      key,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signature = await crypto.subtle.sign("HMAC", cryptoKey, message);

    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async account() {
    try {
      const { queryString, signature } = await this.signRequest();
      const endpoint = this.baseUrl.includes("futures")
        ? "/fapi/v2/account"
        : "/api/v3/account";

      const response = await fetch(
        `${this.baseUrl}${endpoint}?${queryString}&signature=${signature}`,
        {
          headers: {
            "X-MBX-APIKEY": this.apiKey,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Binance API Error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to validate API keys",
      );
    }
  }
}

export const binanceService = {
  spot: (apiKey: string, apiSecret: string, testnet = true) => {
    return new BinanceAPI({ apiKey, apiSecret, testnet }, "spot");
  },
  futures: (apiKey: string, apiSecret: string, testnet = true) => {
    return new BinanceAPI({ apiKey, apiSecret, testnet }, "futures");
  },
};
