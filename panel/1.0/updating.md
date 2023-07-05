# 更新面板

本文件涵蓋了 `1.x` 系列版本中的更新過程。這意味著例如從 `1.5.0` 更新到 `1.6.0`。**請勿使用本指南從 `0.7` 開始升級，這會導致你升級失敗。**

## 面板的版本要求

翼龍面板的每個版本都有相應最低版本的 Wings。請參閱下表瞭解有關這些對應版本。在大多數情況下，您的 Wings 版本應該與您的面板版本相匹配。

| 面板版本 | Wings 版本 | 支援狀況 | PHP 版本                       |
|---------------|---------------|-----------|------------------------------------|
| 1.0.x         | 1.0.x         |           | 7.3, 7.4                           |
| 1.1.x         | 1.1.x         |           | 7.3, 7.4                           |
| 1.2.x         | 1.2.x         |           | 7.3, 7.4                           |
| 1.3.x         | 1.3.x         |           | 7.4, 8.0                           |
| 1.4.x         | 1.4.x         |           | 7.4, 8.0                           |
| 1.5.x         | 1.4.x         |           | 7.4, 8.0                           |
| 1.6.x         | 1.4.x         |           | 7.4, 8.0                           |
| 1.7.x         | 1.5.x         |           | 7.4, 8.0                           |
| 1.8.x         | 1.6.x         |           | 7.4, 8.0, 8.1                      |
| 1.9.x         | 1.6.x         |           | 7.4, 8.0, 8.1                      |
| 1.10.x        | 1.7.x         |           | 7.4, 8.0, 8.1                      |
| **1.11.x**    | **1.11.x**    | ✅         | 8.0, **8.1** (8.0 棄用)      |

*注意：Wings 沒有 1.8.x、1.9.x 或 1.10.x 版本。*

## 更新依賴項

* PHP `8.0` 或 `8.1` (推薦)
* Composer `2.X`

::: danger PHP 7.4
隨著 1.11.0 的釋出，對 PHP 7.4 的支援已被移除。請升級到 PHP 8.0、8.1 或更高版本。
:::

::: warning 受支援的 PHP 最低版本已更改
**對 PHP 8.0 的支援已棄用**。請相應地計劃——PHP 8.1 或更高版本將是 1.12 及更高版本中唯一受支援的版本。
:::

**在繼續之前**，請確保您的系統和網路伺服器配置已透過執行 `php -v` 和 `composer --version` 來確認您的伺服器已在 PHP 8.0 和 Composer 2 或更高的版本。您應該會看到類似於以下輸出的結果。如果您沒有看到 PHP 8.0 和 Composer 2 或更高的版本，您將需要按照我們的 [PHP 升級指南](/guides/php_upgrade.md) 進行升級，然後再返回此文件。

```
vagrant@pterodactyl:~/app$ php -v
PHP 8.1.5 (cli) (built: Apr 21 2022 10:32:13) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.5, Copyright (c) Zend Technologies
    with Zend OPcache v8.1.5, Copyright (c), by Zend Technologies

vagrant@pterodactyl:~/app$ composer --version
Composer version 2.3.5 2022-04-13 16:43:00
```

## 自動升級

::: warning
由於我們使用的一些依賴項存在問題，目前無法進行自動升級。請暫時執行人工升級的方式，直到此問題得到解決。
:::

## 人工升級

如果您不想執行自動升級，或者想要參考升級步驟，您可以按照下面的文件進行操作。

::: warning
如果您已成功執行自動升級，則無需在此頁面上執行任何其他操作。
:::

### 進入維護模式

每當您執行更新時，您應該確保將您的面板置於維護模式。這將防止使用者遇到意外的錯誤，這樣能確保使用者在升級完成之前無法對面板進行任何操作，你也能更好的去更新。

```bash
cd /var/www/pterodactyl

php artisan down
```

### 下載更新

更新過程的第一步是從 GitHub 下載新的面板檔案。下面的命令將下載翼龍臺灣最新發布的版本，將其儲存在當前目錄中，並自動解壓到您的當前資料夾中。

```bash
curl -L https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz | tar -xzv
# 若閣下在上條指令上無法正常拉取壓縮包或者拉取緩慢 可使用 gh-proxy 提供的CF反向代理來拉取
curl -L https://ghproxy.com/https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz | tar -xzv
```

下載所有檔案後，我們需要將快取與儲存目錄上設定正確的許可權，以避免與網路伺服器出現相關的錯誤。

```bash
chmod -R 755 storage/* bootstrap/cache
```

### 更新依賴

下載所有新檔案後，您需要升級面板的核心元件。為此，只需執行以下命令並按照提示進行操作。

```bash
composer install --no-dev --optimize-autoloader
```

### 清除編譯後的模板快取

您還需要清除已編譯的模板快取，以確保新的還有修改過的模板正確地顯示給使用者。

```bash
php artisan view:clear
php artisan config:clear
```

### 資料庫更新

您還需要為最新版本的翼龍更新資料庫結構。執行下面的命令將更新結構並確保我們釋出的預設預設是最新的（並新增我們可能釋出的新預設）。請記住，_永遠不要編輯我們釋出的核心預設_！ 它們將被此更新過程所覆蓋。

```bash
php artisan migrate --seed --force
```

### 設定許可權

最後一步是將檔案的所有者設定為您的網路伺服器使用者。在大多數情況下是 `www-data`，但可能因系統而異 &mdash; 有時是 `nginx`、`caddy`、`apache`，甚至是 `nobody`。

```bash
# 如果使用 NGINX 或 Apache (並且不在CentOS上)
chown -R www-data:www-data /var/www/pterodactyl/*

# 如果在 CentOS 上使用 NGINX
chown -R nginx:nginx /var/www/pterodactyl/*

# 如果在 CentOS 上使用 Apache
chown -R apache:apache /var/www/pterodactyl/*
```

### 重啟工作佇列

_每次_ 更新後，您都應該重新啟動工作佇列程式，以確保新的程式碼已載入並使用。

```bash
php artisan queue:restart
```

### 退出維護模式

現在所有內容都已更新，您需要退出維護模式，以便面板可以繼續執行並提供服務。

```bash
php artisan up
```

### 遙測

從 1.11 開始，Pterodactyl 將收集匿名遙測資料，以幫助我們更好地瞭解軟體的使用情況。要了解有關此功能的更多資訊並拒絕此功能，請參閱我們的 [遙測](./additional_configuration.md#遙測) 文件。確保繼續其餘的安裝過程。

[最後一步：升級 Wings](/wings/1.0/upgrading.md)
