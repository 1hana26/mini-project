import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Starbucks } from "./models/starbucks.model.js";

//몽고DB 접속!!
mongoose.connect("mongodb://localhost:27017/mydocker04")
//크롤러는 도커에서 설치하는데 시간이 걸려서 도커 밖에서 함.



async function startCrawling(){ 
    //브라우저는 눈에 보이게 시작.
    const browser = await puppeteer.launch({headless:false})
    //새로운 페이지를 생성
    const page = await browser.newPage() 
    //새롭게 생성된 페이지의 넓이와 높이 조정
    await page.setViewport({width: 1280,height:720}) 
    //크롤링을 진행할 페이지 링크
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do")
    //페이지 진입후 1초 기다리기.
    await page.waitForTimeout(1000)


    for(let i = 1;i<=30;i++){
        const img = await page.$eval(
            `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dt > a > img`,
            (el)=> el.src
    
        )
    
        const name = await page.$eval(
            `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dd`,
            (el)=> el.textContent
        )
        
        console.log(`이미지: ${img}, 이름: ${name}`)

        const starbucks = new Starbucks({
            name:name,
            img:img
        })

        await starbucks.save()

    }
    
    await browser.close()//위의 콘솔 찍으면 브라우저 종료.
}

startCrawling()