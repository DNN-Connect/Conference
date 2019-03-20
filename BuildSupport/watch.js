const chokidar = require("chokidar"),
  fs = require("fs-extra"),
  path = require("path"),
  pkg = require("../package.json"),
  pkgConference = require("../Server/Conference/dnn.json");

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

const allDlls = pkgConference.pathsAndFiles.assemblies
  .map(dll => "bin/" + dll);

const watcher = (src, dest) =>
  chokidar
    .watch(src, {
      ignored: ignore,
      persistent: true
    })
    .on("add", path => copy(src, path, dest))
    .on("change", path => copy(src, path, dest));
// Todo: delete events?

// Initialize watchers.
const ConferenceWatcher = watcher(
  "Server/Conference",
  pkg.dnn.pathsAndFiles.devSitePath +
    "\\DesktopModules\\MVC\\Connect\\Conference"
);

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
