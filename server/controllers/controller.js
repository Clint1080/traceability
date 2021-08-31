
module.exports = {
    filePath: (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
        rollbar.info("html file served successfully");
    }
}