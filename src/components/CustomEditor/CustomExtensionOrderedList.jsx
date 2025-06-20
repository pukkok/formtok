import OrderedList from '@tiptap/extension-ordered-list'

const CustomExtensionOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      class: {
        default: 'text-1', // 초기 클래스
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return {
            class: attributes.class || 'text-1'
          }
        }
      }
    }
  }
})

export default CustomExtensionOrderedList
