## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<NAMESPACE-container>`：外层容器。当子元素中包含 `<NAMESPACE-header>` 或 `<NAMESPACE-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<NAMESPACE-header>`：顶栏容器。

`<NAMESPACE-aside>`：侧边栏容器。

`<NAMESPACE-main>`：主要区域容器。

`<NAMESPACE-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<NAMESPACE-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<NAMESPACE-container>`。
:::

### 常见页面布局

:::demo
```html
<div class="common-layout">
  <NAMESPACE-container>
    <NAMESPACE-header>Header</NAMESPACE-header>
    <NAMESPACE-main>Main</NAMESPACE-main>
  </NAMESPACE-container>

  <NAMESPACE-container>
    <NAMESPACE-header>Header</NAMESPACE-header>
    <NAMESPACE-main>Main</NAMESPACE-main>
    <NAMESPACE-footer>Footer</NAMESPACE-footer>
  </NAMESPACE-container>

  <NAMESPACE-container>
    <NAMESPACE-aside width="200px">Aside</NAMESPACE-aside>
    <NAMESPACE-main>Main</NAMESPACE-main>
  </NAMESPACE-container>

  <NAMESPACE-container>
    <NAMESPACE-header>Header</NAMESPACE-header>
    <NAMESPACE-container>
      <NAMESPACE-aside width="200px">Aside</NAMESPACE-aside>
      <NAMESPACE-main>Main</NAMESPACE-main>
    </NAMESPACE-container>
  </NAMESPACE-container>

  <NAMESPACE-container>
    <NAMESPACE-header>Header</NAMESPACE-header>
    <NAMESPACE-container>
      <NAMESPACE-aside width="200px">Aside</NAMESPACE-aside>
      <NAMESPACE-container>
        <NAMESPACE-main>Main</NAMESPACE-main>
        <NAMESPACE-footer>Footer</NAMESPACE-footer>
      </NAMESPACE-container>
    </NAMESPACE-container>
  </NAMESPACE-container>

  <NAMESPACE-container>
    <NAMESPACE-aside width="200px">Aside</NAMESPACE-aside>
    <NAMESPACE-container>
      <NAMESPACE-header>Header</NAMESPACE-header>
      <NAMESPACE-main>Main</NAMESPACE-main>
    </NAMESPACE-container>
  </NAMESPACE-container>

  <NAMESPACE-container>
    <NAMESPACE-aside width="200px">Aside</NAMESPACE-aside>
    <NAMESPACE-container>
      <NAMESPACE-header>Header</NAMESPACE-header>
      <NAMESPACE-main>Main</NAMESPACE-main>
      <NAMESPACE-footer>Footer</NAMESPACE-footer>
    </NAMESPACE-container>
  </NAMESPACE-container>
</div>

<style>
  .NAMESPACE-header, .NAMESPACE-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .NAMESPACE-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .NAMESPACE-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .NAMESPACE-container {
    margin-bottom: 40px;
  }

  .NAMESPACE-container:nth-child(5) .NAMESPACE-aside,
  .NAMESPACE-container:nth-child(6) .NAMESPACE-aside {
    line-height: 260px;
  }

  .NAMESPACE-container:nth-child(7) .NAMESPACE-aside {
    line-height: 320px;
  }
</style>
```
:::

### 实例

:::demo
```html
<NAMESPACE-container style="height: 500px; border: 1px solid #eee">
  <NAMESPACE-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <NAMESPACE-menu :default-openeds="['1', '3']">
      <NAMESPACE-submenu index="1">
        <template #title><i class="NAMESPACE-icon-message"></i>导航一</template>
        <NAMESPACE-menu-item-group>
          <template #title>分组一</template>
          <NAMESPACE-menu-item index="1-1">选项1</NAMESPACE-menu-item>
          <NAMESPACE-menu-item index="1-2">选项2</NAMESPACE-menu-item>
        </NAMESPACE-menu-item-group>
        <NAMESPACE-menu-item-group title="分组2">
          <NAMESPACE-menu-item index="1-3">选项3</NAMESPACE-menu-item>
        </NAMESPACE-menu-item-group>
        <NAMESPACE-submenu index="1-4">
          <template #title>选项4</template>
          <NAMESPACE-menu-item index="1-4-1">选项4-1</NAMESPACE-menu-item>
        </NAMESPACE-submenu>
      </NAMESPACE-submenu>
      <NAMESPACE-submenu index="2">
        <template #title><i class="NAMESPACE-icon-menu"></i>导航二</template>
        <NAMESPACE-menu-item-group>
          <template #title>分组一</template>
          <NAMESPACE-menu-item index="2-1">选项1</NAMESPACE-menu-item>
          <NAMESPACE-menu-item index="2-2">选项2</NAMESPACE-menu-item>
        </NAMESPACE-menu-item-group>
        <NAMESPACE-menu-item-group title="分组2">
          <NAMESPACE-menu-item index="2-3">选项3</NAMESPACE-menu-item>
        </NAMESPACE-menu-item-group>
        <NAMESPACE-submenu index="2-4">
          <template #title>选项4</template>
          <NAMESPACE-menu-item index="2-4-1">选项4-1</NAMESPACE-menu-item>
        </NAMESPACE-submenu>
      </NAMESPACE-submenu>
      <NAMESPACE-submenu index="3">
        <template #title><i class="NAMESPACE-icon-setting"></i>导航三</template>
        <NAMESPACE-menu-item-group>
          <template #title>分组一</template>
          <NAMESPACE-menu-item index="3-1">选项1</NAMESPACE-menu-item>
          <NAMESPACE-menu-item index="3-2">选项2</NAMESPACE-menu-item>
        </NAMESPACE-menu-item-group>
        <NAMESPACE-menu-item-group title="分组2">
          <NAMESPACE-menu-item index="3-3">选项3</NAMESPACE-menu-item>
        </NAMESPACE-menu-item-group>
        <NAMESPACE-submenu index="3-4">
          <template #title>选项4</template>
          <NAMESPACE-menu-item index="3-4-1">选项4-1</NAMESPACE-menu-item>
        </NAMESPACE-submenu>
      </NAMESPACE-submenu>
    </NAMESPACE-menu>
  </NAMESPACE-aside>

  <NAMESPACE-container>
    <NAMESPACE-header style="text-align: right; font-size: 12px">
      <NAMESPACE-dropdown>
        <i class="NAMESPACE-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <NAMESPACE-dropdown-menu>
              <NAMESPACE-dropdown-item>查看</NAMESPACE-dropdown-item>
              <NAMESPACE-dropdown-item>新增</NAMESPACE-dropdown-item>
              <NAMESPACE-dropdown-item>删除</NAMESPACE-dropdown-item>
          </NAMESPACE-dropdown-menu>
        </template>
      </NAMESPACE-dropdown>
      <span>王小虎</span>
    </NAMESPACE-header>

    <NAMESPACE-main>
      <NAMESPACE-table :data="tableData">
        <NAMESPACE-table-column prop="date" label="日期" width="140">
        </NAMESPACE-table-column>
        <NAMESPACE-table-column prop="name" label="姓名" width="120">
        </NAMESPACE-table-column>
        <NAMESPACE-table-column prop="address" label="地址">
        </NAMESPACE-table-column>
      </NAMESPACE-table>
    </NAMESPACE-main>
  </NAMESPACE-container>
</NAMESPACE-container>

<style>
  .NAMESPACE-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .NAMESPACE-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
```
:::

### Container Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `NAMESPACE-header` 或 `NAMESPACE-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |
