import { TestBed } from '@angular/core/testing';

import { SetFavoriteService } from './set-favorite.service';

describe('SetFavoriteService', () => {
  let service: SetFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
