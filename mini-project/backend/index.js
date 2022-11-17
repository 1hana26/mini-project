import express, { response } from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import { checkValidationSite, createOgObject } from "./site.js";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";

import { Board } from "./models/board.model.js";
import { Starbucks } from "./models/starbucks.model.js";
import { Token } from "./models/token.model.js";
import { User } from "./models/user.model.js";

const app = express();

//json파일을 읽을 수 있게됨.
express.json();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

//=== tokens/phone ===
app.post("/tokens/phone", async (req, res) => {
  //핸드폰 번호 받기.
  let myPhone = req.body.myPhone;
  console.log(myPhone);
  //1.휴대폰 자리수 확인
  const isValid = checkValidationPhone(myPhone);
  if (isValid === false) {
    res.send("다시시도해주세요!!");
    return;
  }
  //2.핸드폰 토큰 만들기
  const myToken = getToken();
  console.log(myToken);
  //3.DB 핸드폰 번호가 있는지 확인하기.
  //myPhone이 있으면 해당 번호가 있는 객체를반환 없다면 널값을 반환
  const result = await Token.findOne({ phone: myPhone });

  // console.log(result)

  //3-2.핸드폰 번호 새로 저장.
  if (result === null) {
    const phone = new Token({
      token: myToken,
      phone: myPhone,
      isAuth: false,
    });

    await phone.save();
  } else {
    //3-1.생성한 인증 토큰으로 update({찾는 부분},{찾을 부분})
    await Token.updateOne({ phone: myPhone }, { token: myToken });
  }

  //3.핸드폰번호에 토큰 문자 전송하기.
  // sendTokenToSMS({myPhone,myToken})

  const first = myPhone.slice(0, 3);
  const second = myPhone.slice(3, 7);
  const third = myPhone.slice(7);

  res.send(`${first}-${second}-${third}으로 인증 문자가 전송되었습니다.`);
});

app.patch("/tokens/phone", async (req, res) => {
  let myPhone = req.body.myPhone;
  let myToken = req.body.token;
  //입력한 핸드폰 번호가 있는지 확인. 있으면 해당 번호가 있는 객체를 반환, 없으면 null을 반환.

  console.log(myPhone, myToken);

  const result = await Token.findOne({ phone: myPhone });
  console.log(result);
  //아닌경우를 먼저 반환.
  //1.핸드폰 번호가 DB에 없는 경우,
  if (result === null) {
    //false를 응답.
    console.log("핸드폰 번호가 없습니다.");
    res.send(false);
  } else if (myToken !== result.token) {
    //2.핸드폰번호가 존재하는 객체에서 저장된 token이 입력한 myToken과 일치하지 않을경우
    //false를 응답.
    console.log("토큰이 틀렸습니다.");
    res.send(false);
  } else {
    //앞에서 핸드폰번호가 없는 경우와, 있어도 인증번호를 틀리게 입력한 경우를 제외.
    //핸드폰 번호가 있으면서,인증번호를 맞게 입력한 경우
    //해당 번호를 가진 DB의 객체 isAuth를 true로 업데이트하고 true를 응답.
    await Token.updateOne({ phone: myPhone }, { isAuth: true });
    res.send(true);
  }
});

//=== users ===

app.post("/user", async (req, res) => {
  //프론트로부터 데이터 받기 구조분해할당 사용.
  const { name, email, personal, prefer, pwd, phone } = req.body;
  //1.이메일 정상인지 확인(1.존재여부, 빈값이 아닌가? 2. "@"포함여부)
  const isValid = checkValidationEmail(email);
  if (isValid === false) {
    res.send("입력하신 이메일을 확인해주세요.");
    return;
  }
  console.log(phone);
  //2.핸드폰 번호가 DB에 존재하는지 확인하기, 혹은 핸드폰 번호가 아닌지 확인하기.
  const token = await Token.findOne({ phone: phone }); //입력한 핸드폰 번호가 있는객체 찾아오기
  console.log("----");
  console.log(token);
  if (token === null) {
    //422 상태코드와 함께 에러문구 반환하기.
    res
      .status(422)
      .send("핸드폰 오류입니다.입력과 인증과정이 완료되었는지 확인해주세요.");
  }

  if (token.isAuth === false) {
    //422 상태코드와 함께 에러문구 반환하기.
    res.status(422);
    res.send("핸드폰 오류입니다.입력과 인증과정이 완료되었는지 확인해주세요.");
  }

  //3.입력한 사이트 주소확인하기 -> http가 있는가? 입력을 하지 않았는지를 확인.
  const isValidSite = checkValidationSite(prefer);
  if (isValidSite === false) {
    res.send("입력하신 선호하는 홈페이지 주소를 확인해주세요.");
    return;
  }
  //4. 주민번호 뒷자리 *로 바꾸기.
  const changePersonal = personal.slice(0, -7).padEnd(14, "*");
  //4. 사이트 정보를 객체에 담기.
  const og = await createOgObject(prefer);

  const user = new User({
    og: og,
    name: name,
    email: email,
    personal: changePersonal,
    prefer: prefer,
    pwd: pwd,
    phone: phone,
  });

  await user.save();

  //5.가입환영 템플릿 만들기
  const emailTemplate = getWelcomeTemplate({
    name,
    email,
    personal,
    prefer,
    pwd,
    phone,
  });

  //6.이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, emailTemplate);
  res.send(`가입이 완료되었습니다.생성된 개인 id : ${user.id}`);
});

app.get("/users", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

//=== boards===

app.get("/boards", async (req, res) => {
  //하드코딩으로 응답을 주기.
  //1.데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기 (4일차에는 DB학습 전이라 생략.)
  const result = await Board.find();
  //2.꺼내온 결과 응답주기.
  res.send(result);
});

app.post("/boards", async (req, res) => {
  console.log(req.body.writer);
  console.log(req.body.title);
  console.log(req.body.content);
  //req로 데이터들이 담겨서 들어오게 된다.
  //1.데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기(4일차에는 DB학습 전이라 생략.)
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.content,
  });

  await board.save();
  //2.저장한 결과 응답주기.
  res.send("게시물 등록에 성공하였습니다."); //front에 응답을 줌.
});

//=== /starbucks ===

app.get("/starbucks", async (req, res) => {
  const drink = await Starbucks.find();
  console.log(drink);
  res.send(drink);
});

//mongoDB 접속
mongoose.connect("mongodb://my-database:27017/mydocker04");
// mongoose.connect("mongodb://localhost:27017/")

app.listen(3000, () => {
  console.log(`프로그램을 켜는데 성공했어요!`);
});
