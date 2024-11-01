import { App, Editor, MarkdownView, Modal, CachedMetadata, Notice, Plugin, Setting, TFile, addIcon, requestUrl, Menu, RequestUrlParam, ButtonComponent } from 'obsidian';
import { WeChatPublicSettingTab } from "./src/settingTab"
import ApiManager from 'src/api';
import { settingsStore } from 'src/settings';
import { FrontMatterManager } from 'utils/frontmatter';
import { WeChatUploadMaterialModal, WeChatDownloadMaterialModal, OpenFileModal, CoverIDSuggestModal, FileSuggestModal, YoutubeDownloadModal } from 'src/showModals';
import { CoverInfo } from 'src/models';
import { splitPathAndFile } from 'utils/path';
import { MP_ICON } from 'src/mp-icon';

export default class WeChatPublic extends Plugin {
	frontManager: FrontMatterManager;
	apiManager: ApiManager;

	async onload() {
		// new Notice('Loading WeChatPublic plugin at ' + new Date().toLocaleString())
		settingsStore.initialise(this);
		this.frontManager = new FrontMatterManager(this.app);
		this.apiManager = new ApiManager(this.app, this.manifest);


		addIcon("mp", MP_ICON);
		// This creates an icon in the left ribbon.
		const ribbonIconE2 = this.addRibbonIcon('mp', '发布草稿', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			// new Notice('你点击了发布到草稿!');

			const file = this.app.workspace.getActiveFile()
			if (file === undefined || !file || file.extension !== 'md') {
				console.log(`file is not a markdown file: ${file?.path}`);
				return
			} else {
				this.sendNoteToDraft(file)
			}
		});


		this.addCommand({
			id: 'add-draft-to-wechat-platform',
			name: 'add draft to wechat platform',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const file = view.file
				this.sendNoteToDraft(file!)
			}
		});


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new WeChatPublicSettingTab(this.app, this, this.apiManager));
	}

	// onunload() {
	// 	new Notice('unloading WeChatPublic plugin at ' + new Date().toLocaleString())
	// }

	async sendNoteToDraft(file: TFile) {
		let filePath = "";
		if (file?.path !== undefined) {
			filePath = splitPathAndFile(file?.path)[0];
		}
		const basename = file?.basename
		const text = await this.frontManager.removeFrontMatter(file!)
		// console.log(text);
		let cache = this.app.metadataCache.getFileCache(file!);
		if (cache?.frontmatter === undefined || cache?.frontmatter!["thumb_media_id"] === undefined &&
			cache?.frontmatter!["banner"] === undefined &&
			cache?.frontmatter!["banner_path"] === undefined &&
			(cache?.frontmatter!["封面图片"] === undefined || !cache?.frontmatter!["封面图片"])
		
		) {
			// const covers = await this.apiManager.getArticleCover()
			// if (covers === undefined) {
			// 	return
			// }
			// new CoverIDSuggestModal(this.app, covers, async (cover: CoverInfo) => {
			// 	await this.apiManager.newDraftToWechat(filePath, basename!, text, cache?.frontmatter!, cover.mediaID);
			// }).open();
			new Notice('没有设置封面图片，不能发布到微信公众号！')
			return
		} else {
			await this.apiManager.newDraftToWechat(filePath, basename!, text, cache?.frontmatter!)
		}
	}
}
