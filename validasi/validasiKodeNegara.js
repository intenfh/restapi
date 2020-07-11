exports.isItemInArray = function (array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][1] == item) {
            return array[i];   // Found it
        }}
    throw new Error('Masukan Kode Negara dengan Benar');
}