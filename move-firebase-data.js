
const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require(path.join('C:', 'Users', 'cydec', 'Desktop', 'APP', 'momoheya-f67bc-firebase-adminsdk.json')); // 使用 path.join 來避免路徑問題


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://momoheya-f67bc-default-rtdb.asia-southeast1.firebasedatabase.app' // 替換成你的數據庫URL
});

const db = admin.database();
const ref = db.ref('/'); // 你當前的數據結構基路徑
const newRef = db.ref('/chat'); // 新節點的路徑

ref.once('value', (snapshot) => {
  const data = snapshot.val(); // 獲取當前所有數據
  newRef.set(data, (error) => { // 設置新節點為當前的數據
    if (error) {
      console.log('Data could not be saved.' + error);
    } else {
      console.log('Data saved successfully.');
      // 如需要，可以進一步刪除原節點數據
      ref.remove();
    }
  });
});
