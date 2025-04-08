const Config = {
    Get: {
        theme: function(){
            let theme = JSON.parse(localStorage.getItem("THP.theme"))
            if (!theme){
                theme = { 
                    "transition": "200ms",
                    "color_bg_first": "#222831CC",
                    "color_bg_second": "#393E46CC", 
                    "color_fg_title": "#FFD369", 
                    "color_fg_subtitle": "#e66832", 
                    "color_fg_text": "#DDD", 
                    "color_fg_subtext": "#9BA4B5",

                    "border_radius": "4px",
                    "bookmark_icons": "block",
                    

                    "background_image": "https://c1.wallpaperflare.com/path/427/745/192/notebook-natural-laptop-macbook-497500668a927f46aa19fafb668d8702.jpg",
                    
                    "background_blur": "0px",
                    "panel_blur": "15px",
                };
            }
            return theme;
        },
        username: function(){
            return localStorage.getItem("THP.username");
        },
        bookmarks: function(){
            let bookmarks = JSON.parse(localStorage.getItem("THP.bookmarks")) 
            if (!bookmarks){bookmarks = {}}
            return bookmarks;
        },
    },
    Set: {
        version: function(version){
            localStorage.removeItem("THP.version")
            localStorage.setItem("THP.version", version)
            // console.log("[OK][Config] version saved")
        },
        username: function(username){
            localStorage.removeItem("THP.username")
            localStorage.setItem("THP.username", username)
            // console.log("[OK][Config] username saved")
        },
        theme: function(theme){
            localStorage.removeItem("THP.theme")
            localStorage.setItem("THP.theme", JSON.stringify(theme))
            // console.log("[OK][Config] theme saved")
        },
        bookmarks: function(bookmarks){
            localStorage.removeItem("THP.bookmarks")
            localStorage.setItem("THP.bookmarks", JSON.stringify(bookmarks))
            // console.log("[OK][Config] bookmarks saved")
        },
    },
    Del: {
        theme: function(){localStorage.removeItem("THP.theme")}
    }
}
