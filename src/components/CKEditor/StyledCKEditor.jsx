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

    .ck.ck-editor__main > .ck-editor__editable {
      border: none;
      border-bottom: 1px solid transparent;
      transition: margin .2s;
      background-color: #fff;
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
      border-bottom: 2px solid var(--purple);
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
