exports.isItemInArray = function (array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return item;   // Found it
        }}
   return 'Kosong';
}