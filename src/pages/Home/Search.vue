<template>
    <div class="app=container">
        <van-search
                v-model="keyword"
                placeholder="请输入搜索的标签"
                @change="searchTags"
                @clear="searchTags"
        >
        </van-search>
        <van-divider content-position="left">已选标签</van-divider>
        <div class="tags-box">
            <div class="selected-box">
                <van-tag
                        closeable
                        type="primary"
                        size="large"
                        v-for="(item,index) in selectTags"
                        :key="index"
                        @close="deleteTag(item)"
                >
                    {{ item.name }}
                </van-tag>
            </div>
        </div>

        <van-divider content-position="left">可选标签</van-divider>
        <div class="tags-box">
            <div class="select-box">
                <van-tag
                        plain type="primary"
                        size="large"
                        v-for="(item,index) in tagsList"
                        :key="index"
                        @click="selectTag(item)"
                >
                    {{ item.name }}
                </van-tag>
            </div>
        </div>

        <div class="sub-btn">
            <van-button type="primary" block @click="search">提交</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {searchTagsApi} from "../../api/tag.ts";

const router = useRouter()

const keyword = ref('')

const selectTags = ref([])

const tagsList = ref([])

onMounted(() => {
    searchTags()
})

const searchTags = () => {
    searchTagsApi(keyword.value).then(res => {
        if (res.code === 200) {
            tagsList.value = res.data
        } else {
            showToast(res.msg)
        }
    })
}

const selectTag = (item) => {
    selectTags.value.push(item)
    tagsList.value = tagsList.value.filter(it => it !== item)
}
const deleteTag = (item) => {
    selectTags.value = selectTags.value.filter(it => it !== item)
    tagsList.value.push(item)
}

const search = () => {
    const arr = selectTags.value.map(item => item.id)
    if (arr.length == 0) {
        router.push('/home')
    } else {

        router.push({
            path: '/home',
            query: {
                tags: arr.join()
            }
        })
    }
}


</script>

<style lang="less" scoped>
.tags-box {
  padding: 0 10px;

  .van-tag {
    margin: 5px;
  }
}

.sub-btn {
  padding: 20px;
}
</style>