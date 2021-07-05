type Constants = {
  name: string;
  version: number;
};

let indexedDb: IDBFactory;
let dbConstants: Constants;
let storeConstants: any;
let db: IDBDatabase;

class Mydb {
  constructor() {
    dbConstants = {
      name: 'mydb',
      version: 3,
    };
    storeConstants = {
      name: 'data',
      storeOptions: { keyPath: 'uid', autoIncrement: true },
      indexes: [
        { indexName: 'accessToken', unique: false },
        { indexName: 'client', unique: false },
        { indexName: 'uid', unique: false },
      ],
    };
  }

  connect() {
    console.log('接続開始');

    indexedDb = window.indexedDB;
    const request = indexedDb.open(dbConstants.name, dbConstants.version);

    // 接続成功（初回 or DBのバージョンが変わったとき）
    request.onupgradeneeded = (event: any) => {
      db = (<IDBRequest>event.target).result;

      if (!Array.from(db.objectStoreNames).includes(storeConstants.name)) {
        // store"data"が存在しないとき、新規作成する。
        const objectStore = db.createObjectStore(storeConstants.name, storeConstants.storeOptions);
        for (const index of storeConstants.indexes) {
          objectStore.createIndex(index.indexName, index.indexName, { unique: index.unique });
        }
      }
    };
    // 接続成功（すでにDBが存在する場合）
    request.onsuccess = (event: any) => {
      console.log('接続成功');
      db = (<IDBRequest>event.target).result;
    };
    // 接続失敗
    request.onerror = (event: any) => {
      console.log('接続失敗:' + event.message);
    };
  }

  add(data: any) {
    console.log('登録');

    const trans = db.transaction(storeConstants.name, 'readwrite');
    const store = trans.objectStore(storeConstants.name);
    const request = store.put(data);
    request.onsuccess = () => {
      console.log('登録成功');
    };
    request.onerror = (event: any) => {
      console.log('登録失敗:' + event.message);
    };
  }

  getAll() {
    console.log('全取得');

    const trans = db.transaction([storeConstants.name]);
    const store = trans.objectStore(storeConstants.name);
    const request = store.getAll();
    request.onsuccess = (event: any) => {
      const rows = event.target.result;
      console.log(rows);
    };
    request.onerror = (event: any) => {
      console.log('取得失敗:' + event.message);
    };
  }
}

export default new Mydb();
