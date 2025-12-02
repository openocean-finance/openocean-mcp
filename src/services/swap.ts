import { DEX_API_URL } from "../constants.js";
// import type { SwapResponse } from "../types.js";
import type { ErrorResponse } from "../types.js";
import { QuoteResponse, SwapResponse } from "../types.js";
// import { QuoteResponse } from "../types.js";

export class SwapService {

	async quote(
		inTokenAddress: string,
		outTokenAddress: string,
		chainId: number,
		amount: string,
		slippage: number,
		gasPrice: string
	) {
		try {
			const response = await fetch(`${DEX_API_URL}/v2/${chainId}/quote?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&gasPrice=${gasPrice}&slippage=${slippage}&referrer=0xC5d4de874CfE6aac6BC9CAD5Cb6b2B35bd7b8392&flags=4`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});

			const data: any = await response.json();

			if (!response.ok) {
				const errorData = data as ErrorResponse;
				throw new Error(
					`Failed to fetch quote: ${errorData.detail} (Trace ID: ${errorData.traceId}, Error Code: ${errorData.errorCode})`,
				);
			}

			const { inToken, outToken, inAmount, outAmount, estimatedGas }  = data;
			return { inToken, outToken, inAmount, outAmount, estimatedGas } as QuoteResponse;
		} catch (error) {
			console.error("Error fetching quote:", error);
			throw new Error(
				`Fatally Failed to fetch quote: ${(error as Error).message} with code ${
					(error as { code?: string }).code || "unknown"
				}`,
			);
		}
	}

	async swap(
		inTokenAddress: string,
		outTokenAddress: string,
		chainId: number,
		amount: string,
		slippage: number,
		gasPrice: string
	) {
		try {
			const response = await fetch(`${DEX_API_URL}/v2/${chainId}/swap?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&gasPrice=${gasPrice}&slippage=${slippage}&referrer=0xC5d4de874CfE6aac6BC9CAD5Cb6b2B35bd7b8392&flags=4`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});

			const swapData: any = await response.json();

			if (!response.ok) {
				const errorData = swapData as ErrorResponse;
				throw new Error(
					`Failed to fetch swap: ${errorData.detail} (Trace ID: ${errorData.traceId}, Error Code: ${errorData.errorCode})`,
				);
			}

			const { inToken, outToken, inAmount, outAmount, estimatedGas, minOutAmount, from, to, value, data, blockNumber, price_impact }  = swapData;
			return { inToken, outToken, inAmount, outAmount, estimatedGas, minOutAmount, from, to, value, data, gasPrice, blockNumber, price_impact, chainId } as SwapResponse;
		} catch (error) {
			console.error("Error fetching swap:", error);
			throw new Error(
				`Fatally Failed to fetch swap: ${(error as Error).message} with code ${
					(error as { code?: string }).code || "unknown"
				}`,
			);
		}
	}
}
