import SearchWorker from './search.worker?worker';

import { nanoid } from "nanoid"

type Callback = (data: any) => void

export class Search {
	worker: Worker
	callbacks: Array<{
		id: string
		cb: Callback
	}> = []

	constructor() {
		this.worker = new SearchWorker();
		this.worker.onmessage = (e) => {
			this.runWorkerCallback(e.data.callbackId, e.data.result)
		}
	}

	search(query: string, callback: Callback) {
		const callbackId = this.addCallback(callback);
		this.worker.postMessage({
			text: query,
			callbackId
		})
	}

	addCallback(cb: Callback) {
		const id = nanoid();
		this.callbacks.push({
			id,
			cb
		})
		return id;
	}

	runWorkerCallback(id: string, data: any) {
    for (let i = 0; i < this.callbacks.length; i++) {
      if (this.callbacks[i].id === id) {
        this.callbacks[i].cb(data);
        this.callbacks.splice(i, 1);
      }
    }
  }
}
