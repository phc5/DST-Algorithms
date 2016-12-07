// The word's worst allocator
var memory = new Float64Array(1024);
var head = 0;

var allocate = function(size) {
    if (head + size > memory.length) {
        return null;
    }
    var start = head;
    head += size;
    return start;
};

var free = function(ptr) {
};

var copy = function(to, from, size) {
    if (from === to) {
        return;
    }
    else if (from > to) {
        // Iterate forwards
        for (var i=0; i<size; i++) {
            set(to + i, get(from + i));
        }
    }
    else {
        // Iterate backwards
        for (var i=size - 1; i>=0; i--) {
            set(to + i, get(from + i));
        }
    }
};

var get = function(ptr) {
    return memory[ptr];
};

var set = function(ptr, value) {
    memory[ptr] = value;
};

var Array = function() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = allocate(this.length);
};
Array.SIZE_RATIO = 3;

Array.prototype.push = function(value) {
     if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    set(this.ptr + this.length, value);
    this.length++;
}

Array.prototype._resize = function(size) {
    var oldPtr = this.ptr;
    this.ptr = allocate(size);
    if (this.ptr === null) {
        throw new Error('Out of memory');
    }
    copy(this.ptr, oldPtr, this.length);
    free(oldPtr);
    this._capacity = size;
}

Array.prototype.get = function(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    return get(this.ptr + index);
}

Array.prototype.pop = function() {
    if (this.length == 0) {
        throw new Error('Index error');
    }
    var value = get(this.ptr + this.length - 1);
    this.length--;
    return value;
}

Array.prototype.insert = function(index, value) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    set(this.ptr + index, value);
    this.length++;
}

Array.prototype.remove = function(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }

    copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
}

Array.prototype.values = function() {
    for (let i = this.ptr; i < this.length; i++) {
        console.log(get(i));
    }
}

var myArray = new Array();
console.log(myArray);