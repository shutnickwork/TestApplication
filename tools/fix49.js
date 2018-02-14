const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "node_modules");

const files = [];

files.forEach(file => {
    file = path.join(dir, file);
    let content = fs.readFileSync(file, {encoding: 'utf-8'});

    if (!content.includes("'prop-types'")) {
        content = content.replace(/(.*)(import .*;)(.*)/g, `$1$2\r\nimport PropTypes from 'prop-types';$3`);
    }
    content = content.replace(/(.*)(import .*),\s*PropTypes(.* from .react.)(.*)/g, `$1$2$3$4`);

    fs.writeFileSync(file, content, {encoding: "utf-8"});
});