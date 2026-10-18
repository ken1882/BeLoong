// 该脚本用于批量魔改 物品的特殊属性（手持或穿戴时生效的 attribute 修饰符）
// 写法：item.addAttributeModifier(属性, { id, amount, operation }, 槽位)
//   operation：'add_value'（加法）| 'add_multiplied_base'（按基础值乘）| 'add_multiplied_total'（按总值乘）
//   槽位：'any' | 'mainhand' | 'offhand' | 'hand' | 'head' | 'chest' | 'legs' | 'feet' | 'armor' | 'body'
// 修饰符 id 只需在同一物品内唯一，这里统一用 kubejs:<物品名>_<属性名>

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

  // ========== 武器：副手持有时增加龙的技能伤害 ==========

  // [物品, 数值]
  const WEAPON_ABILITY_DAMAGE = [
    // 暮色森林
    ['twilightforest:ironwood_sword',       0.1],
    ['twilightforest:steeleaf_sword',       0.1],
    ['twilightforest:knightmetal_sword',    0.1],
    ['twilightforest:fiery_sword',          0.3],
    ['twilightforest:gold_minotaur_axe',    0.2],
    ['twilightforest:diamond_minotaur_axe', 0.3],
    ['twilightforest:ice_sword',            0.2],
    ['twilightforest:giant_sword',          0.3],
    ['twilightforest:glass_sword',          1.0],
    // 永恒星光
    ['eternal_starlight:rage_of_stars',              0.6],
    ['eternal_starlight:thermal_springstone_sword',  0.4],
    ['eternal_starlight:glacite_sword',              0.4],
    ['eternal_starlight:starlit_diamond_sword',      0.5],
    ['eternal_starlight:deepsilver_sword',           0.4],
    ['eternal_starlight:malarite_sword',             0.4],
    ['eternal_starlight:starfire_sword',             0.5],
    ['eternal_starlight:flowglaze_sword',            0.5],
    ['eternal_starlight:amaramber_sword',            0.4],
    ['eternal_starlight:shattered_sword',            0.4],
    ['eternal_starlight:energy_sword',               0.5],
    ['eternal_starlight:golem_steel_greatsword',     0.6],
  ]

  // 应用：龙甲
  ARMOR_STATS.forEach(entry => {
    const id = entry[0]
    const attribute = entry[1]
    event.modify(id, item => {
      item.addAttributeModifier(attribute, { id: `kubejs:${id.split(':')[1]}_${attribute.split(':')[1]}`, amount: entry[2], operation: 'add_value' }, entry[3])
    })
  })

  // 应用：武器
  WEAPON_ABILITY_DAMAGE.forEach(entry => {
    const id = entry[0]
    event.modify(id, item => {
      item.addAttributeModifier('dragonsurvival:dragon_ability_damage', { id: `kubejs:${id.split(':')[1]}_dragon_ability_damage`, amount: entry[1], operation: 'add_value' }, 'offhand')
    })
  })
})
