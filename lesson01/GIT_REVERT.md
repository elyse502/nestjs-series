<details>
    <summary><b>Why does a project created using nest creates it's own .git folder?</b></summary>

That's expected behavior if you create a new NestJS project using the default CLI settings.

When you run:

```bash
nest new lesson01
```

the Nest CLI initializes a **new Git repository** inside the project by running something equivalent to:

```bash
git init
```

This is convenient when you're creating a standalone application, since you can start version-controlling it immediately.

### Why it causes your error

Suppose your folder structure looks like this:

```text
nestjs-series/          ← already a Git repository
│── .git
│── lesson01/
│    ├── .git          ← created by `nest new`
│    ├── src/
│    └── package.json
```

Now you have **one Git repository inside another**.

When the outer repository tries to `git add lesson01`, Git notices that `lesson01` is itself a repository. Instead of treating it as a normal folder, it assumes it might be a submodule. Since that inner repository isn't a proper submodule (and may not even have a commit yet), you get:

```text
error: 'lesson01/' does not have a commit checked out
```

### If you're following a tutorial series

It sounds like you're keeping multiple NestJS projects inside one parent repository, for example:

```text
nestjs-series/
├── lesson01/
├── lesson02/
├── lesson03/
```

In that case, you usually **don't want** each lesson to have its own Git repository. After creating each project, remove its `.git` folder:

```powershell
Remove-Item -Recurse -Force .\lesson01\.git
```

Then the parent repository can track all the lesson folders normally.

### Can you stop Nest from creating a Git repository?

Yes. The Nest CLI has a `--skip-git` option:

```bash
nest new lesson01 --skip-git
```

or simply:

```bash
nest new lesson01 -g
```

(`-g` is the short form for `--skip-git`.)

This creates the Nest project without initializing Git, which is ideal when the project lives inside an existing repository.

So:

- **Standalone Nest app?** Let Nest initialize Git.
- **Nest app inside another Git repository (like a monorepo or lesson collection)?** Use `--skip-git` or remove the generated `.git` folder afterward.

</details>
