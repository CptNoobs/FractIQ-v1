const BASE_URL = "https://api.binance.com/api/v3";

export async function fetchKlines(
  symbol: string,
  interval: string,
  limit = 1000,
) {
  try {
    const response = await fetch(
      `${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
    );
    const data = await response.json();

    return data.map((d: any[]) => ({
      time: d[0] / 1000,
      open: parseFloat(d[1]),
      high: parseFloat(d[2]),
      low: parseFloat(d[3]),
      close: parseFloat(d[4]),
      volume: parseFloat(d[5]),
    }));
  } catch (error) {
    console.error("Error fetching klines:", error);
    return [];
  }
}
