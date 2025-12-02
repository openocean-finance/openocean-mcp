#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { tools } from "./tools/index.js";

async function main() {
	console.error("Initializing MCP Server...");

	const server = new FastMCP({
		name: "Openocean MCP Server",
		version: "0.0.1",
	});

	server.addTool(tools.chainList);
	server.addTool(tools.tokenList);
	server.addTool(tools.dexList);
	server.addTool(tools.gasPrice);
	server.addTool(tools.getTransaction);
	server.addTool(tools.quote);
	server.addTool(tools.swap);

	try {
		await server.start({
			transportType: "stdio",
		});
		// await server.start({
		// 	transportType: "httpStream",
		// 	httpStream: {
		// 		port: 8080,
		// 	},
		// });
		console.error("✅ Openocean MCP Server started successfully over stdio.");
		console.error("You can now connect to it using an MCP client.");
	} catch (error) {
		console.error("❌ Failed to start Openocean MCP Server:", error);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error("❌ An unexpected error occurred:", error);
	process.exit(1);
});
