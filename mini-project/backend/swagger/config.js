export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '설하나의 미니프로젝트 api 명세서', //큰 제목..
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.swagger.js'], // 파일이 좋음,*.swagger.js : swagger.js로 끝나는 모든파일들을 의미.
  };