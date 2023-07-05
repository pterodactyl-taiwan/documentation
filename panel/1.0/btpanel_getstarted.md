# 使用寶塔（BT-Panel）面板搭建

[[toc]]

翼龍面板執行在您自己的 Web 伺服器上。為了執行和使用這個面板，您需要對您的伺服器具有 root 訪問許可權。

您需要了解如何閱讀文件以使用此面板。我們花了很多時間詳細介紹如何安裝或升級我們的軟體；
所以你也要花點時間去閱讀而不是複製貼上，然後在事情不起作用時候而抱怨。
此面板不作為執行伺服器的拖放服務存在。
這是一個高度複雜的系統，需要多個依賴項，並且使用搭建他的網站管理人員需要付出一些時間學習如何使用它。  
**如果您希望能夠在一點一點一點都不瞭解基本 linux 系統管理的情況下來搭建翼龍面板，您現在應該停下來然後出門左拐。**  



## 選擇伺服器作業系統

翼龍可在多種作業系統上執行，因此請選擇最適合您使用的作業系統。

::: warning
由於與 Docker 不相容，翼龍不支援大多數 OpenVZ 系統。如果您計劃在基於 OpenVZ 的系統上執行此軟體，您將很大機率不會成功。  
不過翼龍面板前端就沒那麼需求了，只要閣下前端伺服器能裝 `BT-Panel`，和 `LNMP` 或者 `LAMP`，就可以用來搭建翼龍面板前端了。一般伺服器均能滿足前端的搭建要求。
:::

| 作業系統   | 版本  |      支援狀況      | 注意事項                           |
|:-----------|:------|:------------------:|:-----------------------------------|
| **Ubuntu** | 18.04 | :white_check_mark: | 文件基於 Ubuntu 18.04 作為作業系統所編寫的。 |
|            | 20.04 | :white_check_mark: |                                    |
|            | 22.04 | :white_check_mark: | MariaDB 無需 repo 安裝指令碼即可安裝。 |
| **CentOS** | 7     | :white_check_mark: | 需要額外的 repos。                 |
|            | 8     | :white_check_mark: | 請注意，CentOS 8 已停運。使用 Rocky 或 Alma Linux。 |
| **Debian** | 10    | :white_check_mark: |                                    |
|            | 11    | :white_check_mark: |                                    |

## 安裝寶塔面板
此介面提供的安裝指令碼具有時間侷限性，可能落後於官方最新版本，有條件的話請去寶塔官網檢視


``` bash
# Centos安裝指令碼
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec

# Ubuntu/Deepin安裝指令碼
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec

# Debian安裝指令碼
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh ed8484bec

# 萬能安裝指令碼
if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec
```

## 安裝LNMP或LAMP基礎環境

`LNMP` 和 `LAMP` 分別代表著 `Linux` `Nginx\Apache` `Mysql` `PHP`   
閣下選擇版本請務必保證 `PHP`版本 >=  `8.1`、 `MySQL`版本 >=  `5.7`    
這一般會在閣下第一次登入寶塔面板時提示安裝，我不在此贅述，若閣下錯過提示，可點選 `軟體商店` 自行安裝    
在安裝完畢後，在 `PHP` 的**禁用函式**裡刪除 `putenv`、 `exec`、 `proc_open`、 `shell_exec`，並且在擴充套件裡安裝 `fileinfo` `redis`

## 新建站點並開始構建

### 新建站點
我覺得你應該會使用寶塔面板來新建一個網站

![如果你看到我說明圖掛了](./images/bt_1.png)

### 下載並上傳程式檔案至網站目錄

``` bash
https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz
# 如果閣下下不動這個檔案，可以使用 gh-proxy 提供的CF反向代理來下載 連結如下
https://ghproxy.com/https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz
```

### 進入網站目錄解壓程式檔案並設定環境檔案

現在所有檔案都已下載，我們需要進入網站目錄解壓剛剛上傳的 `panel.tar.gz` 壓縮包

然後將 `.env.example`  檔案重新命名為 `.env`

### 使用 Composer 安裝相關依賴

點選 網站的 `設定` ，再點選 `設定` 裡的 `Composer`  
![如果你看到我說明圖掛了](./images/bt_3.jpg)
![如果你看到我說明圖掛了](./images/bt_4.png)


先點選 `升級Composer` 確保其為最新版本，並按紅圈所示選擇  
在 `補充命令` 中輸入以下命令後點選 `執行` ，等待命令執行完成後關閉視窗即可。
```
composer install --no-dev --optimize-autoloader
```


::: warning
在進行以下步驟之前，請閣下為面板前端新建一個資料庫，我相信閣下的聰明腦袋一定會用寶塔面板新建一個資料庫吧。
:::

### 偽靜態及二級目錄設定
點選 網站的 `設定` ，進入設定介面
![如果你看到我說明圖掛了](./images/bt_3.jpg)

#### 偽靜態設定
點選 `設定` 裡的 `偽靜態`  
![如果你看到我說明圖掛了](./images/bt_5.png)

先點選左上角的偽靜態模板，並使用 `laravel5` 偽靜態模板
點選 `儲存` 即可設定成功。

#### 二級目錄設定
點選 `設定` 裡的 `網站目錄` 
![如果你看到我說明圖掛了](./images/bt_6.png)

點選 `執行目錄` 一欄，並選擇 `/public`
點選 `儲存` 即可設定成功。

### 生成APP_KEY並進行環境配置

現在我們要開始輸入一些指令了，請閣下先記住在寶塔新建站點時設定的站點目錄

``` bash
#進入站點目錄
cd {閣下在寶塔新建站點時設定的站點目錄}
# 例如 cd /www/wwwroot/pterodactyl

# 注意，以下指令僅針對於第一次安裝部署翼龍面板前端
# 且對應資料庫內無資料時執行，若閣下並非第一次安裝且資料庫內有資料，請忽略此指令
php artisan key:generate --force
```

``` bash
#下面兩個指令是設定一些基礎資訊和資料庫配置，閣下應該在此步驟之前為面板前端新建一個資料庫
php artisan p:environment:setup
php artisan p:environment:database

# 下面這個指令是配置面板的發件系統，如果閣下不需要可忽略
# 若使用 PHP 自帶的 mail 拓展 (不推薦使用), 請在執行以下指令後選擇 "mail"。
# 若使用自定義 SMTP 伺服器，請在執行以下指令後選擇 "smtp"。
php artisan p:environment:mail
```

現在我們要將面板所有的核心資料寫入我們之前為面板準備的資料庫內。

**此步驟可能花費較長時間來進行執行，花費的時間取決於您的主機效能，主機與資料庫主機的網路連線狀態等因素。請耐心等待資料匯入完成，切勿中途使用 CTRL+C 強制中斷執行！**

``` bash
php artisan migrate --seed --force
```

### 新增首位使用者

資料庫配置完成後，您需要為面板建立一個管理使用者，以便您可以登入面板。 為此，請執行以下命令。 並保證賬戶密碼滿足以下要求：8 個字元，大小寫混合，至少一個數字。

``` bash
php artisan p:user:make
```

### 設定程式檔案許可權

我們需要進入網站目錄並全選設定檔案許可權為 `755` 所有者為 `www`

![如果你看到我說明圖掛了](./images/bt_2.png)

## 註冊佇列監聽服務

我們使用佇列來使應用程式更快，並在後臺處理傳送電子郵件和其他操作。您需要設定工作佇列以處理這些操作。

### Crontab 定時任務設定

我們需要做的第一件事是建立一個新的 Cronjob，它每分鐘執行一次以處理特定的任務，例如會話清理並將計劃任務傳送到守護程序。 您需要使用 `sudo crontab -e` 開啟您的 `crontab`，然後將以下字串以新一行貼上進去，並儲存更改。

```bash
* * * * * php /www/wwwroot/pterodactyl/artisan schedule:run >> /dev/null 2>&1
```

### 建立佇列監聽服務

接下來，您需要建立一個新的 systemd 來保持我們的佇列程序在後臺執行。 該佇列負責傳送電子郵件併為翼龍面板處理許多其他後臺任務。

在 `/etc/systemd/system` 資料夾中建立一個名為 `pteroq.service` 的檔案，其內容如下。

``` text {6,14}
# 翼龍工作佇列檔案
# ----------------------------------

[Unit]
Description=Pterodactyl Queue Worker
# After=redis-server.service

[Service]
# 在某些系統上使用者和組可能不同。
# 有些系統使用 `apache` 或 `nginx` 作為使用者和組。
User=www
Group=www
Restart=always
ExecStart=/usr/bin/php /www/wwwroot/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

::: tip CentOS 上的 Redis
如果您使用的是 CentOS，則需要在 `After=` 一行將 `redis-server.service` 替換為 `redis.service`，以確保 `redis` 在工作佇列之前啟動。
:::

::: tip
如果你沒有使用 `redis` 做任何事情，你應該刪除 `After=` 一行，否則服務啟動時會遇到錯誤。      
如果你的面板路徑並不是 `/www/wwwroot/pterodactyl/`，請替換為你面板的絕對路徑，否則郵件服務將無法使用。      
如果你寶塔預設命令列使用的並不是 `8.1`PHP 可以嘗試使用絕對路徑，將 `/usr/bin/php` 改為 `/www/server/php/81/bin/php`
:::

如果您在系統中使用 redis，則需要確保啟用它會在引導時啟動。您可以透過執行以下命令來執行此操作：

```bash
sudo systemctl enable --now redis-server
```

最後，啟動佇列監聽服務並設定開啟自動啟動

``` bash
sudo systemctl enable --now pteroq.service
```

#### 下一步：[網路伺服器配置](./webserver_configuration)
