import {
  Aside,
  Button, Card, Col,
  Container,
  Form,
  FormItem,
  Input,
  Main,
  Menu,
  MenuItem, Row,
  Submenu,
  Table,
  TableColumn, Tooltip
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
  Tooltip
]

uiList.forEach(item => {
  Vue.use(item)
})
