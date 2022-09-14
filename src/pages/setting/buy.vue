<template>
  <div
    v-loading="loading"
    class="bg-white p-4 rounded"
  >
    <el-form
      :model="form"
      label-width="160px"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="支付设置"
          name="first"
        >
          <el-table
            :data="tableData"
            border
            stripe
          >
            <el-table-column
              label="支付方式"
              align="left"
            >
              <template #default="{ row }">
                <div class="flex items-center">
                  <el-image
                    :src="row.src"
                    fit="cover"
                    :lazy="true"
                    style="width:40px;height:40px"
                    class="rounded mr-2"
                  ></el-image>
                  <div>
                    <h6>{{ row.name }}</h6>
                    <small class="flex text-gray-500 mt-1">{{row.desc}}</small>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="150"
            >
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  text
                  @click="open(row.key)"
                >配置</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="购物设置"
          name="second"
        >
          <!-- <el-form-item label="默认上传方式">
            <el-radio-group v-model="form.upload_method">
              <el-radio
                label="oss"
                border
              >
                对象存储
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Bucket">
            <el-input
              v-model="form.upload_config.Bucket"
              placeholder="Bucket"
              style="width:30%"
            ></el-input>
          </el-form-item>
          <el-form-item label="ACCESS_KEY">
            <el-input
              v-model="form.upload_config.ACCESS_KEY"
              placeholder="ACCESS_KEY"
              style="width:30%"
            ></el-input>
          </el-form-item>
          <el-form-item label="SECRET_KEY">
            <el-input
              v-model="form.upload_config.SECRET_KEY"
              placeholder="SECRET_KEY"
              style="width:30%"
            ></el-input>
          </el-form-item>
          <el-form-item label="空间域名">
            <el-input
              v-model="form.upload_config.http"
              placeholder="空间域名"
              style="width:30%"
            ></el-input>
            <small class="text-gray-500 flex mt-1">请补全http://或https://</small>
          </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              size="default"
              @click="submit"
            >保存</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <FormDrawer
      ref="formDrawerRef"
      title="配置"
      @submit="submit"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="app_id">
          <el-input
            v-model="form.alipay.app_id"
            placeholder="app_id"
            style="width:90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="public_key">
          <el-input
            v-model="form.alipay.public_key"
            placeholder="public_key"
            style="width:90%"
            type="textarea"
            rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="private_key">
          <el-input
            v-model="form.alipay.private_key"
            placeholder="private_key"
            style="width:90%"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  getSysconfig,
  setSysconfig
} from '@/api/sysconfig'
import { toast } from '@/composables/util';
import FormDrawer from '@/components/FormDrawer.vue';

const activeName = ref('first')
const tableData = [{
  name: '支付宝支付',
  desc: '该系统支持即时到账接口',
  src: '/alipay.jpg',
  key: 'alipay'
}, {
  name: '微信支付',
  desc: '该系统支持即时到账接口',
  src: '/wepay.jpg',
  key: 'wxpay'
}]

const form = reactive({
  "close_order_minute": 0, //未支付订单自动关闭时间：分钟，0不自动关闭
  "auto_received_day": 0, //已发货订单自动确认时间：天，0不自动收货
  "after_sale_day": 0, //已完成订单允许申请售后：天
  "alipay": {
    "app_id": "",
    "ali_public_key": "",
    "private_key": ""
  }, //支付宝支付配置 { app_id:"", ali_public_key:"", private_key:""}
  "wxpay": {
    "app_id": "",
    "miniapp_id": "",
    "secret": "",
    "appid": "",
    "mch_id": "",
    "key": "",
    "cert_client": "",
    "cert_key": ""
  }
})

const loading = ref(false)
function getData() {
  loading.value = true
  getSysconfig()
    .then(res => {
      for (const key in form) {
        form[key] = res[key]
      }
    }).finally(() => {
      loading.value = false
    })
}
getData()

function submit() {
  loading.value = true
  setSysconfig({
    ...form,
    password_encrypt: form.password_encrypt.join(',')
  })
    .then(res => {
      toast('修改成功')
      getData()
    }).finally(() => {
      loading.value = false
    })
}

const drawerType = ref('alipay')
const formDrawerRef = ref(null)
const open = (key) => {
  drawerType.value = key
  formDrawerRef.value.open()
}

</script>

<style lang='scss' scoped>

</style>
