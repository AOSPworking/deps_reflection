# deps_reflection

## 1. Requirement

* `node`: v17.0.1
* `npm`: 8.1.0

## 2. Usage

需要 [ninja-hacked](https://github.com/AOSPworking/ninja-hacked/tree/8e91aa73902c091b8a4ebdd1e625674ba0be0f8c) 中新增的 `ToolOrigin` 的输出 `.json`。此外还需要给定 [pkg_repo_tool](https://github.com/AOSPworking/pkg_repo_tool) 输出的 `repo_pkg_module.json`。

前者需要保证如下的输出结构：

```json
{
    "nodes": [
        {
            "name": "str",
            "distance": "int"
        }
    ],
    "edges": [
        {
            "target": ["str"],
            "source": ["str"],
            "impact_source": ["str"]
        }
    ],
    "node_num": "int",
    "edge_nun": "int"
}
}
```

而且最讲究的是，`edges` 字段列表中的元素，一定要保证是 `ninja` 数据结构中拓扑排序的结果。也就是说：

> 对于每一个 `edge`，其 `target` 中的元素必须在先前 `edge` 中的 `source` 中出现过。
>
> （这也就意味着，先出现的 `target` 对应 “在 `nodes` 中的 `node`” 的 `distance` 是一定比后出现的要小的）
>
> 对于每一个 `edge.source` 中的元素，都要保证存在于 `nodes`；同时，`edge.impact_source` 中的元素，都要保证一定不存在于 `nodes` 中。
