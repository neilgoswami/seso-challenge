"use strict";

const MinHeap = require("./MinHeap");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const minHeap = new MinHeap();

  // Initialize the MinHeap with the first log entry from all the log sources
  logSources.forEach((logSource, index) => {
    const log = logSource.pop();
    if (log) {
      minHeap.push({ log, sourceIndex: index });
    }
  });

  // Process logs in chronological order using the MinHeap
  while (!minHeap.isEmpty()) {
    // Pop the smallest log entry from the MinHeap and print
    const { log, sourceIndex } = minHeap.pop();
    printer.print(log);

    // Fetch the next log entry from the same log source and push it into MinHeap
    const nextLog = logSources[sourceIndex].pop();
    if (nextLog) {
      minHeap.push({ log: nextLog, sourceIndex });
    }
  }

  printer.done();

  return console.log("Sync sort complete.");
};
