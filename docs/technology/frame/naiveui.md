# NaiveUI

NaiveUI 特殊场景记录，Naive UI 是一个 Vue3 的组件库。【[传送门](https://www.naiveui.com/zh-CN/os-theme/components/button)】

## 动态表单基础实现

此处动态表单核心`Object.assign(obj, { type: 'array', })`该位置主要针对对象为Array类型的，如果不增加这个的话，会存在表单失焦现象

::: code-group

```vue [Vue]
<n-collapse-item title="字段匹配" name="field">
  <template v-for="item in fieldOptions[index] || []" :key="item.id">
    <n-form-item :path="item.propKey" :rule="getRules(item, index)">
      <template #label>
        <div class="mb-5">{{ item.propName }}</div>
        <div v-if="item.description" class="text-sub-title">{{ item.description }}</div>
      </template>
      <component :is="renderField(item, index)"></component>
    </n-form-item>
  </template>
  <template v-if="!fieldOptions[index]?.length">
    <div>
      <div class="f-c-c">
        <img :src="nodata" alt="nodata" class="w-120px" />
      </div>
      <div class="text-center text-12 c-#00000040">
        请选择执行动作
      </div>
    </div>
  </template>
</n-collapse-item>
```

```js [JavaScript]
const formulaOptions = [
  {
    label: '表达式大于',
    value: '17',
  },
  {
    label: '表达式大于等于',
    value: '18',
  },
  {
    label: '表达式小于',
    value: '19',
  },
  {
    label: '表达式小于等于',
    value: '20',
  },
  {
    label: '条件表达式等于',
    value: '21',
  },
  {
    label: '达式不等于',
    value: '22',
  },
  {
    label: '表达式不包含',
    value: '23',
  },
  {
    label: '表达式包含',
    value: '24',
  },
]

const formatTrigger = (type) => {
  if (!type) return undefined
  const trigger = ['blur']
  if (type === 'text') {
    trigger.push('input')
  } else if (type === 'select') {
    trigger.push('change')
  } else if (type === 'filterCriteria') {
    trigger.push('change')
  }
  return trigger
}

// 筛选动态渲染
function getFilterCriteriaNode(idx, propKey) {
  return stacks.value[idx].model[propKey].map((item, oidx) => (h('div', { class: 'bg-gray-50 p-10', key: `o_${oidx}` }, {
    default: () => item.map((ele, tidx) => (h('div', { class: 'flex my-5', key: `t_${tidx}_${oidx}` }, {
      default: () => [
        h(NSpace, { wrap: false }, {
          default: () => [
            h(NInput, {
              type: 'text', value: ele[0],
              "onUpdate:value": (val) => {
                stacks.value[idx].model[propKey][oidx][tidx][0] = val
              },
            }),
            h(NSelect, {
              style: { width: '150px' }, options: formulaOptions, value: ele[1],
              "onUpdate:value": (val) => {
                stacks.value[idx].model[propKey][oidx][tidx][1] = val
              }
            }),
            h(NInput, {
              type: 'text',
              value: ele[2],
              "onUpdate:value": (val) => {
                stacks.value[idx].model[propKey][oidx][tidx][2] = val
              }
            }),
          ],
        }),
        h(NSpace, { wrap: false, class: 'ml-15 flex-shrink-0' }, {
          default: () => [
            h(NButton, {
              type: 'error',
              disabled: oidx === 0 && tidx === 0,
              onClick: () => {
                if (stacks.value[idx].model[propKey][oidx].length === 1) {
                  stacks.value[idx].model[propKey].splice(oidx, 1)
                }
                else {
                  stacks.value[idx].model[propKey][oidx].splice(tidx, 1)
                }
              },
            }, {
              default: () => h('div', { class: 'i-ph:trash' }),
            }),
            h(NButton, {
              type: 'primary',
              onClick: () => {
                stacks.value[idx].model[propKey][oidx].push([null, null, null])
              },
            }, {
              default: () => [
                h('div', { class: 'i-ph:plus-circle' }),
                h('div', { class: 'ml-8' }, { default: () => '并且' }),
              ],
            }),
          ],
        }),
      ],
    }))),
  })))
}

function getRules(item, index) {
  let obj = { required: item.isNull === '1', message: `${item.propName}不可为空`, trigger: formatTrigger(item.propType) }
  if (item.propType === 'filterCriteria') {
    Object.assign(obj, { type: 'array', })
  }
  return obj
}

// 动态表单业务
const renderField = (item, idx) => {
  return defineAsyncComponent(async () => {
    // 渲染前需要先将key注入到对象中过去
    Object.assign(stacks.value[idx].model, { [item.propKey]: stacks.value[idx].model[item.propKey] })
    let fieldValue = null;
    // 特殊字段类型特殊处理
    if (item.propType === 'sysTextCombination') {
      const { data } = await getConfigKeyApi(item.fieldValue);
      fieldValue = data;
      stacks.value[idx].model[item.propKey] = stacks.value[idx].model[item.propKey] || webHookVal.value
    }

    if (item.propType === 'filterCriteria') {
      // 如果是默认值的话，因为是字符串，所以需要replace一下
      if (typeof item.porpDefaultValue === 'string') {
        stacks.value[idx].model[item.propKey] = stacks.value[idx].model[item.propKey] || JSON.parse(item.porpDefaultValue.replace(/(\w+):/g, '"$1":'))
      }
    }
    let com = {
      text: h(NInput, {
        defaultValue: stacks.value[idx].model[item.propKey],
        'onUpdate:value': (val) => {
          stacks.value[idx].model[item.propKey] = val;
        }
      }),
      select: h(NSelect, {
        labelField: 'key',
        defaultValue: stacks.value[idx].model[item.propKey],
        options: JSON.parse(item.selectItem) || [],
        'onUpdate:value': (val) => {
          stacks.value[idx].model[item.propKey] = val
        }
      }),
      sysTextCombination: h(NInputGroup, {}, {
        default: () => [
          h(NInputGroupLabel, {}, { default: () => fieldValue }),
          h(NInput, {
            defaultValue: stacks.value[idx].model[item.propKey],
            disabled: true
          })
        ]
      }),
      filterCriteria: h('div', null, {
        default: () => [
          h(NSpace, { vertical: true, size: 16 }, { default: () => getFilterCriteriaNode(idx, item.propKey) }),
          h('div', { class: 'mt-16' }, {
            default: () => [
              h(NButton, {
                type: 'primary',
                dashed: true,
                block: true,
                onClick: () => {
                  stacks.value[idx].model[item.propKey].push([[null, null, null]])
                },
              }, {
                default: () => [
                  h('div', {
                    class: 'i-ph:plus-circle',
                  }, null),
                  h('div', {
                    class: 'ml-8',
                  }, { default: () => '或' }),
                ],
              }),
            ]
          }),
        ]
      }),
    };
    return com[item.propType];
  });
};
```
:::

## n-dynamic-input 实例

自定义n-dynamic-inputzone，实现动态添加和删除。

::: code-group

```vue [Vue]
<template>
  <n-form>
      <n-form-item path="porpDefaultValue" :show-feedback="false">
        <template #label>
          <div class="mb-5">默认字段值</div>
          <div class="text-sub-title">在前端展现给用户，用于说明改字段内容如何填写</div>
        </template>
        <div>
          <n-space vertical :size="16">
            <template v-for="(ele, pidx) in filterList">
              <div class="bg-gray-50 p-10">
                <n-dynamic-input :default-value="ele">
                  <template #default="{ value }">
                    <n-space :wrap='false'>
                      <n-input v-model:value="value.input" type="text" />
                      <n-select :style="{ width: '150px' }" v-model:value="value.formula" :options="formulaOptions" />
                      <n-input v-model:value="value.comparison" type="text" />
                    </n-space>
                  </template>
                  <template #action="{ index }">
                    <n-space class="ml-15">
                      <n-button type="error" :disabled="pidx === 0 && index === 0" @click="() => onRemove(pidx, index)">
                        <div class="i-ph:trash"></div>
                      </n-button>
                      <n-button type="primary" @click="onCreate(pidx)">
                        <div class="i-ph:plus-circle"></div>
                        <div class="ml-8">
                          并且
                        </div>
                      </n-button>
                    </n-space>
                  </template>
                </n-dynamic-input>
              </div>
            </template>
          </n-space>
          <div class="mt-16">
            <n-button type="primary" dashed block @click="onCreateItem">
              <div class="i-ph:plus-circle"></div>
              <div class="ml-8">
                或
              </div>
            </n-button>
          </div>
        </div>
      </n-form-item>
    </n-form>
</template>
```

```js [JavaScript]
const filterList = ref([[{ input: null, formula: null, comparison: null }]])

const formulaOptions = [
  {
    label: '表达式大于',
    value: '17'
  },
  {
    label: '表达式大于等于',
    value: '18'
  },
]

function onCreate(pidx) {
  filterList.value[pidx].push({ input: null, formula: null, comparison: null })
}

function onRemove(pidx, cidx) {
  if (filterList.value[pidx].length === 1) {
    filterList.value.splice(pidx, 1)
  } else {
    filterList.value[pidx].splice(cidx, 1)
  }
}

function onCreateItem() {
  filterList.value.push([{ input: null, formula: null, comparison: null }])
}
```

:::

## h 函数内组件插槽用法

```js
import { h } from "vue";
import { NButton } from "naive-ui";

export default {
  render() {
    return h(
      NButton,
      {},
      {
        default: () => "Click me!",
        namedSlot: () => h("span", "This is a named slot"),
      }
    );
  },
};
```

## h 函数内组件中使用自定义指令

- `withDirectives` 只能在 `render` 或 `setup` 函数中使用
- 允许将指令应用于 `VNode`
- 返回一个包含应用指令的 ` VNode`

```js
// 使用前需要先调用vue内部方法
import { withDirectives, resolveDirective } from "vue";
// 业务代码：基于n-table组件
const tabCol = [
  // ...
  {
    title: "操作",
    key: "action",
    width: 200,
    fixed: "right",
    render(row, index) {
      return [h(NButton, { text: true, type: "primary", onClick: () => onEdit(row) }, { default: () => "编辑" }), withDirectives(h(NDivider, { vertical: true }, null), [[resolveDirective("permission"), ["user:editpassword"]]]), withDirectives(h(NButton, { text: true, type: "primary", onClick: () => onPassword(row) }, { default: () => "密码" }), [[resolveDirective("permission"), ["user:editpassword"]]]), h(NDivider, { vertical: true }, null), h(NButton, { text: true, type: "error", onClick: () => onDelete(row) }, { default: () => "删除" })];
    },
  },
];
```

## h 函数动态渲染组件

这里有一个知识点就是v-model的渲染，具体看 `onUpdate:value` 例子，这仅仅是一层链式结构的表单，如果存在深层次链式结构表单的话，需要自行拓展一下

::: code-group

``` vue [Vue]
<n-collapse-item title="字段匹配" name="field">
  <template v-for="item in fieldOptions" :key="item.id">
    <n-form-item :path="item.propKey"
      :rule="{ required: item.isNull === '1', message: `${item.propName}不可为空`, trigger: formatTrigger(item.propType) }">
      <template #label>
        <div class="mb-5">{{ item.propName }}</div>
        <div v-if="item.description" class="text-sub-title">{{ item.description }}</div>
      </template>
      <component :is="renderField(item)"></component>
    </n-form-item>
    <n-button type="primary" block>
      保存，进入下一步
    </n-button>
  </template>
</n-collapse-item>
```

``` js [JavaScript]
// 不重要的js
const formatTrigger = (type) => {
  if (!type) return undefined
  const trigger = ['blur']
  if (type === 'text') {
    trigger.push('input')
  } else if (type === 'select') {
    trigger.push('change')
  }
  return trigger
}

// 核心
const renderComponent = (component, props) => {
  return h(component, props);
}

// 核心
const renderField = (item) => {
  const com = {
    text: markRaw(NInput)
  }
  return renderComponent(com[item.propType], {
    value: model.value[item.propKey],
    'onUpdate:value': (val) => {
      model.value[item.propKey] = val
    }
  }, {})
}
```

:::


## n-tree 懒加载实例

::: code-group

```vue [Vue]
<template>
  <n-card>
    <n-tree block-line expand-on-click :on-load="handleLoad" :data="treeData" key-field="id" label-field="name" :render-prefix="renderPrefix" :render-suffix="renderSuffix" />
  </n-card>
</template>
```

```js [JavaScript]
import { NButton, NSpace } from "naive-ui";
import TheIcon from "@/components/icon/TheIcon.vue";

// 节点前缀的渲染函数
function renderPrefix({ option }) {
  return h(TheIcon, { size: 16, icon: option.icon || "tabler:help-small" });
}

// 节点后缀的渲染函数
function renderSuffix({ option }) {
  return h(
    NSpace,
    {},
    {
      default: () => [
        h(
          NButton,
          { text: true, type: "primary", onClick: (e) => onAdd(e, 1, option).stop() },
          {
            default: () => "新增文件",
          }
        ),
      ],
    }
  );
}

// 树结构数据
const treeData = ref([]);

// 懒加载
const handleLoad = (node) => {
  return new Promise(async (resolve) => {
    const { result } = await readResourceListApi({ id: node.id });
    node.children = result.map((item) => {
      item.children = undefined;
      item.isLeaf = false;
      return item;
    });
    resolve();
  });
};

// api
async function getList() {
  treeData.value = [];
  try {
    const { result } = await readResourceListApi();
    treeData.value = result.map((item) => ({ ...item, children: undefined, isLeaf: false }));
  } catch (error) {}
}
function onAdd(e, type, option) {
  e.stopPropagation();
}
onMounted(async () => {
  await getList();
});
```

:::

## n-table 实例

::: code-group

```vue [Vue]
<template>
  <n-data-table :remote="true" :pagination="pagination" :paginate-single-page="false" :columns="columns"
  @update:checked-row-keys="handleCheck" :loading="loading" :data="list" :row-key="(row) => row.dictCode">
    <template #empty>
      <div>
        <div>
          <img :src="nodata" alt="nodata" class="w-180px" />
        </div>
        <div class="text-center text-12 c-#00000040">
          暂无数据
        </div>
      </div>
    </template>
  </n-data-table>
</template>
```

```js [JavaScript]
// 无数据时候的占位图，图片路径自行定义
const nodata = new URL("../../../assets/common/nodata.png", import.meta.url).href;
// 分页，动态table一定要是开启remote为true
const pagination = reactive({
  pageNum: 1,
  pageSize: 15,
  itemCount: 0,
  pageSizes: [15, 30, 60, 90, 120],
  showSizePicker: true,
  onChange: (page) => {
    pagination.pageNum = page;
    getList()
  },
  onUpdatePageSize: (size) => {
    pagination.pageSize = size
    pagination.pageNum = 1
    getList()
  },
})
// 加载及数据字段
const loading = ref(false)
const list = ref([])
const selectKeys = ref([])
// 涵盖序号及选项
const columns = [
  {
    type: 'selection',
  },
  {
    title: "序号",
    key: "key",
    render: (row, index) => {
      return index + 1;
    }
  },
  {
    title: '字典标签',
    key: 'dictLabel',
    render: (row) => {
      return h(NTag, {
        bordered: false,
        type: row.listClass,
      }, {
        default: () => row.dictLabel
      })
    }
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'action',
    render(row) {
      return [
        h(NSpace, {}, {
          default: () => [
            h(NButton, { type: 'primary', strong: true, secondary: true, onClick: () => onEdit(row) }, { default: () => '编辑' }),
            h(NButton, { type: 'error', strong: true, secondary: true, onClick: () => handleDelete(row) }, { default: () => '删除' }),
          ]
        })

      ]
    }
  },
]
// 操作方法
const onEdit = async (row) => {
  showModal.value = true
  modalTitle.value = '编辑字典数据'
  const { data } = await getDictItemDetailApi(row.dictCode)
  model.value = data
}
// 删除方法
const handleDelete = async (row) => {
  let ids = row.dictCode || selectKeys.value.join(',')
  const d = $dialog.warning({
    title: '删除警告',
    content: `您确定要删除【${ids}】? 删除后将抹除该数据在系统中的记录!`,
    positiveText: '确定',
    negativeText: '取消',
    autoFocus: false,
    onPositiveClick: async () => {
      d.loading = true
      try {
        const { msg } = await deleteDictItemApi(ids)
        $message.success(msg)
        await getList()
      } catch (err) {
        d.loading = false
      }
    },
    onNegativeClick: () => {
      d.loading = false
    },
  })
}
// 选项收集函数
const handleCheck = (select) => {
  selectKeys.value = select
}
```

:::

## n-model 实例

重点是结构，自由编排内容是自由发挥的区块，其余的采用通用样式编写

::: code-group

```vue [Vue]
<template>
  <n-modal v-model:show="showModal" :trap-focus="false">
    <div class="bg-white">
      <div class="f-b-c p-16 bg-#f5f5f5">
        <div>{{ modalTitle }}</div>
        <div>
          <n-button text @click="handleClose">
            <template #icon>
              <div class="i-ph:x-light"></div>
            </template>
          </n-button>
        </div>
      </div>
      <div class="w-500 p-16">
        <!-- 自由编排内容: start -->
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto">
          <n-form-item label="字典类型" path="dictType">
            <n-input v-model:value="model.dictType" disabled placeholder="请输入字典类型" />
          </n-form-item>
          <n-form-item label="显示排序" path="dictSort">
            <n-input-number v-model:value="model.dictSort" :min="0" placeholder="请输入显示排序" />
          </n-form-item>
          <n-form-item label="备注" path="remark" :show-feedback="false">
            <n-input v-model:value="model.remark" type="textarea" placeholder="请输入备注" />
          </n-form-item>
        </n-form>
        <!-- 自由编排内容: end -->
      </div>
      <div class="f-b-c py-8 px-16 bg-#f5f5f5">
        <div></div>
        <div>
          <n-space>
            <n-button type="primary" :loading="modelLoading" @click="handleConfirm">确认</n-button>
            <n-button type="error" :loading="modelLoading" @click="handleClose">取消</n-button>
          </n-space>
        </div>
      </div>
    </div>
  </n-modal>
</template>
```

```js [JavaScript]
const showModal = ref(false)
const modalTitle = ref('新增字典数据')
const formRef = ref()
const model = ref({})
const rules = {
  dictType: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入字典类型"
  },
  // 这里有个知识点就是input-number组件的校验类型应该是number
  dictSort: {
    type: "number",
    required: true,
    trigger: ["blur", "change"],
    message: "请输入显示排序"
  },
}
// model 或 单独的form提交实例
const handleConfirm = (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      modelLoading.value = true
      try {
        const { msg } = model.value.id ? await updateAppAuthListApi(model.value) : await addAppAuthListApi(model.value)
        $message.success(msg);
        await getList()
        showModal.value = false
        modelLoading.value = false
      } catch (error) {
        modelLoading.value = false
      }
    } else {
      console.log(errors);
    }
  });
}
```

:::