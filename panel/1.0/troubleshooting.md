# 疑難解答

[[toc]]

## 閱讀錯誤日誌
如果您在面板中遇到意外錯誤，你要做的第一件事就是提取日誌。
如果你要檢視這些日誌，只需執行下面的命令，該命令將輸出面板日誌檔案的最後 100 行內容。

``` bash
# 請注意你的面板位置
tail -n 100 /var/www/pterodactyl/storage/logs/laravel-$(date +%F).log
```

### 分析錯誤內容
當你執行上面的命令時，你可能會被一大堵資訊嚇到，其實你不用害怕它，這只是一個導致錯誤原因的堆疊跟蹤，在尋找錯誤原因時，您實際上可以忽略幾乎所有內容。讓我們看一下下面的一些示例輸出，它已被截斷以使其更易於理解。

```
#70 /srv/www/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(116): Illuminate\Foundation\Http\Kernel->sendRequestThroughRouter(Object(Illuminate\Http\Request))
#71 /srv/www/public/index.php(53): Illuminate\Foundation\Http\Kernel->handle(Object(Illuminate\Http\Request))
#72 {main}
[2018-07-19 00:50:24] local.ERROR: ErrorException: file_put_contents(/srv/www/storage/framework/views/c9c05d1357df1ce4ec8fc5df78c16c493b0d4f48.php): failed to open stream: Permission denied in /srv/www/vendor/laravel/framework/src/Illuminate/Filesystem/Filesystem.php:122
Stack trace:
#0 [internal function]: Illuminate\Foundation\Bootstrap\HandleExceptions->handleError(2, 'file_put_conten...', '/srv/www/vendor...', 122, Array)
#1 /srv/www/vendor/laravel/framework/src/Illuminate/Filesystem/Filesystem.php(122): file_put_contents('/srv/www/storag...', '<?php $__env->s...', 0)
#2 /srv/www/vendor/laravel/framework/src/Illuminate/View/Compilers/BladeCompiler.php(122): Illuminate\Filesystem\Filesystem->put('/srv/www/storag...', '<?php $__env->s...')
#3 /srv/www/vendor/laravel/framework/src/Illuminate/View/Engines/CompilerEngine.php(51): Illuminate\View\Compilers\BladeCompiler->compile('/srv/www/resour...')
#4 /srv/www/vendor/laravel/framework/src/Illuminate/View/View.php(142): Illuminate\View\Engines\CompilerEngine->get('/srv/www/resour...', Array)
#5 /srv/www/vendor/laravel/framework/src/Illuminate/View/View.php(125): Illuminate\View\View->getContents()
```

您要做的第一件事就是沿著數字鏈向上直到找到 `#0`，這是觸發異常的函式。在第 0 行的正上方，您會看到一行括號中包含日期和時間，例如上面的 `[2018-07-19 00:50:24]`。這一行將是人類讀的異常資訊，您可以根據時間線來了解它為什麼出現了問題。

### 理解錯誤
在上面的示例中，我們可以看到實際的錯誤是：

```
local.ERROR: ErrorException: file_put_contents(...): failed to open stream: Permission denied in /srv/www/vendor/laravel/framework/src/Illuminate/Filesystem/Filesystem.php:122
```

從這個錯誤中我們可以確定執行 [file_put_contents()](http://php.net/manual/en/function.file-put-contents.php) 呼叫時出錯，錯誤是我們不開啟檔案，因為許可權被拒絕了。如果您根本不瞭解這些錯誤也沒關係，但如果您能夠提供這些日誌，它確實可以幫助您更快獲得翼龍官方的幫助，因為這些至少能找到錯誤的根源。
有時錯誤非常簡單，它會告訴您究竟出了什麼問題，例如當面板無法連線到守護程式時會引發 `ConnectionException`。

### 利用GREP
如果你想快速解決一堆錯誤，你可以使用下面的命令將返回的結果限制為僅實際錯誤的一行，而不是所有的堆疊跟蹤。

``` bash
tail -n 1000 /var/www/pterodactyl/storage/logs/laravel-$(date +%F).log | grep "\[$(date +%Y)"
```

## 無法連線到伺服器的錯誤資訊
### 基本的除錯步驟
* 檢查 Wings 是否正在執行，且沒有報錯。使用 `systemctl status wings` 來檢查程序的當前狀態。
* 按 `Ctrl + Shift + J`（在 Chrome 中）或 `Cmd + Alt + I`（在 Safari 中）檢查瀏覽器的控制檯。如果其中有一個紅色錯誤，它可能會縮小潛在問題的範圍。
* 確保 Wings 已正確安裝，並且節點裡的與面板中 `高階管理 -> 節點 -> 配置` 下顯示的配置相匹配。
* 檢查 Wings 埠是否在防火牆上開啟。Wings 的 HTTP(s) 使用的埠是 `8080` 或 `8443`，對與 SFTP 使用的是 `2022` 埠。(當然這些事預設的，如果你改了的話就不是這些了)
* 確保您已為面板和 Wings 使用的域名禁用了黑名單或加入了白名單。
* 檢查面板是否可以使用面板上配置的域名訪問到 Wings。在面板所在的伺服器上執行 `curl https://domain.com:8080` 來確保它可以成功連線到 Wings 。
* 確保您為面板和 Wings 使用正確的 HTTP 模式。如果面板在 HTTPS 上執行，Wings 也需要在 HTTPS 上執行。

### 更多的高階除錯步驟
* 停止 Wings 並執行 `wings --debug` 來檢視是否輸出一些錯誤資訊。如果有是需要人工去解決它們的，或透過 [Discord](https://discord.gg/pterodactyl) 聯絡翼龍官方以獲得更多幫助(需要用英文去交流)。
* 使用諸如 `nslookup` 或 `dig` 之類的工具來檢查您的 DNS 是否響應你所期望的內容。
* 如果您使用 CloudFlare，請確保為您的 Wings 或面板的 `A` 記錄禁用代理。
* 在有防火牆的時候使用 Wings（pfSense、OpenSwitch 等）時，請確保設定了正確的 NAT 設定，以便從外部網路能夠訪問 Wing 的埠。
* 如果按照上面說的排查過了話沒有任何效果，請檢查您自己的 DNS 設定並考慮切換 DNS 伺服器，至於怎麼切換請自行在網路上查閱。
* 當在一臺伺服器上同時執行面板和 Wings 時，如果在 `/etc/hosts` 中新增一個將公共 IP 引導回伺服器的條目，有時會有所幫助。有時也需要反向路徑，因此您可能需要在伺服器的 `/etc/hosts` 檔案中新增一個條目，將面板的域名指向正確的 IP。
* 在使用相同介面卡的不同 VM(虛擬機器) 上執行 Wings 和麵板時，請確保 VM(虛擬機器) 可以相互連線。可能需要混雜模式。

## 無效的 MAC 異常
::: warning
如果您正確遵循我們的安裝和升級指南，則永遠不會發生此錯誤。我們唯一一次看到此錯誤發生是當您盲目地從備份中恢復面板資料庫並嘗試使用全新安裝的面板的時候。

恢復備份時，您應該_一起_恢復 `.env` 檔案！裡面包含了非常重要的加密金鑰！！
:::

有時在使用面板時，您會意外地遇到一個損壞的頁面，並且在檢查日誌時，您會看到一個異常，也就是在解密時會提到了一個無效的 MAC。此錯誤是由 `.env` 檔案中的 `APP_KEY` 不匹配引起的。

如果您看到此錯誤，唯一的解決方案是從您的 `.env` 檔案中恢復 `APP_KEY` 環境變數。如果您丟失了原始金鑰，則無法恢復丟失的資料，也就是說你再也找不到原始資料了，從頭再來吧。

## SELinux 的問題
在安裝了 SELinux 的系統上，執行 redis 或嘗試連線到守護程式以執行操作時，您可能會遇到意外錯誤。這些問題通常可以透過執行以下命令來解決，以允許這些程式與 SELinux 一起工作。
 
### Redis 的許可權錯誤
``` bash
audit2allow -a -M redis_t
semodule -i redis_t.pp
```

### Wings 的連線錯誤
``` bash
audit2allow -a -M http_port_t
semodule -i http_port_t.pp
```

## 防火牆的問題
如果您在 RHEL/CentOS 伺服器上安裝了 `firewalld`，這可能已經破壞了原有的 DNS 規則。

```
firewall-cmd --permanent --zone=trusted --change-interface=pterodactyl0
firewall-cmd --reload
```

上述命令執行後重新啟動 `docker` 和 `wings` 以確保這些規則被系統應用。
