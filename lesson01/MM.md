<details>
    <summary><b>Commands to use while building</b></summary>

```groovy
clement@Clements-MacBook-Pro nestjs-series % npm i -g @nestjs/cli


added 211 packages in 29s

39 packages are looking for funding
  run `npm fund` for details
clement@Clements-MacBook-Pro nestjs-series %
clement@Clements-MacBook-Pro nestjs-series % nest new lesson01
✨  We will scaffold your app in a few seconds..

✔ Which package manager would you ❤️  to use? npm
CREATE lesson01/.prettierrc (52 bytes)
CREATE lesson01/README.md (5028 bytes)
CREATE lesson01/eslint.config.mjs (899 bytes)
CREATE lesson01/nest-cli.json (171 bytes)
CREATE lesson01/package.json (1978 bytes)
CREATE lesson01/tsconfig.build.json (97 bytes)
CREATE lesson01/tsconfig.json (677 bytes)
CREATE lesson01/src/app.controller.ts (274 bytes)
CREATE lesson01/src/app.module.ts (249 bytes)
CREATE lesson01/src/app.service.ts (142 bytes)
CREATE lesson01/src/main.ts (228 bytes)
CREATE lesson01/src/app.controller.spec.ts (617 bytes)
CREATE lesson01/test/jest-e2e.json (183 bytes)
CREATE lesson01/test/app.e2e-spec.ts (725 bytes)

✔ Installation in progress... ☕

🚀  Successfully created project lesson01
👉  Get started with the following commands:

$ cd lesson01
$ npm run start


                          Thanks for installing Nest 🙏
                 Please consider donating to our open collective
                        to help us maintain this package.


               🍷  Donate: https://opencollective.com/nest

clement@Clements-MacBook-Pro nestjs-series %
PS C:\My-Stuffs\sprint-7\nestjs-series\lesson01> nest g module users
CREATE src/users/users.module.ts (86 bytes)
UPDATE src/app.module.ts (322 bytes)
PS C:\My-Stuffs\sprint-7\nestjs-series\lesson01> nest g controller users
CREATE src/users/users.controller.ts (103 bytes)
CREATE src/users/users.controller.spec.ts (503 bytes)
UPDATE src/users/users.module.ts (195 bytes)
PS C:\My-Stuffs\sprint-7\nestjs-series\lesson01> nest g service users
CREATE src/users/users.service.ts (93 bytes)
CREATE src/users/users.service.spec.ts (471 bytes)
UPDATE src/users/users.module.ts (255 bytes)
PS C:\My-Stuffs\sprint-7\nestjs-series\lesson01>
```

</details>

<br/><hr/><br/>
