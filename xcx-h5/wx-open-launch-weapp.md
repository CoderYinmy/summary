### 使用<wx-open-launch-weapp>
```html
<!-- VUE3 -->
<wx-open-launch-weapp
id="launch-btn"
username="gh_5742ee64bba7"
style="display: inline-block; width: 100%"
>
<div v-is="'script'" type="text/wxtag-template">
    <div v-is="'style'">
    .mini-btn { display: inline-block; width: 120px;height:40px;line-height: 40px; text-align: center; font-weight: bold; background:
    #0d828e; color:#fff; border-radius: 10px; font-size: 15px; }
    </div>
    <button class="mini-btn">
    前往小程序
    </button>
</div>
</wx-open-launch-weapp>
<!-- VUE2 -->
<div style="position:relative; height: 22px;width: 70px;">
<!-- 做一个假按钮，使用定位z-index -->
    <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            color: #fff;
            font-size: 14px;
            height: 22px;
        ">
        前往{{ item.btn_txt }}
    </div>
    <wx-open-launch-weapp id="launch-btn" username="gh_85e6b7bb18e1" :path="item.pathUrl" style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 22px;
            z-index: 10;
        ">
        <script type="text/wxtag-template">
            <style>
                .mini-btn {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 50%;
                transform: translate(-50%);
                background: transparent;
                border: none;
                border-radius: 0.25rem;
                z-index: 99
                }
            </style>

            <button class="mini-btn"> </button>
        </script>
    </wx-open-launch-weapp>
</div>
```