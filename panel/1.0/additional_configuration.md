# 其他配置

[[toc]]

## 備份

翼龍面板允許使用者為其伺服器建立備份。為了建立備份，必須配置一個備份儲存方法。

當改變翼龍面板的備份儲存方式時，使用者仍然可以從以前的儲存驅動下載或刪除現有的備份。
在從S3遷移到本地備份的例子中，切換到本地備份儲存方式後，S3憑證必須保持配置。

### 使用本地備份

預設情況下，翼龍面板透過 Wings (後端) 使用本地儲存進行備份。也就是說，這種備份儲存方式可以在 `.env` 檔案中透過以下配置明確設定。

```bash
# 將你的面板設定為透過 Wings 使用本地儲存進行備份
APP_BACKUP_DRIVER=wings
```

請注意，當透過 Wings 使用本地儲存時，備份的目的地是在 Wings 的 `config.yml` 中設定的，設定內容如下。

```yml
system:
  backup_directory: /path/to/backup/storage
```

### 使用 S3 備份

AWS S3（或相容的儲存）可以用來儲存遠端或基於雲的備份。必須在 `.env` 檔案中設定以下配置選項或作為環境變數，以便啟用它。

```bash
# 將你的面板設定為使用 s3 進行備份
APP_BACKUP_DRIVER=s3

# 實際使用 s3 的資訊
AWS_DEFAULT_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BACKUPS_BUCKET=
AWS_ENDPOINT=
```

對於某些配置，你可能需要將你的 S3 URL 從 `bucket.domain.com` 改為 `domain.com/bucket`。為了達到這個目的，在你的 `.env` 檔案中新增 `AWS_USE_PATH_STYLE_ENDPOINT=true`。

#### 分段上傳

S3 備份使用 S3 分段上傳功能。在極少數情況下，您可能需要調整單個分段大小或生成的預簽名 URL 的生命週期。

預設分段大小為 5GB，預設預簽名 URL 生命週期為 60 分鐘。您可以使用 `BACKUP_MAX_PART_SIZE` 環境變數配置最大分段尺寸。
您必須以位元組為單位指定大小。 要定義預簽名 URL 的生命週期，請使用 `BACKUP_PRESIGNED_URL_LIFESPAN` 變數。預期單位是分鐘。

以下 `.env` 片段配置 1GB 部分並使用 120 分鐘作為預簽名 URL 生命週期：

```bash
BACKUP_MAX_PART_SIZE=1073741824
BACKUP_PRESIGNED_URL_LIFESPAN=120
```

#### 儲存類

如果您需要指定儲存類，請使用 `AWS_BACKUPS_STORAGE_CLASS` 環境變數。預設選項是 `STANDARD`（S3 標準）。

以下 `.env` 片段將類設定為 `STANDARD_IA`（這是一個示例）。

```bash
# STANDARD_IA 就是一個例子。
AWS_BACKUPS_STORAGE_CLASS=STANDARD_IA
```

## 反向代理設定

在反向代理後面執行 Pterodactyl 時，例如 [Cloudflare 的靈活 SSL](https://support.cloudflare.com/hc/en-us/articles/200170416-What-do-the-SSL-options-mean-) 或 Nginx/Apache/Caddy 等，您將需要對面板進行快速修改，以確保一切按預期繼續工作。
預設情況下，當使用這些反向代理時，您的面板將無法正確處理請求。
您很可能無法登入或在瀏覽器控制檯中看到安全警告，因為它試圖載入不安全的資源。
這是因為面板用來確定如何生成連結的內部邏輯認為它是透過 HTTP 而不是透過 HTTPS 執行的。

您需要編輯面板根目錄中的 `.env` 檔案以至少包含 `TRUSTED_PROXIES=*`。
我們強烈建議提供特定的 IP 地址（或以英文逗號分隔的 IP 列表），而不是允許使用 `*`。例如，如果您的代理與伺服器在同一臺機器上執行，那麼類似  `TRUSTED_PROXIES=127.0.0.1` 之類的東西很可能適合您。

### NGINX 特定配置

為了使翼龍正確響應 NGINX 反向代理，NGINX `location` 配置必須包含以下內容：

```Nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header Host $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_redirect off;
proxy_buffering off;
proxy_request_buffering off;
```

### Cloudflare 特定配置
如果您使用 Cloudflare 的靈活 SSL，您應該設定 `TRUSTED_PROXIES` 以包含 [他們的 IP 地址](https://www.cloudflare.com/ips/)。以下是如何設定的示例。

```text
TRUSTED_PROXIES=173.245.48.0/20,103.21.244.0/22,103.22.200.0/22,103.31.4.0/22,141.101.64.0/18,108.162.192.0/18,190.93.240.0/20,188.114.96.0/20,197.234.240.0/22,198.41.128.0/17,162.158.0.0/15,104.16.0.0/13,104.24.0.0/14,172.64.0.0/13,131.0.72.0/22
```

## reCAPTCHA

面板使用隱形 reCAPTCHA 來保護登入頁面免受暴力攻擊。如果登入嘗試被認為可疑，則可能會要求使用者執行 reCAPTCHA 質詢。

### 配置 reCAPTCHA

雖然我們預設提供全域性 Site Key 和 Secret Key，但我們強烈建議您根據自己的設定更改它。

您可以在 [reCAPTCHA 管理控制檯](https://www.google.com/recaptcha/admin) 中生成自己的金鑰。

然後可以使用管理面板中的設定來應用這些金鑰。reCAPTCHA 設定可以在**高階**選項卡上找到。

### 禁用 reCAPTCHA

:::warning 安全警告
我們不建議禁用 reCAPTCHA。這是一種安全機制，使對使用者帳戶執行暴力攻擊時變得更加困難。
:::

如果使用者在登入時遇到問題，或者您的面板沒有暴露在網際網路上，禁用 reCAPTCHA 是有意義的。

使用管理面板可以輕鬆禁用 reCAPTCHA。在設定中，選擇**高階**選項卡並將 reCAPTCHA 的**狀態**設定為**禁用**。

::: tip 
如果您無法訪問面板，導致改不了這部分的設定，你也可以在翼龍面板的根目錄下的 `.env` 檔案中，設定環境變數中去禁用 reCAPTCHA。

```
RECAPTCHA_ENABLED=false
```
:::

#### 編輯你的資料庫

如果您無法訪問面板，可以使用以下命令直接修改資料庫。

```sql
mysql -u root -p
UPDATE panel.settings SET value = 'false' WHERE `key` = 'settings::recaptcha:enabled';
```

## 動態口令認證

如果可能，您應該使用面板更新您的動態口令認證設定。如果您出於某種原因無法訪問您的面板，您可以使用以下步驟。

### 禁用動態口令認證

```sql
mysql -u root -p
UPDATE panel.settings SET value = 0 WHERE `key` = 'settings::pterodactyl:auth:2fa_required';
```

### 為特定使用者禁用動態口令認證

在 `/var/www/pterodactyl` (這裡指翼龍所在的目錄) 目錄中執行以下命令。

``` bash
php artisan p:user:disable2fa
```

## 遙測

從 1.11 開始，Panel 收集有關 Panel 和所有連線節點的匿名指標。
此功能預設啟用，但可以禁用。

此功能收集的資料不會出售或用於廣告目的。 出於改進軟體的目的，可能會公開或與第三方共享彙總統計資料。
### 它是如何工作的？

遙測系統首先為 Panel 安裝生成隨機 UUIDv4 識別符號。
此識別符號儲存在資料庫中，因此對多個 Panel 例項進行負載平衡的人仍然可以擁有唯一的識別符號。 然後將該識別符號連同相關遙測資料傳送到遠端伺服器。 遙測資料每 24 小時收集一次，沒有持續收集或本地儲存遙測資料，我們在將資料傳送到遠端伺服器之前立即收集資料。

目前，所有遙測收集邏輯都由面板上的 [TelemetryCollectionService](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Telemetry/TelemetryCollectionService.php#L53) 處理。 該服務負責收集傳送到遠端伺服器的所有資料。

### 收集什麼資料？

如果您希望檢視收集到的完整資料，請檢視 TelemetryCollectionService（如上鍊接），或使用 `php artisan p:telemetry` 命令檢視將傳送到遠端伺服器的確切資料。

如果您希望檢視收集到的完整資料，請檢視 TelemetryCollectionService（如上鍊接），或使用 `php artisan p:telemetry` 命令檢視將傳送到遠端伺服器的確切資料。

截至 2022-12-12，收集的資料包括：

* Unique identifier for the Panel
* Version of the Panel
* PHP version
* Backup storage driver (S3, Local, etc.)
* Cache driver (Redis, Memcached, etc.)
* Database driver and version (MySQL, MariaDB, PostgreSQL, etc.)
* Resources
  * Allocations
    * Total number
    * Total number of used allocations (assigned to a server)
  * Backups
    * Total number
    * Sum of the total amount of bytes stored by backups
  * Eggs
    * Total number
    * ~~Map of egg UUIDs to the number of servers using that egg~~ (removed in 1.11.2)
  * Locations
    * Total number
  * Mounts
    * Total number
  * Nests
    * Total number
    * ~~Map of nest UUIDs to the number of servers using eggs in that nest~~ (removed in 1.11.2)
  * Nodes
    * Total number
  * Servers
    * Total number
    * Number of servers that are suspended
  * Users
    * Total number
    * Number of users that are admins
* Nodes
  * Node UUID
  * Version of Wings on the node
  * Docker
    * Version
    * Cgroups
      * Driver
      * Version
    * Containers
      * Total
      * Running
      * Paused
      * Stopped
    * Storage
      * Driver
      * Filesystem
    * runc
      * Version
  * System
    * Architecture (`amd64`, `arm64`, etc.)
    * CPU Threads
    * Memory Bytes
    * Kernel Version
    * Operating System (Debian, Fedora, RHEL, Ubuntu, etc.)
    * Operating System Type (bsd, linux, windows, etc.)

### 資料是如何儲存的？

目前，資料儲存在 Cloudflare 中，我們使用 Worker 提取所有遙測資料，該 Worker 進行基本處理（例如驗證），然後將其插入 Cloudflare D1。 目前，收集到的任何資料都沒有 API 或視覺化，只能手動查詢。 目前只有 Matthew 能夠查詢資料，但我們正在研究替代方案，以使這些資料更易於訪問。

### 為什麼？

收集這些資料的主要原因是幫助我們對該軟體的未來做出更好的決策。 隨著 1.11 的釋出，最低 PHP 版本要求從 7.4 躍升至 8.0，但是，我們希望新增一項需要 PHP 8.1 的功能，這會使版本要求躍升並可能給某些使用者帶來問題。 透過收集這些資料，我們有望更深入地瞭解此類變化將如何影響社群，並在未來做出更好的決策。 這對於架構、核心版本和正在使用的作業系統節點等資訊尤為重要。 例如，我們想利用僅存在於某些檔案系統中的功能，但我們不知道有多少人在使用這些檔案系統，因此我們無法確定是否值得為此付出努力。

有些資料對決策沒有那麼有用，但對我們瞭解仍然有用。
例如，您有沒有想過有多少個 Panel 例項？ 所有這些例項執行了多少臺伺服器？ 有多少使用者在使用面板？ 這些使用者中有多少是管理員？ 有多少臺伺服器在使用特定的預設？ 有多少伺服器正在使用特定的預設組？
所有這些問題都可以透過我們收集的資料來回答，並且可以幫助我們和社群更好地瞭解軟體的使用方式。

如果您對我們收集的資料有任何疑問，請隨時在 Discord 上聯絡我們。
我們的目標是儘可能透明，並且我們希望確保社群理解我們在做什麼以及為什麼這樣做。

### 啟用遙測

預設情況下啟用遙測，如果您想在禁用它後啟用它，請編輯您的 `.env` 檔案並刪除 `PTERODACTYL_TELEMETRY_ENABLED` 行，或將其設定為 `true`。

```text
PTERODACTYL_TELEMETRY_ENABLED=true
```

您還可以使用 `php artisan p:environment:setup` 命令啟用遙測，可新增 `--telemetry` 引數來進行非互動式設定。

### 禁用遙測

要禁用遙測，請編輯您的 `.env` 檔案並將 `PTERODACTYL_TELEMETRY_ENABLED` 設定為 `false`。

```text
PTERODACTYL_TELEMETRY_ENABLED=false
```

您還可以使用 `php artisan p:environment:setup` 命令禁用遙測，可新增 `--telemetry=false` 引數來進行非互動式設定。
