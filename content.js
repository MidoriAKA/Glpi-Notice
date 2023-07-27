// content.js

// 要素を取得して保存する
const tbodyElement = document.querySelector("form#massformTicket table.tab_cadrehov tbody");

if (tbodyElement) {
  const tdElements = tbodyElement.querySelectorAll("tr:first-child td");
  if (tdElements && tdElements.length >= 8) {
    const savedElement6 = tdElements[5].innerText.trim();
    const savedElement8 = tdElements[7].innerText.trim();

    // background.jsにメッセージを送信
    chrome.runtime.sendMessage({
      action: "compareElements",
      savedElement6: savedElement6,
      savedElement8: savedElement8
    });
  }
}
