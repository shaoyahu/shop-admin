import { computed, nextTick, ref } from 'vue'
import {
  createGoodsSkusCard,
  updateGoodsSkusCard,
  deleteGoodsSkusCard,
  sortGoodsSkusCard,
  createGoodsSkusCardValue,
  updateGoodsSkusCardValue,
  deleteGoodsSkusCardValue,
  chooseAndSetGoodsSkusCard
} from '@/api/goods'
import {
  useArrayMoveUp,
  useArrayMoveDown
} from '@/composables/util'

// 当前商品ID
export const goodsId = ref(0)

// 规格选项列表
export const sku_card_list = ref([])

export const sku_list = ref([])

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
  sku_list.value = d.goodsSkus
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

// 选择设置规格
export function handleChooseSetGoodsSkusCard(id, data) {
  let item = sku_card_list.value.find(o => o.id == id)
  item.loading = true
  chooseAndSetGoodsSkusCard(id, data)
    .then(res => {
      item.name = item.text = res.goods_skus_card.name
      item.goodsSkusCardValue = res.goods_skus_card_value.map(o => {
        o.text = o.value || '属性值'
        return o
      })
    }).finally(() => {
      item.loading = false
    })
}

// 初始化规格的值
export function initSkusCardItem(id) {
  const loading = ref(false)
  const item = sku_card_list.value.find(o => {
    return o.id == id
  })
  const inputValue = ref('')
  const inputVisible = ref(false)
  const InputRef = ref()

  const handleClose = (tag) => {
    loading.value = true
    deleteGoodsSkusCardValue(tag.id)
      .then(res => {
        let i = item.goodsSkusCardValue.findIndex(o => {
          return o.id == tag.id
        })
        if (i != -1) {
          item.goodsSkusCardValue.splice(i, 1)
        }
      }).finally(() => {
        loading.value = false
      })
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value.input.focus()
    })
  }

  const handleInputConfirm = () => {
    if (!inputValue.value) {
      inputVisible.value = false
      return
    }
    loading.value = true
    createGoodsSkusCardValue({
      goods_skus_card_id: id,
      name: item.name,
      order: 50,
      value: inputValue.value
    }).then(res => {
      item.goodsSkusCardValue.push({
        ...res,
        text: res.value
      })
    }).finally(() => {
      inputVisible.value = false
      inputValue.value = ''
      loading.value = false
    })

  }

  const handleChange = (value, tag) => {
    loading.value = true
    updateGoodsSkusCardValue(tag.id, {
      "goods_skus_card_id": id, //规格ID
      "name": item.name, //规格名称
      "order": tag.order, //排序
      "value": value //规格选项名称
    }).then(res => {
      tag.value = value
    }).catch(err => {
      tag.text = tag.value
    })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    inputValue,
    inputVisible,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm,
    item,
    loading,
    handleChange
  }
}


// 初始化表格
export function initSkuTable() {
  const skuLabels = computed(() => {
    return sku_card_list.value.filter(v => v.goodsSkusCardValue.length > 0)
  })

  // 获取表头
  const tableThs = computed(() => {
    let length = skuLabels.value.length
    return [{
      name: '商品规格',
      colspan: length,
      width: '',
      rowspan: length > 0 ? 1 : 2
    }, {
      name: '销售价',
      width: '100',
      rowspan: 2
    }, {
      name: '市场价',
      width: '100',
      rowspan: 2
    }, {
      name: '成本价',
      width: '100',
      rowspan: 2
    }, {
      name: '库存',
      width: '100',
      rowspan: 2
    }, {
      name: '体积',
      width: '100',
      rowspan: 2
    }, {
      name: '重量',
      width: '100',
      rowspan: 2
    }, {
      name: '编码',
      width: '100',
      rowspan: 2
    }]
  })

  return {
    skuLabels,
    tableThs,
    sku_list
  }
}
