var siteList = [];
var newTabFlag;

// 保存済み情報を読み込む
const getStorageInOptions = () =>
  new Promise((resolve) => {
    chrome.storage.local.get((savedObject) => {
      for (i = 0; i < 15; i++) {
        if (savedObject.site && i < savedObject.site.list.length) {
          siteList.push(savedObject.site.list[i]);
        } else {
          siteList.push({ title: "", url: "" });
        }
      }
      newTabFlag = savedObject.newTabFlag;
      resolve(savedObject);
    });
  });

const setRowElement = (id, title, url) => {
  return `
      <tr class="site_table_body_row" id='search-site_row_${id}'>
          <td>
              <input
                  class="site_table_body_row_cell_title"
                  type="text"
                  id=${id}
                  value='${title}'
              />
          </td>
          <td>
              <input
                  class="site_table_body_row_cell_url"
                  type="text"
                  id=${id}
                  value='${url}'
              />
          </td>
      </tr>
    `;
};

// オプションに表示
const setOptions = async () => {
  const tableElement = document.getElementById("site_table");
  const tableHeaderElement = `
      <thead class="site_table_header">
          <tr>
              <th>Title</th>
              <th>URL</th>
          </tr>
      </thead>
    `;

  var rowElementInTableBody = "";
  for (i = 0; i < 15; i++) {
    if (siteList[i]) {
      rowElementInTableBody += setRowElement(
        i,
        siteList[i].title,
        siteList[i].url
      );
    } else {
      rowElementInTableBody += setRowElement(i, "", "");
    }
  }

  const tableBodyElement = `
      <tbody class="site_table_body" id="site_table_body">
          ${rowElementInTableBody}
      </tbody>
    `;
  const tableContentElement = tableHeaderElement + tableBodyElement;

  if (tableElement) {
    tableElement.innerHTML = tableContentElement;
    console.log("setOptions");
  }
};

const loadEvent = async () => {
  const siteTitleListElement = document.querySelectorAll(
    ".site_table_body_row_cell_title"
  );
  if (siteTitleListElement) {
    for (i = 0; i < siteTitleListElement.length; i++) {
      siteTitleListElement[i].addEventListener("input", (event) => {
        siteList[Number(event.target.id)].title = event.target.value;

        const saveObject = {
          newTabFlag,
          site: {
            list: siteList,
          },
        };

        chrome.storage.local.set(saveObject, function () {
          console.log("ストレージ保存OK");
        });
      });
    }
  }

  const siteUrlListElement = document.querySelectorAll(
    ".site_table_body_row_cell_url"
  );
  if (siteUrlListElement) {
    for (i = 0; i < siteUrlListElement.length; i++) {
      siteUrlListElement[i].addEventListener("input", (event) => {
        siteList[Number(event.target.id)].url = event.target.value;

        const saveObject = {
          newTabFlag,
          site: {
            list: siteList,
          },
        };

        chrome.storage.local.set(saveObject, function () {
          console.log("ストレージ保存OK");
        });
      });
    }
  }
};

(async () => {
  await getStorageInOptions();
  await setOptions();
  await loadEvent();
})();
