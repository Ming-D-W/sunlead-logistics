import { getTreeOrganApi } from '@/api/organization-manage'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Treeselect
  },
  data () {
    return {
      searchText: {},
      treeData: [],
      loading: false,
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false
    }
  },
  methods: {
    async getTreeOrgan () {
      const { data } = await getTreeOrganApi()
      this.treeData = JSON.parse(data)
    },
    normalizer (node) {
      return {
        ...node,
        label: node.name
      }
    },
    reset () {
      this.searchText = {}
      this.getList()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.getList()
    },
    handleCurrentChange (current) {
      this.current = current
      this.getList()
    }
  },
  created () {
    this.getTreeOrgan()
    this.getList()
  }
}
