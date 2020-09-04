// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  ExtensionContext,
  workspace,
  window,
  commands,
  DocumentFilter
} from "vscode";
import { paramCase } from "change-case";
import { Observable } from "rxjs";

const TEMPLATE_SUFFIX_SEPERATOR = "-";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const createComponent = (uri: vscode.Uri, suffix: string = "") => {
    // window.showWarningMessage(uri.authority);
    // Display a dialog to the user
    let enterComponentNameDialog$ = Observable.from(
      window.showInputBox({
        prompt: "Please enter component name."
      })
    );

    enterComponentNameDialog$.concatMap(async (val) => {
      if (val.length === 0) {
        throw new Error("Component name can not be empty!");
      }
      let componentName = paramCase(val);
      // let componentDir = FileHelper.createComponentDir(uri, componentName);
      // return Observable.forkJoin(
      //   FileHelper.createComponent(componentDir, componentName, suffix),
      //   FileHelper.createIndexFile(componentDir, componentName),
      //   FileHelper.createCSS(componentDir, componentName)
      // );
    });

    //   .concatMap((result) => Observable.from(result))
    //   .filter((path) => path.length > 0)
    //   .first()
    //   .concatMap((filename) =>
    //     Observable.from(workspace.openTextDocument(filename))
    //   )
    //   .concatMap((textDocument) => {
    //     if (!textDocument) {
    //       logger("error", "Could not open file!");
    //       throw new Error("Could not open file!");
    //     }
    //     return Observable.from(window.showTextDocument(textDocument));
    //   })
    //   .do((editor) => {
    //     if (!editor) {
    //       logger("error", "Could not open file!");
    //       throw new Error("Could not open file!");
    //     }
    //   })
    //   .subscribe(
    //     (c) => logger("success", "React component successfully created!"),
    //     (err) => logger("error", err.message)
    //   );
  };

  const componentArray = [
    {
      type: "component",
      commandId: "extension.genReactComponentFiles"
    }
  ];

  // // The command has been defined in the package.json file
  // // Now provide the implementation of the command with  registerCommand
  // // The commandId parameter must match the command field in package.json
  componentArray.forEach((c) => {
    const suffix = `${TEMPLATE_SUFFIX_SEPERATOR}${c.type}`;
    const disposable = commands.registerCommand(c.commandId, (uri) =>
      createComponent(uri, suffix)
    );

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(disposable);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
