# 安裝 Wings

Wings 是翼龍的下一代伺服器控制平面。它已經使用 Go 從頭開始重建，並從我們的第一個 Nodejs 守護程序中吸取了教訓。

::: warning
只有在執行 **翼龍 1.x** 時才應安裝 Wings。不要為以前版本的翼龍安裝此軟體。
:::

## 支援的系統

以下是支援的作業系統列表。請注意，這不是一個詳盡的列表，您很有可能可以毫不費力地在其他 Linux 發行版上執行該軟體。您有責任確定這些系統上可能需要哪些軟體包。以下受支援作業系統的新版本也很有可能正常工作，您在安裝是不僅限於以下列出的版本。

| 作業系統 | 版本 |     支援狀況       | 注意事項                                                       |
|------------------|---------|:------------------:|-------------------------------------------------------------|
| **Ubuntu**       | 18.04   | :white_check_mark: | 文件基於 Ubuntu 18.04 作為作業系統所編寫的。 |
|                  | 20.04   | :white_check_mark: |                                                             |
|                  | 22.04   | :white_check_mark: |                                                             |
| **CentOS**       | 7       | :white_check_mark: |                                                             |
|                  | 8       | :white_check_mark: | 請注意，CentOS 8 已停運。使用 Rocky 或 Alma Linux.         |
| **Debian**       | 10      | :white_check_mark: |                                                             |
|                  | 11      | :white_check_mark: |                                                             |
| **Windows**      | All     |        :x:         | 該軟體將無法在 Windows 環境中執行。         |

## 系統要求

要執行 Wings，您需要一個能夠執行 Docker 映象的 Linux 系統。大多數 VPS 和幾乎所有專用伺服器都應該能夠執行 Docker，但也有一些極端情況。

當您的供應商使用 `Virtuozzo`、`OpenVZ`（或 `OVZ`）或 `LXC` 虛擬化時，您很可能無法執行 Wings。一些提供商已經對巢狀虛擬化進行了必要的更改以支援 Docker。請諮詢您的提供商的支援團隊。KVM 保證可以工作。

最簡單的檢查方法是輸入 `systemd-detect-virt`。
如果結果不包含 `OpenVZ` 或 `LXC`，應該沒問題。當執行沒有任何虛擬化的專用硬體時，將出現 `none` 的結果。

如果由於某種原因不能正常工作，或者您仍然不確定，您也可以執行以下命令。

```bash
dane@pterodactyl:~$ sudo dmidecode -s system-manufacturer
VMware, Inc.
```

## 依賴項

- curl
- Docker

### 安裝 Docker

如需快速安裝 Docker 社群版，您可以執行以下命令：

```bash
curl -sSL https://get.docker.com/ | CHANNEL=stable bash
# 如果速度過慢可以嘗試阿里雲源
curl -sSL https://get.docker.com/ | CHANNEL=stable bash -s docker --mirror Aliyun
```

如果您希望手動安裝，請參考官方 Docker 文件瞭解如何在您的伺服器上安裝 Docker 社群版。下面列出了一些常用系統支援的快速連結。

- [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)
- [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/#install-docker-ce)
- [Debian](https://docs.docker.com/install/linux/docker-ce/debian/#install-docker-ce)

::: warning 檢查你的核心
請注意，某些主機安裝了不支援 docker 重要功能的修改核心。 請透過執行 `uname -r` 檢查您的核心。 如果您的核心以 `-xxxx-grs-ipv6-64` 或 `-xxxx-mod-std-ipv6-64` 結尾，您可能使用的是不受支援的核心。 檢視我們的 [核心修改](../../../daemon/0.6/kernel_modifications.md) 指南瞭解詳細資訊。
:::

#### 在啟動時啟動 Docker

如果您使用的是帶有 systemd 的作業系統（Ubuntu 16+、Debian 8+、CentOS 7+），請執行以下命令以在您啟動機器時啟動 Docker。

```bash
systemctl enable --now docker
```

#### 啟用虛擬記憶體

在大多數系統上，預設情況下 Docker 將無法設定交換空間。您可以透過執行 `docker info` 並在底部附近查詢 `WARNING: No swap limit support` 的輸出來確認這一點。

啟用虛擬記憶體是完全可選的，但如果您要為他人託管並防止出現 OOM 錯誤，我們建議您這樣做。

要啟用虛擬記憶體，請以 root 使用者身份開啟 `/etc/default/grub` 並找到以 `GRUB_CMDLINE_LINUX_DEFAULT` 為開頭的一行。確保該行在雙引號內的某處包含 `swapaccount=1`。

之後，執行 `sudo update-grub` 然後執行 `sudo reboot` 重啟伺服器並啟用虛擬記憶體。
下面是該行內容示例，_請勿逐字複製此行。 它通常具有其他特定於作業系統的引數。_

```text
GRUB_CMDLINE_LINUX_DEFAULT="swapaccount=1"
```

::: tip GRUB 配置
一些 Linux 發行版可能會忽略 `GRUB_CMDLINE_LINUX_DEFAULT`。因此，如果預設的不適合您，您可能不得不使用 `GRUB_CMDLINE_LINUX`。
:::

## 安裝 Wings

安裝 Wings 的第一步是確保我們已經設定了所需的目錄結構。為此，請執行以下命令，這將建立基本目錄並下載 wings 可執行檔案。

::: danger
Wings 及配置檔案路徑已寫死，請不要想著更改路徑。（當然，你可以修改配置中的儲存路徑）     
並且 wings 檔案和配置檔案佔用空間很低，在配置完設定後自行備份配置檔案以防不測(如果真沒了，那也是整個伺服器沒了吧...)。
:::

```bash
mkdir -p /etc/pterodactyl
curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl-taiwan/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
chmod u+x /usr/local/bin/wings

# 若閣下在上條指令上無法正常拉取壓縮包或者拉取緩慢 可使用 gh-proxy 提供的CF反向代理來拉取
curl -L -o /usr/local/bin/wings "https://ghproxy.com/https://github.com/pterodactyl-taiwan/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
```

::: warning OVH/SYS 伺服器
如果您使用的是 OVH 或 SoYouStart 提供的伺服器，請注意您的主驅動器空間可能分配給 `/home`，而不是預設分配給 `/`。
請考慮使用 `/home/daemon-data` 來儲存伺服器資料。在建立節點時可以很容易地設定。
:::

## 配置

安裝 Wings 和所需元件後，下一步是在已安裝的面板上建立一個節點。轉到您的面板管理視窗，從側邊欄中選擇節點，然後在右側單擊建立新按鈕。

建立節點後，單擊它，將出現一個名為“配置”的選項卡。複製程式碼塊內容，將其貼上到 `/etc/pterodactyl` 中的一個名為 `config.yml` 的新檔案中並儲存。

或者，您可以單擊 “生成自動部署指令” 按鈕，複製 bash 命令並將其貼上到終端中。

![Wings 配置示例圖片](./../../.vuepress/public/wings_configuration_example.png)

::: warning
當您的面板使用 SSL 時，Wings 節點就必須使用域名解析，併為其域名也建立一個 SSL。在繼續之前，請參閱 [建立 SSL 證書](/tutorials/creating_ssl_certificates.html) 文件頁面瞭解如何建立這些證書。
:::

### 啟動 Wings

要啟動 Wings，只需執行以下命令，它將以除錯模式啟動。一旦你確認它執行沒有錯誤，使用 `CTRL+C` 來終止程序並按照下面的說明使用守護程序。根據您伺服器的網際網路連線，第一次拉取和啟動 Wings 可能需要幾分鐘時間。

```bash
sudo wings --debug
```

您可以選擇新增 `--debug` 引數以在除錯模式下執行 Wings。

### 守護程序（使用 systemd）

在後臺執行 Wings 是一項簡單的任務，只需在執行此操作之前確保它執行無誤即可。將下面的內容放在 `/etc/systemd/system` 目錄下的 `wings.service` 檔案中。

```text
[Unit]
Description=Pterodactyl Wings Daemon
After=docker.service
Requires=docker.service
PartOf=docker.service

[Service]
User=root
WorkingDirectory=/etc/pterodactyl
LimitNOFILE=4096
PIDFile=/var/run/wings/daemon.pid
ExecStart=/usr/local/bin/wings
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

然後，執行以下命令重新載入 systemd 並啟動 Wings。

```bash
systemctl enable --now wings
```

### 節點分配

分配是 IP 和埠的組合，您可以分配給伺服器。 每個建立的伺服器必須至少有一個分配。 分配將是您的網路介面的 IP 地址。 在某些情況下，例如在使用了 NAT 的情況下，它將是內部 IP。 要建立新分配，請轉到節點 > 您的節點 > 分配。

![節點分配示例圖](../../.vuepress/public/node_allocations.png)

輸入 `hostname -I | awk '{print $1}'` 查詢要用於分配的 IP。或者，您可以輸入 `ip addr | grep "inet "` 檢視所有可用的介面和 IP 地址。不要使用 127.0.0.1 進行分配。
