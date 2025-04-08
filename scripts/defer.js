const queryInput = document.getElementById('queryInput');
 
document.getElementById("browserType").innerText = (new UAParser().getResult().browser.name).toLocaleLowerCase();
updateDateTime(); setInterval(updateDateTime, 1000);
renderBookmarks(BOOKMARKS)
document.getElementById("welcomeTextUsername").value = Config.Get.username()

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        // Проверяем, активен ли какой-либо другой интерактивный элемент
        const activeElement = document.activeElement;
        const isOtherInputFocused = (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.tagName === 'SELECT' ||
            activeElement.isContentEditable
        );

        // Если пробел нажат не в другом поле ввода и не в queryInput, перехватываем
        if (!isOtherInputFocused && activeElement !== queryInput) {
            event.preventDefault();
            queryInput.focus();
        }
    }
});

document.getElementById("searchForm").addEventListener('submit', function(event) {
    if (queryInput.value.trim() === ""){
        event.preventDefault();
        return false
    }
});


/*
    ==================================================
    ========= Create Bookmarks Folder Events =========
    ==================================================
*/

// [Event click] [Create Bookmarks Folder] >>> Button Show Window
document.getElementById("createNewBookmarkFolderButton").addEventListener("click", ()=>{
    const folderId = genBookmarkId()
    document.getElementById("createBookmarksFolderId").value = folderId
    document.getElementById("createNewBookmarksFolderWindow").style.display = "block";
})


// [Event click] [Create Bookmarks Folder] >>> Button Save
document.getElementById("createNewBookmarksFolderButtonSave").addEventListener("click", ()=>{
    const items = {id: document.getElementById("createBookmarksFolderId").value, title:document.getElementById("createBookmarksFolderTitle").value}
    if(ManageTree.Bookmarks.Folder.create(BOOKMARKS, items)){
        ManageDOM.Bookmarks.Folder.create(items)
    }else{return false;}
    document.getElementById("createBookmarksFolderTitle").value = ""
    document.getElementById("createNewBookmarksFolderWindow").style.display = "none";
})


// [Event click] [Create Bookmarks Folder] >>> Button Cancel
document.getElementById("createNewBookmarksFolderButtonCancel").addEventListener("click", ()=>{
    document.getElementById("createNewBookmarksFolderWindow").style.display = "none";
})



/*
    ===============================================
    ========= Edit Bookmars Folder Events =========
    ===============================================
*/

// [Event click] [Edit Bookmarks Folder] >>> Button Save
document.getElementById("editBookmarksFolderButtonSave").addEventListener("click", ()=>{
    const items = {id:document.getElementById("editBookmarksFolderId").value, title:document.getElementById("editBookmarksFolderTitle").value}
    if(ManageTree.Bookmarks.Folder.update(BOOKMARKS, items)){
        ManageDOM.Bookmarks.Folder.update(items)
    }else{return false;}
    document.getElementById("editBookmarksFolderWindow").style.display = "none"
})


// [Event click] [Edit Bookmarks Folder] >>> Button Cancel
document.getElementById("editBookmarksFolderButtonCancel").addEventListener("click", ()=>{
    document.getElementById("editBookmarksFolderWindow").style.display = "none"
})


// [Event click] [Edit Bookmarks Folder] >>> Button Delete
document.getElementById("editBookmarksFolderButtonDelete").addEventListener("click", ()=>{
    const folderId = document.getElementById("editBookmarksFolderId").value;
    if(ManageTree.Bookmarks.Folder.delete(BOOKMARKS, folderId)){
        ManageDOM.Bookmarks.Folder.delete(folderId)
    }else{return;}
    document.getElementById("editBookmarksFolderWindow").style.display = "none"
})



/*
    ==========================================
    ========= Create Bookmark Events =========
    ==========================================
*/

// [Event click] [Create Bookmark] >>> Button Save
document.getElementById("createBookmarkButtonSave").addEventListener("click", ()=>{
    const folderSelect = document.getElementById('createBookmarkFolderId');
    const titleInput = document.getElementById('createBookmarkTitle');
    const urlInput = document.getElementById('createBookmarkUrl');
    const iconInput = document.getElementById('createBookmarkIconUrl');
    const items = {id:genBookmarkId(), title:titleInput.value.trim(), url:urlInput.value.trim(), icon:iconInput.value.trim()} 
    
    if (!items.title || !items.url) return;
    if (!items.icon) {try {items.icon = `https://www.google.com/s2/favicons?domain=${new URL(items.url).hostname}`;} catch {items.icon = 'https://www.google.com/s2/favicons?domain=google.com';}}
    
    const __folderId = ManageTree.Bookmarks.Bookmark.create(BOOKMARKS, folderSelect.value, items)
    const __bookmark = ManageDOM.Bookmarks.Bookmark.create(items)
    
    const bookmarksContainer = document.querySelector(`bookmarks[id="${__folderId}"]`);
    if (bookmarksContainer) {bookmarksContainer.appendChild(__bookmark);} else {/*console.error('Bookmarks container not found for folder:', items.id);*/ return;}
    folderSelect.value = ''; titleInput.value = ''; urlInput.value = ''; iconInput.value = '';
    document.getElementById("createNewBookmarkWindow").style.display = "none"}
)


// [Event click] [Create Bookmark] >>> Button Cancel
document.getElementById("createBookmarkButtonCancel").addEventListener("click", ()=>{document.getElementById("createNewBookmarkWindow").style.display = "none"})



/*
    ========================================
    ========= Edit Bookmark Events =========
    ========================================
*/

// [Event click] [Edit Bookmark] >>> Button Save
document.getElementById("editBookmarkButtonSave").addEventListener("click", ()=>{
    ManageTree.Bookmarks.Bookmark.update(
        BOOKMARKS,
        document.getElementById("editBookmarkId").value,
        {
            url: document.getElementById("editBookmarkUrl").value,
            icon: document.getElementById("editBookmarkIconUrl").value,
            title: document.getElementById("editBookmarkTitle").value,
        }
    )
    document.getElementById("editBookmarkWindow").style.display = "none"
})


// [Event click] [Edit Bookmark] >>> Button Cancel
document.getElementById("editBookmarkButtonCancel").addEventListener("click", ()=>{document.getElementById("editBookmarkWindow").style.display = "none"})


// [Event click] [Edit Bookmark] >>> Button Delete
document.getElementById("editBookmarkButtonDelete").addEventListener("click", ()=>{
    const bookmarkId = document.getElementById("editBookmarkId").value
    ManageTree.Bookmarks.Bookmark.delete(BOOKMARKS, bookmarkId)
    ManageDOM.Bookmarks.Bookmark.delete(bookmarkId)
    document.getElementById("editBookmarkWindow").style.display = "none"
})