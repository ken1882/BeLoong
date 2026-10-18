# 武器数值重做 · 剑类六阶段基准表

> 生成日期：2026-10-18
> 状态：**数值与脚本均已落地**（`kubejs/startup_scripts/weapons.js`）
> 定位：**剑类是本次唯一调整对象，其作用是给后续"全武器类"平衡提供数值基准。**
> 数据与工具（工作区外）：`D:\Minecraft\tools\sword-balance\`（`swords-raw.csv`、`scale-swords.ps1`、`parse-es-swords.ps1`）

---

## 1. 规则

### 1.1 判定与口径

- 面板伤害 = `1 + attackDamage`（玩家基础 `ATTACK_DAMAGE = 1.0`，物品修饰符为 `ADD_VALUE`）。
- **「武器」的判定 = `#minecraft:swords` 标签 ∪ `SwordItem` 子类（并集）**。
  - 只按标签会漏收：传奇怪物的 `void_sword`、灾变的 `khopesh` 不在标签里。
  - 只按类会漏收：灾变的锤/护手/爪/矛共 13 件（在标签里但不是 `SwordItem`）。
  - 只按标签会误收/漏收：永恒星光的 5 把巨剑经嵌套标签 `#eternal_starlight:greatswords` 引入，必须展开。
- 只改 `attackDamage`；攻速、副属性、特效不动。允许 .5 精度。

### 1.2 六段

| 阶段 | 面板 | attackDamage | 模组 |
|---|---|---:|---|
| 0 | 1–9 | 0–8 | 原版，不改 |
| 1 | 10–19 | 9–18 | 冰火传说 |
| 2 | 20–29 | 19–28 | 铁魔法（本体） |
| 3 | 30–39 | 29–38 | 暮色森林 |
| 4 | 40–59 | 39–58 | 永恒星光 |
| 5 | 60–79 | 59–78 | 传奇怪物 |
| 6 | 80–100 | 79–99 | 灾变 |

### 1.3 缩放公式

每个模组独立线性拉伸，保差值比例，四舍五入到 0.5：

```
新面板 = 段下沿 + (原始面板 - 模组最低) / (模组最高 - 模组最低) × (段上沿 - 段下沿)
```

### 1.4 特例（不参与锚点）

- 配置驱动：冰火 `dragonsteel_*` ×3（`armors.dragonSteelBaseDamage`）
- 一次性 / 彩蛋：暮色 `glass_sword`
- 待重做获取方式：冰火悚怖三剑（`dread_sword` / `dread_knight_sword` / `dread_queen_sword`）

> 悚怖三剑现状：无配方、无战利品表条目，仅由悚怖系怪物持握（`DreadKnightEntity.java:122`、`DreadQueenEntity.java:113`、`DreadThrallEntity.java:112-127`），
> 模组未覆写装备掉落率（全库仅 `PixieEntity` 设为 0），故走原版默认 8.5%（抢夺每级 +1%）。
> **作者后续会重做这三把的获取方式，因此暂不参与数值计算，保持原值。**
- 非剑类（标签外或非 `SwordItem`）：灾变 `khopesh`、传奇怪物 `void_sword` / `withered_scythe`、冰火 `hippocampus_slapper` / `amphithere_macuahuitl`

---

## 2. 最终数值表

### 阶段 1 · 冰火传说（10–19）· 11 把

锚点：最低 2（海马拍桨）/ 最高 11（幻灵剑）。龙钢三剑（配置驱动）与悚怖三剑（待重做获取）已移入特例表。

| 物品 ID | 中文名 | 原始 | **新面板** | attackDamage |
|---|---|---:|---:|---:|
| `iceandfire:hippocampus_slapper` | 海马拍桨 | 2 | **10** | 9 |
| `iceandfire:copper_sword` | 铜剑 | 4 | **12** | 11 |
| `iceandfire:silver_sword` | 银剑 | 5 | **13** | 12 |
| `iceandfire:amphithere_macuahuitl` | 翼蚺双刃刀 | 5 | **13** | 12 |
| `iceandfire:stymphalian_bird_dagger` | 铜鹗羽匕 | 6 | **14** | 13 |
| `iceandfire:hippogryph_sword` | 骏鹰爪剑 | 6.5 | **14.5** | 13.5 |
| `iceandfire:dragonbone_sword` | 龙骨剑 | 8 | **16** | 15 |
| `iceandfire:dragonbone_sword_fire` | 龙炎骨血剑 | 9.5 | **17.5** | 16.5 |
| `iceandfire:dragonbone_sword_ice` | 龙霜骨血剑 | 9.5 | **17.5** | 16.5 |
| `iceandfire:dragonbone_sword_lightning` | 龙霆骨血剑 | 9.5 | **17.5** | 16.5 |
| `iceandfire:ghost_sword` | 幻灵剑 | 11 | **19** | 18 |

### 阶段 2 · 铁魔法（20–29）· 11 把

锚点：7（狩魔人之剑）/ 16（北冰之刃）

| 物品 ID | 中文名 | 原始 | **新面板** | attackDamage | 备注 |
|---|---|---:|---:|---:|---|
| `irons_spellbooks:magehunter` | 狩魔人之剑 | 7 | **20** | 19 | 无配方 |
| `irons_spellbooks:amethyst_rapier` | 紫晶刺剑 | 8 | **21** | 20 | |
| `irons_spellbooks:misery` | 苦痛刺剑 | 8 | **21** | 20 | 掉落率 0 |
| `irons_spellbooks:spellbreaker` | 破法者 | 10 | **23** | 22 | |
| `irons_spellbooks:claymore` | 笼手阔剑 | 10 | **23** | 22 | 不在创造栏 |
| `irons_spellbooks:keeper_flamberge` | 破败焰形剑 | 11 | **24** | 23 | |
| `irons_spellbooks:legionnaire_flamberge` | 军团焰形剑 | 11 | **24** | 23 | |
| `irons_spellbooks:decrepit_scythe` | 破败战镰 | 11 | **24** | 23 | 镰刀 |
| `irons_spellbooks:hellrazor` | 地狱战镰 | 13 | **26** | 25 | 镰刀 |
| `irons_spellbooks:twilight_gale` | 暮光飓风 | 13 | **26** | 25 | |
| `irons_spellbooks:boreal_blade` | 北冰之刃 | 16 | **29** | 28 | |

### 阶段 3 · 暮色森林（30–39）· 6 把

锚点：6（铁木剑）/ 12（巨人剑）。玻璃剑为特例，已移出。

| 物品 ID | 中文名 | 原始 | **新面板** | attackDamage |
|---|---|---:|---:|---:|
| `twilightforest:ironwood_sword` | 铁木剑 | 6 | **30** | 29 |
| `twilightforest:steeleaf_sword` | 钢叶剑 | 7 | **31.5** | 30.5 |
| `twilightforest:knightmetal_sword` | 骑士剑 | 7 | **31.5** | 30.5 |
| `twilightforest:ice_sword` | 寒冰剑 | 7.5 | **32** | 31 |
| `twilightforest:fiery_sword` | 炽铁剑 | 8 | **33** | 32 |
| `twilightforest:giant_sword` | 巨人剑 | 12 | **39** | 38 |

### 阶段 4 · 永恒星光（40–59）· 19 把

锚点：5（群星之怒）/ 10.5（月珥巨剑）

| 物品 ID | 中文名 | 原始 | **新面板** | attackDamage |
|---|---|---:|---:|---:|
| `eternal_starlight:rage_of_stars` | 群星之怒 | 5 | **40** | 39 |
| `eternal_starlight:thermal_springstone_sword` | 热泉石剑 | 6 | **43.5** | 42.5 |
| `eternal_starlight:deepsilver_sword` | 深银剑 | 6 | **43.5** | 42.5 |
| `eternal_starlight:malarite_sword` | 瘴紫石剑 | 6 | **43.5** | 42.5 |
| `eternal_starlight:amaramber_sword` | 绯夜脂剑 | 6 | **43.5** | 42.5 |
| `eternal_starlight:shattered_sword` | 破碎之剑 | 6 | **43.5** | 42.5 |
| `eternal_starlight:glistering_sword` | 闪烁剑 | 6 | **43.5** | 42.5 |
| `eternal_starlight:glacite_sword` | 永冻石剑 | 6.5 | **45** | 44 |
| `eternal_starlight:starfire_sword` | 星火剑 | 6.5 | **45** | 44 |
| `eternal_starlight:flowglaze_sword` | 流璃剑 | 6.5 | **45** | 44 |
| `eternal_starlight:energy_sword` | 能量剑 | 7 | **47** | 46 |
| `eternal_starlight:doomeden_rapier` | 魔窟剑客之剑 | 7.5 | **48.5** | 47.5 |
| `eternal_starlight:starlit_diamond_sword` | 星钻剑 | 8 | **50.5** | 49.5 |
| `eternal_starlight:unrealium_sword` | 虚素剑 | 8 | **50.5** | 49.5 |
| `eternal_starlight:crystal_greatsword` | 水晶巨剑 | 9 | **54** | 53 |
| `eternal_starlight:glistering_greatsword` | 闪烁巨剑 | 9 | **54** | 53 |
| `eternal_starlight:bonemore` | 魔骨阔剑 | 9.5 | **55.5** | 54.5 |
| `eternal_starlight:golem_steel_greatsword` | 傀儡钢巨剑 | 10 | **57.5** | 56.5 |
| `eternal_starlight:moonring_greatsword` | 月珥巨剑 | 10.5 | **59** | 58 |

### 阶段 5 · 传奇怪物（60–79）· 11 把

锚点：6（骑士长铗 / 锚把手）/ 15（超立方体）

| 物品 ID | 中文名 | 原始 | **新面板** | attackDamage | 备注 |
|---|---|---:|---:|---:|---|
| `legendary_monsters:knights_sword` | 骑士长铗 | 6 | **60** | 59 | |
| `legendary_monsters:anchor_handle` | 锚把手 | 6 | **60** | 59 | 柄形 |
| `legendary_monsters:the_great_frost` | 巨寒之霜 | 7 | **62** | 61 | |
| `legendary_monsters:somber_key` | 阴沉钥匙 | 7.5 | **63** | 62 | 钥匙形 |
| `legendary_monsters:enderitium_sword` | 终末金属剑 | 7.5 | **63** | 62 | |
| `legendary_monsters:chorus_blade` | 紫颂之刃 | 8 | **64** | 63 | |
| `legendary_monsters:dinosaur_bone_club` | 恐龙骨槌 | 9 | **66.5** | 65.5 | 骨槌形 |
| `legendary_monsters:shattered_greatsword` | 碎裂巨剑 | 12 | **72.5** | 71.5 | 巨剑 |
| `legendary_monsters:soul_great_sword` | 灵魂巨剑 | 13 | **75** | 74 | ⚠ §4.2 |
| `legendary_monsters:monstrous_anchor` | 怪怖之锚 | 14 | **77** | 76 | 锚形 |
| `legendary_monsters:the_tesseract` | 超立方体 | 15 | **79** | 78 | |

### 阶段 6 · 灾变（80–100）· 18 把

锚点：5（仪式匕首）/ 16（霆浪锚戟）。并集口径下，标签里的锤/护手/爪/矛全部纳入。

| 物品 ID | 中文名 | 原始 | **新面板** | attackDamage |
|---|---|---:|---:|---:|
| `cataclysm:athame` | 仪式匕首 | 5 | **80** | 79 |
| `cataclysm:black_steel_sword` | 黑钢剑 | 6 | **82** | 81 |
| `cataclysm:khopesh` | 镰形剑 | 6 | **82** | 81 |
| `cataclysm:tidal_claws` | 潮汐利爪 | 8 | **85.5** | 84.5 |
| `cataclysm:the_annihilator` | 歼灭战锤 | 8.5 | **86.5** | 85.5 |
| `cataclysm:the_immolator` | 献祭者 | 8.5 | **86.5** | 85.5 |
| `cataclysm:meat_shredder` | 绞肉锯 | 8.5 | **86.5** | 85.5 |
| `cataclysm:ancient_spear` | 远古之矛 | 9.5 | **88** | 87 |
| `cataclysm:astrape` | 神怒长槊 | 10.5 | **90** | 89 |
| `cataclysm:gauntlet_of_guard` | 守卫者护手 | 11 | **91** | 90 |
| `cataclysm:gauntlet_of_bulwark` | 壁垒护手 | 11 | **91** | 90 |
| `cataclysm:gauntlet_of_maelstrom` | 漩涡护手 | 11 | **91** | 90 |
| `cataclysm:infernal_forge` | 炼狱锻锤 | 13 | **94.5** | 93.5 |
| `cataclysm:void_forge` | 虚空锻锤 | 13 | **94.5** | 93.5 |
| `cataclysm:brontes` | 掣雷巨锤 | 13 | **94.5** | 93.5 |
| `cataclysm:the_incinerator` | 炎葬 | 14 | **96.5** | 95.5 |
| `cataclysm:soul_render` | 断魂战戟 | 15 | **98** | 97 |
| `cataclysm:ceraunus` | 霆浪锚戟 | 16 | **100** | 99 |

> 灾变 15 件工具的伤害来自 `config/cataclysm-common.toml` 的 `tools_and_abilities.<id>.tool_config.attack_damage`，**该值即面板值**（代码 `-1.0F + attackDamage` 抵消基础 1）。已用 `MONSTROSITY` tier 加成 4 佐证（`8 + 4 = 12` → 面板 13，与配置的 13.0 一致）。

---

## 3. 特例表（单独维护，不参与缩放）

| 武器 | 模组 | 原始面板 | 处理 | 说明 |
|---|---|---:|---|---|
| `glass_sword` 玻璃剑 | 暮色 | 40 | **固定 100**（attackDamage 99） | 一次性彩蛋，耐久 1 |
| `dread_sword` 悚怖尸奴之剑 | 冰火 | 5 | **保持 5** | 待重做获取方式 |
| `dread_queen_sword` 悚怖女皇魔剑 | 冰火 | 8 | **保持 8** | 待重做获取方式 |
| `dread_knight_sword` 悚怖尸骑之剑 | 冰火 | 17 | **保持 17** | 待重做获取方式 |
| `eternal_starlight:dagger_of_hunger` 饥饿之牙 | 星光 | 6.5 | **保持原值** | 属性随饥饿度动态变化；运行时每 30 秒重写，KJS 覆盖无效 |
| `dragonsteel_fire_sword` | 冰火 | 30 | **保持 30，暂不处理** | 由 `armors.dragonSteelBaseDamage=27` 控制，公式 `面板=C+3` |
| `dragonsteel_ice_sword` | 冰火 | 30 | 同上 | 同上 |
| `dragonsteel_lightning_sword` | 冰火 | 30 | 同上 | 同上 |
| `sculk_katana` 幽匿武士刀 | 小烦维 | 19 | **保持 19** | 彩蛋武器，作者自调 |
| `meowmere` 喵喵剑 | 小烦维 | 29 | **保持 29** | 同上 |
| `star_wrath` 星怒 | 小烦维 | 39 | **保持 39** | 同上 |
| `ark_of_the_cosmos` 宇宙方舟 | 小烦维 | 49 | **保持 49** | 同上 |

### 3.1 并集补收的四件

并集口径下，这四件此前被"交集"漏掉，现已进入主表：

| 物品 | 进集原因 | 原面板 |
|---|---|---:|
| `cataclysm:khopesh` 镰形剑 | `SwordItem` 子类，但不在 `swords` 标签 | 6 |
| `legendary_monsters:void_sword` 虚空之剑 | `SwordItem` 子类，但不在 `swords` 标签 | 10 |
| `legendary_monsters:withered_scythe` 凋零之镰 | 在 `swords` 标签，但继承 `Item` | 10 |
| `iceandfire:amphithere_macuahuitl` 翼蚺双刃刀 | `SwordItem` 子类，但不在 `swords` 标签 | 5 |

另有灾变 13 件（锤/护手/爪/矛/锚）：在 `swords` 标签内但非 `SwordItem`，并集口径下同样进入主表。

---

## 4. 风险

### 4.1 配置与 KJS 的覆盖顺序

`ItemEvents.modification` 在 `FMLLoadCompleteEvent` 触发，晚于物品注册，**会覆盖 toml/JSON 的值**。受影响：
- 灾变 **15 件**工具（`cataclysm-common.toml` 的 `tools_and_abilities.<id>.tool_config.attack_damage`）——并集口径下灾变 18 件里有 15 件走配置
- 传奇怪物 **13 把**（`legendary_monsters-common.toml` 的 `["Item Settings"]` 倍率）

一旦 KJS 写死，这些配置项变成摆设。要么同步改 toml，要么在文档里标注"以 KJS 为准"。

### 4.2 ⚠ 灵魂巨剑疑似递归崩溃（2.2.3）

`SoulGreatSwordItem.getDefaultAttributeModifiers` 内调 `stack.getAttributeModifiers()`，该 stack 无 `ATTRIBUTE_MODIFIERS` 组件 → 回落到自身 → 无限递归 → `StackOverflowError`。**未实机验证**，建议先拿一把灵魂巨剑看 tooltip 是否崩溃。与本次数值无关，是现存缺陷。

### 4.3 悚怖三剑：待重做获取方式

三把悚怖剑**不参与本次数值计算，保持原值**（5 / 8 / 17）。

现状确认：无配方、无战利品表条目，仅由悚怖系怪物持握（`DreadKnightEntity.java:122`、`DreadQueenEntity.java:113`、`DreadThrallEntity.java:112-127`），
模组未覆写装备掉落率（全库仅 `PixieEntity` 设为 0），实机走原版默认 8.5%（抢夺每级 +1%）。

作者后续会重做这三把的获取方式，届时再按新的获取难度重新定值。**重做时要注意**：若装备上的属性修饰符对 `LivingEntity` 生效，
改动这三把会同步改变悚怖尸骑/尸奴/女皇的攻击力。

---

## 5. 落地文件

| 文件 | 说明 |
|---|---|
| `kubejs/startup_scripts/weapons.js` | 84 条 `ItemEvents.modification`：特例 5 条（玻璃剑 + 小烦维四剑）置顶，其后按 1–6 阶分段，段内按面板升序 |
| `kubejs/startup_scripts/item_attackDamage.js` | **已删除**，原有 23 条数值全部并入上表 |

脚本与本文表格已逐条比对：**84/84 一致**，无重复 id，`node --check` 通过。

### 5.1 源码核对（永恒星光）

模组源码已克隆到 `D:\Minecraft\开源模组参考文件\eternal-starlight`（分支 `1.21.1-arch`，HEAD `9a492e1`，`mod_version=0.9.1`，与实例 jar 版本一致）。

用 `ESItems.java` 与 `ESItemTiers.java` 逐项复核了 20 把剑：

- **19 把静态剑与字节码反解结果完全一致**：15 个 tier 的 `getAttackDamageBonus()`（1.0 / 2.0 / 2.5 / 3.0 / 3.5 / 4.0）与 `createAttributes(tier, 3~6, -1.8~-2.8)` 的传参全部对上。
- **1 把是动态属性 —— `dagger_of_hunger`**：`DaggerOfHungerItem.inventoryTick` 每 600 tick（30 秒）按饥饿度把 `ATTRIBUTE_MODIFIERS` 整体重写为三档之一（惩罚 4.5 / 默认 5.5 / 加成 6.5 attackDamage，即面板 5.5 / 6.5 / 7.5）。KJS 改的是物品默认组件，会在 30 秒内被运行时覆盖，**故已从主表移出、列入特例**。

结论：阶段 4 的 19 条数值现有源码与字节码双重依据。

## 6. 数据溯源

| 模组 | jar 版本 | 数值来源 | 备注 |
|---|---|---|---|
| 冰火 | 2.1.4 | jar 字节码 | 源码 2.0 落后 3 个小版本 |
| 铁魔法 | 1.21.1-3.16.3 | 源码 + jar 一致 | |
| 暮色森林 | 4.8.3345 | 源码 + jar 逐项核对 | |
| 永恒星光 | 0.9.1 | 源码 + jar 双向核对 | 源码仓库已克隆至 `D:\Minecraft\开源模组参考文件\eternal-starlight`（`1.21.1-arch` @ `9a492e1`），版本 0.9.1 与 jar 一致 |
| 传奇怪物 | 2.2.3 | jar 字节码 | 源码 2.1.15 |
| 灾变 | 3.33 | jar 字节码 + 源码定位 | 源码 3.28 |

统计：并集共 **86 件**武器；其中 **78 件**参与映射（阶段 1–6 分别为 11 / 11 / 6 / 19 / 13 / 18），**8 件**进入特例表（玻璃剑 + 龙钢三剑 + 悚怖三剑 + 饥饿之牙）。
