var memory = require('./memory');

// var Array = function() {
//     this.length = 0;
//     this._capacity = 0;
//     this.ptr = memory.allocate(this.length);
// };
// Array.SIZE_RATIO = 3;

// Array.prototype.push = function(value) {
// 	 if (this.length >= this._capacity) {
//         this._resize((this.length + 1) * Array.SIZE_RATIO);
//     }

//     memory.set(this.ptr + this.length, value);
//     this.length++;
// }

// Array.prototype._resize = function(size) {
// 	var oldPtr = this.ptr;
//     this.ptr = memory.allocate(size);
//     if (this.ptr === null) {
//         throw new Error('Out of memory');
//     }
//     memory.copy(this.ptr, oldPtr, this.length);
//     memory.free(oldPtr);
//     this._capacity = size;
// }

// Array.prototype.get = function(index) {
// 	if (index < 0 || index >= this.length) {
// 		throw new Error('Index error');
// 	}
// 	return memory.get(this.ptr + index);
// }

// Array.prototype.pop = function() {
// 	if (this.length == 0) {
// 		throw new Error('Index error');
// 	}
// 	var value = memory.get(this.ptr + this.length - 1);
// 	this.length--;
// 	return value;
// }

// Array.prototype.insert = function(index, value) {
// 	if (index < 0 || index >= this.length) {
//         throw new Error('Index error');
//     }
//     if (this.length >= this._capacity) {
//     	this._resize((this.length + 1) * Array.SIZE_RATIO);
//     }

//     memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
//     memory.set(this.ptr + index, value);
//     this.length++;
// }

// Array.prototype.remove = function(index) {
// 	if (index < 0 || index >= this.length) {
// 		throw new Error('Index error');
// 	}

// 	memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
// 	this.length--;
// }

// Array.prototype.values = function() {
//     for (let i = this.ptr; i < this.length; i++) {
//         console.log(get(i));
//     }
// }

var myArray = [];
myArray.prototype.forEach = function(callback) {
	for (let i = 0; i < this.length; i++) {
		console.log(this[i]);
		callback(this[i]);
	}
}