# 額外配置

[[toc]]

::: warning
這些是給 Wings 的額外配置,請小心進行配置否則您將有機率損壞 Wings
:::

您需要將 `config.yml` 放入 `/etc/pterodactyl` 資料夾然後重啟Wings來應用更改設定,請確認您使用的格式是 Yaml ,您可以使用 [Yaml Lint](http://www.yamllint.com/) 這樣在執行出錯時,您就可以收到類似的錯誤

## 提供身份驗證

在拉取 Docker 映象時,您可以使用這些設定來對私有 Docker 進行身份驗證

### 可用金鑰

|   設定金鑰  |    預設值      |    備註           |
| ----------- | :-----------: | ----------------- |
| name        |     null      | 認證地址  |
| username    |     null      | 認證使用者名稱 |
| password    |     null      | 認證密碼 |

### 使用示例

```yml
docker:
  registries:
    registry.example.com:
      username: "registryusername"
      password: "registrypassword"
```

## 自定義網路模式

您可以透過編輯網路模式來更改 Wings 所用 Docker 的網路模式;這通常預設設定為 `pterodactyl_nw`,例如,如果要啟用 Docker 的主機模式請將網路模式更改為 `host`.

::: warning
更改網路模式為 `host` 將允許面板直接訪問所有主機,面板使用者可以繫結到任意的IP或埠(即使沒有分配給使用者伺服器)您將會失去 Docker 網路隔離的保護,所以我們不建議您用於公共 IDC 出租時使用
:::

### 使用示例

```yml
docker:
  network:
    name: host
    network_mode: host
```

再更改後需要重新啟動 Wings (可執行以下命令),您需要注意的是所有風險將由您自己承擔!
`systemctl stop wings && docker network rm pterodactyl_nw && systemctl start wings`

## 使用 Cloudflare 代理

使用 Cloudflare 代理 Wings 並沒有什麼用,因為使用者依舊會直連主機，而中間的 Cloudflare 並沒有起什麼作用,所以您的伺服器 IP 仍會被公開

如果需要啟動 Cloudflare 代理您必須將 Wings 埠更改為啟用快取的 Cloudflare 的 HTTPS 埠 `8443`(更多資訊 [訪問這裡](https://developers.cloudflare.com/fundamentals/get-started/reference/network-ports/)),因為 Cloudflare 只支援 8080 埠的 HTTP 協議,您可以在管理頁面那裡進行更改此埠，在 Cloudflare 中使用 完全SSL 時，請確保設定為 "未使用CDN"，然後到 Cloudflare DNS記錄設定頁將您 FQDN 旁邊的橙色雲啟用。

有個問題在於,如果你不購買 Cloudflare 的 `企業` 套餐,那麼就不能代理 SFTP 埠

## 容器 PID 限制

您可以透過更改 `container_pid_limit` 值來更改在任何給定時刻可在容器中執行的程序總數。預設值為`512`。
您可以將其設定為 `0` 以完全禁用限制。但是！不推薦這樣做，因為該限制可以防止節點的惡意過載。
重新啟動 wings 和你的遊戲伺服器以應用新的限制。

### 使用示例

```yml
docker:
  ...
  container_pid_limit: 512
  ...
```

## 流量限制

您可以使用以下設定來設定流量限制

| 設定內容        | 預設值 | 備註                                                                                                                         |
| :-------------------- | :-----------: | ----------------------------------------------------------------------------------------------------------------------------------- |
| enabled               |     true      | 是否啟用流量限制                                                                                   |
| lines                 |     2000      | 給定時間內可輸出的總行數,達到上限將呼叫 line_reset_interval                                  |
| maximum_trigger_count |       5       | 在伺服器停止之前可觸發限制的次數                                                   |
| line_reset_interval   |      100      | 重置行數時間(可為0)                                                          |
| decay_interval        |     10000     | 在不觸發限制的情況下等待的時間                           |
| stop_grace_period     |      15       | 如果伺服器觸發限制,則伺服器在強制終止前可以停止的時間                  |
| write_limit           |       0       | 對磁碟 I/O 的限制,設定0為無限,單位為 MiB/s |
| download_limit        |       0       | 設定網路 I/O 限制,設定0為無限,單位為 MiB/s    |

### 使用示例

```yml
throttles:
  enabled: true
  lines: 2000
  maximum_trigger_count: 5
  line_reset_interval: 100
  decay_interval: 10000
  stop_grace_period: 15
```

## 安裝限制

設定安裝程式容器限制可以幫助伺服器安裝時無意義的消耗資源,可以和伺服器定義的限制一起使用,但在安裝例項時會議最高值為基準

| 設定項 | 預設值 | 備註                                                                                                       |
| :---------- | :-----------: | ----------------------------------------------------------------------------------------------------------- |
| memory      |     1024      | 安裝容器時可以使用的最大記憶體 |
| cpu         |      100      | 安裝容器時可以使用的最大 CPU 使用率      |

### 使用示例

```yml
installer_limits:
  memory: 1024
  cpu: 100
```

## 其他內容

還有更多可以配置 Wings 的選項和說明 [您可點我檢視](https://github.com/pterodactyl-taiwan/wings/tree/develop/config)

| 設定項                | 預設值 | 備註                                                                                           |
| -------------------------- | :-----------: | ----------------------------------------------------------------------------------------------- |
| debug                      |     false     | 強制 Wings 在 Debug 模式執行                                                                |
| tmpfs_size                 |      100      | 掛載例項到 `/tmp` 目錄的大小限制                              |
| websocket_log_count        |      150      | 在控制檯中顯示的行數                                                   |
| detect_clean_exit_as_crash |     true      | 如果伺服器沒有在互動的情況下意外停止將會標記為已崩潰 |
| (crash detection) timeout  |      60       | 伺服器崩潰自動重啟持續時間     |
| app_name                   | "Pterodactyl" | 更改Wings的名稱,該項將會顯示在面板的控制檯中                               |
| check_permissions_on_boot  |     true      | 每次啟動時將會檢查所有檔案的許可權,如果您的伺服器檔案過多請禁用!|
