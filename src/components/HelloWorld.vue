<template>
  <div class="hello">
    <el-table
      ref="multipleTable"
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="课程名称" width="120" align="center"></el-table-column>
      <el-table-column prop="price" label="课程单价" align="center" width="120"></el-table-column>
      <el-table-column prop="count" label="购买数量" align="center" width="120"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-minus"
            @click="reduce(scope.$index, scope.row)"
            :disabled="scope.row.count === 0"
          >减少</el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click="add(scope.$index, scope.row)"
          >增加</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 购买总价 -->
    <div class="total">￥购买总价:{{ totalPrices }}元</div>
    <el-button @click="toggleSelection()">删除所选课程</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        {
          name: "Vue",
          price: 100,
          count: 1
        },
        {
          name: "Node",
          price: 120,
          count: 0
        },
        {
          name: "webpack",
          price: 140,
          count: 5
        },
        {
          name: "git",
          price: 200,
          count: 10
        }
      ],
      multipleSelection: []
    };
  },
  computed: {
    // totalPrice 是一个计算属性
    totalPrices() {
      //     - 定义一个课程总价的变量（数据），初始值为 0，
      var total = 0;
      // - 循环遍历获取数据数组中的对象中的课程价格和课程数量
      this.listData.forEach((val, index) => {
        // - 按照公式计算购买总价（公式：购买总价 = 每个课程价格 * 每个课程数量）
        total += val.price * val.count;
      });

      // 别忘了返回结果
      return total;
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 实现按钮的增加课程数量功能
    add(index, val) {
      // console.log(index);
      // console.log(val);
      // 获取到每个课程的购买数量(循环遍历数组)，然后进行加加操作
      this.listData[index].count++;
    },
    // 实现购物车课程减少功能
    reduce(index) {
      // 获取到每个课程的购买数量，然后进行减减操作

      // 如果课程的购买数量为 0时，就不能进行减减操作了
      if (this.listData[index].count == 0) {
        return;
      }
      this.listData[index].count--;
    },
    // 实现购物车课程删除功能
    remove(index) {
      //  点击删除按钮，显示一个弹框（使用的Element-UI中的弹框）
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // - 点击弹框中确定按钮，删除当前行
          //   - 删除listData数组中指定数据，使用splice方法，来删除数组中指定的数据
          this.listData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // - 点击弹框中的取消按钮，取消删除当前行
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 100px 200px;
}
.total {
  color: red;
  text-align: center;
  margin: 20px;
}
</style>
