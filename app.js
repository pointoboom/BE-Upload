import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const multerUpload = multer({ storage: storage, limits: { files: 1 } });
async function init() {
    const app = express();
    const port = 4000;

    app.use(cors());
    app.use(bodyParser.json());

    app.post("/", multerUpload.any(), (req, res) => {
        if (req.files.length === 0) {
            return res.status(422).json({
                error: "Please select a file",
            });
        }
        const file = req.files[0];
        const result = {
            fileName: file.originalname,
            size: Number(file.size / (1024 * 1024)).toFixed(2) + "MB",
            extension: file.originalname.split(".")[1],
        };
        res.send({ result });
    });
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.get("*", (req, res) => {
        res.status(404).send("Not found");
    });
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
    });
}
init();
