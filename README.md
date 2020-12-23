<p align="center">
  <img alt="OS.js Logo" src="https://raw.githubusercontent.com/os-js/gfx/master/logo-big.png" />
</p>

[OS.js](https://www.os-js.org/) is an [open-source](https://raw.githubusercontent.com/os-js/OS.js/master/LICENSE) web desktop platform with a window manager, application APIs, GUI toolkit, filesystem abstractions and much more.

[![Support](https://img.shields.io/badge/patreon-support-orange.svg)](https://www.patreon.com/user?u=2978551&ty=h&u=2978551)
[![Support](https://img.shields.io/badge/opencollective-donate-red.svg)](https://opencollective.com/osjs)
[![Donate](https://img.shields.io/badge/liberapay-donate-yellowgreen.svg)](https://liberapay.com/os-js/)
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/andersevenrud)

# OS.js JSON Configuration CLI Module

Provices facility to maintain configuration files in JSON for OS.js.

Useful to automate writing configuration files via CLI commands.

## Installation

```shell
npm install @osjs/json-config-cli
```

## Usage

In your CLI bootstrap file (`src/cli/index.js`):

```javasript
const json = require('@osjs/osjs-json-config-cli');

module.exports = {
  tasks: [json]
};
```

To use a JSON file in your OS.js distro, ex `src/client/config.js`:

```javasript
import json from '../config.json';

// THIS IS JUST AN EXAMPLE. YOU PROBABLY WANT TO USE 'deepmerge' OR SOMETHING SIMILAR.
module.exports = Object.assign({
  // Your configuration
}, json);

```

> By default the configuration file is `src/config.json`, but you can specify this with `--config`.

You now have these tasks available:

* `config:json:get` - Get entire configuration tree
* `config:json:get --key=<string>` - Get given key
* `config:json:set --key=<string> --value=<*>` - Sets a value
* `config:json:push --key=<string> --value=<*>` - Adds a value to an array
* `config:json:remove --key=<string>` -- Removes an entry

See [simplejsonconf](https://github.com/andersevenrud/simplejsonconf) for more information about how this works.

## Contribution

* **Sponsor on [Github](https://github.com/sponsors/andersevenrud)**
* **Become a [Patreon](https://www.patreon.com/user?u=2978551&ty=h&u=2978551)**
* **Support on [Open Collective](https://opencollective.com/osjs)**
* [Contribution Guide](https://github.com/os-js/OS.js/blob/master/CONTRIBUTING.md)

## Documentation

See the [Official Manuals](https://manual.os-js.org/) for articles, tutorials and guides.

## Links

* [Official Chat](https://gitter.im/os-js/OS.js)
* [Community Forums and Announcements](https://community.os-js.org/)
* [Homepage](https://os-js.org/)
* [Twitter](https://twitter.com/osjsorg) ([author](https://twitter.com/andersevenrud))
* [Facebook](https://www.facebook.com/os.js.org)
* [Docker Hub](https://hub.docker.com/u/osjs/)
