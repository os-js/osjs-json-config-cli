<p align="center">
  <img alt="OS.js Logo" src="https://raw.githubusercontent.com/os-js/gfx/master/logo-big.png" />
</p>

[OS.js](https://www.os-js.org/) is an [open-source](https://raw.githubusercontent.com/os-js/OS.js/master/LICENSE) desktop implementation for your browser with a fully-fledged window manager, Application APIs, GUI toolkits and filesystem abstraction.

[![Community](https://img.shields.io/badge/join-community-green.svg)](https://community.os-js.org/)
[![Donate](https://img.shields.io/badge/liberapay-donate-yellowgreen.svg)](https://liberapay.com/os-js/)
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=andersevenrud%40gmail%2ecom&lc=NO&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
[![Support](https://img.shields.io/badge/patreon-support-orange.svg)](https://www.patreon.com/user?u=2978551&ty=h&u=2978551)

# OS.js v3 JSON Configuration CLI Module

Provices facility to maintain configuration files in JSON for OS.js v3

## Usage

In your CLI bootstrap file (`src/cli/index.js`):

```
const json = require('@osjs/osjs-json-config-cli');

module.exports = [json];
```

To use a JSON file in your OS.js distro, ex `src/client/config.js`:

```
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
