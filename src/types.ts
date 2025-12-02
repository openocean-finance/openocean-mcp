import type { Chain } from "viem";
import { z } from "zod";
import { isAddress, isHash } from "viem/utils";
export const chainParamsSchema = z.object({
	chain: z
		.string()
		.optional()
		.describe(
			"The blockchain network to execute the transaction on. uses fraxtal as default",
		)
		.default("fraxtal")
});

export const hashParamsSchema = z.object({
	chain: z
		.string()
		.optional()
		.describe(
			"The blockchain network to execute the transaction on. uses fraxtal as default",
		)
		.default("fraxtal"),
	hash: z
		.string()
		.refine(isHash, { message: "Invalid hash" })
		.describe("Hash from the OpenOcean contract on the blockchain."),
});

export const getQuoteParamsSchema = z.object({
	chain: z
		.string()
		.optional()
		.describe(
			"The blockchain network to execute the transaction on. uses fraxtal as default",
		)
		.default("fraxtal"),
	inTokenAddress: z
		.string()
		.refine(isAddress, { message: "Invalid inToken address" })
		.describe("The token to swap from (address)."),
	outTokenAddress: z
		.string()
		.refine(isAddress, { message: "Invalid outToken address" })
		.describe("The token to swap to (address)."),
	amount: z
		.string()
		.regex(/^\d+$/, { message: "Amount must be a string in wei (no decimals)" })
		.describe("Token amount with decimals. For example, if 1 USDT is input, use 1000000 (1 USDT * 10^6). "),
	slippage: z
		.string()
		.optional()
		.describe("Define the acceptable slippage level by inputting a percentage value within the range of 0.05 to 50. 1% slippage set as 1.")
		.default('1'),
});

export const getSwapParamsSchema = z.object({
	chain: z
		.string()
		.optional()
		.describe(
			"The blockchain network to execute the transaction on. uses fraxtal as default",
		)
		.default("fraxtal"),
	inTokenAddress: z
		.string()
		.refine(isAddress, { message: "Invalid inToken address" })
		.describe("The token to swap from (address)."),
	outTokenAddress: z
		.string()
		.refine(isAddress, { message: "Invalid outToken address" })
		.describe("The token to swap to (address)."),
	amount: z
		.string()
		.regex(/^\d+$/, { message: "Amount must be a string in wei (no decimals)" })
		.describe("Token amount with decimals. For example, if 1 USDT is input, use 1000000 (1 USDT * 10^6). "),
	slippage: z
		.string()
		.optional()
		.describe("Define the acceptable slippage level by inputting a percentage value within the range of 0.05 to 50. 1% slippage set as 1.")
		.default('1'),
	account: z
		.string()
		.refine(isAddress, { message: "Invalid account address" })
		.describe("user's wallet address.")
});

export interface token {
	address: string;
	decimals: number;
	symbol: string;
	name: string;
	price: number;
}

export interface QuoteResponse {
	inToken: token;
	outToken: token;
	inAmount: number;
	outAmount: number;
	estimatedGas: number;
}

export interface SwapResponse {
	inToken: token;
	outToken: token;
	inAmount: number;
	outAmount: number;
	estimatedGas: number;
	minOutAmount: number;
	from: string;
	to: string;
	value: string;
	gasPrice: string;
	data: string;
	blockNumber: number;
	price_impact: string;
	chainId: number;
}

export interface ErrorResponse {
	detail: string;
	traceId: string;
	errorCode: number;
}
