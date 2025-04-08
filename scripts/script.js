const VERSION = "1.0.0"
let BOOKMARKS = Config.Get.bookmarks();
let THEME = Config.Get.theme();
let USERNAME = Config.Get.username();
ThemeManage.Set.theme(THEME)
UrlManage.init()

function genBookmarkId(){return Math.random().toString(36).slice(2, 8)};



function updateDateTime() {
    const now = new Date();
    document.getElementById('timeHours').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('timeMinutes').textContent = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('timeSeconds').textContent = String(now.getSeconds()).padStart(2, '0');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    document.getElementById('dateDayOfTheWeek').textContent = daysOfWeek[now.getDay()];
    document.getElementById('dateDay').textContent = String(now.getDate()).padStart(2, '0');
    document.getElementById('dateMonth').textContent = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('dateYear').textContent = now.getFullYear();
}



function showEditBookmarkWindow(bookmarkId){
    const bookmark = document.getElementById(bookmarkId);
    const url = bookmark.querySelector('a').href;
    const icon = bookmark.querySelector('a img').src;
    const title = bookmark.querySelector('a span').textContent;
    
    document.getElementById("editBookmarkWindow").style.display = "block";
    document.getElementById("editBookmarkTitle").value = title
    document.getElementById("editBookmarkUrl").value = url
    document.getElementById("editBookmarkIconUrl").value = icon
    document.getElementById("editBookmarkId").value = bookmarkId
}



function showCreateBookmarkWindow(folderId){
    document.getElementById("createNewBookmarkWindow").style.display = "block";
    document.getElementById("createBookmarkFolderId").value = folderId;
}



function showEditBookmarksFolderWindow(folderId){
    document.getElementById("editBookmarksFolderWindow").style.display = "block";
    document.getElementById("editBookmarksFolderId").value = folderId;
    if (!folderId || typeof BOOKMARKS !== 'object') {
        // console.error("[ERR][getFolderTitleById] Invalid input or BOOKMARKS is not defined");
        return false;
    }
    for (const key in BOOKMARKS) {if (BOOKMARKS[key]?.id === folderId) {document.getElementById("editBookmarksFolderTitle").value = BOOKMARKS[key].title; return true;}}
    // console.warn(`[WARN][getFolderTitleById] Folder with id "${folderId}" not found`);
}



function renderBookmarks(bookmarksData) {
    if(!bookmarksData) return;
    const widgetsContainer = document.querySelector('widgets');
    widgetsContainer.innerHTML = '';
    Object.values(bookmarksData).forEach(category => {
        const bookmarksEl = document.createElement('bookmarks');
        bookmarksEl.id = category.id;
        Object.values(category.elements).forEach(bookmark => {
            const __bookmark = ManageDOM.Bookmarks.Bookmark.create(bookmark)
            bookmarksEl.appendChild(__bookmark);
        });
        
        const buttonEditBookmarksFolderEl = document.createElement('button');
        buttonEditBookmarksFolderEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-pen-icon lucide-folder-pen"><path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"/><path d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>'
        buttonEditBookmarksFolderEl.addEventListener('click', (event) => {showEditBookmarksFolderWindow(category.id)});
        
        const buttonCreateBookmarkEl = document.createElement('button');
        buttonCreateBookmarkEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-plus-icon lucide-square-plus"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>'
        buttonCreateBookmarkEl.addEventListener('click', (event) => {showCreateBookmarkWindow(category.id)});
        
        const titleEl = document.createElement('span');
        titleEl.class = "parent_color";
        titleEl.innerText = category.title
        
        const folderHeadEl = document.createElement('h2');
        folderHeadEl.append(buttonEditBookmarksFolderEl, titleEl)
        
        const widgetEl = document.createElement('widget');
        widgetEl.append(folderHeadEl, bookmarksEl, buttonCreateBookmarkEl);
        widgetsContainer.appendChild(widgetEl);
    });
}