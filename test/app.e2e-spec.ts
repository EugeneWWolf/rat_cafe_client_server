import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from 'src/product/product.module';
import { Product, ProductCategory } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/services/product/product.service';
import { createProductDTO } from './helpers';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let productRepository: Repository<Product>;
  let service: ProductService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '1488',
          database: 'rat_cafe_testing',
          entities: [Product],
          synchronize: true,
      }),
    ]
    })
    .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  
    productRepository = moduleFixture.get('ProductRepository');
    service = new ProductService(productRepository);
  });

  afterEach(async () => {
    await productRepository.query('DELETE FROM product;');
  });

  afterEach(done => {
    app.close();
    done();
  })

  it('/product (GET)', async () => {
    const dataToInsert = createProductDTO('Latte', 230, ProductCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const res = await request(app.getHttpServer())
      .get('/product')
      .set('Accept', 'application/json')
  
    expect(res.headers["content-type"]).toMatch(/json/);
    
    expect(res.statusCode).toEqual(200);
  
    expect(typeof res.body[0]["id"]).toEqual('number');
    expect(res.body[0]["name"]).toEqual('Latte');
    expect(res.body[0]["price"]).toEqual(230);
    expect(Object.values(ProductCategory)).toContain(res.body[0]["type"]);
    expect(res.body[0]["description"]).toBeDefined();
  });

  it('/product/id (GET)', async () => {
    const dataToInsert = createProductDTO('Latte', 230, ProductCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const queryResult = await productRepository.query(`SELECT id FROM product WHERE name='Latte';`);
    const id = queryResult[0]["id"];

    const res = await request(app.getHttpServer())
      .get(`/product/${id}`)
      .set('Accept', 'application/json')

    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.statusCode).toEqual(200);

    expect(typeof res.body["id"]).toEqual('number');
    expect(res.body["name"]).toEqual('Latte');
    expect(res.body["price"]).toEqual(230);
    expect(Object.values(ProductCategory)).toContain(res.body["type"]);
    expect(res.body["description"]).toBeDefined();
  });

  it('/product (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/product')
      .send({name: 'Quaso', price: '999', type: 'Dessert', description: 'Very tasty handmade quaso'})
      .set('Accept', 'application/json')

      expect(res.headers["content-type"]).toMatch(/json/);

      expect(res.statusCode).toEqual(201);

      expect(typeof res.body["id"]).toEqual('number');
      expect(res.body["price"]).toEqual("999");
      expect(res.body["type"]).toEqual('dessert');
      expect(res.body["description"]).toBeDefined();
  });

  it('/product/id (PATCH)', async () => {
    const dataToInsert = createProductDTO('Latte', 230, ProductCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const queryResult = await productRepository.query(`SELECT id FROM product WHERE name='Latte';`);
    const id = queryResult[0]["id"];

    const res = await request(app.getHttpServer())
      .patch(`/product/${id}`)
      .send({price: '200'})
      .set('Accept', 'application/json')

    expect(res.statusCode).toEqual(200);

    const updatedData = await productRepository.query(`SELECT * FROM product WHERE name='Latte';`);

    expect(typeof updatedData[0]["id"]).toEqual('number');
    expect(updatedData[0]["name"]).toEqual('Latte');
    expect(updatedData[0]["price"]).toEqual(200);
    expect(updatedData[0]["type"]).toEqual('coffee');
    expect(updatedData[0]["description"]).toBeDefined();
  });

  it('/product/id (DELETE)', async () => {
    const dataToInsert = createProductDTO('Latte', 230, ProductCategory.COFFEE, 'Lorem Ipsum Sit Amet');

    await service.create(dataToInsert);

    const queryResult = await productRepository.query(`SELECT id FROM product WHERE name='Latte';`);
    const id = queryResult[0]["id"];

    const res = await request(app.getHttpServer())
      .delete(`/product/${id}`)
      .set('Accept', 'application/json')

    expect(res.statusCode).toEqual(200);
    expect(productRepository.count()).resolves.toEqual(0);
  });
});
