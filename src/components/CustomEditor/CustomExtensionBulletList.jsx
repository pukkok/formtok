import BulletList from '@tiptap/extension-bullet-list'

const CustomExtensionBulletList = BulletList.extend({
  addAttributes() {
    return {
      class: {
        default: 'bullet-disc', // 초기 클래스
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return {
            class: attributes.class || 'bullet-disc'
          }
        }
      }
    }
  }
})

export default CustomExtensionBulletList
