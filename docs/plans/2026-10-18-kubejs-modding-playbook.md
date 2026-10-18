# 『化龙』KubeJS 魔改手册（现状盘点 + 源码机制）

> 定位：本文件是 AI 智能体产出的工作手册，供后续接手 KubeJS 魔改时直接参照。
> 目标不是复述 KubeJS 文档，而是记录**本项目实际在用的手法**、**源码里核对过的真实签名**、以及**已知会静默失败的地方**。

- 实例：`D:\BeLoong\.minecraft\versions\BeLoong`（MC 1.21.1 / NeoForge 21.1.248）
- KubeJS：`2101.7.2-build.377`（jar 名带 build 号，源码 `gradle.properties` 为 2101.7.2 / Rhino 2101.2.7）
- 源码：`D:\Minecraft\开源模组参考文件\kubejs`，HEAD `60a6c8e`（2026-09-09）
- 类型真值：`.probe/packages/generated-package/dev.latvian.mods.kubejs.d.ts`（由**实机 jar** 生成，比源码更权威）
- 运行证据：`logs/latest.log`（startup 4/4、0 error 0 warning；client 0/0；`Validated 713 files in kubejs/assets/`、`1206 files in kubejs/data/`）

---

## 1. 目录与加载链路

| 路径 | 生成什么 | 何时生效 |
|---|---|---|
| `kubejs/startup_scripts/*.js` | 注册表条目、物品/方块 builder、`ItemEvents.modification` | **模组构造期**，早于 `RegisterEvent`；**必须重启** |
| `kubejs/server_scripts/*.js` | 配方/标签/事件/命令 | 进入世界、`/reload`、`/kjs reload server-scripts` |
| `kubejs/client_scripts/*.js` | tooltip、按键回调、F3、高亮、lang | 客户端启动、`/kjs reload client-scripts`、F3+T |
| `kubejs/data/**` | **数据包**（覆盖模组数据） | 作为 `SERVER_DATA` pack 插在 **mods 之后**（`server/ServerScriptManager.java:62-88`） |
| `kubejs/assets/**` | 资源包（汉化、贴图、模型） | 资源重载 |

要点：

- `kubejs/data` 不是"另一个数据包目录"，而是**一个优先级高于模组的数据包**——这就是本项目大量 `kubejs/data/dragonsurvival/...` 能覆盖 DS 原文件的原因。
- `KubeFileResourcePack.scanAndLoad` 还会把 `kubejs/data` 下**带 `pack.mcmeta` 的子目录**当成独立数据包加载，并排在同级之后。
- 脚本按 `priority` 降序、再按路径忽略大小写排序执行（`script/ScriptManager.java:178`），**共用同一顶层作用域**，后面的文件能读前面定义的全局变量。
- 文件头可写 `// priority: 10`、`// ignored: true`、`// requires: modid|client`、`// packmode: x`（`script/ScriptFile.java:51-71`）——本项目目前**一个都没用**。
- 单文件异常只记录不中断（`ScriptManager.java:184-191`），日志格式 `kubejs:server_scripts/xxx.js#12: ...`。startup 脚本报错会在 `FMLLoadComplete` 直接崩游戏（`KubeJSModEventHandler.java:63-79`），server/client 只记录。

---

## 2. 现有脚本地图（4 startup + 47 server + 0 client）

### 2.1 startup（4 个，全部在改物品）

| 文件 | 手法 |
|---|---|
| `items.js` | `StartupEvents.registry('item', ...)` 批量注册 `kubejs:*` 龙心/始祖道具，链式 `.rarity().maxStackSize().tooltip()` |
| `weapons.js` | `ItemEvents.modification` 一次写两件事：`item.attackDamage = N` + `applyWeaponBonus(...)`（主手 `dragon_ability_damage`、副手 `spell_power`）。83 条：特例 5 + 六阶 78，特例置顶、每把武器自带属性数值（两条属性共用） |
| `items_modification.js` | `ItemEvents.modification` + `item.maxStackSize = 1`（冰火龙铠 32 件） |
| `items_modification_attribute.js` | `item.addAttributeModifier(...)`，表驱动：龙甲魔力/回魔 8 条 + 弑龙者之刃 2 条（武器部分已并入 `weapons.js`，39 行） |

### 2.2 server（47 个，按层分）

| 层 | 文件数 | 手法 |
|---|---|---|
| `server_scripts` 根 | 4 | 3 个 `generate_*.js`（右键"一键生成建筑"：扣物品 + 提示 + 上移）+ `message_back.js`（`PlayerEvents.respawned`） |
| `item/*.js` | 4 | 始祖四件套：`ItemEvents.rightClicked` → `runCommandSilent('function beloong:...')` |
| `recipe/*.js` 顶层 | 17 | 跨模组联动配方；多数是"删原配方 + 重建"的三行式 |
| `recipe/<mod>/*.js` | 19 | 按模组分目录：`minecraft`(3)、`cataclysm`(2)、`eternal_starlight`(2)、`iceandfire`(2)，其余各 1：`dragonsurvival`、`biomeswevegone`、`bosses_of_mass_destruction`、`iss_magicfromtheeast`、`regions_unexplored`、`ultramarine`、`touhou_little_maid`、`wands`、`yuushya`、`zenith` |
| `tags/*.js` | 3 | `ServerEvents.tags('item'/'block')` 补标签（爪武器、curios charm、凋灵免疫） |

合计 4 + 4 + 17 + 19 + 3 = 47。其中 **5 个文件**是模组专属合成台透传：`iceandfire/dragonforge.js`、`eternal_starlight/alloy.js`、`cutting.js`、`touhou_little_maid/altar.js`、`ultramarine/recipe.js`。

### 2.3 五种主力范式

1. **注册自定义物品**（`startup_scripts/items.js`）：贴图放 `kubejs/assets/kubejs/textures/item`，文本放 `kubejs/assets/kubejs/lang/zh_cn.json`，脚本里一律 `Text.translatable(...)`，不硬编码中文。
2. **批量改数值**（`items_modification.js` / `weapons.js`）：一个 `ItemEvents.modification` 回调里重复 `event.modify(id, item => ...)`，**没有用循环/表驱动**（32 件龙铠 = 32 段样板；武器 83 段样板，每段 = 伤害 + 两条属性）。
3. **配方"删旧建新"**：`event.remove({ id: 'ns:path' })` 紧跟 `event.shaped/shapeless(...)`。
4. **模组合成台透传**：`event.custom({...})` 原样写该模组的 recipe JSON（`input` 用 `{item:...}`、`result` 用 `{id:...}` 这种 1.21 codec 风格，字段名取决于模组自己）。
5. **事件 → mcfunction 桥**：`ItemEvents.rightClicked` 判 `item.id` → `item.count--` → `server.runCommandSilent('execute as ... run function beloong:xxx')` → 函数里用 `dragon-ability add`、`curios set`、`item modify ... set_components`、宏函数 `$...$(growth)`。

---

## 3. 已核对的关键 API（可直接抄）

### 3.1 `ItemEvents.modification`（startup）

`modify(ItemPredicate, Consumer<ItemModifications>)`，回调对象实现 `ItemComponentFunctions` / `ItemBehaviorFunctions` / `AttributeModifierFunctions`，`@RemapPrefixForJS("kjs$")` → **JS 里写成属性赋值**（`setX` 映射为 `x`）。

可用（节选）：`maxStackSize`、`maxDamage`、`damage`、`unbreakable`、`unbreakableWithTooltip`、`repairCost`、`itemName`、`food`、`rarity`、`customName`、`lore`、`tooltipHidden`、`glintOverride`、`burnTime`、`tier`、`attackDamage`、`baseAttackDamage`、`attackSpeed`、`baseAttackSpeed`、`attributeModifiers`、`glow`、`tooltip`、`use`……

> 本版**没有**挖掘速度/附魔能力的直接字段，只能经 `setTier(...)` 间接改（`item/ItemModificationKubeEvent.java:95-97`）。
> `maxDamage > 0` 时 `maxStackSize` 会被忽略（`item/ItemBuilder.java:249-253`，注册期同理）。

### 3.2 属性修饰符（推荐写法，2026-10-18 已落地）

**首选 `item.addAttributeModifier(属性, { id, amount, operation }, 槽位)`**——它内部就把结果写回了（`component/AttributeModifierFunctions.java:50-52`）。
`items_modification_attribute.js` 已按此重写：532 行 → 74 行，再把武器段并入 `weapons.js` 后为 39 行。

```js
item.addAttributeModifier('dragonsurvival:mana',
  { id: 'kubejs:x_mana', amount: 1, operation: 'add_value' }, 'head')
```

参数取值（来自实机 `.probe` 的 typings）：

| 参数 | 可填 |
|---|---|
| `operation` | `'add_value'` / `'add_multiplied_base'` / `'add_multiplied_total'` |
| `槽位` | `'any'` / `'mainhand'` / `'offhand'` / `'hand'` / `'head'` / `'chest'` / `'legs'` / `'feet'` / `'armor'` / `'body'` |
| 属性 | 字符串 id，如 `'dragonsurvival:mana'`、`'attack_damage'`（自动补 `minecraft:`） |

**不要用旧写法**（`withModifierAdded` 不可变，必须手动 `.modifiers()` + `setAttributeModifiersWithTooltip()` 写回，8 行才能加一条）。

- 攻击力/攻速还有四个快捷方法：`setAttackDamage` / `setBaseAttackDamage` / `setAttackSpeed` / `setBaseAttackSpeed`（前者清空同类后重写，后者只替换 base 那条）。
- **`setAttributeModifiers(list)` 是整体替换**，会把武器的攻击力修饰符一起清掉，别用它加属性。
- `addAttributeModifier` 是**追加**：同一 id 重复添加会产生重复修饰符，id 需在物品内唯一。

### 3.3 `ServerEvents.recipes`

9 个预绑定入口，参数顺序 = schema 的 key 顺序（`recipe/RecipesKubeEvent.java:94-102`）：

| 方法 | 参数 |
|---|---|
| `shaped(result, pattern[], key{})` | `pattern` 是 1–3 行字符串数组，`key` 是 `{A: ingredient}` |
| `shapeless(result, ingredients[])` | 数组里可用 `'2x id'`（会展开成两份） |
| `smelting/blasting/smoking/campfireCooking(result, ingredient, xp?, time?)` | 本项目用法：`event.smelting('minecraft:iron_ingot', 'ns:raw', 0.7, 200)` |
| `stonecutting(result, ingredient)` | 支持 `'4x id'` |
| `smithing(...)` / `smithingTrim(...)` | 见 schema |
| `custom(json)` | 透传任意已注册 recipe type |

`event.remove(filter)` 真实语义（`recipe/filter/RecipeFilter.java:25-142`）：

- 支持键：`id`（可写 `/正则/`）、`type`、`mod`（**配方 id 的命名空间**，不是物品模组）、`group`、`input`、`output`、`or`、`not`；多个键是 **AND**。
- `event.remove('#c:ingots')` **什么都不删**（解析失败 → 只 warn）；标签过滤必须写 `{ input: '#c:ingots' }`。
- `event.remove({})` = 删全部（空 map 被当成 `ConstantFilter.TRUE`）。
- 删不到**不报错**，先用 `event.countRecipes({...})` / `event.findRecipeIds({...})` 量再删。
- `event.shaped` 新建的配方在内存里 type 是 `kubejs:shaped`，用 `{type:'minecraft:crafting_shaped'}` **删不掉它**。

---

## 4. 数据包侧（929 个 JSON / 1206 个文件）

| 命名空间 | 文件数 | 性质 |
|---|---|---|
| `dragonsurvival` | 477 | **覆盖 DS 本体**：16 龙种、87 技能、50 阶段、21 惩罚、101 结构 nbt、97 worldgen、32 标签 |
| `beloong` | 91 | 自建：进度、9 个 structure_set、`beloong:disaster/*` 主题群系标签、NPC 对话/路线、结构效果、mcfunction |
| `cataclysm` / `iceandfire` / `dungeons_arise` / `legendary_monsters` / `mss` / `mvs` | 45–68 | 结构迁移（清空原结构集 + 覆盖 `has_structure` 标签） |
| `minecraft` | 31 | 原版覆盖：生物群系、结构 nbt、伤害类型标签、战利品表 |
| `c` | 7 | NeoForge 约定标签扩展 |
| 其余 34 个 | 1–55 | 汉化/战利品/进度/结构兼容 |

- `replace: true` 共 **113** 个，全是"覆盖模组自建标签"；自制标签一律不加 `replace`（与既有约定一致）。
- 覆盖判定：`kubejs/data/<ns>/<path>` 存在 == 覆盖；不存在 == 未改。**不要**用"零引用"判断死文件（结构集/群系/标签都由注册表消费）。
- 自定义注册表条目（DS 的 `dragon_ability` / `dragon_species` / `dragon_stage` / `dragon_penalty` / `projectile_data` / `dragon_emote_set`、`beloong:npc_dialogue` / `structure_effects` / `treasure_growth`）走各自的 codec，字段以源码/现有文件为准；`spyglass.json` 已声明这些自定义资源类目，IDE 可补全。

---

## 5. 源码机制（写脚本前的硬事实）

1. **没有 `EventJS` 基类**。事件对象是 `KubeEvent` 接口，提供 `cancel/success/exit`。没有 `listen`/`post`。
2. **`ServerEvents.recipes('id', cb)` 不生效**：本版普通 `EventHandler` 传第二个参数会抛 "doesn't support extra id"（只 `console.error`）。带 target 的 `TargetedEventHandler`（`tags`、`registry`、`ItemEvents.rightClicked` 等）才支持。
3. **全局绑定**：`Platform`/`console`/`ID`/`Utils`/`Java`/`Text`/`Component`/`Item`/`Ingredient`/`Block`/`NBT`/`NBTIO`/`JsonIO`/`Color`/`Registry`/`Fluid`/`AABB`/`Direction`/`global`。**没有 `server`/`level` 全局绑定**——服务器对象只能从事件取。
4. **`event.server` 是可用的**：`KubeLevelEvent.getServer()` 提供，所有实体/方块/物品事件都继承它（本项目 4 个 `item/*.js` 的写法正确）。
5. **`ItemEvents.rightClicked` 没有 `event.block`**，只有 `item`/`player`/`hand`/`target`(射线结果)；要方块用 `BlockEvents.rightClicked`（有 `block`/`facing`/`hitResult`）。
6. **注册表：本版没有 `EntityTypeBuilder`**，`StartupEvents.registry('entity_type', ...)` 会报错。`registry('item')` 的专用 builder 有 sword/pickaxe/axe/shovel/hoe/shears/armor×4/animal_armor/smithing_template；`block` 有 slab/stairs/fence/wall/…/pillar/crop/cardinal。
7. **客户端**：按键(`KeyBindEvents.registry`)、渲染器、`ItemEvents.modelProperties` 都是 **startup** 事件，放 `client_scripts` 无效；`ClientEvents` 只有 13 个（`generateAssets`/`loggedIn`/`loggedOut`/`tick`/`leftDebugInfo`/`rightDebugInfo`/`lang`/`particleProviderRegistry`/`highlight`/`menuScreenRegistry`/`atlasSpriteRegistry`…），**没有 `init`/`paintScreen`/`tooltip`**，且 `atlasSpriteRegistry` 本版是死事件。
8. **内置网页服务**：`kubejs/config/web_server.json`，本项目已 `"enabled": false`（端口 61423，原为 kubejs.com 的 explorer/Kubedex 提供注册表与图标）。无 JVM 开关，改配置必须重启进程；`/kjs reload config` 不会停服务。
9. **配方 schema**：KubeJS 为**每个已注册的 `RecipeSerializer`** 自动建一条 `UnknownRecipeSchemaType` 兜底（`recipe/schema/RecipeSchemaStorage.java:186-189`），所以任何模组 type 都能 `event.custom`。未知 schema 时 JSON **逐字保留、不校验**（`UnknownKubeRecipe.serialize/deserialize` 为空实现）→ 字段写错既不报错也不生效，是本项目最容易踩的静默失败。想获得方法式调用（`event.recipes.ns.path(...)`），在 `data/<ns>/kubejs/recipe_schema/*.json` 补 schema 即可，不必写 Java。
10. **`/kjs` 常用子命令**：`errors server|startup|client`、`reload server-scripts`、`export debug`、`export recipe-schema-json`、`dump registry|events`、`hand`、`list-tag`、`stages`。

---

## 6. 本项目现状里的"可疑点"（待确认，不要直接当 bug 改）

| 位置 | 现象 | 判断 |
|---|---|---|
| `server_scripts/recipe/explorerscompass.js` | 整个文件被 `/* */` 注释（`ExplorersCompass` 已于 1.4 移除） | 死文件，可删 |
| `kubejs/assets/kubejs/lang/zh_cn.json` | `message.kubejs.banned_item` 无任何脚本引用 | 死键 |
| `generate_starter_hut.js` / `generate_longyin_pavilion.js` / `generate_chinese_courtyard.js` | 三份几乎相同，只差物品 id 与传送高度 | 可合并为一个表驱动脚本 |
| 同上三份 | 脚本只"扣物品 + 提示 + 上移"，**不真正放置建筑**（推测由 yuushya 物品自身在 `use` 时放置） | 待实机确认是否双重消耗 |
| 同上三份 | 用 `item.id.equals('...')`；`item/*.js` 用 `item.id !== '...'` | `item.id` 是字符串，`!==`/`===` 稳妥；JS 字符串上 `.equals()` 是否可用**未实机验证**（日志无相关报错，但三个脚本未必被触发过），建议统一 `===` |
| ~~`items_modification_attribute.js:6-31`~~ | 原注释写"示例"但代码生效 | **已修复**：2026-10-18 重写时改为正式段「弑龙者之刃」 |
| `recipe/eternal_starlight/alloy.js` | "所有专属龙心"实际列 8 个，缺 `wing_kirin`（麒麟之心）；切石机同样是 8 个 | 两处一致 → 可能有意（麒麟非龙）；但道具 tooltip 写"龙生九子"，建议向作者确认 |
| `recipe/dragonsurvival/recipe.js` | 删了 `elder_dragon_heart` 却没重建 | 应为有意（改由龙锻炉产出） |

---

## 7. 修改后的验证流程（本项目约定）

1. **改脚本** → 游戏内 `/kjs reload server-scripts`（startup 改动只能重启）。
2. `/kjs errors server` 看错误；同时看 `logs/latest.log` 的 `KubeJS Server/` 行。
3. **配方增删**：先 `event.countRecipes({...})` / `findRecipeIds` 量，再删；改完用 JEI/EMI 实机看。
4. **数据包/结构改动**：必须**新存档**（旧存档有区块缓存会假通过）；结构改动用 `/locate structure <id>` 实测。
5. **跨源交叉**：`.probe` 的 `.d.ts`（实机 jar 生成）> 源码目录；两者冲突以 `.d.ts` 为准，并以 `logs/` 的实跑结果定案。
6. 清单类事实（结构成员、标签内容）**一律用脚本从数据源枚举生成**，不在对话里手抄。

---

## 8. 关联文档

- `docs/plans/2026-09-13-dragonsurvival-kubejs-modding-guide.md`（DS 数据包覆盖 + BeLoong-Core mixin 层）
- `.claude/memory/learned-patterns.md`（结构迁移、PowerShell 脚本、exclusion_zone 等教训）
- `docs/tools/`（生成器/校验器脚本）
