import { actions } from '@storybook/addon-actions'

const collapseArgTable = () => {
  const propsEl = document.querySelector('[title="Hide props items"] button')
  const eventsEl = document.querySelector('[title="Hide events items"] button')
  const slotsEl = document.querySelector('[title="Hide slots items"] button')
  if (propsEl) propsEl.click()
  if (eventsEl) eventsEl.click()
  if (slotsEl) slotsEl.click()
}

/**
 * 從 argTypes 中提出 event 元素為 addon-actions 添加觸發事件功能
 * @param {argTypes} argTypes
 */
export const argEvents = (argTypes) => {
  const events = Object.keys(argTypes).reduce((result, name) => {
    if (argTypes[name].table?.category === 'events') result[name] = name
    return result
  }, {})

  collapseArgTable()
  return actions(events)
}

/**
 * stories title, it can get the path name of file.
 * @param {String} basePath
 * @param {String} filename
 * @param {String} rootDirname
 */
export const dirnameTitle = (
  basePath,
  filename,
  rootDirname = '/stories/'
) => `${basePath.split(rootDirname).slice(-1)}${filename.replace('.stories', '')}`

/**
 * get storybook argTypes props `control` selector setting
 * @param {Array} options
 * @param {String} type
 */
export const controlOptions = (options = [], type = 'select') => {
  const optionsObj = {
    'Not Set': undefined,
    ...options.reduce((result, key) => {
      result[key] = key
      return result
    }, {})
  }

  return {
    table: {
      type: {
        summary: options.map(i => `'${i}'`).join('|'),
      },
    },
    control: {
      type,
      options: ['select', 'radio', 'inline-radio'].includes(type) ? optionsObj : options
    }
  }
}
