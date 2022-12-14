import {candidates as data} from "./candidates"

import fuzzysort from "fuzzysort";

// @ts-ignored
data.forEach(d => d.filePrepared = fuzzysort.prepare(d.NM_URNA_CANDIDATO))

console.log("[Worker]: started")

onmessage = (e) => {
	const {text, callbackId} = e.data

	const result = fuzzysort.go(text, data, {
		key: "NM_URNA_CANDIDATO",
		limit: 30,
		threshold: -10000,
	})

	postMessage({
		result,
		callbackId
	})
}
