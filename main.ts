import { App, Editor, MarkdownView, Plugin } from "obsidian";

export default class PreviewHiglight extends Plugin {
	async onload() {
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: "preview-highlight",
			name: "Highlight Selection",
			checkCallback: async (checking: boolean) => {
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					const mode = markdownView.getMode();
					if (mode === "preview") {
						if (!checking) {
							const selectedText = document
								.getSelection()
								.toString();
							const file = markdownView.file;
							const content = await this.app.vault.read(file);
							const higlighted = content.replace(
								new RegExp(selectedText, "g"),
								`==${selectedText}==`
							);
							this.app.vault.modify(file, higlighted);
						}

						return true;
					}
				}
			},
		});
	}

	onunload() {}
}
