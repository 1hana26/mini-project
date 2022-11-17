/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 핸드폰에 인증번호 전송하기
 *     tags: [Tokens]
 *     requestBody:
 *              description: 핸드폰 번호
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             myPhone:
 *                                 type: string
 *                                 required: true
 *                                 example: "01062063479"
 * 
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                    properties:
 *                        phone: 
 *                            type: string
 *                            example: "01012345678"
 *                        token:
 *                            type: string
 *                            example: 928281
 * 
 *                              
 * 
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 핸드폰 번호 인증 확인하기.
 *     tags: [Tokens]
 *     requestBody:
 *              description: 인증번호 전송하기
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             myPhone:
 *                                 type: string
 *                                 required: true
 *                                 example: "01012311231"
 *                             token:
 *                                 type: string
 *                                 required: true
 *                                 example: 987123
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          phone:
 *                              type: string
 *                              example: "01012345678"
 *                          token:
 *                              type: string
 *                              example: 912374
 * 
 * 
 */