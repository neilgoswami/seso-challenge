"use strict";

const MinHeap = require("./MinHeap");

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    const minHeap = new MinHeap();

    // Initialize the MinHeap with the first log entry from all the log sources asynchronously
    let initPromises = logSources.map((logSource, index) =>
      logSource.popAsync().then((log) => {
        if (log) {
          minHeap.push({ log, sourceIndex: index });
        }
      })
    );

    // Wait for all initial promises to resolve
    Promise.all(initPromises)
      .then(() => {
        // Function to recursively process the next log entry from the MinHeap
        const processNext = () => {
          // Once MinHeap empty, we printed all logs. Log stats for the solution.
          if (minHeap.isEmpty()) {
            printer.done();
            resolve(console.log("Async sort complete."));
            return;
          }

          // Pop the smallest log entry from the MinHeap and print
          const { log, sourceIndex } = minHeap.pop();
          printer.print(log);

          // Fetch the next log entry from the same log source asynchronously and push it into MinHeap
          logSources[sourceIndex]
            .popAsync()
            .then((nextLog) => {
              if (nextLog) {
                minHeap.push({ log: nextLog, sourceIndex });
              }

              // Recursively process the next log entry
              processNext();
            })
            .catch((err) => reject(err));
        };

        // Start processing the first log entry from the MinHeap
        processNext();
      })
      .catch((err) => reject(err));
  });
};
