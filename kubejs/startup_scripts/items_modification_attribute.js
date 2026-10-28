// 该脚本用于批量魔改 物品的特殊属性（手持或穿戴时生效的 attribute 修饰符）
// 写法：item.addAttributeModifier(属性, { id, amount, operation }, 槽位)
//   operation：'add_value'（加法）| 'add_multiplied_base'（按基础值乘）| 'add_multiplied_total'（按总值乘）
//   槽位：'any' | 'mainhand' | 'offhand' | 'hand' | 'head' | 'chest' | 'legs' | 'feet' | 'armor' | 'body'
// 修饰符 id 只需在同一物品内唯一，这里统一用 kubejs:<物品名>_<属性名>
//
// 注：武器的伤害与持有属性已统一并入 weapons.js，本文件只保留护甲与弑龙者之刃。

ItemEvents.modification(event => {
  // ========== 弑龙者之刃：主手加技能伤害，副手加飞行耐力 ==========

  event.modify('dragonsurvival:dragon_hunter_sword', item => {
    item.addAttributeModifier('dragonsurvival:dragon_ability_damage', { id: 'kubejs:dragon_hunter_sword_dragon_ability_damage', amount: 0.5, operation: 'add_value' }, 'mainhand')
    item.addAttributeModifier('dragonsurvival:flight_stamina', { id: 'kubejs:dragon_hunter_sword_flight_stamina', amount: 1, operation: 'add_value' }, 'offhand')
  })

  // ========== 龙甲：光龙加魔力，暗龙加回魔 ==========

  // [物品, 属性, 数值, 槽位]
  const ARMOR_STATS = [
    ['dragonsurvival:light_dragon_helmet',     'dragonsurvival:mana',              1,    'head'],
    ['dragonsurvival:light_dragon_chestplate', 'dragonsurvival:mana',              3,    'chest'],
    ['dragonsurvival:light_dragon_leggings',   'dragonsurvival:mana',              2,    'legs'],
    ['dragonsurvival:light_dragon_boots',      'dragonsurvival:mana',              1,    'feet'],
    ['dragonsurvival:dark_dragon_helmet',      'dragonsurvival:mana_regeneration', 0.01, 'head'],
    ['dragonsurvival:dark_dragon_chestplate',  'dragonsurvival:mana_regeneration', 0.03, 'chest'],
    ['dragonsurvival:dark_dragon_leggings',    'dragonsurvival:mana_regeneration', 0.02, 'legs'],
    ['dragonsurvival:dark_dragon_boots',       'dragonsurvival:mana_regeneration', 0.01, 'feet'],
  ]

  // 应用：龙甲
  ARMOR_STATS.forEach(entry => {
    const id = entry[0]
    const attribute = entry[1]
    event.modify(id, item => {
      item.addAttributeModifier(attribute, { id: `kubejs:${id.split(':')[1]}_${attribute.split(':')[1]}`, amount: entry[2], operation: 'add_value' }, entry[3])
    })
  })
})
