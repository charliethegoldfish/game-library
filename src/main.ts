import {
	Modal,
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	GameLibrarySettings,
	GameLibrarySettingTab,
} from './settings';

export default class GameLibrary extends Plugin {
	settings!: GameLibrarySettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'add-game',
			name: 'Add game to library',
			callback: () => {
				new AddGameModal(this.app).open();
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new GameLibrarySettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<GameLibrarySettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class AddGameModal extends Modal {
	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
