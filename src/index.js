import { Controller } from 'stimulus'
import debounce from 'lodash.debounce'
import Rails from '@rails/ujs'

export default class extends Controller {
  initialize () {
    this.save = this.save.bind(this)
  }

  connect () {
    const delay = this.data.get('delay') || 0

    if (delay > 0) {
      this.save = debounce(this.save, delay)
    }
  }

  save () {
    if (!window._rails_loaded) return

    Rails.fire(this.element, 'submit')
  }
}