import { workspace, Uri, window } from "vscode";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import { pascalCase } from "change-case";
import GlobalConfig from "../type/GlobalConfig";
import ComponentConfig from "../type/ComponentConfig";
import StyleConfig from "../type/StyleConfig";

const assetRootDir: string = path.join(__dirname, "../../../assets");

const createFile = (file: string, data: string) => fse.outputFile(file, data);

const getConfig = (uri?: Uri) => {
  return workspace.getConfiguration(
    "ReactComponentContainerGenerator",
    uri
  ) as any;
};

export const createComponent = (
  componentDir: string,
  componentName: string,
  language: string,
  suffix: string
) => {
  const globalConfig: GlobalConfig = getConfig().get("global");
  const componentConfig: ComponentConfig = getConfig().get("componentFile");
  const styleConfig: StyleConfig = getConfig().get("styleFile");
  const languageName: string = language === "JavaScript" ? "js" : "tsx";
  let oSuffix: string = `${suffix}-${componentConfig.type}-${languageName}`;

  let templateFileName = assetRootDir + `/template/${oSuffix}.template`;

  const compName = pascalCase(componentName);
  let styleContent: string = "";

  if (styleConfig.create) {
    styleContent = `import {quotes}./{componentName}.${styleConfig.type}{quotes}{semi}\n`;
  }

  let componentContent = fs
    .readFileSync(templateFileName)
    .toString()
    .replace(/{style}/g, styleContent)
    .replace(/{componentName}/g, compName)
    .replace(/{quotes}/g, globalConfig.quotes === "double" ? '"' : "'")
    .replace(/{semi}/g, globalConfig.semi ? ";" : "");

  let filename = `${componentDir}/${compName}.${languageName}`;

  console.log(componentContent, filename);
  createFile(filename, componentContent);

  return filename;
};

export const createStyle = (componentDir: string, componentName: string) => {
  const styleConfig: StyleConfig = getConfig().get("styleFile");

  if (styleConfig.create) {
    let templateFileName = assetRootDir + `/template/style.template`;

    const compName = pascalCase(componentName);

    let componentContent = fs.readFileSync(templateFileName).toString();

    let filename = `${componentDir}/${compName}.${styleConfig.type}`;

    createFile(filename, componentContent);
  } else {
    return;
  }
};

export const createIndex = (
  componentDir: string,
  componentName: string,
  language: string
) => {
  const globalConfig: GlobalConfig = getConfig().get("global");
  const languageName: string = language === "JavaScript" ? "js" : "ts";

  let templateFileName = assetRootDir + `/template/index.template`;

  const compName = pascalCase(componentName);

  let componentContent = fs
    .readFileSync(templateFileName)
    .toString()
    .replace(/{componentName}/g, compName)
    .replace(/{quotes}/g, globalConfig.quotes === "double" ? '"' : "'")
    .replace(/{semi}/g, globalConfig.semi ? ";" : "");

  let filename = `${componentDir}/index.${languageName}`;

  createFile(filename, componentContent);
};
