export default {
  data () {
    return {
      loading: false,
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false
    }
  },
  methods: {
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
    this.getList()
  }
}
