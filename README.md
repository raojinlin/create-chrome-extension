# Create Chrome Extension


`@raojinlin/create-chrome-extension`可以快速生成一个使用React和Ant Destign的Chrome扩展应用。

[![asciicast](https://asciinema.org/a/608318.svg)](https://asciinema.org/a/608318)


## 命令行参数

```bash
usage: index.js [-h] [-v] [-p PACKAGE] [-d DESCRIPTION] [-e EXTENSION_NAME] [-x EXTENSION_DESCRIPTION] project-directory

Create chrome extension

positional arguments:
  project-directory

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -p PACKAGE, --package PACKAGE
                        Package name
  -d DESCRIPTION, --description DESCRIPTION
                        Package description
  -e EXTENSION_NAME, --extension-name EXTENSION_NAME
                        Extension name
  -x EXTENSION_DESCRIPTION, --extension-description EXTENSION_DESCRIPTION
                        Extension description

```

## 创建扩展应用
1. 确保你的计算机上已经安装了Node.js的版本为16.0.0或更高版本。如果尚未安装，请访问Node.js官方网站（https://nodejs.org/）并按照指示安装。

2. 打开终端或命令提示符，并使用以下命令创建一个新的Chrome扩展项目：

```
npx @raojinlin/create-chrome-extension my-extension
```

这将使用npx工具创建一个名为"my-extension"的新Chrome扩展项目。

或者使用参数一键创建Chrome扩展项目：

```
npx @raojinlin/create-chrome-extension my-extension --package MyChromeExtension --description 'My Chrome extension' --extension-name 'My Chrome Extension' --extension-description 'My Chrome Extension Description' 
```

3. 在项目目录中，你可以开始编写扩展代码。首先，进入项目目录：

```
cd my-extension
```

4. 创建你的React组件和扩展的其他页面。你可以在项目中的`src`目录中创建React组件，并根据需要创建其他页面。

5. 修改Chrome扩展的清单文件（`src/manifest.[env].json`），以定义你的扩展的行为和设置。确保在清单文件中包括你的React页面。

6. 构建你的React应用，以便将其包含在Chrome扩展中。使用以下命令构建React应用：

```
npm run build
```

这将生成一个`extension`文件夹，其中包含了打包后的React应用。

8. 最后，使用Chrome浏览器的开发者模式加载你的扩展。打开Chrome浏览器，转到扩展管理页面（chrome://extensions/），启用"开发者模式"，然后点击"加载已解压的扩展"并选择你项目中的`extension`文件夹。

你的Chrome扩展应用现在应该加载并在浏览器中可用。你可以根据需要进一步自定义和配置扩展的功能和外观。

请注意，这只是一个基本的创建Chrome扩展应用，具体的配置和功能取决于你的项目需求。你可能需要查阅Chrome扩展开发文档以深入了解如何定制你的扩展。


另外，生成的代码使用```chrome-extension-react-antd-template```模板。关于代码的开发请参考：[README.md](https://github.com/raojinlin/chrome-extension-react-antd-template/blob/master/README.md)