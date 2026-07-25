const bundledUndiciMajor = Number.parseInt(
	process.versions.undici?.split(".")[0] ?? "0",
	10,
);

if (bundledUndiciMajor >= 8) {
	const nativeFetch = globalThis.fetch.bind(globalThis);

	globalThis.fetch = (input, init) => {
		if (!init || !("dispatcher" in init)) {
			return nativeFetch(input, init);
		}

		// Alchemy 0.91 injects an external Undici 7 dispatcher. Node 26 bundles
		// Undici 8, whose dispatcher contract is incompatible with that instance.
		// Native fetch is sufficient here and correctly decompresses Cloudflare JSON.
		const compatibleInit = { ...init };
		delete compatibleInit.dispatcher;
		return nativeFetch(input, compatibleInit);
	};
}
