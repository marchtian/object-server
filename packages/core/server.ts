var server = require('@steedos/meteor-bundle-runner');
import { default as Project } from "./src/project/Project";
import { ODataRouter } from '.';

declare var WebApp: any;

server.Fiber(function () {
    server.Profile.run("Server startup", function () {
        server.loadServerBundles();
        server.callStartupHooks();
        try {
            Project.load(__dirname + "/../../objects/accounts/src");
            Project.load(__dirname + "/../../objects/contracts/src");
            Project.load(__dirname + "/../../apps/crm/src");
            Project.load(__dirname + "/../standard-objects");

            let express = require('express');
            let app = express();
            app
                .use('/api/odata/v2', ODataRouter)
                .disable('x-powered-by')
                .use('/assets/stimulsoft-report/', express.static(__dirname + '/node_modules/@steedos/stimulsoft-report/assets/'))
            WebApp.connectHandlers.use(app);
        } catch (error) {
            console.error(error)
            throw error
        }
        //require("../../apps/crm/src")
        server.runMain();
    });
}).run();