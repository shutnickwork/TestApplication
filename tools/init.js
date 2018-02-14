const fs = require("fs");
const path = require("path");

const dir = __dirname;
const settingsPath = path.join(dir, "..", "resources", "settings", "localSettings.json");
const packagerIOSIpPath = path.join(dir, "..", "ios", "customPackagerIp.txt");
const packagerAndroidIpPath = path.join(dir, "..", "android", "app", "src", "main", "assets", "customPackagerIp.txt");

checkForFile(settingsPath, () => fs.writeFileSync(settingsPath, "{}", {encoding: "utf-8"}));
checkForFile(packagerIOSIpPath, () => fs.writeFileSync(packagerIOSIpPath, "", {encoding: "utf-8"}));
checkForFile(packagerAndroidIpPath, () => fs.writeFileSync(packagerAndroidIpPath, "", {encoding: "utf-8"}));

function checkForFile(fileName,callback)
{
    fs.exists(fileName, function (exists) {
        if(exists)
        {
            callback();
        } else
        {
            fs.writeFile(fileName, "", function ()
            {
                console.log(`create ${fileName}`);
                callback();
            })
        }
    });
}
