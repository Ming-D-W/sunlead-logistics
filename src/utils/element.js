import {
  Alert,
  Aside,
  Button, Card, Checkbox, CheckboxGroup, Col,
  Container, DatePicker, Dialog,
  Form,
  FormItem,
  Input, Link, Loading,
  Main,
  Menu,
  MenuItem, Message, MessageBox, Option, Pagination, Progress, Radio, RadioGroup, Row, Select,
  Submenu,
  Table,
  TableColumn, TabPane, Tabs, Tooltip, Tree, Upload
} from 'element-ui'
import Vue from 'vue'

const uiList = [
  Input,
  Form,
  Button,
  Table,
  TableColumn,
  FormItem,
  Aside,
  Main,
  Container,
  Submenu,
  Menu,
  MenuItem,
  Row,
  Col,
  Card,
  Tooltip,
  Tree,
  Select,
  Option,
  Pagination,
  Link,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Loading,
  Tabs,
  TabPane,
  Upload,
  Progress,
  DatePicker,
  Alert,
  Radio,
  RadioGroup
]

uiList.forEach(item => {
  Vue.use(item)
})

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
