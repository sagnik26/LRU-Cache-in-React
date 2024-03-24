import { useRef } from "react";
import { valueType, cacheType, nodeType } from "./props.interface";

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

    get(key: string | number) {
        if(this.cache[key]) {
            this.moveToFront(key);
            return this.cache[key].value;
        }

        return null;
    }

    put(key: string | number, value: valueType) {
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

    addToFront(key: string | number, value: valueType) {
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

    moveToFront(key: string | number) {
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

const useLRUCache = (capacity: number) => {
    const cacheRef = useRef(new LRUCache(capacity))

    return {
        get: (key: string | number) => cacheRef.current.get(key),
        put: (key: string | number, value: valueType) => cacheRef.current.put(key, value)
    }
}

export default useLRUCache;
