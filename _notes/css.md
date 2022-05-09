```
.editor-wrapper .button-format {
  ...
  opacity: 0;
  transition: opacity 0.3s;
}

.editor-wrapper:hover .button-format {
  opacity: 1;
}
```

_**Workaround for css conflicts:** 3rd party component has the same className inside (.title), that bulma uses, so some bulma styles should be unset to prevent breaking the component:_
```
.w-md-editor .title {
  line-height: unset;
  font-size: unset;
  font-weight: unset;
}
```