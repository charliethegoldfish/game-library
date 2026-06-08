import { App, PluginSettingTab, Setting } from 'obsidian';
import GameLibrary from './main';

export interface GameLibrarySettings {
	gameLibraryPath: string;
}

export const DEFAULT_SETTINGS: GameLibrarySettings = {
	gameLibraryPath: '',
};

export class GameLibrarySettingTab extends PluginSettingTab {
	plugin: GameLibrary;

	constructor(app: App, plugin: GameLibrary) {
		super(app, plugin);
		this.plugin = plugin;
	}

	getSettingDefinitions() {
		return [
			{
				name: "Game library path",
				desc: "Path to the root of where the game library will be stored.",
				control: {
					type: 'folder',
					key: 'gameLibraryPath',
					placeholder: 'Choose root folder for game library',
				},
			},
		];
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Game library path')
			.setDesc("Path to the root of where the game library will be stored.")
			.addSearch((search) => {
				search.setValue(this.plugin.settings.gameLibraryPath)
				.setPlaceholder('Choose root folder for game library')
				.onChange(async (value) => {
					this.plugin.settings.gameLibraryPath = value;
					await this.plugin.saveSettings();
				});
				
			});

	}
}
