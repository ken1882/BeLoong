// 该脚本用于批量魔改 武器的攻击伤害
// 面板伤害 = 1 + attackDamage
// 六阶段基准：1 阶 10-19 / 2 阶 20-29 / 3 阶 30-39 / 4 阶 40-59 / 5 阶 60-79 / 6 阶 80-100

ItemEvents.modification(event => {
  // ========== 特例：彩蛋武器 ==========

  // 玻璃剑
  event.modify('twilightforest:glass_sword', item => {
    item.attackDamage = 99.0
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
  // - 冰火龙钢三剑：伤害由 config/iceandfire/iaf-common.json 的 armors.dragonSteelBaseDamage 控制
  // - 冰火悚怖三剑：待重做获取方式
  // - 星光饥饿之牙：属性随饥饿度动态变化（面板 5.5/6.5/7.5），运行时每 30 秒重写 ATTRIBUTE_MODIFIERS，KJS 覆盖无效

  // ========== 1 阶：冰火传说（10-19） ==========

  // 海马拍桨
  event.modify('iceandfire:hippocampus_slapper', item => {
    item.attackDamage = 9.0
  })

  // 铜剑
  event.modify('iceandfire:copper_sword', item => {
    item.attackDamage = 11.0
  })

  // 银剑
  event.modify('iceandfire:silver_sword', item => {
    item.attackDamage = 12.0
  })

  // 翼蚺双刃刀
  event.modify('iceandfire:amphithere_macuahuitl', item => {
    item.attackDamage = 12.0
  })

  // 铜鹗羽匕
  event.modify('iceandfire:stymphalian_bird_dagger', item => {
    item.attackDamage = 13.0
  })

  // 骏鹰爪剑
  event.modify('iceandfire:hippogryph_sword', item => {
    item.attackDamage = 13.5
  })

  // 龙骨剑
  event.modify('iceandfire:dragonbone_sword', item => {
    item.attackDamage = 15.0
  })

  // 龙炎骨血剑
  event.modify('iceandfire:dragonbone_sword_fire', item => {
    item.attackDamage = 16.5
  })

  // 龙霜骨血剑
  event.modify('iceandfire:dragonbone_sword_ice', item => {
    item.attackDamage = 16.5
  })

  // 龙霆骨血剑
  event.modify('iceandfire:dragonbone_sword_lightning', item => {
    item.attackDamage = 16.5
  })

  // 幻灵剑
  event.modify('iceandfire:ghost_sword', item => {
    item.attackDamage = 18.0
  })

  // ========== 2 阶：铁魔法（20-29） ==========

  // 狩魔人之剑
  event.modify('irons_spellbooks:magehunter', item => {
    item.attackDamage = 19.0
  })

  // 紫晶刺剑
  event.modify('irons_spellbooks:amethyst_rapier', item => {
    item.attackDamage = 20.0
  })

  // 苦痛刺剑
  event.modify('irons_spellbooks:misery', item => {
    item.attackDamage = 20.0
  })

  // 破法者
  event.modify('irons_spellbooks:spellbreaker', item => {
    item.attackDamage = 22.0
  })

  // 笼手阔剑
  event.modify('irons_spellbooks:claymore', item => {
    item.attackDamage = 22.0
  })

  // 破败焰形剑
  event.modify('irons_spellbooks:keeper_flamberge', item => {
    item.attackDamage = 23.0
  })

  // 军团焰形剑
  event.modify('irons_spellbooks:legionnaire_flamberge', item => {
    item.attackDamage = 23.0
  })

  // 破败战镰
  event.modify('irons_spellbooks:decrepit_scythe', item => {
    item.attackDamage = 23.0
  })

  // 地狱战镰
  event.modify('irons_spellbooks:hellrazor', item => {
    item.attackDamage = 25.0
  })

  // 暮光飓风
  event.modify('irons_spellbooks:twilight_gale', item => {
    item.attackDamage = 25.0
  })

  // 北冰之刃
  event.modify('irons_spellbooks:boreal_blade', item => {
    item.attackDamage = 28.0
  })

  // ========== 3 阶：暮色森林（30-39） ==========

  // 铁木剑
  event.modify('twilightforest:ironwood_sword', item => {
    item.attackDamage = 29.0
  })

  // 钢叶剑
  event.modify('twilightforest:steeleaf_sword', item => {
    item.attackDamage = 30.5
  })

  // 骑士剑
  event.modify('twilightforest:knightmetal_sword', item => {
    item.attackDamage = 30.5
  })

  // 寒冰剑
  event.modify('twilightforest:ice_sword', item => {
    item.attackDamage = 31.0
  })

  // 炽铁剑
  event.modify('twilightforest:fiery_sword', item => {
    item.attackDamage = 32.0
  })

  // 巨人剑
  event.modify('twilightforest:giant_sword', item => {
    item.attackDamage = 38.0
  })

  // ========== 4 阶：永恒星光（40-59） ==========

  // 群星之怒
  event.modify('eternal_starlight:rage_of_stars', item => {
    item.attackDamage = 39.0
  })

  // 热泉石剑
  event.modify('eternal_starlight:thermal_springstone_sword', item => {
    item.attackDamage = 42.5
  })

  // 深银剑
  event.modify('eternal_starlight:deepsilver_sword', item => {
    item.attackDamage = 42.5
  })

  // 瘴紫石剑
  event.modify('eternal_starlight:malarite_sword', item => {
    item.attackDamage = 42.5
  })

  // 绯夜脂剑
  event.modify('eternal_starlight:amaramber_sword', item => {
    item.attackDamage = 42.5
  })

  // 破碎之剑
  event.modify('eternal_starlight:shattered_sword', item => {
    item.attackDamage = 42.5
  })

  // 闪烁剑
  event.modify('eternal_starlight:glistering_sword', item => {
    item.attackDamage = 42.5
  })

  // 饥渴匕首
  // 流璃剑
  event.modify('eternal_starlight:flowglaze_sword', item => {
    item.attackDamage = 44.0
  })

  // 永冻石剑
  event.modify('eternal_starlight:glacite_sword', item => {
    item.attackDamage = 44.0
  })

  // 星火剑
  event.modify('eternal_starlight:starfire_sword', item => {
    item.attackDamage = 44.0
  })

  // 能量剑
  event.modify('eternal_starlight:energy_sword', item => {
    item.attackDamage = 46.0
  })

  // 魔窟剑客之剑
  event.modify('eternal_starlight:doomeden_rapier', item => {
    item.attackDamage = 47.5
  })

  // 星钻剑
  event.modify('eternal_starlight:starlit_diamond_sword', item => {
    item.attackDamage = 49.5
  })

  // 虚素剑
  event.modify('eternal_starlight:unrealium_sword', item => {
    item.attackDamage = 49.5
  })

  // 水晶巨剑
  event.modify('eternal_starlight:crystal_greatsword', item => {
    item.attackDamage = 53.0
  })

  // 闪烁巨剑
  event.modify('eternal_starlight:glistering_greatsword', item => {
    item.attackDamage = 53.0
  })

  // 魔骨阔剑
  event.modify('eternal_starlight:bonemore', item => {
    item.attackDamage = 54.5
  })

  // 傀儡钢巨剑
  event.modify('eternal_starlight:golem_steel_greatsword', item => {
    item.attackDamage = 56.5
  })

  // 月珥巨剑
  event.modify('eternal_starlight:moonring_greatsword', item => {
    item.attackDamage = 58.0
  })

  // ========== 5 阶：传奇怪物（60-79） ==========

  // 骑士长铗
  event.modify('legendary_monsters:knights_sword', item => {
    item.attackDamage = 59.0
  })

  // 锚把手
  event.modify('legendary_monsters:anchor_handle', item => {
    item.attackDamage = 59.0
  })

  // 巨寒之霜
  event.modify('legendary_monsters:the_great_frost', item => {
    item.attackDamage = 61.0
  })

  // 阴沉钥匙
  event.modify('legendary_monsters:somber_key', item => {
    item.attackDamage = 62.0
  })

  // 终末金属剑
  event.modify('legendary_monsters:enderitium_sword', item => {
    item.attackDamage = 62.0
  })

  // 紫颂之刃
  event.modify('legendary_monsters:chorus_blade', item => {
    item.attackDamage = 63.0
  })

  // 恐龙骨槌
  event.modify('legendary_monsters:dinosaur_bone_club', item => {
    item.attackDamage = 65.5
  })

  // 虚空之剑
  event.modify('legendary_monsters:void_sword', item => {
    item.attackDamage = 67.5
  })

  // 凋零之镰
  event.modify('legendary_monsters:withered_scythe', item => {
    item.attackDamage = 67.5
  })

  // 碎裂巨剑
  event.modify('legendary_monsters:shattered_greatsword', item => {
    item.attackDamage = 71.5
  })

  // 灵魂巨剑
  event.modify('legendary_monsters:soul_great_sword', item => {
    item.attackDamage = 74.0
  })

  // 怪怖之锚
  event.modify('legendary_monsters:monstrous_anchor', item => {
    item.attackDamage = 76.0
  })

  // 超立方体
  event.modify('legendary_monsters:the_tesseract', item => {
    item.attackDamage = 78.0
  })

  // ========== 6 阶：灾变（80-100） ==========

  // 仪式匕首
  event.modify('cataclysm:athame', item => {
    item.attackDamage = 79.0
  })

  // 黑钢剑
  event.modify('cataclysm:black_steel_sword', item => {
    item.attackDamage = 81.0
  })

  // 镰形剑
  event.modify('cataclysm:khopesh', item => {
    item.attackDamage = 81.0
  })

  // 潮汐利爪
  event.modify('cataclysm:tidal_claws', item => {
    item.attackDamage = 84.5
  })

  // 歼灭战锤
  event.modify('cataclysm:the_annihilator', item => {
    item.attackDamage = 85.5
  })

  // 献祭者
  event.modify('cataclysm:the_immolator', item => {
    item.attackDamage = 85.5
  })

  // 绞肉锯
  event.modify('cataclysm:meat_shredder', item => {
    item.attackDamage = 85.5
  })

  // 远古之矛
  event.modify('cataclysm:ancient_spear', item => {
    item.attackDamage = 87.0
  })

  // 神怒长槊
  event.modify('cataclysm:astrape', item => {
    item.attackDamage = 89.0
  })

  // 守卫者护手
  event.modify('cataclysm:gauntlet_of_guard', item => {
    item.attackDamage = 90.0
  })

  // 壁垒护手
  event.modify('cataclysm:gauntlet_of_bulwark', item => {
    item.attackDamage = 90.0
  })

  // 漩涡护手
  event.modify('cataclysm:gauntlet_of_maelstrom', item => {
    item.attackDamage = 90.0
  })

  // 炼狱锻锤
  event.modify('cataclysm:infernal_forge', item => {
    item.attackDamage = 93.5
  })

  // 虚空锻锤
  event.modify('cataclysm:void_forge', item => {
    item.attackDamage = 93.5
  })

  // 掣雷巨锤
  event.modify('cataclysm:brontes', item => {
    item.attackDamage = 93.5
  })

  // 炎葬
  event.modify('cataclysm:the_incinerator', item => {
    item.attackDamage = 95.5
  })

  // 断魂战戟
  event.modify('cataclysm:soul_render', item => {
    item.attackDamage = 97.0
  })

  // 霆浪锚戟
  event.modify('cataclysm:ceraunus', item => {
    item.attackDamage = 99.0
  })
})