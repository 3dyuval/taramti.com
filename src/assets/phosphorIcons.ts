import type { IconAliases, IconProps, IconSet } from 'vuetify'
import '@phosphor-icons/web/regular/style.css'
import '@phosphor-icons/web/fill/style.css'
import { h } from 'vue'

const aliases: IconAliases = {
  collapse: 'ph-caret-up',
  expand: 'ph-caret-down',
  complete: '...',
  cancel: 'ph-x-circle',
  close: 'ph-x',
  delete: 'ph-x-circle',
  clear: 'ph-x-eraser',
  success: 'ph-check',
  info: 'ph-info',
  clock: 'ph-clock',
  warning: 'ph-warning-circle',
  error: 'ph-warning-circle',
  prev: 'ph-caret-left',
  next: 'ph-caret-right',
  checkboxOn: 'ph-check-square',
  checkboxOff: 'ph-square',
  checkboxIndeterminate: '...',
  delimiter: '...',
  sort: 'ph-funnel-simple',
  menu: '...',
  subgroup: '...',
  dropdown: 'ph-caret-down',
  radioOn: 'ph-check-circle',
  radioOff: 'ph-circle',
  edit: '...',
  ratingEmpty: '...',
  ratingFull: '...',
  ratingHalf: '...',
  loading: '...',
  first: '...',
  last: '...',
  unfold: '...',
  file: '...',
  plus: '...',
  minus: '...',
}

const ph: IconSet = {
  component: (props: IconProps) => {
    return h('i', { ...props, class: `ph ${props.icon}` })
  },
}

export { aliases, ph }
