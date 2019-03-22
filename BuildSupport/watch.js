const chokidar = require("chokidar"),
  fs = require("fs-extra"),
  path = require("path"),
  deepmerge = require("./deepmerge");

var pkg = require("../package.json");
if (fs.existsSync("./local.json")) {
  var local = require("../local.json");
  pkg = deepmerge.deepmerge(pkg, local);
}

var log = console.log.bind(console);

function copy(start, srcRelativePath, destDir) {
  if (!fs.existsSync(srcRelativePath)) {
    return null;
  }
  var relPath = path.relative(start, srcRelativePath);
  const fullDestPath = path.join(destDir, relPath);
  log("Copying: " + srcRelativePath);
  return fs
    .ensureDir(path.dirname(fullDestPath))
    .then(() => fs.copy(srcRelativePath, fullDestPath));
}

var ignore = [
  /obj/,
  /bin/,
  "**/*.{vb,cs,suo,user}",
  "**/dnn.json",
  "**/*.??proj",
  "**/web*.config",
  "**/packages.config",
  "**/.*"
];

const watcher = (src, dest) =>
  chokidar
    .watch(src, {
      ignored: ignore,
      persistent: true
    })
    .on("add", path => copy(src, path, dest))
    .on("change", path => copy(src, path, dest));
// Todo: delete events?

let allDlls = [];

// Initialize watchers.
pkg.dnn.projectFolders.forEach(pf => {
  let projectPkg = require("../" + pf + "/dnn.json");
  allDlls = allDlls.concat(
    projectPkg.pathsAndFiles.assemblies.map(dll => "bin/" + dll)
  );
  if (projectPkg.projectType == "module") {
    let projectWatcher = watcher(pf, pkg.dnn.pathsAndFiles.devSitePath + "\\DesktopModules\\" + projectPkg.folder.replace("/", "\\"));
  }
});

const DllWatcher = chokidar
  .watch(allDlls, {
    persistent: true
  })
  .on("add", path => {
    copy("bin", path, pkg.dnn.pathsAndFiles.devSitePath + "\\bin");
    copy(
      "bin",
      path.replace(".dll", ".pdb"),
      pkg.dnn.pathsAndFiles.devSitePath + "\\bin"
    );
  })
  .on("change", path => {
    copy("bin", path, pkg.dnn.pathsAndFiles.devSitePath + "\\bin");
    copy(
      "bin",
      path.replace(".dll", ".pdb"),
      pkg.dnn.pathsAndFiles.devSitePath + "\\bin"
    );
  });
