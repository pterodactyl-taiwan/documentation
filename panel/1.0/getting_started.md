# 開始入門

[[toc]]

翼龍面板執行在您自己的 Web 伺服器上。為了執行和使用這個面板，您需要對您的伺服器具有 root 訪問許可權。

您需要了解如何閱讀文件以使用此面板。我們花了很多時間詳細介紹如何安裝或升級我們的軟體；
所以你也要花點時間去閱讀而不是複製貼上，然後在事情不起作用時候而抱怨。
此面板不作為執行伺服器的拖放服務存在。
這是一個高度複雜的系統，需要多個依賴項，並且使用搭建他的網站管理人員需要付出一些時間學習如何使用它。**如果您希望能夠在不瞭解基本 linux 系統管理的情況下安裝它，您現在應該停下來然後出門左拐。**

::: tip 想要更簡單的設定？
[WISP](https://wisp.gg) 是一款由翼龍驅動的 SaaS，適合企業和個人使用。提供所有功能，無需設定麻煩，並與翼龍預設完全相容。與 MultiCraft 或 TCAdmin 相媲美，同時提供新的和獨特的功能。單擊此處 [瞭解更多](https://wisp.gg/features)。
:::

## 選擇伺服器作業系統

翼龍可在多種作業系統上執行，因此請選擇最適合您使用的作業系統。

::: warning
由於與 Docker 不相容，翼龍不支援大多數 OpenVZ 系統。如果您計劃在基於 OpenVZ 的系統上執行此軟體，您將很大機率不會成功。
:::

| 作業系統 | 版本 |     支援狀況      | 注意事項                                                       |
|------------------|---------|:------------------:|-------------------------------------------------------------|
| **Ubuntu**       | 18.04   | :white_check_mark: | 文件基於 Ubuntu 18.04 作為作業系統所編寫的。 |
|                  | 20.04   | :white_check_mark: |                                                             |
|                  | 22.04   | :white_check_mark: | MariaDB 無需 repo 安裝指令碼即可安裝。     |
| **CentOS**       | 7       | :white_check_mark: | 需要額外的 repos。                                   |
|                  | 8       | :white_check_mark: | 注意，CentOS 8 已停運。使用 Rocky 或 Alma Linux。         |
| **Debian**       | 10      | :white_check_mark: |                                                             |
|                  | 11      | :white_check_mark: |                                                             |

## 依賴項

* PHP `8.0` 或 `8.1`（推薦），帶有以下副檔名：`cli`、`openssl`、`gd`、`mysql`、`PDO`、`mbstring` `tokenizer`、`bcmath `、`xml` 或 `dom`、`curl`、`zip` 和 `fpm` 如果你打算使用 NGINX。
* MySQL `5.7.22` 及更高版本（推薦 MySQL `8`）**或** MariaDB `10.2` 及更高版本。
* Redis (`redis-server`)
* 一個 Web 伺服器（Apache、NGINX、Caddy 等）
* `curl`
* `tar`
* `unzip`
* `git`
* `composer` v2

### 依賴項安裝示例

下面的命令只是一個示例，說明如何安裝這些依賴項。每個系統安裝方式都不一樣，請確定自己的作業系統來確定要安裝的軟體包是否正確。

``` bash
# 新增 "add-apt-repository" 命令
apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg

# 為 PHP、Redis 和 MariaDB 新增額外的儲存庫
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php

# 新增 Redis 官方 APT 倉庫
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

# 在 Ubuntu 22.04 上可以跳過 MariaDB 儲存庫設定指令碼
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash

# 更新儲存庫列表
apt update

# 如果您使用的是 Ubuntu 18.04，請新增 Universe 儲存庫
apt-add-repository universe

# 安裝依賴項
apt -y install php8.1 php8.1-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip git redis-server
```

### 安裝 Composer

Composer 是一個 PHP 依賴管理器（類似於 Node.js 的 npm，或者 Python 的 pip）。  
Composer 將會拉取你的專案所依賴的所有 PHP 軟體包，並且為你管理它們。它被所有現代化的 PHP 框架和平臺所使用，例如： Laravel, Symfony, Drupal, 和 Magento 2。 而翼龍面板前端正是使用的 Laravel ！

``` bash
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

## 下載檔案
在進行此步驟之前，我們要為面板前端建立它的工作目錄。  
此過程的第一步是建立面板所在的資料夾，然後進入新建立的資料夾中。以下是如何執行此操作的示例。  
::: warning
以下命令使用的路徑僅為示例，閣下大可自己自定義路徑，但是我在此提醒您，若您不用我示例使用的路徑，請務必記住自己設定的程式所在的目錄，並在後續各種涉及到程式執行目錄的地方靈活操作！
:::

``` bash
mkdir -p /var/www/pterodactyl
cd /var/www/pterodactyl
```

在為面板建立好它的工作目錄後，我們將使用 `curl` 命令，從 Github 拉取翼龍臺灣臺灣化完成的程式檔案壓縮包，拉取完成後，我們需要對壓縮包進行解壓操作，並賦予 `storage/` 與 `bootstrap/cache/` 目錄 755 許可權。這兩個目錄作用是快取動態資源以加速訪問。

``` bash
curl -Lo panel.tar.gz https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz
# 若閣下在上條指令上無法正常拉取壓縮包或者拉取緩慢 可使用 gh-proxy 提供的CF反向代理來拉取
curl -Lo panel.tar.gz https://ghproxy.com/https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz
# 解壓並設定目錄許可權
tar -xzvf panel.tar.gz
chmod -R 755 storage/* bootstrap/cache/
```

## 安裝

假設閣下已經完成之前的步驟且現在所有檔案都已下載，接下來我們需進行配置面板的一些核心部分。

::: tip 資料庫配置  
翼龍面板前端內的資料，例如：使用者/使用者賬戶下的伺服器等。均需要 MYSQL 資料庫進行儲存。您將需要一個資料庫設定和一個具有為該資料庫建立正確許可權的使用者，然後才能繼續進行。請參閱下文以快速為您的翼龍面板建立使用者和資料庫。要查詢更多詳細資訊，請檢視 [設定 MySQL](/tutorials/mysql_setup.html)。

```sql
mysql -u root -p

# 記得把下面的 'yourPassword' 改成閣下自己想設定的密碼
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY 'yourPassword';
CREATE DATABASE panel;
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;
exit
```

:::

首先，我們將複製我們的預設環境設定檔案 `.env` ，並使用  `Composer` 安裝核心依賴項，然後生成新的應用程式加密金鑰。

``` bash
cp .env.example .env
composer install --no-dev --optimize-autoloader

# 注意，以下指令僅針對於第一次安裝部署翼龍面板前端
# 且對應資料庫內無資料時執行，若閣下並非第一次安裝且資料庫內有資料，請忽略以下指令
php artisan key:generate --force
```

::: danger
請備份您的加密金鑰（`.env` 檔案中的 `APP_KEY`）！ 它用作所有需要安全儲存的資料的加密金鑰（例如 api 金鑰）。 請將其儲存在安全的地方！ 如果您丟失它，所有加密資料都將無法恢復！即使您有資料庫備份也無濟於事！！！
:::

### 環境配置

翼龍的核心環境可以使用應用程式中內建的幾個不同的 CLI 命令進行更輕鬆的配置。此步驟將涵蓋設定諸如會話、快取、資料庫憑證和電子郵件傳送之類的內容。

``` bash
php artisan p:environment:setup
php artisan p:environment:database

# 若使用 PHP 自帶的 mail 拓展 (不推薦使用), 請在執行以下指令後選擇 "mail"。
# 若使用自定義 SMTP 伺服器，請在執行以下指令後選擇 "smtp"。
php artisan p:environment:mail
```

### 資料庫設定

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

### 為 WEB 程式使用者設定許可權

安裝過程的最後一步是對 面板程式檔案設定正確的許可權，以便 WEB 伺服器程式（例如Nginx 或者 Apache）可以正確執行檔案。

``` bash
# 如果使用 NGINX 或 Apache (不在 CentOS 上):
chown -R www-data:www-data /var/www/pterodactyl/*

# 如果在 CentOS 上使用 NGINX：
chown -R nginx:nginx /var/www/pterodactyl/*

# 如果在 CentOS 上使用 Apache
chown -R apache:apache /var/www/pterodactyl/*
```

## 註冊佇列監聽服務

我們使用佇列來使應用程式更快，並在後臺處理傳送電子郵件和其他操作。您需要設定工作佇列以處理這些操作。

### Crontab 定時任務設定

我們需要做的第一件事是建立一個新的定時任務，它每分鐘執行一次以處理特定的翼龍任務，例如會話清理和將計劃任務傳送到守護程序。您需要使用 `sudo crontab -e` 開啟您的 crontab，然後貼上下面的一行內容，不要忘記`/var/www/pterodactyl/`指的是你的翼龍面板在你伺服器的絕對位置。

```bash
* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1
```

### 建立佇列監聽服務

接下來，您需要建立一個新的 systemd 工作執行緒來保持我們的佇列程序在後臺執行。該佇列負責傳送電子郵件併為翼龍處理許多其他後臺任務。

在 `/etc/systemd/system` 資料夾中建立一個名為 `pteroq.service` 的檔案，其內容如下。

``` text
# 翼龍工作佇列檔案
# ----------------------------------

[Unit]
Description=Pterodactyl Queue Worker
After=redis-server.service

[Service]
# 在某些系統上使用者和組可能不同。
# 有些系統使用 `apache` 或 `nginx` 作為使用者和組。
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
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
:::

如果您在系統中使用 redis，則需要確保啟用它會在引導時啟動。您可以透過執行以下命令來執行此操作：

```bash
sudo systemctl enable --now redis-server
```

最後，啟用該服務並將其設定為在計算機啟動時啟動。

``` bash
sudo systemctl enable --now pteroq.service
```

### 遙測

從 1.11 開始，Pterodactyl 將收集匿名遙測資料，以幫助我們更好地瞭解軟體的使用情況。要了解有關此功能的更多資訊並拒絕此功能，請參閱我們的 [遙測](./additional_configuration.md#遙測) 文件。確保繼續其餘的安裝過程。

#### 下一步：[網路伺服器配置](./webserver_configuration)
