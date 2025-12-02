import { z } from "zod";
import { ChainService } from "../services/chain.js";
import { getChainFromName } from "../utils/get-chain.js";
import { chainParamsSchema, hashParamsSchema } from "../types.js";

export const chainList = async () => {
	const chains = [ 'bsc', 'eth', 'polygon', 'fantom', 'avax', 'arbitrum', 'xdai', 'moonriver', 'optimism', 'aurora', 'cronos', 'harmony', 'aptos', 'near', 'metis', 'kava', 'celo', 'klaytn',
		'zksync', 'polygon_zkevm', 'linea', 'telos', 'scroll', 'base', 'mantle', 'opbnb', 'manta', 'blast', 'mode', 'merlin', 'rootstock', 'sei', 'gravity', 'ape', 'sonic', 'sui', 'bera', 'uni', 'flare',
		'monad', 'swell', 'hyperevm', 'plume', 'tac', 'plasma' ];
	return JSON.stringify(chains, null, 2);
};

export const gasPrice = async (args: z.infer<typeof chainParamsSchema>) => {
	try {
		const inputChain = args.chain.toLowerCase();
		const chainObject = getChainFromName(inputChain);

		console.error(`[GAS_PRICE] Using chain: ${chainObject} (${chainObject.id})`);

		const service = new ChainService();
		const gasPrice = await service.gasPrice(chainObject.id);
		if (gasPrice instanceof Error) {
			return `Error fetching gasPrice: ${gasPrice.message}`;
		}

		return JSON.stringify(gasPrice, null, 2);
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred while fetching gasPrice.";
		console.error(`[GAS_PRICE] Error: ${message}`);
		throw new Error(`Failed to fetch gasPrice: ${message}`);
	}
};
export const tokenList = async (args: z.infer<typeof chainParamsSchema>) => {
	try {
		const inputChain = args.chain.toLowerCase();
		const chainObject = getChainFromName(inputChain);

		console.error(`[TOKEN_LIST] Using chain: ${chainObject.name}`);

		const service = new ChainService();
		const tokenList = await service.tokenList(chainObject.id);
		if (tokenList instanceof Error) {
			return `Error fetching tokenList: ${tokenList.message}`;
		}

		return JSON.stringify(tokenList, null, 2);
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred while fetching tokenList.";
		console.error(`[TOKEN_LIST] Error: ${message}`);
		throw new Error(`Failed to fetch tokenList: ${message}`);
	}
}

export const dexList = async (args: z.infer<typeof chainParamsSchema>) => {
	try {
		const inputChain = args.chain.toLowerCase();
		const chainObject = getChainFromName(inputChain);

		console.error(`[DEX_LIST] Using chain: ${chainObject.name}`);

		const service = new ChainService();
		const dexList = await service.dexList(chainObject.id);
		if (dexList instanceof Error) {
			return `Error fetching dexList: ${dexList.message}`;
		}

		return JSON.stringify(dexList, null, 2);
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred while fetching dexList.";
		console.error(`[DEX_LIST] Error: ${message}`);
		throw new Error(`Failed to fetch dexList: ${message}`);
	}
}

export const getTransaction = async (args: z.infer<typeof hashParamsSchema>) => {
	try {
		const inputChain = args.chain.toLowerCase();
		const chainObject = getChainFromName(inputChain);

		console.error(`[GET_TRANSACTION] Using chain: ${chainObject.name}`, args);

		const service = new ChainService();
		const tx = await service.getTransaction(chainObject.id, args.hash);
		if (tx instanceof Error) {
			return `Error fetching getTransaction: ${tx.message}`;
		}

		return JSON.stringify(tx, null, 2);
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred while fetching getTransaction.";
		console.error(`[GET_TRANSACTION] Error: ${message}`);
		throw new Error(`Failed to fetch getTransaction: ${message}`);
	}
}
