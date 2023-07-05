# 術語
**面板(Panel)** — 這指的是翼龍面板本身，它允許您向系統新增額外的節點和伺服器。

**節點(Node)** — 節點是執行 Wings 例項的物理主機。

**Wings** — 用 Go 編寫的新服務軟體，它與 Docker 和麵板互動，讓面板控制伺服器時提供安全訪問。

**伺服器(Server)** — 在這種情況下，伺服器是指由面板建立的正在執行的例項。這些伺服器是在節點上建立的，您可以在每個節點上擁有多個伺服器。

**Docker** — Docker 是一個平臺，可讓您將應用程式與基礎設施分離到隔離的安全容器中。

**Docker映象(Docker Image)**  — 一個 Docker 映象包含執行容器化應用程式所需的一切。 （例如用於 Minecraft 伺服器的 Java）。

**容器(Container)** — 每臺伺服器都將在一個隔離的容器內執行，以強制執行硬體限制（例如 CPU 和 RAM）並避免一個節點上的伺服器之間產生任何干擾。這些都將由 Docker 建立。

**預設組(Nest)** — 每個預設組通常用作特定的遊戲或服務，例如：Minecraft、Teamspeak 或 Terraria，並且可以包含許多預設。

**預設(Egg)**  — 每個預設通常用於儲存特定型別的遊戲配置，例如：Minecraft 的 Vanilla、Spigot 或 Bungeecord。

**Yolks**  — 可與翼龍的預設一起使用的 Docker 映象，部分內容可能高度定製。


## 簡單設定示意圖
![](./../.vuepress/public/simple_setup_diagram.png)


## 高階設定示意圖
::: tip 面板和 Wings 在同一臺主機上
也可以在面板主機上安裝 Wings，使其同時充當面板和節點的主機。
:::
![](./../.vuepress/public/example_setup.png)
