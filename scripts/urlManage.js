const UrlManage = {
    current_url: window.location.host + window.location.pathname,
    init: function(){
        const urlParams = new URLSearchParams(window.location.search);
        
        const urlSet_Theme = JSON.parse(decodeURIComponent(urlParams.get("setTheme")));
        if (urlSet_Theme) {ThemeManage.Set.theme(urlSet_Theme)}
        
        const urlSet_BackgroundImage = urlParams.get("setBgImg");
        if (urlSet_BackgroundImage) {ThemeManage.Set.backgroundImg(urlSet_BackgroundImage)}
        
        const urlPut_Theme = JSON.parse(decodeURIComponent(urlParams.get("putTheme")));
        if(urlPut_Theme){ThemeManage.Put.theme(urlPut_Theme)}
        
        const urlPut_BackgroundImage = urlParams.get("putBgImg");
        if(urlPut_BackgroundImage){ThemeManage.Put.backgroundImg(urlPut_BackgroundImage)}
        
        
        // const urlUsername = urlParams.get("username");
        // const urlBookmarks = urlParams.get("bookmarks");
        
        
        const urlDel_Theme = urlParams.get("delTheme");
        if(urlDel_Theme){ThemeManage.Del.theme()}
    },
    Shere:{
        theme: function(){
            return `${UrlManage.current_url}?setTheme=${encodeURIComponent(JSON.stringify(Config.Get.theme()))}`;
        },
        backgroundImage: function(){
            return `${UrlManage.current_url}?setBgImg=${encodeURIComponent(Config.Get.theme()["background_image"])}`;
        }
    }
}