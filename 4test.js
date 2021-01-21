function bubbleSort(array) {
  let trade = 0;
  for (let i = 0; i < array.length; i++) {
    for(let j = i + 1; j<array.length; j++) {
      if(array[i]>array[j]){
        trade=array[i];
        array[i]=array[j];
        array[j]=trade;
      }
    }
  }
  return array;
}

console.log(bubbleSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]

