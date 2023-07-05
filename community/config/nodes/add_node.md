# 建立新的節點

[[toc]]
 
## 位置
前往管理面板並單擊左側邊欄上的節點選項卡。然後點選右上角的“新建”，開啟新增節點的頁面。

![](../../../.vuepress/public/community/config/nodes/pterodactyl_add_node_create_button.png)

## 需要的資訊

![](../../../.vuepress/public/community/config/nodes/pterodactyl_add_node_new_page.png)

* **節點名稱**: 該識別節點身份的名稱
* **描述**: 幫助你快速定位節點內容和位置的資訊
* **區域**: 節點所在區域,這些在'地域'可以新增和修改,它必須先建立才能新增伺服器節點
* **FQDN**: 後端伺服器的主機名,可以是域名也可以是IP(啟用SSL推薦使用域名)例如: `node.pterodactyl.io`
* **透過SSL連線**: 如果面板使用HTTPS建立連線,那麼後端WINGS也應該使用SSL
* **代理**: 如果後端程式套有代理,如CF等就需要開啟它,沒有則不需要管
* **守護程式伺服器檔案目錄**: 伺服器後端用來儲存服務端資料的資料夾,一般是 `/var/lib/pterodactyl/volumes`.

::: tip OVH 使用者
一些OVH虛擬化型別的伺服器的 `/home` 資料夾是儲存空間最大的,你也許可以用 `/home/pterodactyl/volumes` 來儲存資料
:::

* **總執行記憶體容量**: 允許伺服器自動建立的最大執行記憶體容量
* **記憶體過額分配**: 允許超開記憶體的百分比,比如你設定節點可以開10GB的記憶體,如果填寫20那麼將可以開12GB記憶體
* **總儲存容量**: 允許伺服器自動建立的最大儲存容量
* **儲存過額分配**: 同記憶體過額分配

::: danger
不要忘記考慮作業系統開銷和機器上的其他軟體要求。
::: 

* **守護程序埠**: 守護程序監聽埠
* **守護程序SFTP埠**: 守護程序的SFTP監聽埠

## 安裝後端
您需要把 Wings,即守護程序程式安裝到伺服器節點,[文件](/wings/installing.html)
獲得更多資訊,你可以去社群檢視不同Linux發行版的安裝教程[CentOS](/community/installation-guides/wings/centos7.html),
[Ubuntu](/community/installation-guides/wings/ubuntu1804.html), 或 [Debian](/community/installation-guides/wings/debian9.html).

## 配置節點
進入節點配置頁面

![](../../../.vuepress/public/community/config/nodes/pterodactyl_add_node_config.png)

複製這些配置到 `config.yml` 檔案 (一般是在 `/etc/pterodactyl/config.yml` 中放置,沒有相應的資料夾和檔案記得建立!)

### 自動部署
這將會自動生成一個在後端伺服器執行的命令
