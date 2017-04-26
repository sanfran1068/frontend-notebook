# PART2
## CHAPTER6-Formatting Text

#### Using Fonts

- 定义字体：font-family:;（缺点：浏览器客户端必须要有相应字体才可以正常显示）
  **注意**：字体名超过一个单词时需要用双引号包括起来
  @font-face，可以指定一般不常用的字体：
  ```css
    @font-face{
      font-family: myFirstFont;
      src: url('Sansation_Light.ttf'),
           url('Sansation_Light.eot'); /* IE9 */
    }
  ```
  各浏览器支持的字体文件类型：
  - EOT（Embedded OpenType）：只在IE上可以使用
  - TrueType（.ttf） and OpenType（.otf）：大部分浏览器均支持
  - WOFF（Web Open Font Format)：IE9+, Firefox, Chrome, Safari, Opera, BlackBerry, iOS Safari5+, Android Browser 4.4+
  - SVG(Scalable Vector Graphic)：不是字体格式，而是矢量图；

  免费字体网站：
  - TheLeagueofMoveableType(www.theleagueofmoveabletype.com).
  - Exljbrisfontfoundry(www.exljbris.com).
  - TheOpenFontLibrary(http://openfontlibrary.org).
  - FontSquirrel(www.fontsquirrel.com).
  - Google Fonts (www.google.com/fonts).

- 字体样式
  - bold & italic
    HTML5中使用<strong>和<em>来表达bold和italic的字体样式；
    在新字体使用的时候，由于新字体可能没有粗体斜体，需要自己定义：
    ```css
      @font-face {
       font-family: 'PTSans';
       src: url('PTSansRegular.woff2') format('woff2'), url('PTSansRegular.woff') format('woff'),
       font-weight: normal;
       font-style: normal;
     }

     @font-face {
      font-family: 'PTSans';
      src: url('PTSansItalic.woff2') format('woff2'),
            url('PTSansItalic.woff') format('woff');
      font-weight: normal;
      font-style: italic;
    }

    @font-face {
      font-family: 'PTSans';
      src: url('PTSansBold.woff2') format('woff2'),
            url('PTSansBold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
    }

    @font-face {
      font-family: 'PTSans';
      src: url('PTSansBoldItalic.woff2') format('woff2'),
            url('PTSansBoldItalic.woff') format('woff');
      font-weight: bold;
      font-style: italic;
    }
     ```
    font-face和IE8兼容问题：

    - 字体颜色：
      - Hex：color: #6600ff;
      - RGB：color: rgb(255, 255, 255);
      - RGBA：color: rgba(255, 100, 50, .5);
      - HSL：color: hsl(0, 100%, 100%);
      - HSLA：color: hsla(0, 100%, 50%, .5);

    - 字体大小：
      - Pixels：font-size: 36px;
      - Keywords：font-size: xx-small; x-small; small; medium; large; x-large; xx-large;
      - Percentages：font-size: 200%;
      - EMS：font-size: 2em;(永远不要在em后面加s)

    - 其他字体样式：
      - 字体本身变化：
        font-style: normal/italic;
        font-weight: normal/bold;
        text-transform: none/lowercase/uppercase;
        font-variant: small-caps;

      - 字体装饰：
        text-decoration: none/underline/overline/line-through/blink;

    - 字距和词距：
      - letter：
        letter-spacing: -1px; .7em;

      - word：
        word-spacing: 2px;

    - 阴影：
      text-shadow: -4px 4px 3px #999999;

- 文本样式：
  - 行间距：line-height: 150%; 100px; 1.5em; 1.5;
  - 对齐：text-align: center; left; right; justify;
  - 缩进：text-indent: 25px; 5em; 50%(整个文本的宽度的一半）
  - 首字：p::first-letter {}
  - 首行：.intro::first-line {}

- 列表样式：
  - 列表bullet样式：
    - ul：
      - list-style-type: disc/circle/square;

    - ol：
      - list-style-type: decimal/decimal-leading-zero/upper-alpha/lower-alpha/upper-roman/lower-roman;

    - 图片bullet：
      - list-style-image: url(images/bullet.gif);
      (更推荐使用background-image来进行bullet图片化)

  - 列表bullet位置：
    - list-style-position: outside/inside;
    (也可以通过ul,ol{padding/margin}来操纵列表的位置)

- 使用Google Web Fonts


## CHAPTER7-Margins, Padding, and Borders

##### Box Model

- padding:内边距
  padding-right: 20px/3em/10%;
  padding: 0 10px 10px 20px;(TRouBLe,上右下左)

- border:边界
  border: 4px solid/dashed/dotted/double/groove/inset/outset/ridge/none rgb(255, 0, 0)
  border也有top、bottom、right、left，背景颜色会显示在dotted、dashed边界的缝隙里；
  background-clip: padding-box;
  - Rounded border:
    border-radius: 20px;
    也有top、bottom、right、left;

- background-color:边界内背景，包括内边距

- margin:外边距
  margin-right: 20px/3em/10%;
  margin: 0 10px 10px 20px;(TRouBLe,上右下左)

  **注意** 在margin中，1+2<>3,两margin冲突后选最大的margin进行覆盖
  可以使用负数的margin对间距进行缩短

- inline：左右无换行
- block：左右都有换行
  display: inline/block/inline-block/

##### Drop Shadows

- box-shadow
  box-shadow: inset(inside the box) horizontal-offset vertical-offset shadow-radius shadow-spread rgba(0, 0, 0, .75);**只能够使用pixel**

##### Determining height and width

width: 300px;/30%;/20em;/
height: same as above;

max-width/max-height/min-width/min-height:



- box-sizing(让边框也算入box的padding中)，一般前端会写：
  ```css
    * {
      box-sizing: border-box;
    }
  ```

- control the the tap
  - overflow: visible/scroll/auto/hidden;

##### Float

- 定义
  float: none/left/right;

- 一些性质
  - float满足盒模型嵌套的规则
  - In fact, CSS rules require setting the width for floated elements for all tags except images
  - 背景、边界是不跟随float元素下方的元素移动的，这时需要在环绕元素上加overflow: hidden;
  - 如果想要元素不进行对float元素的围绕，那么使用clear: left/right/both/none;进行对左右元素的清理；


## CHAPTER8-Images
#### Basic Notes

- img标签常与以下一些css属性连用：
  - border
  - padding
  - float
  - margin
  - border-radius

- background-image
  - 定义：
    ```css
      body {
        background-image: url(images/bg.png);
      }
    ```
  - 重复：
    background-repeat: repeat/no-repeat/repeat-x/repeat-y/round/space;
    当背景图片不重复时可以进行位置对齐：
    ```css
      body{
        background-image: url(bg.jpg);
        background-repeat: no-repeat;
        background-position: center center;
      }
      //其中position的两个参数可以分别为left/center/right和top/center/bottom
      ```
  - 固定：
    background-attachment: fixed;

  - 与边界和padding的关系：
    使用background-origin: border-box/padding-box/content-box;

  - 大小：
    background-size: width height;
    width和height分别可以用pixel类型、auto、百分比；或用单个参数-contain（）、cover；
