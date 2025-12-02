import { z } from "zod";
import { SwapService } from "../services/swap.js";
import { getChainFromName } from "../utils/get-chain.js";
import { getQuoteParamsSchema, getSwapParamsSchema } from "../types.js";
import { ChainService } from "../services/chain.js";

export const quote = async (args: z.infer<typeof getQuoteParamsSchema>) => {
	try {
		const inputChain = args.chain.toLowerCase();
		const chainObject = getChainFromName(inputChain);

		console.error(`[QUOTE] Using chain: ${chainObject.name}`, args);

		const chainService = new ChainService();
		const gasRes: any = await chainService.gasPrice(chainObject.id);
		const gasPrice = gasRes.data.fast;

		const swapService = new SwapService();
		const quote = await swapService.quote(
			args.inTokenAddress,
			args.outTokenAddress,
			chainObject.id,
			args.amount,
			args.slippage ? Number(args.slippage) * 100 : 100,
			gasPrice,
		);
		if (quote instanceof Error) {
			return `Error fetching quote: ${quote.message}`;
		}

		// return JSON.stringify(quote);
		return JSON.stringify(quote, null, 2);
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred while fetching quote.";
		console.error(`[QUOTE] Error: ${message}`);
		throw new Error(`Failed to fetch quote: ${message}`);
	}
};
export const swap = async (args: z.infer<typeof getSwapParamsSchema>) => {
	try {
		const inputChain = args.chain.toLowerCase();
		const chainObject = getChainFromName(inputChain);

		console.error(`[SWAP] Using chain: ${chainObject.name}`, args);

		const chainService = new ChainService();
		const gasRes: any = await chainService.gasPrice(chainObject.id);
		const gasPrice = gasRes.data.fast;

		const swapService = new SwapService();
		const swap: any = await swapService.swap(
			args.inTokenAddress,
			args.outTokenAddress,
			chainObject.id,
			args.amount,
			args.slippage ? Number(args.slippage) * 100 : 100,
			gasPrice,
		);
		if (swap instanceof Error) {
			return `Error fetching swap: ${swap.message}`;
		}

		// return JSON.stringify(swap);
		return JSON.stringify(swap, null, 2);
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred while fetching swap.";
		console.error(`[SWAP] Error: ${message}`);
		throw new Error(`Failed to fetch swap: ${message}`);
	}
}
