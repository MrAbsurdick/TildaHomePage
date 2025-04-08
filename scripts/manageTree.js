const ManageTree = {
    Bookmarks: {
        Folder: {
            create: function(bookmarks, items) {
                if (!items.title || typeof bookmarks !== 'object') {
                    // console.error("[ERR][ManageTree] Invalid input or BOOKMARKS is not defined");
                    return false;
                }
                const maxKey = Math.max(0, ...Object.keys(bookmarks).map(Number).filter(k => !isNaN(k)));
                const newKey = maxKey + 1;
                bookmarks[newKey] = {
                    title: items.title,
                    id: items.id,
                    elements: {}
                };
                // console.log(`[OK][ManageTree] Created new bookmarks folder with id:${items.id}`);
                Config.Set.bookmarks(bookmarks)
                return true;
            },
            update: function(bookmarks, items) {
                if (!bookmarks) return false;
                const updates = Array.isArray(items) ? items : [items];
                const keys = Object.keys(bookmarks);
                for (const item of updates) {
                    // console.log(item)
                    if (!item?.id || !item.title) continue;
                    for (let i = 0; i < keys.length; i++) {
                        const folder = bookmarks[keys[i]];
                        if (folder?.id === item.id) {
                            folder.title = item.title;
                            // console.log(`[OK][ManageTree] Change title for bookmarks folder with id:${items.id}`);
                            break;
                        }
                    }
                }
                Config.Set.bookmarks(bookmarks)
                return true;
            },
            delete: function(bookmarks, folderId){
                if (!folderId || typeof bookmarks !== 'object') {
                    // console.error("[ERR][ManageTree] Invalid input or BOOKMARKS is not defined");return false;
                }
                for (const key in bookmarks) {
                    if (bookmarks[key]?.id === folderId) {
                        delete bookmarks[key];
                        // console.log(`[OK][ManageTree] Folder with id ${folderId} deleted successfully`);
                        Config.Set.bookmarks(bookmarks)
                        return true;
                    }
                }
                // console.warn(`[ERR][ManageTree] Folder with id:${folderId} not found`);
                return false;
            },
        },

        Bookmark: {
            create: function(bookmarks, folderSelectID, items){
                const targetFolder = Object.values(bookmarks).find(f => f.id === folderSelectID);
                if (!targetFolder) return false;
                // console.error('[ERR][ManageTree] Folder not found:', folderSelectID);
                const elements = targetFolder.elements || {};
                const newKey = Math.max(0, ...Object.keys(elements).map(Number)) + 1;
                elements[newKey] = items;
                targetFolder.elements = elements;
                Config.Set.bookmarks(bookmarks)
                return targetFolder.id
            },
            update: function(bookmarks, bookmarkId, items){
                const sections = Object.values(bookmarks);
                const elementData = sections.flatMap(s => Object.values(s.elements)).find(el => el.id === bookmarkId);
                if (elementData) {
                    elementData.title = items.title || elementData.title;
                    elementData.url = items.url || elementData.url;
                    elementData.icon = items.icon || elementData.icon;
                    const bookmarkElement = document.querySelector(`bookmark[id="${bookmarkId}"]`);
                    if (bookmarkElement) {
                        const link = bookmarkElement.querySelector('a');
                        const img = bookmarkElement.querySelector('img');
                        const span = bookmarkElement.querySelector('span');
                        if (link) link.href = elementData.url;
                        if (img) img.src = elementData.icon;
                        if (span) span.textContent = elementData.title;
                    }
                    Config.Set.bookmarks(bookmarks)
                    // console.log(`[OK][ManageTree] Bookmark ${bookmarkId} updated`);
                } else {
                    // console.warn(`[ERR][ManageTree] Bookmark ${bookmarkId} not found`);
                }
            },
            delete: function(bookmarks, bookmarkId){
                const sections = Object.values(bookmarks);
                const section = sections.find(s => Object.values(s.elements).some(el => el.id === bookmarkId));
                if (section) {
                    const elementKey = Object.keys(section.elements).find(k => section.elements[k].id === bookmarkId);
                    delete section.elements[elementKey];
                    Config.Set.bookmarks(bookmarks)
                    // console.log(`[OK][ManageTree] Bookmark ${bookmarkId} deleted`);
                } else {
                    // console.warn(`[ERR][ManageTree] Bookmark ${bookmarkId} not found`);
                }
            },
        },
    },
}


