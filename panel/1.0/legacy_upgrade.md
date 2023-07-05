# 舊版升級
本升級指南用於**從 0.7.X 升級到 1.3.x**。如果您嘗試在 1.X 面板上進行升級，請[改用本指南](/panel/1.0/updating.md)。在此升級過程中，您將有一段時間面板處於不可用狀態，但不會停止任何遊戲伺服器的執行，只是暫時無法執行操作。

## 進入維護模式
在開始之前，您需要透過執行下面的“down”命令將您的面板置於維護模式。這將防止使用者遇到意外的錯誤，這樣能確保使用者在升級完成之前無法對面板進行任何操作。執行命令時，請確保您位於您的面板根目錄中，列如 `/var/www/pterodactyl`。

``` bash
# 將面板置於維護模式並拒絕使用者訪問
php artisan down
```

## 更新依賴
在執行此升級之前，您需要確保您的系統依賴項是最新的。請參考以下列表以確保您擁有所有必需的版本。

* PHP `8.0` 或 `8.1`（推薦），帶有以下副檔名：`cli`、`openssl`、`gd`、`mysql`、`PDO`、`mbstring` `tokenizer`、`bcmath `、`xml` 或 `dom`、`curl`、`zip` 和 `fpm` 如果你打算使用 NGINX。請參閱我們的 [升級 PHP指南](/guides/php_upgrade.md) 瞭解詳細資訊。
* Composer v2 (`composer self-update --2`)

::: warning Nginx
如果你升級你的 PHP 版本並且使用 nginx 作為你的網路伺服器，你將不得不更新你的 nginx 的 `pterodactyl.conf` 配置中 `fastcgi_pass` 的值來使用正確的 `php-fpm` 套接字。
:::

* MySQL `5.7.22` 或更高版本（推薦 MySQL `8`） **或者** MariaDB `10.2` 或更高版本。

::: warning 請認真地仔細檢查您的資料庫版本
請確保您執行的是上面列出的正確版本 MariaDB 或 MySQL！ 否則，當您嘗試遷移時，會導致你遇到本不應該出現的錯誤。

以前的文件（也就是以前的版本）可能讓您安裝了 MariaDB 10.1，而該版本的翼龍 _是無法使用的_。
:::

## 獲取更新檔案
更新過程的第一步是從 GitHub 下載新的面板檔案。下面的命令將下載翼龍臺灣最新發布的版本，將其儲存在當前目錄中，並自動解壓到您的當前資料夾中。現在您要確保位於翼龍根目錄下，例如 `/var/www/pterodactyl` ，因為下面的命令會自動將存檔解壓到您當前的資料夾中。

我們將會刪除 `app/` 目錄。由於我們處理安裝和升級的方式，刪除的檔案並不總是能被正確檢測到，因此，輕易的在此位置上打包會導致一些迷惑行為。

``` bash
# 刪除 app 目錄是為了確保我們升級後不會導致檔案顯得雜亂無章。
# 這不會影響您的任何設定或伺服器。
curl -L -o panel.tar.gz https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz
# 若閣下在上條指令上無法正常拉取壓縮包或者拉取緩慢 可使用 gh-proxy 提供的CF反向代理來拉取
curl -Lo panel.tar.gz https://ghproxy.com/https://github.com/pterodactyl-taiwan/panel/releases/latest/download/panel.tar.gz

rm -rf $(find app public resources -depth | head -n -1 | grep -Fv "$(tar -tf panel.tar.gz)")
# 下載更新檔案並刪除存檔檔案。
tar -xzvf panel.tar.gz && rm -f panel.tar.gz
```

下載所有檔案後，我們需要將快取與儲存目錄上設定正確的許可權，以避免與網路伺服器出現相關的錯誤。

``` bash
chmod -R 755 storage/* bootstrap/cache
```

## 更新依賴
下載所有新檔案後，您需要升級面板的核心元件。為此，只需執行以下命令並按照提示進行操作。

``` bash
composer install --no-dev --optimize-autoloader
```

## 清除編譯後的模板快取
您還需要清除已編譯的模板快取，以確保新的還有修改過的模板正確地顯示給使用者。

``` bash
php artisan view:clear
php artisan config:clear
```

## 資料庫更新
您還需要為最新版本的翼龍更新資料庫結構。執行下面的命令將更新結構並確保我們釋出的預設預設是最新的（並新增我們可能釋出的新預設）。請記住，_永遠不要編輯我們釋出的核心預設_！ 它們將被此更新過程所覆蓋。

::: warning
如果您使用了允許在 `0.7` 版本上進行伺服器傳輸的自定義外掛，您必須**刪除或重新命名 `server_transfers` 表，然後再繼續。
:::

``` bash
php artisan migrate --force
php artisan db:seed --force
```

## 設定許可權
最後一步是將檔案的所有者設定為您的網路伺服器使用者。在大多數情況下是 `www-data`，但可能因系統而異 &mdash; 有時是 `nginx`、`caddy`、`apache`，甚至是 `nobody`。

``` bash
# 如果使用 NGINX 或 Apache (並且不在CentOS上)
chown -R www-data:www-data *

# 如果在 CentOS 上使用 NGINX
chown -R nginx:nginx *

# 如果在 CentOS 上使用 Apache
chown -R apache:apache *
```

## 重啟工作佇列
_每次_ 更新後，您都應該重新啟動工作佇列程式，以確保新的程式碼已載入並使用。

``` bash
php artisan queue:restart
```

## 退出維護模式
現在升級已完成，退出維護模式，您的面板現在可以使用了。

```bash
# 恢復面板讓其繼續執行並提供服務
php artisan up
```

## 遷移至 Wings
我們已經棄用了舊的 Node.js 守護程序，轉而支援 [Wings](https://github.com/pterodactyl-taiwan/wings)，這是我們用 Go 編寫的新伺服器控制系統。這個新系統明顯更快、更容易安裝並且更小。您需要做的就是在您的系統上安裝一個二進位制檔案並將其配置為開機自啟。**您不能使用舊的 Node.js 守護程序來執行帶有 翼龍面板 1.0 以上的伺服器。**

有關詳細說明，請閱讀[遷移至 Wings](/wings/1.0/migrating.md)。
