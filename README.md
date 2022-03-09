### Hexlet tests and linter status:
[![Actions Status](https://github.com/SkrMkr/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/SkrMkr/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/42f76557b5d22686c93f/maintainability)](https://codeclimate.com/github/SkrMkr/frontend-project-lvl2/maintainability)
[![CI](https://github.com/SkrMkr/frontend-project-lvl2/actions/workflows/ci.yml/badge.svg)](https://github.com/SkrMkr/frontend-project-lvl2/actions/workflows/ci.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/42f76557b5d22686c93f/test_coverage)](https://codeclimate.com/github/SkrMkr/frontend-project-lvl2/test_coverage)

### Difference Calculator: 

The program compares two configuration files. The utility takes two arguments via the command line - the paths to these files. The comparison result can be displayed in different formats.
___

#### Setup
There are three steps to installation.
1. Clone this repository;
2. Execute the command `make install;
3. To install a package from the operating system, use the command `npm link.
4. To start program `gendiff -h

The last command displays help information for the utility.

```
gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

**Important clarification**: the utility works with both relative and absolute paths.

The diff is based on how the files have changed relative to each other. Data can be output in three formatters: 

+ Stylish
[![asciicast](https://asciinema.org/a/BbneC9w15HzbkW4UvtQ0Yfhzl.svg)](https://asciinema.org/a/BbneC9w15HzbkW4UvtQ0Yfhzl)

+ Plain
[![asciicast](https://asciinema.org/a/wgZdLC2S3MXJNdtQDuY3rWaFa.svg)](https://asciinema.org/a/wgZdLC2S3MXJNdtQDuY3rWaFa)

+ Json
  [![asciicast](https://asciinema.org/a/54ix4K13oa4xFsEh3e5wZ5bZd.svg)](https://asciinema.org/a/54ix4K13oa4xFsEh3e5wZ5bZd)

