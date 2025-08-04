const ThemeManage = {
    Set: {
        theme: function(theme){
            const root = document.documentElement;
            root.style.setProperty("--transition", theme["transition"])
            root.style.setProperty("--color-bg-first", theme["color_bg_first"])
            root.style.setProperty("--color-bg-second", theme["color_bg_second"])
            root.style.setProperty("--color-fg-title", theme["color_fg_title"])
            root.style.setProperty("--color-fg-subtitle", theme["color_fg_subtitle"])
            root.style.setProperty("--color-fg-text", theme["color_fg_text"])
            root.style.setProperty("--color-fg-subtext", theme["color_fg_subtext"])
            root.style.setProperty("--border-radius", theme["border_radius"])
            root.style.setProperty("--bookmark-icons", theme["bookmark_icons"])
            root.style.setProperty("--background-image", `url(${theme["background_image"]})`)
            root.style.setProperty("--background-blur", `blur(${theme["background_blur"]})`)
            root.style.setProperty("--panel-blur", `blur(${theme["panel_blur"]})`)
        },
        backgroundImg: function(url){
            const root = document.documentElement;
            root.style.setProperty("--background-image", `url(${url})`)
        }
    },
    Put: {
        theme: function(theme){
            ThemeManage.Set.theme(theme)
            Config.Set.theme(theme);
        },
        backgroundImg: function(url){
            const root = document.documentElement;
            root.style.setProperty("--background-image", `url(${url})`)
            theme = Config.Get.theme();
            theme["background_image"] = url;
            Config.Set.theme(theme);
        },
    },
    Del:{
        theme: function(){
            Config.Del.theme()
        }
    }
}
