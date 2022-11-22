var siteList;
var newTabFlag;

// 保存済み情報を読み込む
const getStorageInIndex = () =>
  new Promise((resolve) => {
    chrome.storage.local.get((savedObject) => {
      if (savedObject && savedObject.site) {
        siteList = savedObject.site.list;
        newTabFlag = savedObject.newTabFlag;
      }
      resolve(savedObject);
    });
  });

const initialize = async () => {
  const selectElement = document.getElementById("content_selector");
  const newTabElement = document.getElementById("newTab");

  if (newTabElement) {
    newTabElement.checked = newTabFlag;
  }

  var selectOptionElement = "";
  for (i = 0; i < siteList.length; i++) {
    if (siteList[i].title && siteList[i].url) {
      selectOptionElement += `
        <option>${siteList[i].title}</option>
      `;
    }
  }

  if (selectElement) {
    selectElement.innerHTML = selectOptionElement;
  }
};

const search = (event) => {
  const selectedSiteTitle = document.querySelector(".content_selector").value;
  const selectedSiteUrl = siteList.find((site) => {
    return site.title === selectedSiteTitle;
  }).url;
  if (event.type === "click" || event.key === "Enter") {
    const searchText = document.getElementById("search-box_search").value;

    window.open(
      `https://www.google.com/search?q=${searchText} site:${selectedSiteUrl}`
    );

    // TODO: 「新しいタブで開く」の実装
    // newTabFlag
    //   ? window.open(
    //       `https://www.google.com/search?q=${searchText} site:${selectedSiteUrl}`
    //     )
    //   : (window.location.href = `https://www.google.com/search?q=${searchText} site:${selectedSiteUrl}`);
  }
};

(async () => {
  await getStorageInIndex();
  await initialize();
})();

// イベント
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".search-box_search-icon")
    .addEventListener("click", search);
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".search-box_search")
    .addEventListener("keydown", search);
});

// document.addEventListener("DOMContentLoaded", () => {
//   const checkboxElement = document.querySelector(".options_option_checkbox");

//   checkboxElement.addEventListener("change", (event) => {
//     newTabFlag = event.target.checked;
//     const savedObject = {
//       newTabFlag,
//       site: {
//         list: siteList,
//       },
//     };
//     chrome.storage.local.set(savedObject, function () {
//       console.log("保存OK");
//     });
//   });
// });
