<script setup lang="ts">
import { reactive } from 'vue';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { cloneDeep } from 'lodash-es';

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

// 禁用今日之前的日期
const isDateBeforeToday = (time) => {
  return time.getTime() < new Date(new Date().toDateString()).getTime();
};

const defaultData = {
  title: '',
  rawUrl: '',
  expirationTime: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss')
};

type DefaultDataType = typeof defaultData;

const info = reactive(cloneDeep(defaultData) as DefaultDataType);

const checkData = (): boolean => {
  if (!info.title) {
    ElMessage.warning('请填写短链标题！');
    return false;
  }

  if (!info.rawUrl) {
    ElMessage.warning('请填写跳转的地址！');
    return false;
  }

  if (
    !info.rawUrl.startsWith('https://') &&
    !info.rawUrl.startsWith('http://')
  ) {
    ElMessage.warning('请输入 http:// 或 https:// 开头的跳转链接!');
    return false;
  }

  if (!info.expirationTime) {
    ElMessage.warning('请选择过期时间！');
    return false;
  }

  return true;
};

const getData = () => {
  return cloneDeep(info);
};

const resetData = () => {
  Object.keys(info).forEach((item) => {
    info[item] = defaultData[item];
  });
};

defineExpose({
  checkData,
  getData,
  resetData
});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="info"
    label-width="120px"
    size="large"
    label-position="top"
    status-icon
  >
    <el-form-item label="短链名称:">
      <el-input v-model="info.title" placeholder="请输入短链名称" clearable />
    </el-form-item>
    <el-form-item label="跳转链接:" prop="rawUrl">
      <el-input v-model="info.rawUrl" placeholder="请输入跳转链接" clearable />
    </el-form-item>

    <el-form-item v-if="isLogin" label="过期时间:">
      <el-date-picker
        v-model="info.expirationTime"
        type="date"
        label="过期时间"
        placeholder="请选择过期时间"
        :disabled-date="isDateBeforeToday"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
