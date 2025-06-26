import { Image } from '@tiptap/extension-image'

const CustomExtensionImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => {
          return attributes.width ? { width: attributes.width } : {}
        },
      },
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return attributes.class ? { class: attributes.class } : {}
        },
      },
    }
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const img = document.createElement('img')

      img.src = node.attrs.src
      if (node.attrs.width) img.setAttribute('width', node.attrs.width)
      if (node.attrs.class) img.className = node.attrs.class

      img.draggable = false
      img.style.cursor = 'pointer'

      img.addEventListener('click', event => {
        const { state, view } = editor
        const tr = state.tr.setSelection(
          editor.state.selection.constructor.create(
            state.doc,
            getPos()
          )
        )
        view.dispatch(tr)
      })

      return {
        dom: img,
        update(updatedNode) {
          if (updatedNode.type !== node.type) return false
          if (updatedNode.attrs.src !== img.src) img.src = updatedNode.attrs.src
          if (updatedNode.attrs.width !== img.getAttribute('width')) {
            if (updatedNode.attrs.width) {
              img.setAttribute('width', updatedNode.attrs.width)
            } else {
              img.removeAttribute('width')
            }
          }
          img.className = updatedNode.attrs.class || ''
          return true
        },
      }
    }
  },
})

export default CustomExtensionImage
