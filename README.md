# React Component & Container Generation for VSCode

[![Version](https://vsmarketplacebadge.apphb.com/version/sh031224.react-component-container-generator.svg)](https://marketplace.visualstudio.com/items?itemName=sh031224.react-component-container-generator)
[![The MIT License](https://flat.badgen.net/badge/license/MIT/orange)](http://opensource.org/licenses/MIT)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/sh031224.react-component-container-generator.svg)](https://marketplace.visualstudio.com/items?itemName=sh031224.react-component-container-generator)
[![GitHub](https://flat.badgen.net/github/release/sh031224/react-component-container-generator)](https://github.com/Sh031224/react-component-container-generator/releases)

## Description

Generates React component & container files automatically.

## Usage

<br />

![component](assets/images/usage_1.gif)

![container](assets/images/usage_2.gif)

## Configuration

You can change to the extension's settings through VSCode settings. You can customize:

### `ReactComponentContainerGenerator.global.quotes`

The type of quotes

- `single`
- `double` (default)

### `ReactComponentContainerGenerator.global.semi` (default: `true`)

Whether to add a semicolon at the end of the sentence.

<br/>

### `ReactComponentContainerGenerator.componentFile.type`

The type of generated component file

- `func` (default)
- `class`

### `ReactComponentContainerGenerator.componentFile.js`

Javascript file extension js or jsx.

- `jsx` (default)
- `js`

### `ReactComponentContainerGenerator.containerFile.folder` (default: `true`)

Whether to create a folder when creating a container

<br />

### `ReactComponentContainerGenerator.containerFile.name` (default: `true`)

Automatic container naming

<br />

### `ReactComponentContainerGenerator.styleFile.create` (default: `true`)

Whether to generate component's style file or not

<br />

### `ReactComponentContainerGenerator.styleFile.type`

The extension of stylesheet file to create

- `css`
- `sass`
- `scss` (default)
- `less`
- `styled-component`

## ChangeLog

### [Click here](CHANGELOG.md)

## Bugs

Please report [here](https://github.com/sh031224/react-component-container-generator/issues)
