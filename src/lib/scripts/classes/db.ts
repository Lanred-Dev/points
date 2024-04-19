type DBWrapperItem = {
    id: string;
    value: any;
};

export default class db {
    private dbName: string;
    private storeName: string;
    private db: IDBDatabase | null;
    private isDBOpen: boolean;
    private pendingGetItemCallbacks: { key: string; callback: (value: any) => void }[];

    constructor(dbName: string, storeName: string) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.db = null;
        this.isDBOpen = false;
        this.pendingGetItemCallbacks = [];
        this.openDB();
    }

    private openDB() {
        const request: IDBOpenDBRequest = window.indexedDB.open(this.dbName, 1);

        request.onerror = (event: Event) => {
            console.log("Failed to open the database:", (event.target as IDBOpenDBRequest).error);
        };

        request.onsuccess = (event: Event) => {
            this.db = (event.target as IDBOpenDBRequest).result;
            console.log("Database opened successfully.");
            this.isDBOpen = true;
            this.processPendingGetItemCallbacks();
        };

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            this.db = (event.target as IDBOpenDBRequest).result;
            if (!this.db.objectStoreNames.contains(this.storeName)) {
                this.db.createObjectStore(this.storeName, { keyPath: "id" });
                // You can create indexes on other properties if needed
                // this.db.createObjectStore(this.storeName).createIndex('hasVoted', 'hasVoted', { unique: false });
            }
        };
    }

    private processPendingGetItemCallbacks() {
        for (const { key, callback } of this.pendingGetItemCallbacks) {
            this.getItemInternal(key, callback);
        }
        this.pendingGetItemCallbacks = [];
    }

    private getItemInternal(key: string, callback: (value: any) => void) {
        const transaction: IDBTransaction = this.db!.transaction([this.storeName], "readonly");
        const objectStore: IDBObjectStore = transaction.objectStore(this.storeName);
        const request: IDBRequest = objectStore.get(key);

        request.onerror = (event: Event) => {
            console.log("Failed to get the item:", (event.target as IDBRequest).error);
            callback(null);
        };

        request.onsuccess = (event: Event) => {
            const result: DBWrapperItem | null = (event.target as IDBRequest).result;
            if (result) {
                callback(result.value);
            } else {
                callback(null);
            }
        };
    }

    public setItem(key: string, value: any) {
        const transaction: IDBTransaction = this.db!.transaction([this.storeName], "readwrite");
        const objectStore: IDBObjectStore = transaction.objectStore(this.storeName);
        const request: IDBRequest = objectStore.put({ id: key, value: value });

        request.onerror = (event: Event) => {
            console.log("Failed to set the item:", (event.target as IDBRequest).error);
        };

        request.onsuccess = () => {
            console.log("Item set successfully.");
        };
    }

    public getItem(key: string, callback: (value: any) => void) {
        if (this.isDBOpen) {
            this.getItemInternal(key, callback);
        } else {
            this.pendingGetItemCallbacks.push({ key, callback });
        }
    }
}
