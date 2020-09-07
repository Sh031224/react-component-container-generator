import * as vscode from "vscode";
import { workspace, window, commands } from "vscode";
import logger from "./lib/logger";
import { pascalCase } from "change-case";
import * as createFile from "./lib/createFile";
import createDir from "./lib/createDir";

export function activate(context: vscode.ExtensionContext) {
  const createComponent = async (uri: vscode.Uri, suffix: string) => {
    try {
      if (suffix === "component") {
        const componentName = await window.showInputBox({
          prompt: "Please enter component name."
        });

        if (componentName.length === 0) {
          logger("error", "Component name can not be empty");
          throw new Error("Component name can not be empty");
        }

        const language = await window.showQuickPick([
          "JavaScript",
          "TypeScript"
        ]);

        const componentDir = createDir(uri, componentName);

        const fileName = createFile.createComponent(
          componentDir,
          componentName,
          language,
          suffix
        );
        createFile.createStyle(componentDir, componentName);
        createFile.createIndex(componentDir, componentName, language);

        workspace
          .openTextDocument(fileName)
          .then((document) => vscode.window.showTextDocument(document));
      } else {
        const componentName = await window.showInputBox({
          prompt:
            'Please enter container name without "Container". It will automatically generated.'
        });

        if (componentName.length === 0) {
          logger("error", "Container name can not be empty");
          throw new Error("Container name can not be empty");
        }

        const language = await window.showQuickPick([
          "JavaScript",
          "TypeScript"
        ]);

        const compName =
          pascalCase(componentName).replace("Container", "") + "Container";

        const componentDir = createDir(
          uri,
          pascalCase(componentName).replace("Container", "")
        );

        const fileName = createFile.createComponent(
          componentDir,
          compName,
          language,
          suffix
        );

        workspace
          .openTextDocument(fileName)
          .then((document) => vscode.window.showTextDocument(document));
      }
    } catch (err) {
      logger("error", err.message);
      throw new Error(err.message);
    }
  };

  const componentArray = [
    {
      type: "component",
      commandId: "extension.genReactComponentFiles"
    },
    {
      type: "container",
      commandId: "extension.genReactContainerFiles"
    }
  ];

  componentArray.forEach((c) => {
    const suffix = `${c.type}`;
    const disposable = commands.registerCommand(c.commandId, (uri) =>
      createComponent(uri, suffix)
    );

    context.subscriptions.push(disposable);
  });
}

export function deactivate() {}
