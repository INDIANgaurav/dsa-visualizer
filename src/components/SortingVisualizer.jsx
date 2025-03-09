import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(100);
  const [algorithm, setAlgorithm] = useState("bubble");

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (sorting) return;
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
  };

  const bubbleSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
    }
  };

  const selectionSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) minIndex = j;
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
  };

  const insertionSort = async () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
  };

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      let pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, speed));
    return i + 1;
  };

  const startSorting = async () => {
    if (sorting) return;
    setSorting(true);
    let arr = [...array];
    if (algorithm === "bubble") await bubbleSort();
    else if (algorithm === "selection") await selectionSort();
    else if (algorithm === "insertion") await insertionSort();
    else if (algorithm === "quick") await quickSort(arr);
    setSorting(false);
  };

  return (
    <div className="sorting-visualizer">
      <div>
        <h2>Sorting Visualizer</h2>
        <div className="controls">
          <label>Array Size: </label>
          <select
            className="array-size"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={sorting}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
          <label>Speed: </label>
          <select
            className="algo-speed"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={sorting}
          >
            <option value="200">Slow</option>
            <option value="100">Medium</option>
            <option value="50">Fast</option>
          </select>
          <label>Algorithm: </label>
          <select
            className="sorting-algo"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={sorting}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <motion.div
              key={idx}
              className="array-bar"
              animate={{ height: value * 3 }}
              transition={{ duration: 0.2 }}
              style={{ height: `${value * 3}px` }}
            >
              <span className="bar-text">{value}</span>
            </motion.div>
          ))}
        </div>
        <button onClick={resetArray} disabled={sorting}>
          Reset Array
        </button>
        <button onClick={startSorting} disabled={sorting}>
          Start Sorting
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
