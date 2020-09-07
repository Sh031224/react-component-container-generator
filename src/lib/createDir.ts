import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import { pascalCase } from "change-case";
import { Uri, workspace } from "vscode";

export default (uri: Uri, componentName: string): string => {
  let contextMenuSourcePath: string;

  if (uri && fs.lstatSync(uri.fsPath).isDirectory()) {
    contextMenuSourcePath = uri.fsPath;
  } else if (uri) {
    contextMenuSourcePath = path.dirname(uri.fsPath);
  } else {
    contextMenuSourcePath = workspace.rootPath;
  }

  let componentDir = `${contextMenuSourcePath}/${pascalCase(componentName)}`;
  fse.mkdirsSync(componentDir);

  return componentDir;
};
