// 该脚本用于批量魔改 武器的攻击伤害与持有属性
// 面板伤害 = 1 + attackDamage
// 六阶段基准：1 阶 10-19 / 2 阶 20-29 / 3 阶 30-39 / 4 阶 40-59 / 5 阶 60-79 / 6 阶 80-100
//
// 持有属性（每把武器两条，共用同一个数值）：
//   主手 dragonsurvival:dragon_ability_damage —— 龙技能伤害倍率
//   副手 irons_spellbooks:spell_power        —— 铁魔法强度
//   两者基础值均为 1.0，用 add_multiplied_base 施加，故 0.10 = +10%、1.00 = +100%
//   数值逐把手填，范围 0 < v ≤ 1.00；当前为迁移时的初始值，沿用原六阶梯度：
//   1 阶 0.10 / 2 阶 0.16 / 3 阶 0.25 / 4 阶 0.40 / 5 阶 0.63 / 6 阶 1.00
// 给武器挂上主手龙技能伤害 + 副手铁魔法强度
function applyWeaponBonus(item, path, bonus) {
  item.addAttributeModifier('dragonsurvival:dragon_ability_damage', { id: `kubejs:${path}_ability`, amount: bonus, operation: 'add_multiplied_base' }, 'mainhand')
  item.addAttributeModifier('irons_spellbooks:spell_power', { id: `kubejs:${path}_spell`, amount: bonus, operation: 'add_multiplied_base' }, 'offhand')
}

ItemEvents.modification(event => {
  // ========== 特例：彩蛋武器 ==========

  // 玻璃剑
  event.modify('twilightforest:glass_sword', item => {
    item.attackDamage = 99.0
    applyWeaponBonus(item, 'glass_sword', 1.00)
  })

  // 幽匿太刀
  event.modify('xfws_swords:sculk_katana', item => {
    item.attackDamage = 19.0
  })

  // 彩虹猫之刃
  event.modify('xfws_swords:meowmere', item => {
    item.attackDamage = 29.0
  })

  // 群星之怒
  event.modify('xfws_swords:star_wrath', item => {
    item.attackDamage = 39.0
  })

  // 鸿蒙方舟
  event.modify('xfws_swords:ark_of_the_cosmos', item => {
    item.attackDamage = 49.0
  })

  // 保持原值、不在本脚本修改：
  // - 冰火铜剑银剑：定位在钻石剑之下，改了会倒反天罡
  // - 冰火龙钢三剑：伤害由 config/iceandfire/iaf-common.json 的 armors.dragonSteelBaseDamage 控制
  // - 冰火悚怖三剑：待重做获取方式
  // - 星光饥饿之牙：属性随饥饿度动态变化（面板 5.5/6.5/7.5），运行时每 30 秒重写 ATTRIBUTE_MODIFIERS，KJS 覆盖无效

  // ========== 1 阶：冰火传说（10-20） ==========

  // 海马拍桨
  event.modify('iceandfire:hippocampus_slapper', item => {
    item.attackDamage = 9.0
    applyWeaponBonus(item, 'hippocampus_slapper', 0.05)
  })

  // 铜鹗羽匕
  event.modify('iceandfire:stymphalian_bird_dagger', item => {
    item.attackDamage = 10.0
    applyWeaponBonus(item, 'stymphalian_bird_dagger', 0.06)
  })

  // 翼蚺双刃刀
  event.modify('iceandfire:amphithere_macuahuitl', item => {
    item.attackDamage = 12.0
    applyWeaponBonus(item, 'amphithere_macuahuitl', 0.07)
  })

  // 骏鹰爪剑
  event.modify('iceandfire:hippogryph_sword', item => {
    item.attackDamage = 13.0
    applyWeaponBonus(item, 'hippogryph_sword', 0.08)
  })

  // 龙骨剑
  event.modify('iceandfire:dragonbone_sword', item => {
    item.attackDamage = 15.0
    applyWeaponBonus(item, 'dragonbone_sword', 0.10)
  })

  // 龙炎骨血剑
  event.modify('iceandfire:dragonbone_sword_fire', item => {
    item.attackDamage = 17.0
    applyWeaponBonus(item, 'dragonbone_sword_fire', 0.12)
  })

  // 龙霜骨血剑
  event.modify('iceandfire:dragonbone_sword_ice', item => {
    item.attackDamage = 17.0
    applyWeaponBonus(item, 'dragonbone_sword_ice', 0.12)
  })

  // 龙霆骨血剑
  event.modify('iceandfire:dragonbone_sword_lightning', item => {
    item.attackDamage = 17.0
    applyWeaponBonus(item, 'dragonbone_sword_lightning', 0.12)
  })

  // 幻灵剑
  event.modify('iceandfire:ghost_sword', item => {
    item.attackDamage = 18.0
    applyWeaponBonus(item, 'ghost_sword', 0.13)
  })

  // 海潮三叉戟
  event.modify('iceandfire:tide_trident', item => {
    item.attackDamage = 19.0
    applyWeaponBonus(item, 'tide_trident', 0.15)
  })

  // ========== 2 阶：铁魔法（20-29） ==========

  // 狩魔人之剑
  event.modify('irons_spellbooks:magehunter', item => {
    item.attackDamage = 19.0
    applyWeaponBonus(item, 'magehunter', 0.16)
  })

  // 紫晶刺剑
  event.modify('irons_spellbooks:amethyst_rapier', item => {
    item.attackDamage = 20.0
    applyWeaponBonus(item, 'amethyst_rapier', 0.16)
  })

  // 苦痛刺剑
  event.modify('irons_spellbooks:misery', item => {
    item.attackDamage = 20.0
    applyWeaponBonus(item, 'misery', 0.16)
  })

  // 破法者
  event.modify('irons_spellbooks:spellbreaker', item => {
    item.attackDamage = 22.0
    applyWeaponBonus(item, 'spellbreaker', 0.16)
  })

  // 笼手阔剑
  event.modify('irons_spellbooks:claymore', item => {
    item.attackDamage = 22.0
    applyWeaponBonus(item, 'claymore', 0.16)
  })

  // 破败焰形剑
  event.modify('irons_spellbooks:keeper_flamberge', item => {
    item.attackDamage = 23.0
    applyWeaponBonus(item, 'keeper_flamberge', 0.16)
  })

  // 军团焰形剑
  event.modify('irons_spellbooks:legionnaire_flamberge', item => {
    item.attackDamage = 23.0
    applyWeaponBonus(item, 'legionnaire_flamberge', 0.16)
  })

  // 破败战镰
  event.modify('irons_spellbooks:decrepit_scythe', item => {
    item.attackDamage = 23.0
    applyWeaponBonus(item, 'decrepit_scythe', 0.16)
  })

  // 地狱战镰
  event.modify('irons_spellbooks:hellrazor', item => {
    item.attackDamage = 25.0
    applyWeaponBonus(item, 'hellrazor', 0.16)
  })

  // 暮光飓风
  event.modify('irons_spellbooks:twilight_gale', item => {
    item.attackDamage = 25.0
    applyWeaponBonus(item, 'twilight_gale', 0.16)
  })

  // 北冰之刃
  event.modify('irons_spellbooks:boreal_blade', item => {
    item.attackDamage = 28.0
    applyWeaponBonus(item, 'boreal_blade', 0.16)
  })

  // ========== 3 阶：暮色森林（30-39） ==========

  // 铁木剑
  event.modify('twilightforest:ironwood_sword', item => {
    item.attackDamage = 29.0
    applyWeaponBonus(item, 'ironwood_sword', 0.25)
  })

  // 钢叶剑
  event.modify('twilightforest:steeleaf_sword', item => {
    item.attackDamage = 30.5
    applyWeaponBonus(item, 'steeleaf_sword', 0.25)
  })

  // 骑士剑
  event.modify('twilightforest:knightmetal_sword', item => {
    item.attackDamage = 30.5
    applyWeaponBonus(item, 'knightmetal_sword', 0.25)
  })

  // 寒冰剑
  event.modify('twilightforest:ice_sword', item => {
    item.attackDamage = 31.0
    applyWeaponBonus(item, 'ice_sword', 0.25)
  })

  // 炽铁剑
  event.modify('twilightforest:fiery_sword', item => {
    item.attackDamage = 32.0
    applyWeaponBonus(item, 'fiery_sword', 0.25)
  })

  // 巨人剑
  event.modify('twilightforest:giant_sword', item => {
    item.attackDamage = 38.0
    applyWeaponBonus(item, 'giant_sword', 0.25)
  })

  // ========== 4 阶：永恒星光（40-59） ==========

  // 群星之怒
  event.modify('eternal_starlight:rage_of_stars', item => {
    item.attackDamage = 39.0
    applyWeaponBonus(item, 'rage_of_stars', 0.40)
  })

  // 热泉石剑
  event.modify('eternal_starlight:thermal_springstone_sword', item => {
    item.attackDamage = 42.5
    applyWeaponBonus(item, 'thermal_springstone_sword', 0.40)
  })

  // 深银剑
  event.modify('eternal_starlight:deepsilver_sword', item => {
    item.attackDamage = 42.5
    applyWeaponBonus(item, 'deepsilver_sword', 0.40)
  })

  // 瘴紫石剑
  event.modify('eternal_starlight:malarite_sword', item => {
    item.attackDamage = 42.5
    applyWeaponBonus(item, 'malarite_sword', 0.40)
  })

  // 绯夜脂剑
  event.modify('eternal_starlight:amaramber_sword', item => {
    item.attackDamage = 42.5
    applyWeaponBonus(item, 'amaramber_sword', 0.40)
  })

  // 破碎之剑
  event.modify('eternal_starlight:shattered_sword', item => {
    item.attackDamage = 42.5
    applyWeaponBonus(item, 'shattered_sword', 0.40)
  })

  // 闪烁剑
  event.modify('eternal_starlight:glistering_sword', item => {
    item.attackDamage = 42.5
    applyWeaponBonus(item, 'glistering_sword', 0.40)
  })

  // 流璃剑
  event.modify('eternal_starlight:flowglaze_sword', item => {
    item.attackDamage = 44.0
    applyWeaponBonus(item, 'flowglaze_sword', 0.40)
  })

  // 永冻石剑
  event.modify('eternal_starlight:glacite_sword', item => {
    item.attackDamage = 44.0
    applyWeaponBonus(item, 'glacite_sword', 0.40)
  })

  // 星火剑
  event.modify('eternal_starlight:starfire_sword', item => {
    item.attackDamage = 44.0
    applyWeaponBonus(item, 'starfire_sword', 0.40)
  })

  // 能量剑
  event.modify('eternal_starlight:energy_sword', item => {
    item.attackDamage = 46.0
    applyWeaponBonus(item, 'energy_sword', 0.40)
  })

  // 魔窟剑客之剑
  event.modify('eternal_starlight:doomeden_rapier', item => {
    item.attackDamage = 47.5
    applyWeaponBonus(item, 'doomeden_rapier', 0.40)
  })

  // 星钻剑
  event.modify('eternal_starlight:starlit_diamond_sword', item => {
    item.attackDamage = 49.5
    applyWeaponBonus(item, 'starlit_diamond_sword', 0.40)
  })

  // 虚素剑
  event.modify('eternal_starlight:unrealium_sword', item => {
    item.attackDamage = 49.5
    applyWeaponBonus(item, 'unrealium_sword', 0.40)
  })

  // 水晶巨剑
  event.modify('eternal_starlight:crystal_greatsword', item => {
    item.attackDamage = 53.0
    applyWeaponBonus(item, 'crystal_greatsword', 0.40)
  })

  // 闪烁巨剑
  event.modify('eternal_starlight:glistering_greatsword', item => {
    item.attackDamage = 53.0
    applyWeaponBonus(item, 'glistering_greatsword', 0.40)
  })

  // 魔骨阔剑
  event.modify('eternal_starlight:bonemore', item => {
    item.attackDamage = 54.5
    applyWeaponBonus(item, 'bonemore', 0.40)
  })

  // 傀儡钢巨剑
  event.modify('eternal_starlight:golem_steel_greatsword', item => {
    item.attackDamage = 56.5
    applyWeaponBonus(item, 'golem_steel_greatsword', 0.40)
  })

  // 月珥巨剑
  event.modify('eternal_starlight:moonring_greatsword', item => {
    item.attackDamage = 58.0
    applyWeaponBonus(item, 'moonring_greatsword', 0.40)
  })

  // ========== 5 阶：传奇怪物（60-79） ==========

  // 骑士长铗
  event.modify('legendary_monsters:knights_sword', item => {
    item.attackDamage = 59.0
    applyWeaponBonus(item, 'knights_sword', 0.63)
  })

  // 锚把手
  event.modify('legendary_monsters:anchor_handle', item => {
    item.attackDamage = 59.0
    applyWeaponBonus(item, 'anchor_handle', 0.63)
  })

  // 巨寒之霜
  event.modify('legendary_monsters:the_great_frost', item => {
    item.attackDamage = 61.0
    applyWeaponBonus(item, 'the_great_frost', 0.63)
  })

  // 阴沉钥匙
  event.modify('legendary_monsters:somber_key', item => {
    item.attackDamage = 62.0
    applyWeaponBonus(item, 'somber_key', 0.63)
  })

  // 终末金属剑
  event.modify('legendary_monsters:enderitium_sword', item => {
    item.attackDamage = 62.0
    applyWeaponBonus(item, 'enderitium_sword', 0.63)
  })

  // 紫颂之刃
  event.modify('legendary_monsters:chorus_blade', item => {
    item.attackDamage = 63.0
    applyWeaponBonus(item, 'chorus_blade', 0.63)
  })

  // 恐龙骨槌
  event.modify('legendary_monsters:dinosaur_bone_club', item => {
    item.attackDamage = 65.5
    applyWeaponBonus(item, 'dinosaur_bone_club', 0.63)
  })

  // 虚空之剑
  event.modify('legendary_monsters:void_sword', item => {
    item.attackDamage = 67.5
    applyWeaponBonus(item, 'void_sword', 0.63)
  })

  // 凋零之镰
  event.modify('legendary_monsters:withered_scythe', item => {
    item.attackDamage = 67.5
    applyWeaponBonus(item, 'withered_scythe', 0.63)
  })

  // 碎裂巨剑
  event.modify('legendary_monsters:shattered_greatsword', item => {
    item.attackDamage = 71.5
    applyWeaponBonus(item, 'shattered_greatsword', 0.63)
  })

  // 灵魂巨剑
  event.modify('legendary_monsters:soul_great_sword', item => {
    item.attackDamage = 74.0
    applyWeaponBonus(item, 'soul_great_sword', 0.63)
  })

  // 怪怖之锚
  event.modify('legendary_monsters:monstrous_anchor', item => {
    item.attackDamage = 76.0
    applyWeaponBonus(item, 'monstrous_anchor', 0.63)
  })

  // 超立方体
  event.modify('legendary_monsters:the_tesseract', item => {
    item.attackDamage = 78.0
    applyWeaponBonus(item, 'the_tesseract', 0.63)
  })

  // ========== 6 阶：灾变（80-100） ==========

  // 仪式匕首
  event.modify('cataclysm:athame', item => {
    item.attackDamage = 79.0
    applyWeaponBonus(item, 'athame', 1.00)
  })

  // 黑钢剑
  event.modify('cataclysm:black_steel_sword', item => {
    item.attackDamage = 81.0
    applyWeaponBonus(item, 'black_steel_sword', 1.00)
  })

  // 镰形剑
  event.modify('cataclysm:khopesh', item => {
    item.attackDamage = 81.0
    applyWeaponBonus(item, 'khopesh', 1.00)
  })

  // 潮汐利爪
  event.modify('cataclysm:tidal_claws', item => {
    item.attackDamage = 84.5
    applyWeaponBonus(item, 'tidal_claws', 1.00)
  })

  // 歼灭战锤
  event.modify('cataclysm:the_annihilator', item => {
    item.attackDamage = 85.5
    applyWeaponBonus(item, 'the_annihilator', 1.00)
  })

  // 献祭者
  event.modify('cataclysm:the_immolator', item => {
    item.attackDamage = 85.5
    applyWeaponBonus(item, 'the_immolator', 1.00)
  })

  // 绞肉锯
  event.modify('cataclysm:meat_shredder', item => {
    item.attackDamage = 85.5
    applyWeaponBonus(item, 'meat_shredder', 1.00)
  })

  // 远古之矛
  event.modify('cataclysm:ancient_spear', item => {
    item.attackDamage = 87.0
    applyWeaponBonus(item, 'ancient_spear', 1.00)
  })

  // 神怒长槊
  event.modify('cataclysm:astrape', item => {
    item.attackDamage = 89.0
    applyWeaponBonus(item, 'astrape', 1.00)
  })

  // 守卫者护手
  event.modify('cataclysm:gauntlet_of_guard', item => {
    item.attackDamage = 90.0
    applyWeaponBonus(item, 'gauntlet_of_guard', 1.00)
  })

  // 壁垒护手
  event.modify('cataclysm:gauntlet_of_bulwark', item => {
    item.attackDamage = 90.0
    applyWeaponBonus(item, 'gauntlet_of_bulwark', 1.00)
  })

  // 漩涡护手
  event.modify('cataclysm:gauntlet_of_maelstrom', item => {
    item.attackDamage = 90.0
    applyWeaponBonus(item, 'gauntlet_of_maelstrom', 1.00)
  })

  // 炼狱锻锤
  event.modify('cataclysm:infernal_forge', item => {
    item.attackDamage = 93.5
    applyWeaponBonus(item, 'infernal_forge', 1.00)
  })

  // 虚空锻锤
  event.modify('cataclysm:void_forge', item => {
    item.attackDamage = 93.5
    applyWeaponBonus(item, 'void_forge', 1.00)
  })

  // 掣雷巨锤
  event.modify('cataclysm:brontes', item => {
    item.attackDamage = 93.5
    applyWeaponBonus(item, 'brontes', 1.00)
  })

  // 炎葬
  event.modify('cataclysm:the_incinerator', item => {
    item.attackDamage = 95.5
    applyWeaponBonus(item, 'the_incinerator', 1.00)
  })

  // 断魂战戟
  event.modify('cataclysm:soul_render', item => {
    item.attackDamage = 97.0
    applyWeaponBonus(item, 'soul_render', 1.00)
  })

  // 霆浪锚戟
  event.modify('cataclysm:ceraunus', item => {
    item.attackDamage = 99.0
    applyWeaponBonus(item, 'ceraunus', 1.00)
  })
})