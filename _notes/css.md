```css
.editor-wrapper .button-format {
  ...
  opacity: 0;
  transition: opacity 0.3s;
}

.editor-wrapper:hover .button-format {
  opacity: 1;
}

---

.add-cell {
  opacity: 0;
  transition: opacity 0.3s ease-in 0.1s;
    /* 
      transition-property: opacity;
      transition-duration: 0.3s;
      transition-timing-function: ease-in;
      transition-delay: 0.1s;
    */
}
```

_**Workaround for css conflicts:** 3rd party component has the same className inside (.title), that bulma uses, so some bulma styles should be unset to prevent breaking the component:_
```css
.w-md-editor .title {
  line-height: unset;
  font-size: unset;
  font-weight: unset;
}
```  


> https://www.youtube.com/watch?v=-oyeaIirVC0 Next-generation web styling (Chrome Dev Summit 2019)

## Scroll settles perfectly for each item on each scroll:

```css
section {
    overflow: auto;
    overflow-behavior-x: contain;
    scroll-snap-type: x mandatory;
}
section > picture {
    scroll-snap-align: center
}
```

> `flexbox gap` instead of battling margins for the children  
`.iconButton {gap: 1rem}` - no matter on which side the icon is 

> `:focus-within`

```css
@media (prefers-reduced-motion: reduce) {}
@media (prefers-color-scheme: dark) {}
```

```css
.box {
    //height: 300px;
    block-size: 300px;
    //width: 200px;
    inline-size: 200px;
    //margin-left: 3rem;
    margin-inline-start: 3rem
}
```

```css
dl > dt {
    position: sticky;
    top: 0
}

<dl>
    <dt>A</dt>
    ...
    <dt>B</dt>
    ...
</dl>
<dl>
    <dt>A</dt>
    ...
    <dt>B</dt>
    ...
</dl>
```
`backdrop-filter: blur(2px)` - blurs what's under the element

`button:is(.focus, :focus)`  =>  button.focus, button:focus  
`article > :is(h1,h2,h3)`  =>  article > h1, article > h2, article > h3