/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2018, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

const simplejsonconf = require('simplejsonconf');
const path = require('path');
const fs = require('fs-extra');

const getConfigPath = (args, options) => args.config
  ? path.resolve(args.config)
  : path.resolve(options.root, 'src', 'config.json');

const getConfig = (args, options) => {
  const filename = getConfigPath(args, options);
  return fs.readJson(filename).then(json => ({
    filename,
    config: simplejsonconf(json)
  }));
};

const saveConfig = (conf, filename) =>
  fs.writeJson(filename, conf.get(), 'utf8')

const checkArguments = (args, required) => required.every(r => Object.keys(args).indexOf(r) !== -1)
  ? Promise.resolve(true)
  : Promise.reject(new Error(`Arguments --[${required.join(',')}] required`));

const saveAction = (args, options, cb) => getConfig(args, options)
  .then(({config, filename}) => {
    return cb(config, filename)
      .then(() => saveConfig(config, filename))
  });

const setAction = (args, options, method) => checkArguments(args, ['key', 'value'])
  .then(saveAction(args, options, config => {
    return Promise.resolve(config.set(args.key, args.value));
  }));

const removeAction = (args, options) => checkArguments(args, ['key'])
  .then(saveAction(args, options, config => {
    return Promise.resolve(config.remove(args.key, args.value));
  }));

const set = cli => ({args, options}) => setAction(args, options, 'set');
const push = cli => ({args, options}) => setAction(args, options, 'push');
const remove = cli => ({args, options}) => removeAction(args, options);
const get = cli => ({args, options}) => getConfig(args, options)
  .then(({config}) => args.key ? config.get(args.key) : config.get())
  .then(value => console.log(value));

module.exports = cli => ({
  'config:json:get': get(cli),
  'config:json:set': set(cli),
  'config:json:push': push(cli),
  'config:json:remove': remove(cli)
});
