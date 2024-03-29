# HTML Starter

## IE Support

Если необходима поддержка IE - необходимо раскомментировать импорты в vendors.ts и установить зависимости.

## Разработка проекта

```
yarn dev || gulp dev
```

## Сборка проекта

```
yarn build || gulp build
```

## Сборка проекта с особой структурой страниц, имитирующей сайт

```
yarn prod || gulp build-prod
```

## Из чего состоит HTML Starter?

В основном, работа проходит в 2-х местах:

1. Настройка файла config/config.json
1. Папка app

### config/config.json

Файл `config.json` служит для настройки проекта:

1. Определение путей к файлам.
2. Сжатие css, js и изображений.
3. Включение автогенерации wepb картинок.
4. Настройка подключения скриптов.

```
{
  "appName": "APP_NAME",
  "siteName": "Site name",
  "tmpPath": ".tmp",
  "sourcePath": "app",
  "destPath": "dist",
  "dbPath": "db",
  "hbsPath": "templates",
  "staticPath": "static",
  "stylesPath": "static/css",
  "scriptsPath": "static/js",
  "imagesPath": "static/images",
  "pngPath": "static/png",
  "fontsPath": "static/fonts",
  "svgPath": "static/svg/sprite",
  "svgInlinePath": "static/svg/inline",
  "contentPath": "content",
  "metaPath": ".meta",
  "dynamicEntry": true,
  "jsMin": false,
  "cssMin": true,
  "imageMin": true,
  "criticalCss": false,
  "babel": false
}
```

### app

Собственно большая часть разработки проходит тут. Папка состоит из 4 основных разделов:

1. meta - папка для загрузки скриншотов, которые в дальнейшем будут отображаться в index.html. index.html генерируется
   сам, исходя из скриншотов в папке.
2. assets - папка для контентной части сайта, тот контент который будет заливаться из админки (картинки, иконки, видео и
   т.п.)
3. scripts, styles - папки для работы со стилевыми и скриптовыми файлами.
4. templates - папка для работы с html. Мы используем препроцессор handlebars (hbs).

```
├── .meta
└── db
├── content
├── static
└── templates
```

### .meta

В папке лежат скрины каждой страницы в формате 00_uikit. Скрин обязательно должен начинаться с номера. Далее, после
номера идет нижнее подчеркивание `_` и только потом название, которое в свою очередь должно соответствовать названию
страницы из папки templates.

Например:

```
├── .meta
    ├── 00_uikit.png
    └── 01_home.png
└── templates
    ├── home.hbs
    └── uikit.hbs
```

### content

В папке лежат контентные файлы сайта, те которые в дальнейшем будут заливаться из админки. Изначально в assets лежат 2
папки:

1. icons - хранит иконки сайта.
1. images - хранит картинки сайта.

Папки разделены потому что, при build и соответствующих флагов в config.json будет сжатие картинок.

### static

Основная папка для разработки проекта. Все чудеса будут твориться тут. Структура папки. Далее про каждую папку
подробнее.

```
└── static
    ├── css
    ├── fonts
    ├── images
    ├── js
    ├── png
    └── svg
```

Как видно из структуры каждая папка говорит сама за себя. Единственное, что может быть не понятно, это папки png и
images.

1. png - сюда складываем иконки которые в дальнейшем будут генериться в sprite.png их можно будет подключать
   соответствующим mixin spritePng.
1. images - сюда складываем картинки, которые будем вешать на беграундах и т.п. Не иконки!

### static/css

```
├── static
    ├── css
        ├── _common.scss
        ├── _imports.scss
        ├── _typography.scss
        ├── blocks
        │   └── btn-list.scss
        ├── components
        │   ├── checkbox.scss
        │   ├── dropdown.scss
        │   ├── loader.scss
        │   └── radio.scss
        ├── config
        │   ├── fonts.scss
        │   ├── options.scss
        │   └── variables.scss
        ├── layout
        │   ├── breadcrumbs.scss
        │   ├── footer.scss
        │   ├── header.scss
        │   ├── popup.scss
        │   └── wrapper.scss
        ├── libs
        │   ├── grid.scss
        │   ├── nomolize.scss
        │   └── slick.scss
        ├── main.scss
        ├── mixins
        │   └── mixins.scss
        ├── pages
        │   ├── home.scss
        │   └── uikit.scss
        ├── png
        │   ├── _mixins.scss
        │   └── png-sprite.scss
        ├── svg
        │   ├── _mixins.scss
        │   ├── _sprite.scss
        │   ├── _spriteInline.scss
        │   └── svg.scss
        └── ui
            ├── buttons.scss
            └── form.scss
```

Пойдем по порядку. Постараюсь описать что происходит в каждом файле. Тут есть даже файлы которые никогда не трогают)

1. _сommon.scss - общие стили сайта. Обнуление тех или иных тегов, написание глобальных классов и т.п.
1. _typography.scss - общие стили для типографики сайта.
1. _imports.scss - сюда вы почти не заглядываете, если только иногда надо отключить grid system, то просто комментим
   строку с ее подключением.
1. main.scss - тут идет подключение всех файлов. Импортировать желательно группами (Блоки, Компоненты, Страницы, и т.д.)
1. blocks - тут для каждого блока создается файл *.scss. И в нем идет описание блока.
1. components - сюда складываем компоненты.
1. config - css настройки (переменные, опции, шрифты).
1. layout - layout страниц.
1. mixins - понятно из названия. Каждый миксин описывать нет смысла. Можно открыть и поглядеть что там есть.
1. png & svg - в этим папки мы не лезем, так как они все делают автоматом. Можно только посмотреть что делают их mixins.
1. pages - сюда складываем стили для определенных страниц типа (404, static, и т.п.)

### static/fonts

В папку складываем шрифты. Каждое семейство шрифтов это отдельная папка. Пример будет ниже. Суть в том что, например вы
хотите подключить шрифт Roboto. И вам нужны будет несколько типов этого шрифта (bold, regular, medium). Допустим
дизайнер вам передал только файлы формата *.ttf. Тогда, мы заходим на [сайт](https://transfonter.org/) для генерации
шрифтов. Нам нужны 2 формата шрифтов (woff, woff2). Далее складываем в папку с семейством шрифта.

```
├── fonts
    └── Roboto
        ├── Bold.woff
        ├── Bold.woff2
        ├── Light.woff
        ├── Light.woff2
        ├── Medium.woff
        ├── Medium.woff2
        ├── Regular.woff
        └── Regular.woff2
```

Теперь нужно их подключить. Для этого есть готовый миксин. Подключение происходит в css/config/fonts.scss

```scss
@include font("Roboto", "Regular", 400);
```

Далее, для того, чтобы использовать этот шрифт, достаточно написать в нужном месте @include light;

### static/js

```
├── js
    ├── modules
    │   ├── helpers
    │   ├── widgets
    │   ├── layout.ts
    │   ├── preloader.ts
    │   ├── scroll-control.ts
    │   └── ui.js
    ├── libs.js
    ├── theme.ts
    └── poly.js
```

Из структуры видно что к чему:

1. ui.js - тут пишем js для всего сайта.
1. helpers - наши компоненты. Каждый файлик описывать лень) Можно будет спросить непосредсвтвенно перед началом работы.
1. libs - сторонние либы, можно сюда докидывать если понадобиться что то еще.

Так же, если во время разработки нужно будет написать как либо виджет, то в папке js создается еще одна папка
js/widgets. В которую потом добавляется файл с вашим виджетом.

### static/svg

```
└── svg
    ├── inline
    └── sprite
```

1. inline - svg, которые будут подключаться непосредственно в html. В templates/partials/ui/svg.hbs уже лежит готовый
   способ для их подключения.
1. sprite - svg, которые будут подключаться из css. Для этого есть mixin sprite('icon-btn').

### templates

Про работу handlebars можно почитать на [оф.сайте]( http://handlebarsjs.com/). Так же
заглянуть [сюда](http://handlebarsjs.com/block_helpers.html).

```
└── templates
    ├── ajax
    ├── home.hbs
    ├── layouts
    ├── partials
    └── uikit.hbs
```

В корень папки складываются страницы сайта.

1. ajax - в основном служит, для того чтобы подтягивать какой-либо контент html.
1. layouts - папка для плагина. Ее не трогаем и не удаляем.
1. partials - папка, где творятся чудеса)

### templates/partials

```
├── partials
    ├── blocks
    │   ├── ui-section-end.hbs
    │   └── ui-section-start.hbs
    ├── layout
    │   ├── bottom.hbs
    │   ├── footer.hbs
    │   ├── head.hbs
    │   └── header.hbs
    ├── popups
    │   └── example.hbs
    ├── svg
    └── ui
        ├── checkbox.hbs
        ├── input.hbs
        ├── radio.hbs
        └── svg.hbs
```

1. blocks - складываем блоки сайта, если они много раз переиспользуются.
1. layout - layout сайта (header, footer и т.п.).
1. popups - сюда складываем попапы.
1. ui - тут лежат ui элементы сайта.

## Работа с ссылками и SEO-информацией

В директории `app/db/` есть файл “links.json”, в него записываются объекты, которые соответствуют ссылке и
SEO-информации по каждой странице.

- Если ссылка на внутренние страницы, и необходимо добавить переменную в верстку, это будет выглядеть
  так: `{{links.services.url}}`

- Если значение передаётся в переменную из шаблона, фигурные скобки не нужны. Выглядит это
  так: `href=links.services.url`

- Если ссылка внешняя, создаёте объект и указываете нужному ключу необходимое значение.

## Особенности версия для Production

Основная идея заключалась в более гибком подходе к красивой перелиновке сайта.

1. Home - или главная страница, теперь переносится в корень проекта и именуется index.html
2. Все файлы страниц с расширением `.hbs` будут преобразованы в одноименные директотрии с html файлом.
   Пример: `services.hbs` будет преобразовано в директорию `services/index.html`
3. Если в имени файла сожержится **двойной дефис** `--`, будет создана директория, состоящая из имени, которое было
   указано до дефиса и подпапки с именем после. Пример: `services--services-1.hbs` будет преобразовано в
   директорию `services/services-1/index.html`.
4. В разработке: вложенность может быть абсолютно любой.

Вот наглядный пример директорий из реального проекта:

```
├── index.html
    ├── services
            └──index.html
    │   ├── services-1
                └──index.html
    │   └── services-2
                └──index.html
    ├── showcases
            └──index.html
    │   ├── showcases-1
                └──index.html
    │   ├── showcases-2
                └──index.html
    │   ├── showcases-3
                └──index.html
    │   └── showcases-4
                └──index.html
    ├── insights
            └──index.html
        ├── insights-1
                └──index.html
    │   └── insights-2
                └──index.html
    ├── about
            └──index.html
    └── 404
            └──index.html
```
