const _ = require("underscore");
const fs = require("fs");
const path = require("path");
import { AppManager } from "./app";
import { TriggerManager } from "./trigger";
import { ReportManager } from "./report";
import { getObjectSchemaManager } from "./index";


let appFileName = 'app.yml';
let objectFolderName = 'objects';
let triggerFolderName = 'triggers';
let reportFolderName = 'reports';

export const Module = {

    loadApp: AppManager.loadFile,
    loadReport: ReportManager.loadFile,
    loadTrigger: TriggerManager.loadFile,

    load(srcDirectory: string) {
        if (!fs.existsSync(srcDirectory) || !fs.statSync(srcDirectory).isDirectory())
            console.error("Module folder not found：" + srcDirectory);

        console.log('Loading module ... ', srcDirectory);

        //读取 app
        let appFilePath = path.join(srcDirectory, appFileName);
        if (fs.existsSync(appFilePath)) {
            Module.loadApp(appFilePath);
        }

        //读取 object
        let objectFolderPath = path.join(srcDirectory, objectFolderName);
        if (fs.existsSync(objectFolderPath)) {
            let objectFiles = fs.readdirSync(objectFolderPath)
            _.each(objectFiles, (aof: string) => {
                getObjectSchemaManager().createFromFile(path.join(objectFolderPath, aof));
            })
        }

        //读取 triggers
        let triggerFolderPath = path.join(srcDirectory, triggerFolderName);
        if (fs.existsSync(triggerFolderPath)) {
            let triggerFiles = fs.readdirSync(triggerFolderPath)
            _.each(triggerFiles, (tf: string) => {
                Module.loadTrigger(path.join(triggerFolderPath, tf));
            })
        }

        //读取 reports
        let reportFolderPath = path.join(srcDirectory, reportFolderName);
        if (fs.existsSync(reportFolderPath)) {
            let reportFiles = fs.readdirSync(reportFolderPath)
            _.each(reportFiles, (rf: string) => {
                Module.loadReport(path.join(reportFolderPath, rf));
            })
        }
    },

}