const puppeteer = require('puppeteer');
const moment = require('moment');
const mysql = require('mysql');
const util = require('util');
const config = require('./config').config;

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 1000 // [msec]
    })
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.goto(config.url);

    // スクショ
    // const today = moment().format("YYYYMMDD_HHmmss");
    // const screenShot = `${config.screenShot.path}/${today}.${config.screenShot.extension}`;
    // await page.screenshot({ path: screenShot, quality: 50, fullPage: true });

    // iframeレンダリング完了を待つ
    // const frame = page.frames()[page.frames().length-1]; // FIXME: frameが0の場合の例外処理が必要
    // await frame.waitForSelector('body');

    // 駐車場情報を取得
    try {
        const result = await getParkingStatus(page);
        console.log(result);
        // DBに結果登録
        await saveToDataBase(result);
    } catch (error) {
        console.log(error);
        await browser.close();
        process.exit();
    }
    
    await browser.close();

})();

/**
 * 駐車場空き情報をページから取得
 * @param pupetter.Page page ページ
 * @returns Array
 */
 async function getParkingStatus(page) {
    const parkingASelector = '.info_block .content dl:nth-child(1)';
    const parkingBSelector = '.info_block .content dl:nth-child(2)';
    const parkingCSelector = '.info_block .content dl:nth-child(3)';

    // 空きステータス
    function getStatus(value) {
        if (value === '空') return 1;
        if (value === '混') return 2;
        if (value === '満') return 3;
        return 0; // 取得エラー
    }
    const a_status = getStatus(await getPropertyValue(page, `${parkingASelector} dd strong`, 'textContent'));
    const b_status = getStatus(await getPropertyValue(page, `${parkingBSelector} dd strong`, 'textContent'));
    const c_status = getStatus(await getPropertyValue(page, `${parkingCSelector} dd strong`, 'textContent'));

    // 説明
    const a_description = await getPropertyValue(page, `${parkingASelector} dd p`, 'textContent');
    const b_description = await getPropertyValue(page, `${parkingBSelector} dd p`, 'textContent');
    const c_description = await getPropertyValue(page, `${parkingCSelector} dd p`, 'textContent');

    // {
    //     parkingA: {
    //         status: 1,
    //         description: '入場まで0分待ち',
    //         scraped_at: '2022-05-03 19:14:35'
    //     },
    //     parkingB: {
    //         status: 1,
    //         description: '入場まで30分待ち',
    //         scraped_at: '2022-05-03 19:14:35'
    //     },
    //     parkingC: {
    //         status: 2,
    //         description: '入場まで0分待ち',
    //         scraped_at: '2022-05-03 19:14:35'
    //     }
    // }
    return {
        parkingA: {
            status: a_status,
            description: a_description,
            scraped_at: moment().format("YYYY-MM-DD HH:mm:ss")
        },
        parkingB: {
            status: b_status,
            description: b_description,
            scraped_at: moment().format("YYYY-MM-DD HH:mm:ss")
        },
        parkingC: {
            status: c_status,
            description: c_description,
            scraped_at: moment().format("YYYY-MM-DD HH:mm:ss")
        },
    };
}

async function getPropertyValue(page, selector, property) {
    const elementHandle = await page.$(selector);
    return await (await elementHandle.getProperty(property)).jsonValue();
}

/**
 * DBにスクレイピング結果登録
 */
async function saveToDataBase(result) {
    const pool = mysql.createPool(config.mysql);
    pool.query = util.promisify(pool.query);

    try {
        await pool.query(
            "INSERT INTO parking_a SET ?", 
            {
                status: result.parkingA.status,
                description: result.parkingA.description,
                scraped_at: result.parkingA.scraped_at,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                updated_at: null
            }
        );
        await pool.query(
            "INSERT INTO parking_b SET ?", 
            {
                status: result.parkingB.status,
                description: result.parkingB.description,
                scraped_at: result.parkingB.scraped_at,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                updated_at: null
            }
        );
        await pool.query(
            "INSERT INTO parking_c SET ?", 
            {
                status: result.parkingC.status,
                description: result.parkingC.description,
                scraped_at: result.parkingC.scraped_at,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                updated_at: null
            }
        );
    } catch (error) {
        console.log(error);
    }

    pool.end();
}
