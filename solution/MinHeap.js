class MinHeap {
  /**
   * Initializes an empty array to store heap elements
   */
  constructor() {
    this.heap = [];
  }

  /**
   * Returns the index of the parent node of the node at the given index.
   * @param {number} index - Index of the node for which to find the parent index.
   * @returns {number} - Index of the parent node.
   */
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Returns the index of the left child node of the node at the given index.
   * @param {number} index - Index of the node for which to find the left child index.
   * @returns {number} - Index of the left child node.
   */
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  /**
   * Returns the index of the right child node of the node at the given index.
   * @param {number} index - Index of the node for which to find the right child index.
   * @returns {number} - Index of the right child node.
   */
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  /**
   * Swaps the elements at the two specified indices in the heap array.
   * @param {number} index1 - Index of the first element to swap.
   * @param {number} index2 - Index of the second element to swap.
   */
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  /**
   * Adds a new element to the heap.
   * @param {any} node - The element to add to the heap.
   */
  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  /**
   * Restores the heap property by moving the last element up to its correct position.
   */
  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = this.getParentIndex(index);

      // Compare the current node with its parent; if in correct order, stop
      if (this.heap[parentIndex].log.date <= this.heap[index].log.date) break;

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  /**
   * Removes and returns the root element (minimum element for a min-heap) from the heap.
   * @returns {any} - The root element of the heap.
   */
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  /**
   * Restores the heap property by moving the root element down to its correct position.
   */
  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);

      // Determine the smaller child node (for min-heap)
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].log.date <
          this.heap[smallerChildIndex].log.date
      ) {
        smallerChildIndex = rightChildIndex;
      }

      // Compare the current node with the smaller child; if in correct order, stop
      if (this.heap[index].log.date <= this.heap[smallerChildIndex].log.date)
        break;

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  /**
   * Checks if the heap is empty.
   * @returns {boolean} - True if the heap is empty, false otherwise.
   */
  isEmpty() {
    return this.heap.length === 0;
  }
}

module.exports = MinHeap;
