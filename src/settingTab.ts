import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import { get } from "svelte/store";
import WeChatPublic from "../main";
import ApiManager from "./api";
import { buyMeACoffee, commutity, motivation } from "./consts/global";
import { settingsStore } from "./settings";

export class WeChatPublicSettingTab extends PluginSettingTab {
	plugin: WeChatPublic;
	private apiManager: ApiManager;
	readonly expireDuration: number = 7200;

	constructor(app: App, plugin: WeChatPublic, apiManeger: ApiManager) {
		super(app, plugin);
		this.plugin = plugin;
		this.apiManager = apiManeger;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		new Setting(containerEl)
			.setName("微信公众号平台")
			.setHeading();
		if (
			get(settingsStore).lastAccessKeyTime + this.expireDuration <
			new Date().getTime()
		) {
			this.showWxLogin();
		} else {
			this.showWxLogout();
		}

		this.setAppId();
		this.setSecret();
		this.downloadCustomCss();

		this.donation(containerEl);
	}

	private showWxLogout(): void {
		document.createRange().createContextualFragment;
		const desc = document
			.createRange()
			.createContextualFragment(
				`If you want to clean secret,please click at clean secret`
			);

		new Setting(this.containerEl)
			.setName(
				`Wechat platform haved login, APP-ID: ${
					get(settingsStore).appid
				}`
			)
			.setDesc(desc)
			.addButton((button) => {
				return button
					.setButtonText("清除 secret")
					.setCta()
					.onClick(async () => {
						button.setDisabled(true);
						settingsStore.actions.clearSecret();
						this.display();
					});
			})
			.addButton((button) => {
				return button
					.setButtonText("复制 access key")
					.setCta()
					.onClick(async () => {
						const accesskey = get(settingsStore).accessToken;
						navigator.clipboard.writeText(accesskey).then(
							function () {
								new Notice(
									"复制 access-key 到剪贴板!"
								);
							},
							function (error) {
								new Notice(
									"Copy access-key to clipboard failed!"
								);
								console.error(
									"Copy access-key to clipboard failed!",
									error
								);
							}
						);
					});
			});
	}

	private showWxLogin(): void {
		const desc = document
			.createRange()
			.createContextualFragment(
				// `Before the test, enter [appid] and [secretkey], and contact the administrator to whitelist your external IP address. https://tool.lu/ip/`
				`测试之前，请输入 [appid] 和 [secretkey], 并把本机公网的IP地址加到微信公众号平台的IP白名单中。这个网址可以检测电脑的公网IP： <a href="https://tool.lu/ip/">https://tool.lu/ip/</a>`
			);

		new Setting(this.containerEl)
			.setName("测试微信公众号 API")
			.setDesc(desc)
			.addButton((button) => {
				return button
					.setButtonText("开始测试")
					.setCta()
					.onClick(async () => {
						button.setDisabled(true);
						// reqest access token key
						await this.apiManager.refreshAccessToken(
							get(settingsStore).appid,
							get(settingsStore).secret
						);
						this.display();
					});
			});
	}


	private setAppId(): void {
		new Setting(this.containerEl)
			.setName("设置 appid")
			// .setDesc("wechat public platform account appid")
			.setDesc("微信公众号平台账号的 appid")
			.addText((text) =>
				text
					.setPlaceholder("公众号的 appid")
					.setValue(get(settingsStore).appid)
					.onChange(async (value) => {
						settingsStore.actions.setAppId(value);
					})
			);
	}

	private setSecret(): void {
		new Setting(this.containerEl)
			.setName("设置 secret")
			.setDesc("微信公众号平台账号的 secret")
			.addText((text) =>
				text
					.setPlaceholder("公众号的 secret")
					.setValue(get(settingsStore).secret)
					.onChange(async (value) => {
						settingsStore.actions.setSecret(value);
					})
			);
	}

	// private setNoteLocationFolder(): void {
	// 	new Setting(this.containerEl)
	// 		.setName("Note location folder")
	// 		.setDesc("for future using")
	// 		.addText((input) => {
	// 			input
	// 				.setPlaceholder("ur wechat release folder")
	// 				.setValue(get(settingsStore).noteLocationFolder)
	// 				.onChange((value: string) => {
	// 					settingsStore.actions.setNoteLocationFolder(value);
	// 				});
	// 		});
	// }

	private downloadCustomCss(): void {
		new Setting(this.containerEl)
			.setName("定制的 css")
			.setDesc("自定义文章的排版格式")
			.addButton((button) => {
				button.setButtonText("下载");
				button.onClick(async () => {
					button.setButtonText("下载中 ...");
					await this.plugin.apiManager.downloadCustomCss();
					button.setButtonText("下载完成");
				});
			})
			.addButton((button) => {
				button.setButtonText("清除");
				button.onClick(async () => {
					await this.plugin.apiManager.removeCustomCss();
				});
			})
			.addButton((button) => {
				button.setIcon("folder-open");
				button.onClick(async () => {
					await this.plugin.apiManager.openPluginFolder();
				});
			});
	}


	private donation(containerEl: HTMLElement): void {
		new Setting(containerEl)
			.setName("💰 支持与资助 💰")
			.setHeading();
		containerEl.createEl("br");
		let div = containerEl.createEl("div");

		const donateText = document.createElement("div");
		div.innerHTML = 
		// donateText.appendText(
			`本插件只是对原插件<a href="https://github.com/ai-chen2050/obsidian-wechat-public-platform/" >【obsidian-wechat-public-platform】</a>进行了简化魔改，以方便我自己的使用。 致敬原作者，欢迎各位到他的 github 页面上打赏, 支持原作者继续开发：` 
		// );
		donateText.style.textAlign = "center";
		donateText.style.width = "70%";
		donateText.style.margin = "0 auto";
		div.appendChild(donateText);
		div = this.createDonateQRC(div);

		div.appendChild(containerEl.createEl("br"));
		const donateTextZH = document.createElement("p");
		donateTextZH.appendText(
			"如果您觉得这个插件帮助到您了，为您提供了价值，欢迎赞助我以持续开发迭代本插件。" +
				"您可以使用如下微信/ WeChat 二维码以赞助开发者: 🧡🧡 👏🏻👏🏻"
		);
		donateTextZH.style.textAlign = "center";
		donateTextZH.style.width = "70%";
		donateTextZH.style.margin = "0 auto";
		div.appendChild(donateTextZH);

		div.appendChild(containerEl.createEl("br"));
		const parser = new DOMParser();

		div.appendChild(
			this.createDonateButton(
				"https://www.buymeacoffee.com/blakechan",
				parser.parseFromString(buyMeACoffee, "text/xml").documentElement
			)
		);
	}

	private createDonateButton(link: string, img: HTMLElement): HTMLElement {
		const a = document.createElement("a");
		a.setAttribute("href", link);
		a.style.margin = "40%";
		a.appendChild(img);
		return a;
	}

	private createDonateQRC(div: HTMLDivElement): HTMLDivElement {
		const table = document.createElement("table");
		// 创建第一行
		const row1 = document.createElement("tr");

		// 创建第一个单元格
		const cell1 = document.createElement("td");
		const text1 = document.createElement("p");
		cell1.appendChild(text1);
		row1.appendChild(cell1);

		// 创建第二个单元格
		const cell2 = document.createElement("td");
		const text2 = document.createElement("p");
		cell2.appendChild(text2);
		row1.appendChild(cell2);

		// 创建第二行
		const row2 = document.createElement("tr");

		// 创建第三个单元格并添加第三张图片
		const cell3 = document.createElement("td");
		const img3 = document.createElement("img");
		img3.src = motivation;
		img3.style.width = "200px";
		img3.style.height = "auto";
		img3.style.margin = "0 10px";
		cell3.appendChild(img3);
		row2.appendChild(cell3);

		// 创建第四个单元格并添加第四张图片
		const cell4 = document.createElement("td");
		const img4 = document.createElement("img");
		img4.src = commutity;
		img4.style.width = "200px";
		img4.style.height = "auto";
		img4.style.margin = "0 10px";
		cell4.appendChild(img4);
		row2.appendChild(cell4);

		table.appendChild(row1);
		table.appendChild(row2);

		table.style.margin = "0 auto";
		div.appendChild(table);
		return div;
	}
}
