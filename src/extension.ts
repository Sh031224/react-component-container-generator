import * as vscode from "vscode";
import { workspace, window, commands } from "vscode";
import logger from "./lib/logger";
import { pascalCase } from "change-case";
import * as createFile from "./lib/createFile";
import createDir from "./lib/createDir";
import * as path from "path";
import * as fs from "fs";
import ContainerConfig from "./type/ContainerConfig";

const getConfig = (uri?: vscode.Uri) => {
  return workspace.getConfiguration(
    "ReactComponentContainerGenerator",
    uri
  ) as any;
};

export function activate(context: vscode.ExtensionContext) {
  const createComponent = async (uri: vscode.Uri, suffix: string) => {
    try {
      if (suffix === "component") {
        let componentName = await window.showInputBox({
          prompt: "Please enter component name."
        });

        componentName = componentName.replace(/[^A-Za-z]/g, "");

        if (!componentName || componentName.length === 0) {
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
        createFile.createStyle(componentDir, componentName, language);
        createFile.createIndex(componentDir, componentName, language);

        workspace
          .openTextDocument(fileName)
          .then((document) => vscode.window.showTextDocument(document));
      } else {
        let componentName = await window.showInputBox({
          prompt: "Please enter container name."
        });

        componentName = componentName.replace(/[^A-Za-z]/g, "");

        if (!componentName || componentName.length === 0) {
          logger("error", "Container name can not be empty");
          throw new Error("Container name can not be empty");
        }

        const language = await window.showQuickPick([
          "JavaScript",
          "TypeScript"
        ]);

        const containerConfig: ContainerConfig = getConfig().get(
          "containerFile"
        );

        let compName = pascalCase(componentName);

        if (containerConfig.name) {
          compName = compName.replace("Container", "") + "Container";
          componentName = pascalCase(componentName).replace("Container", "");
        }

        let contextMenuSourcePath: string;

        if (containerConfig.folder) {
          contextMenuSourcePath = createDir(uri, pascalCase(componentName));
        } else {
          if (uri && fs.lstatSync(uri.fsPath).isDirectory()) {
            contextMenuSourcePath = uri.fsPath;
          } else if (uri) {
            contextMenuSourcePath = path.dirname(uri.fsPath);
          } else {
            contextMenuSourcePath = workspace.rootPath;
          }
        }

        const fileName = createFile.createComponent(
          contextMenuSourcePath,
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
