kuya-proxy
==========

A helpfull little proxy for mobile testing

Install
=======

```
mkdir my_proxy
cd my_proxy
npm init # accept all defaults or whatever
npm install --save dunkfordyce/kuya-proxy
vim package.json # see below
node ./node_modules/kuya-proxy/index.js
```

Add these values to package.json:

```
  "auth_re": "(foo\\.co\\.uk|bar\\.co\\.uk|egg\\.co\\.uk)$",
  "auth": "my:user",
  "dev_src": "src_domain.co.uk",
  "dev_target" : "http://192.168.100.103:5003",
```

Anything matching auth_re will have the auth header automagically added. Anything matching dev_src will be proxied to dev_target

