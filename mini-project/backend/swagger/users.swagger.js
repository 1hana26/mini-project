/**
 * @swagger
 * /users:
 *   get:
 *     summary: 전체 회원 목록 조회하기
 *     tags: [Users] 
 *     parameters:
 *          - in: query
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *               schema:
 *                   type: array
 *                   items:
 *                       properties:
 *                           name:
 *                               type: string 
 *                               example: 김철수
 *                           email:
 *                               type: string
 *                               example: aaa@naver.com
 *                           personal:
 *                               type: string
 *                               example: 091123-1122334
 *                           prefer:
 *                               type: string
 *                               example: www.naver.com
 *                           pwd:
 *                               type: string
 *                               example: 112233
 *                           phone:
 *                               type: string
 *                               example: 01012345678
 *                           og:
 *                               type: object
 *                               example: { title: 네이버, description: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요, img: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_21285241…   }          
 * 
 * 
 * 
 * @swagger
 * /user:
 *   post:
 *      summary: 회원 정보확인 후 메일보내기
 *      tags: [Users]
 *      requestBody:
 *               description: 회원정보
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  required: true
 *                                  example: 이철수
 *                              email:
 *                                  type: string
 *                                  required: true
 *                                  example: aaa@naver.com
 *                              personal:
 *                                  type: string
 *                                  required: true
 *                                  example: '001122-1122332'
 *                              prefer:
 *                                  type: string
 *                                  required: true  
 *                                  example: www.naver.com
 *                              pwd:
 *                                  type: string
 *                                  required: true
 *                                  example: 112233
 *                              phone:
 *                                  type: string
 *                                  required: true
 *                                  example: "01012311231"
 *      responses:
 *        200:
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *               schema:
 *                   type: array
 *                   items:
 *                       properties:
 *                           name:
 *                               type: string 
 *                               example: 김철수
 *                           email:
 *                               type: string
 *                               example: aaa@naver.com
 *                           personal:
 *                               type: string
 *                               example: 091123-1122334
 *                           prefer:
 *                               type: string
 *                               example: www.naver.com
 *                           pwd:
 *                               type: string
 *                               example: 112233
 *                           phone:
 *                               type: string
 *                               example: '01012311231'
 *        422:
 *          description: 요청은 잘 받았으나 문법오류로 인하여 응답할 수 없음.
 *                                 
 * 
 */