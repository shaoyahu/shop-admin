import { ref } from 'vue'
import {
  createGoodsSkusCard,
  updateGoodsSkusCard,
  deleteGoodsSkusCard,
  sortGoodsSkusCard
} from '@/api/goods'
import {
  useArrayMoveUp,
  useArrayMoveDown
} from '@/composables/util'

// 当前商品ID
export const goodsId = ref(0)

// 规格选项列表
export const sku_card_list = ref([])

// 初始化规格选项列表
export function initSkuCardList(d) {
  sku_card_list.value = d.goodsSkusCard.map(item => {
    item.text = item.name
    item.loading = false
    item.goodsSkusCardValue.map(v => {
      v.text = v.value || '属性值'
      return v
    })
    return item
  })
}

// 添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent() {
  btnLoading.value = true
  createGoodsSkusCard({
    "goods_id": goodsId.value, //商品ID
    "name": "规格选项", //规格名称
    "order": 50, //排序
    "type": 0 //规格类型 0文字
  }).then(res => {
    sku_card_list.value.push({
      ...res,
      text: res.name,
      loading: false,
      goodsSkusCardValue: []
    })
  }).finally(() => {
    btnLoading.value = false
  })
}

// 修改规格选项
export function handleUpdate(item) {
  item.loading = true
  updateGoodsSkusCard(item.id, {
    "goods_id": item.goods_id, //商品ID
    "name": item.text, //规格名称
    "order": item.order, //排序
    "type": 0 //规格类型 0文字
  }).then(res => {
    item.name = item.text
  }).catch(err => {
    item.text = item.name
  }).finally(() => {
    item.loading = false
  })
}

// 删除商品规格选项
export function handleDelete(item) {
  item.loading = true
  deleteGoodsSkusCard(item.id).then(res => {
    const i = sku_card_list.value.findIndex(o => {
      return o.id == item.id
    })
    if (i != -1) {
      sku_card_list.value.splice(i, 1)
    }
  })
}

// 排序规格选项
export const bodyLoading = ref(false)
export function sortCard(action, index) {
  let oList = JSON.parse(JSON.stringify(sku_card_list.value))
  let func = action == 'up' ? useArrayMoveUp : useArrayMoveDown
  func(oList, index)

  let sortData = oList.map((o, i) => {
    return {
      id: o.id,
      order: i + 1
    }
  })
  bodyLoading.value = true
  sortGoodsSkusCard({ sortdata: sortData })
    .then(res => {
      func(sku_card_list.value, index)
    }).finally(() => {
      bodyLoading.value = false
    })
}

// 初始化规格的值
export function initSkusCardItem(id) {
  const item = sku_card_list.value.find(o => {
    return o.id == id
  })
  return {
    item
  }
}