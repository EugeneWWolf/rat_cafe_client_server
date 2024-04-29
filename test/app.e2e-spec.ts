import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FoodModule } from 'src/food/food.module';
import { Food, FoodCategory } from 'src/food/entities/food.entity';
import { Repository } from 'typeorm';
import { FoodService } from 'src/food/services/food/food.service';
import { createFoodDTO } from './helpers';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let foodRepository: Repository<Food>;
  let service: FoodService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        FoodModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '1488',
          database: 'rat_cafe_testing',
          entities: [Food],
          synchronize: true,
      }),
    ]
    })
    .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  
    foodRepository = moduleFixture.get('FoodRepository');
    service = new FoodService(foodRepository);
  });

  afterEach(async () => {
    await foodRepository.query('DELETE FROM Food;');
  });

  afterEach(done => {
    app.close();
    done();
  })

  it('/food (GET)', async () => {
    const dataToInsert = createFoodDTO('Latte', 230, FoodCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const res = await request(app.getHttpServer())
      .get('/food')
      .set('Accept', 'application/json')
  
    expect(res.headers["content-type"]).toMatch(/json/);
    
    expect(res.statusCode).toEqual(200);
  
    expect(typeof res.body[0]["id"]).toEqual('number');
    expect(res.body[0]["name"]).toEqual('Latte');
    expect(res.body[0]["price"]).toEqual(230);
    expect(Object.values(FoodCategory)).toContain(res.body[0]["type"]);
    expect(res.body[0]["description"]).toBeDefined();
  });

  it('/food/id (GET)', async () => {
    const dataToInsert = createFoodDTO('Latte', 230, FoodCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const queryResult = await foodRepository.query(`SELECT id FROM food WHERE name='Latte';`);
    const id = queryResult[0]["id"];

    const res = await request(app.getHttpServer())
      .get(`/food/${id}`)
      .set('Accept', 'application/json')

    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.statusCode).toEqual(200);

    expect(typeof res.body["id"]).toEqual('number');
    expect(res.body["name"]).toEqual('Latte');
    expect(res.body["price"]).toEqual(230);
    expect(Object.values(FoodCategory)).toContain(res.body["type"]);
    expect(res.body["description"]).toBeDefined();
  });

  it('/food (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/food')
      .send({name: 'Quaso', price: '999', type: 'Dessert', description: 'Very tasty handmade quaso'})
      .set('Accept', 'application/json')

      expect(res.headers["content-type"]).toMatch(/json/);

      expect(res.statusCode).toEqual(201);

      expect(typeof res.body["id"]).toEqual('number');
      expect(res.body["price"]).toEqual("999");
      expect(res.body["type"]).toEqual('dessert');
      expect(res.body["description"]).toBeDefined();
  });

  it('/food/id (PATCH)', async () => {
    const dataToInsert = createFoodDTO('Latte', 230, FoodCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const queryResult = await foodRepository.query(`SELECT id FROM food WHERE name='Latte';`);
    const id = queryResult[0]["id"];

    const res = await request(app.getHttpServer())
      .patch(`/food/${id}`)
      .send({price: '200'})
      .set('Accept', 'application/json')

    expect(res.statusCode).toEqual(200);

    const updatedData = await foodRepository.query(`SELECT * FROM food WHERE name='Latte';`);

    expect(typeof updatedData[0]["id"]).toEqual('number');
    expect(updatedData[0]["name"]).toEqual('Latte');
    expect(updatedData[0]["price"]).toEqual(200);
    expect(updatedData[0]["type"]).toEqual('coffee');
    expect(updatedData[0]["description"]).toBeDefined();
  });

  it('/food/id (DELETE)', async () => {
    const dataToInsert = createFoodDTO('Latte', 230, FoodCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const queryResult = await foodRepository.query(`SELECT id FROM food WHERE name='Latte';`);
    const id = queryResult[0]["id"];

    const res = await request(app.getHttpServer())
      .delete(`/food/${id}`)
      .set('Accept', 'application/json')

    expect(res.statusCode).toEqual(200);
    expect(foodRepository.count()).resolves.toEqual(0);
  });
});
