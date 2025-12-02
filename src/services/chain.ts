import { OPENOCEAN_API_URL } from "../constants.js";
import type { ErrorResponse } from "../types.js";
import { getTransaction } from "../tools/chain.js";

export class ChainService {

	async gasPrice(
		chainId: number
	) {
		try {
			const response = await fetch(`${OPENOCEAN_API_URL}/v3/${chainId}/gasPrice`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});

			const data: any = await response.json();

			if (!response.ok) {
				const errorData = data as ErrorResponse;
				throw new Error(
					`Failed to fetch gasPrice: ${errorData.detail} (Trace ID: ${errorData.traceId}, Error Code: ${errorData.errorCode})`,
				);
			}

			return data;
		} catch (error) {
			console.error("Error fetching gasPrice:", error);
			throw new Error(
				`Fatally Failed to fetch gasPrice: ${(error as Error).message} with code ${
					(error as { code?: string }).code || "unknown"
				}`,
			);
		}
	}

	async tokenList(
		chainId: number
	) {
		try {
			const response = await fetch(`${OPENOCEAN_API_URL}/v3/${chainId}/tokenList`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});

			const data: any = await response.json();

			if (!response.ok) {
				const errorData = data as ErrorResponse;
				throw new Error(
					`Failed to fetch tokenList: ${errorData.detail} (Trace ID: ${errorData.traceId}, Error Code: ${errorData.errorCode})`,
				);
			}

			return data;
		} catch (error) {
			console.error("Error fetching tokenList:", error);
			throw new Error(
				`Fatally Failed to fetch tokenList: ${(error as Error).message} with code ${
					(error as { code?: string }).code || "unknown"
				}`,
			);
		}
	}

	async dexList(
		chainId: number
	) {
		try {
			const response = await fetch(`${OPENOCEAN_API_URL}/v3/${chainId}/dexList`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});

			const data: any = await response.json();

			if (!response.ok) {
				const errorData = data as ErrorResponse;
				throw new Error(
					`Failed to fetch dexList: ${errorData.detail} (Trace ID: ${errorData.traceId}, Error Code: ${errorData.errorCode})`,
				);
			}

			return data;
		} catch (error) {
			console.error("Error fetching dexList:", error);
			throw new Error(
				`Fatally Failed to fetch dexList: ${(error as Error).message} with code ${
					(error as { code?: string }).code || "unknown"
				}`,
			);
		}
	}

	async getTransaction(
		chainId: number,
		hash: string
	) {
		try {
			const response = await fetch(`${OPENOCEAN_API_URL}/v3/${chainId}/getTransaction?hash=${hash}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});

			const data: any = await response.json();

			if (!response.ok) {
				const errorData = data as ErrorResponse;
				throw new Error(
					`Failed to fetch getTransaction: ${errorData.detail} (Trace ID: ${errorData.traceId}, Error Code: ${errorData.errorCode})`,
				);
			}

			return data;
		} catch (error) {
			console.error("Error fetching getTransaction:", error);
			throw new Error(
				`Fatally Failed to fetch getTransaction: ${(error as Error).message} with code ${
					(error as { code?: string }).code || "unknown"
				}`,
			);
		}
	}
}
