const commandLineUsage = require("command-line-usage");
const commandLineArgs = require("command-line-args");
const writeJsonFile = require("write-json-file");
const loadJsonFile = require("load-json-file");
const fs = require("fs");
const path = require("path");
const getSettings = require("../build/src/core/settings/getSettings").getSettings;

const log = console.log;
const optionDefinitions = [
    {name: "dir", alias: "d", type: String, description: "project directory(current dir used if parameter empty)"},
    {name: "environment", alias: "e", type: String, description: "possible values(Development, Staging, Production)"},
    {name: "version", alias: "v", type: String, description: "version"},
    {name: "build", alias: "b", type: Number, description: "build number"}
];
const options = commandLineArgs(optionDefinitions);
const {version, build, environment} = options;
const dir = options.dir !== undefined ? options.dir : __dirname;
const usage = commandLineUsage([{header: "Options", optionList: optionDefinitions}]);
log(usage);
console.log(environment);
if (environment !== "Development"
    && environment !== "Test"
    && environment !== "Staging"
    && environment !== "Production") {
    log(`incorrect environment value '${environment}'`);
    return;
}

const mobileSettingsPath = path.join(dir, "..", "resources", "settings", "mobileSettings.json");
const infoPlist = path.join(dir, "..", "ios", "TestApp", "Info.plist");
const gradleFile = path.join(dir, "..", "android", "app", "build.gradle");
const fastlaneFile = path.join(dir, "..", "ios", "fastlane", "Appfile");

log(`mobileSettings - ${mobileSettingsPath}`);
log(`infoPlist - ${infoPlist}`);
log(`gradleFile - ${gradleFile}`);
log(`fastlaneFile - ${fastlaneFile}`);

run().then(() => console.log("done"));

async function run() {
    await setupMobileSettings();
    await setupInfoPlist();
    await setupGradleFile();
    await setupFastlaneFile();
}

function setupFastlaneFile() {
    let fastlaneContent = fs.readFileSync(fastlaneFile, {encoding: 'utf-8'});
    const settings = getSettings();
    const newHockeyApiToken = `ENV["HOCKEY_API_TOKEN"] = "${settings.devOptions.iOSHockeyOptions.apiToken}"`;
    const newHockeyAppId = `ENV["HOCKEY_APP_ID"] = "${settings.devOptions.iOSHockeyOptions.appId}"`;

    fastlaneContent = fastlaneContent.replace(/(.*)(ENV\[\"HOCKEY_API_TOKEN\"\] = \"[^"]*\")(.*)/g, `$1${newHockeyApiToken}$3`);
    fastlaneContent = fastlaneContent.replace(/(.*)(ENV\[\"HOCKEY_APP_ID\"\] = \"[^"]*\")(.*)/g, `$1${newHockeyAppId}$3`);

    fs.writeFileSync(fastlaneFile, fastlaneContent, {encoding: "utf-8"});
    log("successfully write fastlane file");
}

function setupGradleFile() {
    let gradleContent = fs.readFileSync(gradleFile, {encoding: 'utf-8'});

    gradleContent = gradleContent.replace(/(.*)(versionCode) \d*(.*)/g, `$1$2 ${build}$3`);
    gradleContent = gradleContent.replace(/(.*)(versionName) ".*"(.*)/g, `$1$2 "${version}"$3`);

    fs.writeFileSync(gradleFile, gradleContent, {encoding: "utf-8"});
    log("successfully write gradle file");
}

function setupInfoPlist() {
    let plistContent = fs.readFileSync(infoPlist, {encoding: "utf-8"});

    plistContent = plistContent.replace(/(.*)(CFBundleVersion.*\n*\s*\<string>)\d*(.*)/g, `$1$2${build}$3`);
    plistContent = plistContent.replace(/(.*)(CFBundleShortVersionString.*\n*\s*\<string>)\d\.\d\.?\d?\.?\d?\.?\d?(.*)/g, `$1$2${version.replace(/^(.*)\.\d*$/, "$1")}$3`);

    fs.writeFileSync(infoPlist, plistContent, {encoding: "utf-8"});
    log("successfully write infoPlist file");
}

async function setupMobileSettings() {
    const json = await loadJsonFile(mobileSettingsPath);

    json.version = version;
    json.build = build;
    json.environment = environment;
    await writeJsonFile(mobileSettingsPath, json);
    log("successfully write mobileSettings file");
}
