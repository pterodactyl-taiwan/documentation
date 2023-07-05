<template>
    <div class="home">
        <div class="header section bg-blue text-grey-lightest less-padding emphasize">
            <div class="container z-10">
                <div class="text-center">
                    <div>
                        <img class="max-w-xl w-full inline-block" src="https://cdn.pterodactyl.io/logos/new/pterodactyl_logo_transparent.png"
                            alt="Pterodactyl-Taiwan">
                    </div>
                    <div class="mt-4">
                        <!-- <a class="btn hidden md:inline-block" href="https://demo.pterodactyl.io" target="_blank" rel="nofollow noopener">Demo</a> -->
                        <router-link class="btn inline-block" to="/panel/getting_started.html">讓我們開始吧！</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="section bg-white">
            <div class="container text-center">
                <h1 class="text-blue mb-4">翼龍面板</h1>
                <h3 class="border-0 font-normal leading-normal mx-auto" style="max-width: 50rem">
                    Pterodactyl&reg; 是一個免費的開源遊戲伺服器管理面板，使用 PHP、React 和 Go 構建。Pterodactyl 在設計時考慮了安全性，在隔離的 Docker
                    容器中執行所有遊戲伺服器，同時向終端使用者展示了美觀直觀的 UI。
                </h3>
                <h3 class="border-0 leading-normal mx-auto mt-4" style="max-width: 50rem">
                    不要再安於現狀了。讓該面板成為您遊戲伺服器是上上之選。
                </h3>
                <img class="max-w-lg w-full m-4 inline-block"
                    src="https://cdn.pterodactyl.io/site-assets/mockup-macbook-grey-1.0.png">
            </div>
        </div>
        <div class="section bg-blue text-grey-lightest">
            <div class="container text-center">
                <h1 class="mb-4">為什麼選擇翼龍&reg;</h1>
                <div class="flex flex-wrap">
                    <div class="feature">
                        <span><i class="icon icon-lock"></i></span>
                        <h3>安全至上</h3>
                        <p>安全性是該專案的首要目標，具有 bcrypt 雜湊、AES-256-CBC 加密和開箱即用的 HTTPS 支援。</p>
                    </div>
                    <div class="feature">
                        <span><i class="icon icon-beaker"></i></span>
                        <h3>現代化工具</h3>
                        <p>建立在現代堆疊上，利用最佳設計實踐，使其易於進入和修改。</p>
                    </div>
                    <div class="feature">
                        <span><i class="icon icon-anchor"></i></span>
                        <h3>以Docker為核心</h3>
                        <p>所有伺服器都在隔離的Docker容器中執行，限制了攻擊媒介，提供了嚴格的資源限制，並提供了為每個特定遊戲量身定做的環境。</p>
                    </div>
                    <div class="feature">
                        <span><i class="icon icon-wallet"></i></span>
                        <h3>免費和開源</h3>
                        <p>翼龍是100%免費的，並在MIT許可下授權。我們所有的程式碼也是完全開源的。</p>
                    </div>
                    <div class="feature">
                        <span><i class="icon icon-browser"></i></span>
                        <h3>對使用者友好</h3>
                        <p>把憤怒的點選和尖叫留給《守望先鋒》吧。翼龍的介面設計得非常好，甚至連半藏都能使用它。</p>
                    </div>
                    <div class="feature">
                        <span><i class="icon icon-expand"></i></span>
                        <h3>可擴充套件性</h3>
                        <p>無論你是一家IDC服務商，還是下一個Hyplex，又或者是一起玩遊戲的好朋友，我們都能為你提供服務。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section bg-white">
            <div class="text-center">
                <h1>螢幕截圖</h1>
                <div class="screenshots">
                    <slick ref="slick" :options="slickOptions">
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-1.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-1.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-2.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-2.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-3.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-3.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-4.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-4.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-5.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-5.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-6.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-6.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-7.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-7.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-8.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-8.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-9.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-9.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-10.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-10.png">
                        </a>
                        <a href="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-11.png">
                            <img src="https://cdn.pterodactyl.io/site-assets/carousel/screenshot-11.png">
                        </a>
                    </slick>
                </div>
            </div>
        </div>
        <div class="section bg-blue text-grey-lightest">
            <div class="container text-center">
                <h1>開始吧</h1>
                <p class="m-4">準備好在翼龍號上飛翔了嗎？</p>
                <div class="mt-4">
                    <router-link class="btn inline-block" to="/project/introduction.html">關於本專案</router-link>
                    <a class="btn inline-block" href="https://kook.top/0Grsf5">KOOK</a>
                    <a class="btn inline-block" href="https://bbs.pterodactyl-taiwan.github.io">翼龍臺灣社群</a>
                </div>
            </div>
        </div>
        <div class="section bg-black text-grey-lighter text-sm less-padding">
            <div class="container text-center">
                <div>
                    <img class="h-20" :src="$withBase('logos/banner_logo.png')" alt="pterodactyl banner logo">
                </div>
                <div class="text-left md:flex">
                    <div class="flex-none w-full md:w-1/2 md:pr-12">
                        <p class="my-4">
                            自2015年以來，Pterodactyl&reg;一直在提供強大、高效能和安全的軟體，使個人、網路和IDC服務商輕鬆地大規模執行遊戲伺服器。最重要的是？沒有高昂的月費！
                        </p>
                        <p class="my-4">
                            今天就開始吧，看看為什麼成千上萬的使用者信任Pterodactyl&reg;來管理他們的遊戲伺服器。
                        </p>
                        <p class="my-4">
                            “翼龍臺灣” 為 Vlssu進行維護的翼龍第三方臺灣化分支，非官方版本。翼龍官方官網：pterodactyl.io
                        </p>
                    </div>
                    <div class="hidden md:block md:flex-1 md:pr-12">
                        <p><a class="text-grey-lightest" href="https://github.com/pterodactyl-taiwan">GitHub</a></p>
                        <p><a class="text-grey-lightest" href="https://afdian.net/a/vlssu">贊助我們</a></p>
                        <p><a class="text-grey-lightest" href="/panel/troubleshooting.html">疑難解答</a></p>
                        <p><a class="text-grey-lightest" href="https://github.com/parkervcp/eggs">額外的遊戲配置</a></p>
                    </div>
                    <div class="text-center mt-8 md:flex-1 md:mt-0">
                        <a href="https://kook.top/0Grsf5" target="_blank" rel="nofollow noopener">
                            <img src="https://api.pterodactyl-taiwan.github.io/site-assets/kook.png" class="w-3/4">
                        </a>
                    </div>
                </div>
                <div class="footer">MIT Licensed | Pterodactyl&reg; Copyright &copy; 2015 - 2022 Dane Everitt &
                    contributors. | Sinicizated by Pterodactyl-Taiwan&reg; | <a href="https://beian.miit.gov.cn">贛ICP備2023000574號-7</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavLink from './NavLink.vue';
    import Slick from './SlickCarousel.vue';

    export default {
        components: { NavLink, Slick },
        data() {
            return {
                slickOptions: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '0',
                    speed: 1000,
                    autoplay: true,
                    variableWidth: true,
                    arrows: false,
                    dots: true,
                    pauseOnHover: false,
                    pauseOnDotsHover: true,
                },
            }
        },
        computed: {
            data() {
                return this.$page.frontmatter;
            },
            actionLink() {
                return {
                    link: this.data.actionLink,
                    text: this.data.actionText
                };
            }
        },
    };
</script>
