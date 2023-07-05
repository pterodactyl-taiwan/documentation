# 遷移至 Wings
本指南適用於希望從舊的 Node.JS 守護程式遷移到 Wings 的人。如果您是第一次嘗試在新節點上安裝 Wings，請參閱 [安裝指南](/wings/1.0/installing.md) 。

::: danger 面板版本要求
您**必須**執行翼龍面板 1.X 及以上版本才能使用 Wings。
:::

執行此過程時，您將有一段短暫的離線時間，但不會影響正在執行的遊戲程序。此外，在此期間，您的面板可能會離線（或處於維護模式），因此您的使用者不會觸發任何異常情況。

## 安裝 Wings
安裝守護程式的第一步是確保我們具有所需的目錄結構設定。為此，請執行以下命令，該命令將建立基本目錄並下載 Wings 可執行檔案。

``` bash
mkdir -p /etc/pterodactyl
curl -L -o /usr/local/bin/wings https://github.com/pterodactyl-taiwan/wings/releases/latest/download/wings_linux_amd64
chmod u+x /usr/local/bin/wings

# 若閣下在上條指令上無法正常拉取壓縮包或者拉取緩慢 可使用 gh-proxy 提供的CF反向代理來拉取
curl -L -o /usr/local/bin/wings "https://ghproxy.com/https://github.com/pterodactyl-taiwan/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
```

## 複製新的配置檔案
安裝 Wings 後，您需要從面板中複製一個新的配置檔案。此檔案採用新格式，將來應該更易於管理和編輯。

只需複製程式碼塊的內容並將其貼上到 `/etc/pterodactyl` 目錄中的 `config.yml` 檔案裡。
::: tip
當然，你也可以直接點選 [生成自動部署指令] 來生成一件命令覆蓋，而不需要您手動覆蓋。(請注意，此覆蓋只會覆蓋預設的 `/etc/pterodactyl` 目錄下的配置檔案)
:::

![](./../../.vuepress/public/wings_configuration_example.png)

::: warning
請注意，你以前對配置所做的任何修改都會隨之丟失。如果你對我們的預設設定有修改，最好的選擇是使用面板生成的配置啟動一次 Wings，然後再此基礎上寫入額外的配置設定。

從那裡您可以根據需要進行任何調整。
:::

## 移除舊的守護程序
現在安裝了 Wings，我們需要從伺服器中刪除所有舊的守護程式程式碼，因為它不再被使用。為此，只需執行以下命令 - 假設您的舊守護程式路徑預設於 `/srv/daemon` 目錄中。

```bash
# 停止舊的守護程式
systemctl stop wings

# 刪除整個目錄。這裡沒有任何我們在這次遷移中實際需要的東西。
# 請記住，伺服器資料預設儲存在 /srv/daemon-data 中，如果你沒做修改。
rm -rf /srv/daemon

# 如果沒有對 NodeJS 有其他用途，您可以選擇從你的系統中刪除它。
apt -y remove nodejs # 或: yum remove nodejs
```

### 刪除獨立 SFTP
如果您使用帶有舊守護程式的 [獨立SFTP伺服器](/daemon/0.6/standalone_sftp.html) ，我們不再需要它的 systemd 服務,所以我們需要刪除它。
您可以使用以下命令執行此操作。

```bash
# 停止並禁用獨立 sftp
systemctl disable --now pterosftp

# 刪除 systemd 服務
rm /etc/systemd/system/pterosftp.service
```

## Wings 守護程序
然後，您需要編輯現有 `systemd` 的 Wings 服務檔案以指向新的控制軟體。為此，請開啟 `/etc/systemd/system/wings.service` 檔案並將其中的全部內容替換為以下內容：

```
[Unit]
Description=Pterodactyl Wings Daemon
After=docker.service

[Service]
User=root
WorkingDirectory=/etc/pterodactyl
LimitNOFILE=4096
PIDFile=/var/run/wings/daemon.pid
ExecStart=/usr/local/bin/wings
Restart=on-failure
StartLimitInterval=600

[Install]
WantedBy=multi-user.target
```

然後，啟動 Wings。

```
systemctl daemon-reload
systemctl enable --now wings
```

::: warning 如果 Wings 沒有啟動怎麼辦？
如果此時您在啟動 Wings 時遇到問題，請執行以下命令直接啟動 Wings 並檢查是否有任何特定的錯誤輸出。

```
sudo wings --debug
```
:::
