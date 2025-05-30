const ManageDOM = {
    Bookmarks: {
        Folder:{
            create: function(items){
                /*
                    items.id
                    items.title
                */
                const buttonEditBookmarksFolderEl = document.createElement('button');
                buttonEditBookmarksFolderEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-pen-icon lucide-folder-pen"><path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"/><path d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>'
                buttonEditBookmarksFolderEl.addEventListener('click', (event) => {showEditBookmarksFolderWindow(items.id)});
                const buttonCreateBookmarkEl = document.createElement('button');
                buttonCreateBookmarkEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-plus-icon lucide-square-plus"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>'
                buttonCreateBookmarkEl.addEventListener('click', (event) => {showCreateBookmarkWindow(items.id)});
                const titleEl = document.createElement('span');
                titleEl.class = "parent_color";
                titleEl.innerText = items.title
                const folderHeadEl = document.createElement('h2');
                folderHeadEl.append(buttonEditBookmarksFolderEl, titleEl)
                const bookmarksEl = document.createElement('bookmarks');
                bookmarksEl.id = items.id;
                const widgetEl = document.createElement('widget');
                widgetEl.append(folderHeadEl, bookmarksEl, buttonCreateBookmarkEl);
                document.querySelector('widgets').appendChild(widgetEl);
            },
            update: function(items){
                /*
                    items.id
                    items.title
                */
               document.getElementById(items.id).parentElement.querySelector("h2").querySelector("span").innerText = items.title
                
            },
            delete: function(bookmarksFolderId){
                const element = document.getElementById(bookmarksFolderId);
                if (!element) {
                    // console.warn(`[ERR][ManageDOM] Element with id="${bookmarksFolderId} not found`);
                    return false;
                }
                const parentElement = element.parentElement;
                if (parentElement) {parentElement.remove();console.log(`[OK][ManageDOM] Bookmark id:${bookmarksFolderId} deleted`);return true;}
                // console.warn(`[ERR][ManageDOM] Parent element of element with id:${bookmarksFolderId} not found`);
                return false;
            }
        },
        Bookmark: {
            create: function(items){
                /*
                    {id, url, icon, title}
                */ 
                const bookmark = document.createElement('bookmark');
                bookmark.id = items.id
                const link = document.createElement('a');
                link.href = items.url;
                const img = document.createElement('img');
                img.src = items.icon;
                img.alt = '';
                const btn = document.createElement('button');
                btn.innerHTML  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>';
                btn.addEventListener('click', (event) => {showEditBookmarkWindow(items.id)});
                const span = document.createElement('span');
                span.textContent = items.title;
                link.append(img, span);
                bookmark.append(link, btn);
                // console.log(`[OK][ManageDOM] Bookmark DOM created with id:${items.id}`, bookmark);
                return bookmark;
            },
            delete: function(bookmarkId){
                document.getElementById(bookmarkId).remove();
                // console.log(`[OK][ManageDOM] Bookmark id:${bookmarkId} deleted`);
            }
        },
    },
}

