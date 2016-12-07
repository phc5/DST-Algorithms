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
    this.capacity = 0;
    this.ptr = memory.allocate(this.length);
    this.SIZE_RATIO = 3;
}

Array.prototype.push = function(value) {
    if (this.length >= this.capacity) {
        this._resize((this.length + 1) * 3);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
}

Array.prototype._resize = function(size) {
    let oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
        throw new Error('null');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
}

Array.prototype.get = function(index) {
    if (index < 0 || index >= this.length) {
        throw new Error("index not in bounds");
    }
    return memory.get(this.ptr + index);
}

Array.prototype.pop = function() {
    if (this.length === 0) {
        throw new Error('Index out of bounds');
    }
    var val = memory.get(this.ptr + this.length - 1);
    this.length--;
    return val;
}

Array.prototype.insert = function(index, val) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    if (this.length >= this.capacity) {
        this._resize((this.length + 1) * 3);
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index)
    memory.set(this.ptr + index, val)
    this.length++;
}

Array.prototype.remove = function() {

}