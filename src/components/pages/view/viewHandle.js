
import View from './View.vue'

export function createView (viewObj) {
    return {render (h) {return h(View, { props: viewObj})}}
}
