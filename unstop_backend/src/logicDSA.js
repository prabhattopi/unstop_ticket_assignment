function SlidingWindow(windowSize, array) {
    if (array.length < windowSize) {
      console.log("Array length is smaller than the window size.");
      return null;
    } else {
      let minDiff = Number.MAX_SAFE_INTEGER;
      let closestWindow = [];
  
      for (let i = 0; i <= array.length - windowSize; i++) {
        const currentWindow = array.slice(i, i + windowSize);
        const diff = currentWindow.reduce((acc, curr, index) => {
          if (index === 0) return acc;
          return acc + Math.abs(curr - currentWindow[index - 1]);
        }, 0);
  
        if (diff < minDiff) {
          minDiff = diff;
          closestWindow = currentWindow;
        }
      }
      return closestWindow;
    }
  }

async function cuncurrentRow(targetLength,arr){

      let start = 0; // Start index of the window
  let end = start + targetLength - 1; // End index of the window

  while (end < arr.length) {
    // Check if the subarray is consecutive
    let isConsecutive = true;
    for (let i = start + 1; i <= end; i++) {
        // console.log(arr[i - 1]["seat_no"]+1)
      if (arr[i]["seat_no"] !== arr[i - 1]["seat_no"]+1) {
        isConsecutive = false;
        break;
      }
    }

    if (isConsecutive) {
      return arr.slice(start, end + 1); // Return the consecutive subarray
    }

    // Move the window
    start++;
    end++;
  }

  return null; // No consecutive subarray of size targetLength found
}

module.exports={SlidingWindow,cuncurrentRow}