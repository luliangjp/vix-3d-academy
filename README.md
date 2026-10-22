# VIX 波动率体系、Greeks 与高阶期权策略 3D 交互学院 (vix_3d_academy)

这是一个纯原生 HTML/CSS/JavaScript 构建的离线 3D 期权与波动率交互式教学系统，专为 `SPX`、`SPY`、`QQQ` 及美股个股期权交易打造。

---

## 📁 项目目录结构

```text
vix_3d_academy/
├── index.html                            # 主交互网页入口（与 vix_3d_options_academy.html 同步）
├── vix_3d_options_academy.html           # 3D 交互学院核心单文件（当前版本：v6.0 六阶 20 课终章完结版）
├── vix_options_3d_audit_spec.md          # 完整数学推导、金融工程边界与 3D 建模规范文档（v6.0）
├── docs/
│   └── vix_options_3d_audit_spec.md      # 规范文档镜像备份
├── plans/
│   ├── tier4_vrp_vol_cone_plan.md        # 【已完成】第四阶（第 12–14 课：VRP、RV估计器、波动率锥、RR25/BF25）详细计划
│   ├── tier5_0dte_gex_microstructure_plan.md # 【已完成】第五阶（第 15–17 课：0DTE 方差时钟、3D GEX 地形图、尾盘 Pin Risk）详细计划
│   ├── tier6_portfolio_risk_collar_tax_plan.md # 【已完成】第六阶（第 18–20 课：正股增强三剑客、SPY Beta 压力测试曲面、Section 1256 税制与全栈总纲）详细计划
│   └── roadmap_tiers_4_5_6.md            # 第四阶至第六阶（第 12–20 课）全栈演进总路线图
├── data/
│   └── audit_signal_ledger_2011_2026.csv # 2011–2026 年（3,970 交易日）VIX 期限结构与 SPX 回测逐日信号账本
├── scripts/
│   ├── verify_academy.js                 # Node.js 自动化无头 DOM/3D 核验脚本（检查所有课程、步骤、拆腿与公式排版）
│   └── run_audit_verification.py         # Python 金融工程反例复算与回测统计验证脚本
└── backups/                              # 历史版本备份目录（含 .bak_v3, .bak_v4, .bak_v5 等）
```

---

## 🛠️ 开发与验证规范（供新对话 AI 助手遵循）

1. **纯离线原生运行**：
   - 保持单文件 HTML + Tailwind CSS + 原生 HTML5 Canvas 3D 引擎，不依赖外部构建工具或 WebGL 外部库，双击即可在浏览器离线打开。
2. **原生 HTML/CSS 数学公式排版**：
   - 严禁在网页文本中使用未渲染的原始 LaTeX 字符串（如 `\frac`、`\partial`、`\sqrt`、`\sum`、`$...$`）。
   - 所有公式必须使用内置的 `fHtml(num, den)`、`<div class="math-block">`、`<span class="m">`、`<sup>`、`<sub>` 排版组件。
3. **自动化核验命令**：
   每次修改完 HTML 后，必须在项目根目录运行以下命令验证所有课程与分步推演零报错：
   ```bash
   node scripts/verify_academy.js
   ```
4. **多位置同步**：
   更新完成后，保持以下文件同步：
   - `./vix_3d_options_academy.html` 与 `./index.html`
   - `./vix_options_3d_audit_spec.md` 与 `./docs/vix_options_3d_audit_spec.md`
   - 同步一份最新构建产物到桌面 `/Users/lux/Desktop/vix_3d_options_academy.html` 方便直接双击查看。

---

## 🏆 全栈六阶 20 课（80 个交互推演步）100% 完结状态

- [x] **第一阶 · Greeks 3D 拆解篇（第 1–3 课）**：已完成并核验通过
- [x] **第二阶 · VIX 与市场微观结构篇（第 4–7 课）**：已完成交叉审计修订并核验通过
- [x] **第三阶 · 高阶期权策略 3D 实战篇（第 8–11 课）**：已完成三合一拆腿与净 Greeks 仪表盘并核验通过
- [x] **第四阶 · 期权定价猎手与波动率相对价值篇（第 12–14 课）**：已完成 VRP、四大 RV 估计器、3D 波动率锥与 RR25/BF25 策略映射并核验通过
- [x] **第五阶 · 0DTE 末日期权与盘中 GEX 微观结构篇（第 15–17 课）**：已完成盘中非均匀方差时钟、`VIX1D` 尾盘滚仓、做市商 3D GEX 地形图与 `15:50 ET` MOC / `17:30 ET` 美式盘后 Pin Risk 防爆沙盘并核验通过
- [x] **第六阶 · 正股增强、组合级风控与制度红利篇（第 18–20 课）**：已完成 Covered Call / Collar / 海鸥领口三合一拆解沙盘、跨品种 `SPY` Beta 加权 Greeks 与二维黑天鹅压力测试曲面、`SPX/XSP/SPY/QQQ/个股` 制度全景矩阵、除息日提前指派判据曲面、`Section 1256` 税后复利曲面与全栈 20 课终极核查清单，**全系 100% 完结并核验通过**！
