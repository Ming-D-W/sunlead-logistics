import {
  Aside,
  Button, Card, Col,
  Container,
  Form,
  FormItem,
  Input,
  Main,
  Menu,
  MenuItem, Option, Row, Select,
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
  Option
]

uiList.forEach(item => {
  Vue.use(item)
})
