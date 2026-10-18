// 该脚本用于魔改 方块小镇 的配方

ServerEvents.recipes(event => {
    // 实体葫芦
    // 该配方已移至 kubejs/data/yuushya/recipe/get_showblock_item.json
    // 原因：KubeJS 配方使用 kubejs:shapeless 类型，帕秋莉手册按 minecraft:crafting 查询，
    // 会报 "Recipe yuushya:get_showblock_item (of type minecraft:crafting) not found"。
    // 改用原版 crafting_shapeless JSON 后可被手册正确解析。

    // 文本方块
    event.shaped(Item.of('yuushya:textblock', 8), [
        'AAA',
        'ABA',
        'AAA'
    ],
        {
            A: 'yuushya:showblock',
            B: 'ultramarine:brush_and_inkstone'
        }
    )
})
