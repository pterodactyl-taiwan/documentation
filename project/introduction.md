# 介紹
Pterodactyl 是使用 PHP、React 和 Go 構建的開源遊戲伺服器管理面板。
同時不忘進行安全性設計，Pterodactyl 在相互隔離的 Docker 容器中執行所有遊戲伺服器，
同時為管理員和使用者提供直觀的使用者介面。你還在等什麼？ 讓您在您的遊戲平臺使用遊戲伺服器上有一等體驗吧！

## 翼龍臺灣與翼龍官方的區別

|  **翼龍官方版**  |  **翼龍臺灣版**  |
|:--------------:|:--------------:|
|  ![GitHub Releases](https://img.shields.io/github/v/release/pterodactyl/panel?style=for-the-badge&logo=appveyor&label=最新發布版本)  | ![GitHub Releases](https://img.shields.io/github/v/release/pterodactyl-taiwan/panel?style=for-the-badge&logo=appveyor&label=最新發布版本)  |
| [![GitHub Releases pre-releases](https://img.shields.io/github/v/tag/pterodactyl/panel?display_name=tag&include_prereleases&style=for-the-badge&logo=appveyor&label=最新預釋出版本)](https://github.com/pterodactyl/panel/releases) | [![GitHub Releases pre-releases](https://img.shields.io/github/v/tag/pterodactyl-taiwan/panel?display_name=tag&include_prereleases&style=for-the-badge&logo=appveyor&label=最新預釋出版本)](https://github.com/pterodactyl-taiwan/panel/releases) |
| [GitHub](https://github.com/pterodactyl/panel) | [GitHub](https://github.com/pterodactyl-taiwan/panel) |
| 翼龍官方倉庫 | 翼龍官方 `develop` 分支臺灣化 |

* 大量臺灣化（使用者前端、管理後臺、提示、報錯、部署、預設、CLI-UI）
* Docker 映象國內化 （預設臺灣化並使用我構建至國內的 Docker 映象）
* Gravatar 切換至 Cravatar (國內進入後臺時終於可以正常使用了！不用再卡住了)
* 增加備案號的填寫入口和顯示
* 最佳化登入頁的顯示效果
* 讓臺灣使用者可以正常訪問使用 reCAPTCHA 驗證服務。
* 文件中文化，部署、更新、自定義都能簡而易懂！
* 面板 Docker 中文臺灣化，不需要太多額外設定即可部署面板 (見[Packages](https://github.com/pterodactyl-taiwan/panel/pkgs/container/panel)，[如何使用的說明點我](https://github.com/pterodactyl-taiwan/panel/blob/develop/.github/docker/README.md))
* wings(後端)國內化，DNS、文字、編碼(在解壓中文壓縮包時，不會再出現亂碼的現象了！！！)
* 更多...

## 支援的遊戲
我們透過使用 Docker 容器隔離每個例項來支援各種遊戲，為您提供強大的功能
在全球範圍內託管您的遊戲，而不必讓每臺物理機器都因安裝額外的依賴而變得臃腫。

我們支援的一些核心遊戲包括:

* Minecraft（我的世界） — 包括 Spigot, Sponge, Bungeecord, Waterfall, 等....
* Rust （腐蝕）
* Terraria （泰拉瑞亞）
* Teamspeak
* Mumble
* Team Fortress 2 （軍團要塞2）
* Counter Strike: Global Offensive （反恐精英：全球攻勢）
* Garry's Mod （蓋瑞的模組）
* ARK: Survival Evolved （方舟：生存進化）

除了我們支援的標準遊戲預設外，我們的社群還在不斷突破這個軟體的極限
社群提供的遊戲還有很多。其中一些遊戲包括：

* Factorio （異星工廠）
* San Andreas: MP
* Pocketmine MP
* Squad （戰術小隊）
* FiveM
* Xonotic
* Discord ATLBot
* [更多...](https://github.com/parkervcp/eggs)

## 我們的安全職責
Pterodactyl 是完全開源的，因此給獨立使用者和伺服器管理員完全開放我們的
程式碼庫來尋找安全漏洞。如果您發現任何可能導致安全漏洞的問題，請不要
猶豫直接聯絡`support@pterodactyl.io`。我們要求您在反饋安全問題時，詳細且負責
並且_不要_在我們面向公眾的錯誤跟蹤器上報告它們，以防止漏洞濫用！
