## Link 文字链接

文字超链接

### 基础用法
基础的文字链接用法。
:::demo
```html
<div>
  <NAMESPACE-link href="https://element.eleme.io" target="_blank">默认链接</NAMESPACE-link>
  <NAMESPACE-link type="primary">主要链接</NAMESPACE-link>
  <NAMESPACE-link type="success">成功链接</NAMESPACE-link>
  <NAMESPACE-link type="warning">警告链接</NAMESPACE-link>
  <NAMESPACE-link type="danger">危险链接</NAMESPACE-link>
  <NAMESPACE-link type="info">信息链接</NAMESPACE-link>
</div>
```
:::

### 禁用状态
文字链接不可用状态。
:::demo
```html
<div>
  <NAMESPACE-link disabled>默认链接</NAMESPACE-link>
  <NAMESPACE-link type="primary" disabled>主要链接</NAMESPACE-link>
  <NAMESPACE-link type="success" disabled>成功链接</NAMESPACE-link>
  <NAMESPACE-link type="warning" disabled>警告链接</NAMESPACE-link>
  <NAMESPACE-link type="danger" disabled>危险链接</NAMESPACE-link>
  <NAMESPACE-link type="info" disabled>信息链接</NAMESPACE-link>
</div>
```
:::

### 下划线
文字链接下划线。
:::demo
```html
<div>
  <NAMESPACE-link :underline="false">无下划线</NAMESPACE-link>
  <NAMESPACE-link>有下划线</NAMESPACE-link>
</div>
```
:::

### 图标

带图标的文字链接可增强辨识度。
:::demo
```html
<div>
  <NAMESPACE-link icon="NAMESPACE-icon-edit">编辑</NAMESPACE-link>
  <NAMESPACE-link>查看<i class="NAMESPACE-icon-view NAMESPACE-icon--right"></i> </NAMESPACE-link>
</div>
```
:::

### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| type           | 类型                   | string  | primary / success / warning / danger / info | default |
| underline      | 是否下划线                         | boolean | —                                    | true    |
| disabled       | 是否禁用状态                       | boolean | —                                    | false   |
| href           | 原生 href 属性                     | string  | —                                    | -       |
| icon           | 图标类名                       | string  | —                                    | -       |
