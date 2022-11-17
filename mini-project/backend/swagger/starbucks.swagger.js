/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 커피 메뉴 리스트 가져오기
 *     tags: [Starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                   properties:
 *                       name:
 *                           type: string
 *                           example: 에스프레소 콘 파나
 *                       img:
 *                           type: string
 *                           example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg
 *       
 *     
 */