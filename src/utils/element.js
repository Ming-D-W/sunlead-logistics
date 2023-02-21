import {
  Aside,
  Button, Card, Checkbox, CheckboxGroup, Col,
  Container, Dialog,
  Form,
  FormItem,
  Input, Link, Loading,
  Main,
  Menu,
  MenuItem, Message, MessageBox, Option, Pagination, Row, Select,
  Submenu,
  Table,
  TableColumn, Tooltip, Tree
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
  CheckboxGroup
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
