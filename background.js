/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create context menu.
*/
browser.menus.create({
  id: "open_tmdb",
  title: "Search this in TMDB",
  contexts: ["selection"],
  icons: {
    "48": "icons/green_48.png",
	"32": "icons/green_32.png",
	"16": "icons/green_16.png"
  }	
}, onCreated);


function searchTMDB(txt) {
    browser.tabs.create({
      url: 'https://www.themoviedb.org/search?query='+txt
    });
}


/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "open_tmdb":
      console.log(info.selectionText);
	  searchTMDB(info.selectionText);
      break;
   }
});
