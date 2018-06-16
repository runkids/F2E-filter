<template>
  <div class="pagination">
        <el-pagination  background
            layout="total, prev, pager, next"
            :total="length"
            prev-text="<"
            next-text=">"
            @size-change="filterData"
            @current-change="filterData"
            @prev-click="filterData"
            @next-click="filterData">
        </el-pagination>
    </div>
</template>
<script>
export default {
  props: {
    length: {
      default: 0,
    },
  },
  methods: {
    filterData(value) {
      this.$emit('paginationClick', value);
    },
  },
};
</script>

<style lang="scss" scoped>
    .pagination{
        display: flex;
        justify-content: flex-end;
        padding: 20px 8px 4px 0;
    }
</style>
