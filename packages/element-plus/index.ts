import type { App } from 'vue'
import Affix from '@element-plus/affix'
import Alert from '@element-plus/alert'
import Aside from '@element-plus/aside'
import Autocomplete from '@element-plus/autocomplete'
import Avatar from '@element-plus/avatar'
import Backtop from '@element-plus/backtop'
import Badge from '@element-plus/badge'
import Breadcrumb from '@element-plus/breadcrumb'
import BreadcrumbItem from '@element-plus/breadcrumb-item'
import Button from '@element-plus/button'
import ButtonGroup from '@element-plus/button-group'
import Calendar from '@element-plus/calendar'
import Card from '@element-plus/card'
import Carousel from '@element-plus/carousel'
import CarouselItem from '@element-plus/carousel-item'
import Cascader from '@element-plus/cascader'
import CascaderPanel from '@element-plus/cascader-panel'
import Checkbox from '@element-plus/checkbox'
import CheckboxButton from '@element-plus/checkbox-button'
import CheckboxGroup from '@element-plus/checkbox-group'
import Col from '@element-plus/col'
import Collapse from '@element-plus/collapse'
import CollapseItem from '@element-plus/collapse-item'
import CollapseTransition from '@element-plus/collapse-transition'
import ColorPicker from '@element-plus/color-picker'
import Container from '@element-plus/container'
import DatePicker from '@element-plus/date-picker'
import Dialog from '@element-plus/dialog'
import Divider from '@element-plus/divider'
import Drawer from '@element-plus/drawer'
import Dropdown from '@element-plus/dropdown'
import DropdownItem from '@element-plus/dropdown-item'
import DropdownMenu from '@element-plus/dropdown-menu'
import Empty from '@element-plus/empty'
import Footer from '@element-plus/footer'
import Form from '@element-plus/form'
import FormItem from '@element-plus/form-item'
import Header from '@element-plus/header'
import Icon from '@element-plus/icon'
import Image from '@element-plus/image'
import ImageViewer from '@element-plus/image-viewer'
import InfiniteScroll from '@element-plus/infinite-scroll'
import Input from '@element-plus/input'
import InputNumber from '@element-plus/input-number'
import Link from '@element-plus/link'
import Loading from '@element-plus/loading'
import Main from '@element-plus/main'
import Menu from '@element-plus/menu'
import MenuItem from '@element-plus/menu-item'
import MenuItemGroup from '@element-plus/menu-item-group'
import Message from '@element-plus/message'
import MessageBox from '@element-plus/message-box'
import Notification from '@element-plus/notification'
import Option from '@element-plus/option'
import OptionGroup from '@element-plus/option-group'
import PageHeader from '@element-plus/page-header'
import Pagination from '@element-plus/pagination'
import Popconfirm from '@element-plus/popconfirm'
import Popover from '@element-plus/popover'
import Popper from '@element-plus/popper'
import Progress from '@element-plus/progress'
import Radio from '@element-plus/radio'
import RadioButton from '@element-plus/radio-button'
import RadioGroup from '@element-plus/radio-group'
import Rate from '@element-plus/rate'
import Row from '@element-plus/row'
import Scrollbar from '@element-plus/scrollbar'
import Select from '@element-plus/select'
import Slider from '@element-plus/slider'
import Step from '@element-plus/step'
import Steps from '@element-plus/steps'
import Submenu from '@element-plus/submenu'
import Switch from '@element-plus/switch'
import TabPane from '@element-plus/tab-pane'
import Table from '@element-plus/table'
import TableColumn from '@element-plus/table-column'
import Tabs from '@element-plus/tabs'
import Tag from '@element-plus/tag'
import TimePicker from '@element-plus/time-picker'
import TimeSelect from '@element-plus/time-select'
import Timeline from '@element-plus/timeline'
import TimelineItem from '@element-plus/timeline-item'
import Tooltip from '@element-plus/tooltip'
import Transfer from '@element-plus/transfer'
import Tree from '@element-plus/tree'
import Upload from '@element-plus/upload'
import VirtualList from '@element-plus/virtual-list'
import Space from '@element-plus/space'
import Skeleton from '@element-plus/skeleton'
import SkeletonItem from '@element-plus/skeleton-item'
import { use, i18n } from '@element-plus/locale'
// if you encountered problems alike "Can't resolve './version'"
// please run `yarn bootstrap` first
import { version as version_ } from './version'
import type { InstallOptions } from '@element-plus/utils/config'
import { setConfig } from '@element-plus/utils/config'
import isServer from '@element-plus/utils/isServer'
import dayjs from 'dayjs'

// expose Day.js to window to make full bundle i18n work
if (!isServer && !(window as any).dayjs) {
  (window as any).dayjs = dayjs
}

const version = version_ // version_ to fix tsc issue

const locale = use

const defaultInstallOpt: InstallOptions = {
  size: '' as ComponentSize,
  zIndex: 2000,
}

const components = [
  Affix,
  Alert,
  Aside,
  Autocomplete,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  CascaderPanel,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  CollapseTransition,
  ColorPicker,
  Container,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Empty,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  ImageViewer,
  Input,
  InputNumber,
  Link,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Option,
  OptionGroup,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Popper,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Scrollbar,
  Select,
  Slider,
  Step,
  Steps,
  Submenu,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload,
  VirtualList,
  Space,
  Skeleton,
  SkeletonItem,
]

const plugins = [
  InfiniteScroll,
  Loading,
  Message,
  MessageBox,
  Notification,
]

const install = (app: App, opt: InstallOptions): void => {
  const option = Object.assign(defaultInstallOpt, opt)
  locale(option.locale)
  if (option.i18n) {
    i18n(option.i18n)
  }
  app.config.globalProperties.$ELEMENT = option
  setConfig(option)

  components.forEach(component => {
    app.component(component.name, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin as any)
  })
}

export {
  Affix,
  Alert,
  Aside,
  Autocomplete,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  CascaderPanel,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  CollapseTransition,
  ColorPicker,
  Container,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Empty,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  ImageViewer,
  InfiniteScroll,
  Input,
  InputNumber,
  Link,
  Loading,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Notification,
  Option,
  OptionGroup,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Popper,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Scrollbar,
  Select,
  Slider,
  Step,
  Steps,
  Submenu,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload,
  VirtualList,
  Space,
  Skeleton,
  SkeletonItem,
  version,
  install,
  locale,
}

export default {
  version,
  install,
}
