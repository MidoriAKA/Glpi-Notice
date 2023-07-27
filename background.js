// background.js

// メッセージを受信した際の処理
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  
    if (message.action === "compareElements") {
      const savedElement = message.savedElement6;
      const savedElement8 = message.savedElement8;

  // デスクトップ通知を表示する関数
  function showNotification() {
    const notificationOptions = {
      type: 'basic',
      title: 'Novo ticket',
      message: `Nome: ${savedElement8}\n${savedElement}`,
      iconUrl: 'icon.png' // アイコンのURLを設定する必要があります
    };
  
    chrome.notifications.create(notificationOptions);
  }

  let tabCreateRemove = async () => {
    const tab = await chrome.tabs.create({active : false});
    await chrome.tabs.remove(tab.id);
  
    await _sleep(30);
  
    return new Promise((resolve, reject) => {resolve()});
  }
  const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await tabCreateRemove();  
  
      // chrome.storageから保存された要素を取得
      chrome.storage.local.get(['savedElement'], function (result) {
        const previousElement = result.savedElement;
  
        // savedElementとpreviousElementを比較する処理
        if (previousElement === savedElement) {
          console.log("True:", savedElement);
        } else {
          console.log("False:", savedElement);
  
          // デスクトップ通知を表示
          showNotification();
        }
  
        // 現在の要素をchrome.storageに保存
        chrome.storage.local.set({ 'savedElement': savedElement }, function () {
          console.log('Saved:', savedElement);
        });
      });
    }
  });