import type { IconAliases, IconProps, IconSet } from 'vuetify'
import '@phosphor-icons/web/regular/style.css'
import '@phosphor-icons/web/fill/style.css'
import { h } from 'vue'

const aliases: IconAliases = {
  collapse: 'ph-caret-down',
  expand: 'ph-caret-up',
  complete: '...',
  cancel: 'ph-x-circle',
  close: '...',
  delete: '...',
  clear: '...',
  success: 'ph-check',
  info: 'ph-info',
  clock: 'ph-clock',
  warning: 'ph-warning-circle',
  error: '...',
  prev: '...',
  next: '...',
  checkboxOn: '...',
  checkboxOff: '...',
  checkboxIndeterminate: '...',
  delimiter: '...',
  sort: '...',
  menu: '',
  subgroup: '...',
  dropdown: '',
  radioOn: '...',
  radioOff: '...',
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
