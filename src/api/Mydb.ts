type Constants = {
  name: string;
  version: number;
};

type Data = {
  email: string;
  password: string;
};

class Mydb {
  public indexedDb: IDBFactory;
  public dbConstants: Constants;
  public storeConstants: any;
  public db: IDBDatabase;

  constructor() {
    this.dbConstants = {
      name: 'mydb',
      version: 3,
    };
    this.storeConstants = {
      name: 'data',
      storeOptions: { keyPath: 'id', autoIncrement: true },
      indexes: [
        { indexName: 'email', unique: false },
        { indexName: 'password', unique: false },
      ],
    };
  }

  connect() {
    console.log('接続開始');

    this.indexedDb = window.indexedDB;
    const request = this.indexedDb.open(this.dbConstants.name, this.dbConstants.version);

    // 接続成功（初回 or DBのバージョンが変わったとき）
    request.onupgradeneeded = (event: any) => {
      this.db = (<IDBRequest>event.target).result;

      if (!Array.from(this.db.objectStoreNames).includes(this.storeConstants.name)) {
        // store"data"が存在しないとき、新規作成する。
        const objectStore = this.db.createObjectStore(
          this.storeConstants.name,
          this.storeConstants.storeOptions,
        );
        for (const index of this.storeConstants.indexes) {
          objectStore.createIndex(index.indexName, index.indexName, { unique: index.unique });
        }
      }
    };
    // 接続成功（すでにDBが存在する場合）
    request.onsuccess = (event: any) => {
      console.log('接続成功');
      this.db = (<IDBRequest>event.target).result;
    };
    // 接続失敗
    request.onerror = (event: any) => {
      console.log('接続成功:' + event.message);
    };
  }

  add(data: Data) {
    console.log('登録');

    const trans = this.db.transaction(this.storeConstants.name, 'readwrite');
    const store = trans.objectStore(this.storeConstants.name);
    const request = store.put(data);
    request.onsuccess = () => {
      console.log('登録成功');
    };
    request.onerror = (event: any) => {
      console.log('登録失敗:' + event.message);
    };
  }
}

export default new Mydb();
