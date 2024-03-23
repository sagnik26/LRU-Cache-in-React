interface cacheType {
    [key: string]: {key: string, value: string | number | boolean, next: any}
}

interface nodeType {
    key: string;
    value: string | number | boolean;
    next: any;
}

class LRUCache {
    capacity: number;
    cache: cacheType;
    head: nodeType | null;
    tail: nodeType | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = {};
        this.head = null;
        this.tail = null;
    }

    get(key: string) {
        if(this.cache[key]) {
            this.moveToFront(key);
            return this.cache[key].value;
        }

        return null;
    }

    put(key: string, value: string | number | boolean) {
        if(this.cache[key]) {
            this.cache[key].value = value;
            this.moveToFront(key);
        }
        else {
            if(Object.keys(this.cache).length === this.capacity) {
                this.removelast();
            }

            this.addToFront(key, value)
        }
    }

    addToFront(key: string, value: string | number | boolean) {
        const newNode: nodeType = { key, value, next: null };
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode
        }
        this.cache[key] = newNode;
    }

    moveToFront(key: string) {
        const current = this.cache[key];
        if(current === this.head) return;

        let prev = null;
        let node = this.head;
        while(node && node.key !== key) {
            prev = node;
            node = node.next;
        }

        if(!node) return;

        if(node === this.tail) {
            this.tail = prev;
        }

        if(prev) {
            prev.next = node.next;
        }

        node.next = this.head;
        this.head = node;
    }

    removelast() {
        if (!this.head) return;

        const lastKey = this.tail?.key;
        if(lastKey) {
            delete this.cache[lastKey];
        }
        
        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
        } else {
          let current = this.head;
          while (current.next !== this.tail) {
            current = current.next;
          }
    
          current.next = null;
          this.tail = current;
        }
    }
}
