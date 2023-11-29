import { Test, TestingModule } from '@nestjs/testing';
import { GlobalsResolver } from './globals.resolver';
import { GlobalsService } from './globals.service';

describe('GlobalsResolver', () => {
  let resolver: GlobalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalsResolver, GlobalsService],
    }).compile();

    resolver = module.get<GlobalsResolver>(GlobalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
