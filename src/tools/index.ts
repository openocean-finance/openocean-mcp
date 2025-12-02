import { chainParamsSchema, getQuoteParamsSchema, getSwapParamsSchema, hashParamsSchema } from "../types.js";
import * as chainExecute from './chain.js';
import * as swapExecute from './swap.js';
export const tools = {
	chainList: {
		name: "CHAIN_LIST",
		description: "Get chain list",
		execute: chainExecute.chainList
	},
	tokenList: {
		name: "TOKEN_LIST",
		description: "Get token list",
		parameters: chainParamsSchema,
		execute: chainExecute.tokenList
	},
	dexList: {
		name: "DEX_LIST",
		description: "Get dex list",
		parameters: chainParamsSchema,
		execute: chainExecute.dexList
	},
	gasPrice: {
		name: "GAS_PRICE",
		description: "Get gas price",
		parameters: chainParamsSchema,
		execute: chainExecute.gasPrice
	},
	getTransaction: {
		name: "GET_TRANSACTION",
		description: "Get Transaction",
		parameters: hashParamsSchema,
		execute: chainExecute.getTransaction
	},
	quote: {
		name: "QUOTE",
		description: "Quote the price of a specific trading pair",
		parameters: getQuoteParamsSchema,
		execute: swapExecute.quote
	},
	swap: {
		name: "SWAP",
		description: "Building swap transaction",
		parameters: getSwapParamsSchema,
		execute: swapExecute.swap
	},
};
