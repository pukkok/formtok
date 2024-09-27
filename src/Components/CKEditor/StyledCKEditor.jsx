import styled from "styled-components";

const StyledCKEdtiorWrapper = styled.div`
  &.ck-editor-wrapper{
    position: relative;
    margin: 10px 0;
    & > div{
      line-height: 1.5;
    }
  }

  &.on {
    .ck-editor__top {
        top: 101%;
        opacity: 1;
        background-color: var(--pk-ck-editor-bg);
    }
  }

  .ck-editor__top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: .4s;
    border: none;

    .ck-toolbar_grouping{
      background-color: var(--pk-ck-editor-bg);
    }

    .ck.ck-toolbar__items{ // 아이템 부분
      background-color: var(--pk-ck-editor-bg);
      .ck-dropdown{
        
        .ck.ck-splitbutton.ck-splitbutton_open > .ck-button:not(.ck-on):not(.ck-disabled):not(:hover), .ck.ck-splitbutton:hover > .ck-button:not(.ck-on):not(.ck-disabled):not(:hover) {
            background: none;
        }

        .ck-dropdown__panel{
          background-color: var(--pk-ck-editor-bg);
        }

        .ck-collapsible{
          display: none;
        }
      }

      button{
        color: var(--pk-ck-editor-tool-color);
        background: none;
        &.ck-on{
          background: var(--pk-ck-editor-tool-on-bg);
          color: var(--pk-ck-editor-tool-on-color);
        }
        &:hover{ // 아이템 호버했을때
          background: var(--pk-ck-editor-tool-on-bg);
          color: var(--pk-ck-editor-tool-on-color);
        }
      }
    }
  }

  .ck {
    .ck-placeholder::before {
      padding-left: 2px;
      color: #aaa;
    }

    .ck-editor__editable_inline > * {
      &:first-child {
        margin-top: 5px;
      }
      &:last-child {
        margin-bottom: 5px;
      }
    }

    .ck-editor__main > * {
      padding: 0;
    }

    /* 입력창 */
    .ck.ck-editor__main > .ck-editor__editable {
      border: none;
      border-bottom: 1px solid transparent;
      transition: margin .2s;
      background-color: var(--pk-ck-editor-bg);
      padding-left: 2px;
      position: relative;
      z-index: 1;
    }

    .ck.ck-editor__editable.ck-blurred {
      &:hover {
        border-bottom: solid 1px #cecece;
      }
    }

    .ck.ck-editor__editable.ck-focused {
      box-shadow: none;
      margin-bottom: 50px;
      border-bottom: 2px solid var(--pk-point);
    }

    .ck-content {
      & ol,
      & ul {
        margin: 5px 0;
      }
    }

    .ck-sticky-panel__content {
      border: none;
    }

    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content {
      border: none;
    }
  }
`

export { StyledCKEdtiorWrapper as CKEditorWrapper }
