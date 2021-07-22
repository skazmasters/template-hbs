import gulpSass from 'gulp-sass'
import sass from 'sass'
const SCSS = gulpSass(sass)
import cleanCSS from 'gulp-clean-css'
import gulpPostcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import Fibers from 'fibers'
import shorthand from 'gulp-shorthand'
import tilde from 'node-sass-tilde-importer'

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const styles = () => {
  const isProd = $.conf.cssMin && $.conf.buildMode === 'prod'
  const sheets = [
    `./${$.conf.styles}/main.scss`,
    `./${$.conf.styles}/uikit.scss`,
  ]
  const plugins = [autoprefixer({ cascade: false }), cssnano()]

  if (isProd) {
    // сокращает стили
    return $.gulp
      .src(sheets)
      .pipe(
        SCSS.sync({
          includePaths: ['./node_modules'],
          fiber: Fibers,
        }).on('error', SCSS.logError)
      )
      .pipe(gulpPostcss(plugins))
      .pipe(shorthand())
      .pipe(
        cleanCSS(
          {
            level: {
              1: {
                all: true,
                normalizeUrls: false,
              },
              2: {
                all: true,
                removeUnusedAtRules: false,
              },
            },
            debug: true,
          },
          (details) =>
            console.log(
              `${details.name}: ${details.stats.originalSize}` +
                '—' +
                `${details.name}: ${details.stats.minifiedSize}`
            )
        )
      )
      .pipe($.gulpRename({ extname: '.min.css' }))
      .pipe($.gulp.dest(`${$.conf.outputPath}/css`))
      .pipe($.server.stream())
  }

  return $.gulp
    .src(sheets)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      SCSS.sync({
        importer: tilde,
        includePaths: ['./node_modules'],
        fiber: Fibers,
      }).on('error', SCSS.logError)
    )
    .pipe(gulpPostcss(plugins))
    .pipe(
      cleanCSS(
        {
          debug: true,
          compatibility: '*',
        },
        (details) =>
          console.log(
            `${details.name}: ${formatBytes(
              details.stats.originalSize
            )} --> ${formatBytes(details.stats.minifiedSize)} by ${
              Math.round((details.stats.efficiency + Number.EPSILON) * 1000) /
              1000
            }%`
          )
      )
    )
    .pipe($.sourcemaps.write())
    .pipe($.gulpRename({ extname: '.min.css' }))
    .pipe($.gulp.dest(`${$.conf.outputPath}/css`))
    .pipe($.server.stream())
}
