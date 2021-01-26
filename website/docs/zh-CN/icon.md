## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `NAMESPACE-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="NAMESPACE-icon-edit"></i>
<i class="NAMESPACE-icon-share"></i>
<i class="NAMESPACE-icon-delete"></i>
<NAMESPACE-button type="primary" icon="NAMESPACE-icon-search">搜索</NAMESPACE-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'NAMESPACE-icon-' + name"></i>
      <span class="icon-name">{{'NAMESPACE-icon-' + name}}</span>
    </span>
  </li>
</ul>
